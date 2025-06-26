import { dateUtils } from '../../modules/dateUtils';
import {
  filterTransactions,
  generateMonthsRange,
} from '../../modules/transactionsUtils';

// Основная функция для расчета динамики баланса
export function getBalanceDynamics(data, totalMonths) {
  const transactions = data.transactions;
  const monthsRange = generateMonthsRange(totalMonths);
  const currentBalance = data.balance;

  if (!transactions || transactions.length === 0) {
    // Если нет транзакций, возвращаем все месяцы с текущим балансом
    return monthsRange.map(({ month, year }) => ({
      month,
      year,
      startBalance: currentBalance,
      endBalance: currentBalance,
      maxBalance: currentBalance,
      minBalance: currentBalance,
    }));
  }

  // Фильтруем транзакции за последние месяцы
  const recentTransactions = filterTransactions(transactions, totalMonths);
  const monthlyTransactions = groupTransactionsByMonth(
    recentTransactions,
    data,
  );

  return calculateMonthlyBalances(
    monthsRange,
    monthlyTransactions,
    currentBalance,
  );
}

// Группировка транзакций по месяцам
function groupTransactionsByMonth(transactions, data) {
  const monthlyTransactions = new Map();

  for (const transaction of transactions) {
    const { month, year } = dateUtils.getMonthYear(new Date(transaction.date));

    // Определяем знак транзакции (положительный для исходящих, отрицательный для входящих, тк идем в обратном направлении)

    const amount =
      transaction.from === data.account
        ? -transaction.amount
        : transaction.amount;

    const key = `${year}-${month}`;
    if (!monthlyTransactions.has(key)) {
      monthlyTransactions.set(key, []);
    }

    monthlyTransactions.get(key).push(amount);
  }

  return monthlyTransactions;
}

function calculateMonthlyBalances(
  monthsRange,
  monthlyTransactions,
  currentBalance,
) {
  const result = [];
  let runningBalance = currentBalance;

  // Идем от текущего месяца назад, чтобы правильно рассчитать стартовые балансы
  for (let i = monthsRange.length - 1; i >= 0; i--) {
    const { month, year, key } = monthsRange[i];
    const transactions = monthlyTransactions.get(key) || [];

    // Рассчитываем стартовый баланс (баланс до применения транзакций этого месяца)
    const totalTransactions = transactions.reduce(
      (sum, amount) => sum + amount,
      0,
    );

    const startBalance = runningBalance - totalTransactions;

    // Рассчитываем динамику баланса в течение месяца
    const { minBalance, maxBalance } = calculateMonthlyDynamics(
      startBalance,
      transactions,
    );

    result.unshift({
      month,
      year,
      startBalance,
      endBalance: runningBalance,
      minBalance,
      maxBalance,
    });

    // Обновляем баланс для предыдущего месяца
    runningBalance = startBalance;
  }

  return result;
}

// Расчет минимального и максимального баланса в течение месяца
function calculateMonthlyDynamics(startBalance, transactions) {
  let currentBalance = startBalance;
  let minBalance = startBalance;
  let maxBalance = startBalance;

  for (const transaction of transactions) {
    currentBalance += transaction;
    minBalance = Math.min(minBalance, currentBalance);
    maxBalance = Math.max(maxBalance, currentBalance);
  }

  return { minBalance, maxBalance };
}
