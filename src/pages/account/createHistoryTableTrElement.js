import { formatDateShort } from '../../modules/dateUtils';

export function createTransitionHistoryTableElement(account, transaction) {
  const tr = document.createElement('tr');
  tr.classList.add('history-table__body-tr', 'history-table__tr');

  const tdSenderAccount = document.createElement('td');
  tdSenderAccount.classList.add('history-table__body-td', 'history-table__td');
  tdSenderAccount.textContent = transaction.from;

  const tdRecipientAccount = document.createElement('td');
  tdRecipientAccount.classList.add(
    'history-table__body-td',
    'history-table__td',
  );
  tdRecipientAccount.textContent = transaction.to;

  const tdAmount = document.createElement('td');
  tdAmount.classList.add('history-table__body-td', 'history-table__td');

  if (account === transaction.from) {
    tdAmount.classList.add('history-table__amount-send');
    tdAmount.textContent = `- ${transaction.amount} ₽`;
  } else {
    tdAmount.classList.add('history-table__amount-receive');
    tdAmount.textContent = `+ ${transaction.amount} ₽`;
  }

  const tdDate = document.createElement('td');
  tdDate.classList.add('history-table__body-td', 'history-table__td');
  const date = formatDateShort().format(new Date(transaction.date));
  tdDate.textContent = `${date}`;

  tr.append(tdSenderAccount, tdRecipientAccount, tdAmount, tdDate);

  return tr;
}
