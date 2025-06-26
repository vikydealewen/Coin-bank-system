import { dateUtils } from './dateUtils';

// Фильтрация транзакций
export function filterTransactions(transactions, months) {
  const currentDate = new Date();
  const filteredTransactions = [];

  for (const transaction of transactions) {
    const transactionDate = new Date(transaction.date);
    if (dateUtils.getMonthDiff(currentDate, transactionDate) <= months) {
      filteredTransactions.push(transaction);
    }
  }

  return filteredTransactions;
}

// Генерация диапазона месяцев (от текущего месяца назад)
export function generateMonthsRange(totalMonths) {
  const months = [];
  const now = new Date();

  for (let i = 0; i < totalMonths; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const { month, year } = dateUtils.getMonthYear(date);
    months.push({ month, year, key: `${year}-${month}` });
  }

  return months.reverse(); // Возвращаем в хронологическом порядке (от старых к новым)
}
