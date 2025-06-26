import { dateUtils } from '../../../modules/dateUtils';
import {
  filterTransactions,
  generateMonthsRange,
} from '../../../modules/transactionsUtils';

export function getTransactionsRatioData(data, totalMonths) {
  const transactions = data.transactions;
  const monthsRange = generateMonthsRange(totalMonths);

  if (!transactions || transactions.length === 0) {
    return monthsRange.map(({ month, year }) => ({
      month,
      year,
      transactionsSum: 0,
      transactionsFrom: 0,
      transactionsTo: 0,
    }));
  }

  // Фильтруем транзакции за последние 6 месяцев
  const recentTransactions = filterTransactions(transactions, totalMonths);
  const monthlyData = groupTransactionsByMonth(recentTransactions, data);

  return fillMissingMonths(monthlyData, monthsRange, {
    transactionsSum: 0,
    transactionsFromSum: 0,
    transactionsToSum: 0,
  });
}

// Группировка транзакций по месяцам и расчет суммы транзакций за месяц
function groupTransactionsByMonth(transactions, data) {
  const monthlyTransactions = new Map();

  for (const transaction of transactions) {
    const { month, year } = dateUtils.getMonthYear(new Date(transaction.date));

    const key = `${year}-${month}`;
    if (!monthlyTransactions.has(key)) {
      monthlyTransactions.set(key, {
        month,
        year,
        transactionsSum: 0,
        transactionsFromSum: 0,
        transactionsToSum: 0,
      });
    }

    if (transaction.from === data.account) {
      monthlyTransactions.get(key).transactionsFromSum += transaction.amount;
    } else {
      monthlyTransactions.get(key).transactionsToSum += transaction.amount;
    }

    monthlyTransactions.get(key).transactionsSum += transaction.amount;
  }

  monthlyTransactions.forEach((item) => {
    item.transactionsSum = +item.transactionsSum.toFixed(2);
    item.transactionsFromSum = +item.transactionsFromSum.toFixed(2);
    item.transactionsToSum = +item.transactionsToSum.toFixed(2);
  });

  return monthlyTransactions;
}

export function fillMissingMonths(
  monthlyData,
  monthsRange,
  defaultValues = {},
) {
  return monthsRange.map(({ month, year, key }) => {
    if (monthlyData.has(key)) {
      return monthlyData.get(key);
    }

    return {
      month,
      year,
      ...defaultValues,
    };
  });
}
