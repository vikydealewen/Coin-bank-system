export function createHistoryTableHead() {
  const historyTableHead = document.createElement('thead');
  historyTableHead.classList.add('history-table__head');

  const headTableTitles = {
    senderAccount: 'Счёт отправителя',
    recipientAccount: 'Счёт получателя',
    amount: 'Сумма',
    date: 'Дата',
  };

  Object.keys(headTableTitles).map((key) => {
    const th = document.createElement('th');
    th.textContent = headTableTitles[key];
    th.classList.add('history-table__head-th', 'history-table__th');

    historyTableHead.append(th);
  });

  return historyTableHead;
}
