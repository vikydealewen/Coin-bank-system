import { createEmptyMessage } from '../../modules/createError';

export function createAccountCurrenciesCard(currenciesData) {
  const accountCurrenciesCard = document.createElement('div');
  const cardTitle = document.createElement('h3');

  accountCurrenciesCard.classList.add(
    'section__card',
    'section__card-light',
    'currency__account-currencies',
    'currency__card',
    'account-currencies',
  );
  cardTitle.classList.add(
    'section__card-title',
    'currency__card-title',
    'account-currencies__title',
  );
  cardTitle.textContent = 'Ваши валюты';

  const currenciesList = createAccountCurrenciesList();
  createAccountCurrenciesItems(currenciesList, currenciesData);

  accountCurrenciesCard.append(cardTitle, currenciesList);

  return accountCurrenciesCard;
}

function createAccountCurrenciesList() {
  const list = document.createElement('ul');
  list.classList.add('account-currencies__list', 'list', 'list-reset');
  list.id = 'account-currencies-list';
  return list;
}

function createAccountCurrenciesElement(currency) {
  const item = document.createElement('li');
  const itemLeft = document.createElement('div');
  const itemTitle = document.createElement('h4');
  const itemDotes = document.createElement('span');
  const itemBalance = document.createElement('p');

  item.classList.add('account-currencies__item', 'flex');
  itemLeft.classList.add('account-currencies__left', 'flex');
  itemTitle.classList.add('account-currencies__subtitle');
  itemDotes.classList.add('account-currencies__dotes');
  itemBalance.classList.add('account-currencies__amount');

  itemTitle.textContent = currency.code;
  itemBalance.textContent = currency.amount;

  itemLeft.append(itemTitle, itemDotes);
  item.append(itemLeft, itemBalance);

  return item;
}

function createAccountCurrenciesItems(currenciesList, currenciesData) {
  currenciesList.innerHTML = '';

  if (!currenciesData || currenciesData.length === 0) {
    const emptyMessage = createEmptyMessage('Список валют пуст');
    currenciesList.append(emptyMessage);

    return;
  }

  for (const currency in currenciesData) {
    const currenciesItemElement = createAccountCurrenciesElement(
      currenciesData[currency],
    );
    currenciesList.append(currenciesItemElement);
  }
}

export function updateAccountCurrenciesList(currenciesNewData) {
  const currenciesList = document.getElementById('account-currencies-list');

  createAccountCurrenciesItems(currenciesList, currenciesNewData);
}
