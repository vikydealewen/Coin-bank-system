import { createHistoryTableHead } from './createHistoryTableHead';
import { createHistoryTableBodyWithoutPagination } from './main/createHistoryTableBodyWithoutPagination';
import { createHistoryTableBodyWithPagination } from './history/createHistoryTableBodyWithPagination';
import { router } from '../../main';

export function createAccountTransitionHistoryCard(
  data,
  tableLength,
  sectionClass,
) {
  const accountTransitionHistoryCard = document.createElement('div');
  let cardTitle;
  sectionClass == 'account-main'
    ? (cardTitle = document.createElement('a'))
    : (cardTitle = document.createElement('h3'));
  const transitionHistoryTable = document.createElement('table');
  const transitionHistoryTableHead = createHistoryTableHead();
  let transitionHistoryTableBody;
  let paginationBlock;

  const accountId = data.account;
  const transactions = data.transactions;

  accountTransitionHistoryCard.classList.add(
    'section__card',
    'section__card-dark',
    'account__history',
    `${sectionClass}__history`,
    'history',
    'flex',
  );

  cardTitle.classList.add(
    'section__card-title',
    `${sectionClass}__card-title`,
    'history__title',
  );

  if (sectionClass == 'account-main') {
    cardTitle.href = `/accounts/${accountId}/history`;
    cardTitle.dataset.navigo = '';

    cardTitle.addEventListener('click', (e) => {
      const href = e.target.getAttribute('href');
      e.preventDefault();
      router.navigate(href);
    });
  }

  transitionHistoryTable.classList.add(
    `${sectionClass}__table`,
    'history__table',
    'history-table',
  );

  cardTitle.textContent = 'История переводов';

  if (transactions.length > 0) {
    if (tableLength === 10) {
      transitionHistoryTableBody = createHistoryTableBodyWithoutPagination(
        tableLength,
        data,
      );
    } else {
      const tableWithPagination = createHistoryTableBodyWithPagination(
        data,
        tableLength,
      );
      transitionHistoryTableBody = tableWithPagination.historyTableBody;
      paginationBlock = tableWithPagination.paginationContainer;
    }

    transitionHistoryTable.append(transitionHistoryTableBody);
  }

  transitionHistoryTable.prepend(transitionHistoryTableHead);

  accountTransitionHistoryCard.append(cardTitle, transitionHistoryTable);

  if (sectionClass !== 'account-main' && transactions.length > 0) {
    accountTransitionHistoryCard.append(paginationBlock);
  }

  return accountTransitionHistoryCard;
}
