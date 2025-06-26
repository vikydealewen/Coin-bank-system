import { createTransitionHistoryTableElement } from '../createHistoryTableTrElement';

export function createHistoryTableBodyWithoutPagination(tableLength, data) {
  const historyTableBody = document.createElement('tbody');
  historyTableBody.classList.add('history-table__body');

  createTableBodyList(historyTableBody, tableLength, data);

  return historyTableBody;
}

function createTableBodyList(tableBody, length, data) {
  let transactions = data.transactions.toReversed();

  transactions.slice(0, length).forEach((transaction) => {
    const tr = createTransitionHistoryTableElement(data.account, transaction);
    tableBody.append(tr);
  });
}

export function updateTableBodyWithoutPagination(data, tableLength) {
  const body = document.querySelector('.history-table__body');
  body.innerHTML = '';

  createTableBodyList(body, tableLength, data);
}
