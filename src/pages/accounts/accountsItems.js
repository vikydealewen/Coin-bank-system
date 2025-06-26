import { sortAccountsList } from './sortAccountsList';
import { formatDateLong } from '../../modules/dateUtils';
import { createEmptyMessage } from '../../modules/createError';
import { router } from '../../main';

export function createAccountsItemElement(account) {
  const item = document.createElement('li');
  const itemBottom = document.createElement('div');
  const itemTitle = document.createElement('h2');
  const itemBalance = document.createElement('p');
  const itemTransactionWrapper = document.createElement('div');
  const itemTransactionText = document.createElement('p');
  const itemOpenLink = document.createElement('a');

  item.classList.add('accounts__item');
  itemBottom.classList.add('accounts__item-bottom', 'flex');
  itemTitle.classList.add('accounts__item-title');
  itemBalance.classList.add('accounts__item-balance');
  itemTransactionWrapper.classList.add('accounts__transactions');
  itemTransactionText.classList.add('accounts__transaction-text');
  itemOpenLink.classList.add('accounts__item-btn', 'btn', 'btn-reset');

  if (account.transactions.length !== 0) {
    const itemTransactionDate = document.createElement('p');
    itemTransactionDate.classList.add('accounts__transaction-date');

    const lastTransactionPosition =
      account.transactions[account.transactions.length - 1];

    const date = formatDateLong().format(
      new Date(lastTransactionPosition.date),
    );

    itemTransactionDate.textContent = `${date}`;

    itemTransactionWrapper.append(itemTransactionDate);
  }

  const accountId = account.account;

  itemTitle.textContent = `${accountId}`;
  itemBalance.textContent = `${account.balance} ₽`;
  itemTransactionText.textContent = 'Последняя транзакция:';
  itemOpenLink.textContent = 'Открыть';

  itemOpenLink.href = `/accounts/${accountId}`;
  itemOpenLink.dataset.navigo = '';

  itemOpenLink.addEventListener('click', (e) => {
    const href = e.target.getAttribute('href');
    e.preventDefault();
    router.navigate(href);
  });

  itemTransactionWrapper.prepend(itemTransactionText);
  itemBottom.append(itemTransactionWrapper, itemOpenLink);
  item.append(itemTitle, itemBalance, itemBottom);

  return item;
}

export function createAccountItems(
  accountsList,
  accountsData,
  selectSortElement,
  sortProp,
) {
  accountsList.innerHTML = '';

  if (!accountsData || accountsData.length === 0) {
    const emptyMessage = createEmptyMessage('Список счетов пуст');
    accountsList.append(emptyMessage);

    selectSortElement.disabled = true;
    return;
  }

  selectSortElement.disabled = false;
  const sortedAccountsList = sortAccountsList(accountsData, sortProp);

  sortedAccountsList.forEach((account) => {
    const accountsItemElement = createAccountsItemElement(account);
    accountsList.append(accountsItemElement);
  });
}
