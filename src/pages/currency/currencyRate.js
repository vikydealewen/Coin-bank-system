import { currencyRateUtils } from '../../modules/sessionStorageUtils';

export function createCurrencyRateCard() {
  const currencyRateCard = document.createElement('div');
  const cardTitle = document.createElement('h3');

  currencyRateCard.classList.add(
    'section__card',
    'section__card-dark',
    'currency__rate',
    'currency__card',
    'rate',
  );
  cardTitle.classList.add(
    'section__card-title',
    'currency__card-title',
    'account__card-title',
  );
  cardTitle.textContent = 'Изменение курсов в реальном времени';

  const currenciesExchangeList = createCurrencyRateList();
  let currencyRateListKey = 'currencyRateArr';
  let currenciesExchangeArr = currencyRateUtils.getCurrencyRateList();

  createCurrencyRateItems(
    currenciesExchangeList,
    currenciesExchangeArr.toReversed(),
  );

  currencyRateCard.append(cardTitle, currenciesExchangeList);

  return currencyRateCard;
}

function createCurrencyRateList() {
  const list = document.createElement('ul');
  list.classList.add('rate__list', 'list', 'list-reset');
  list.id = 'currency-rate-list';
  return list;
}

export function createCurrencyRateElement(currency) {
  const item = document.createElement('li');
  const itemLeft = document.createElement('div');
  const itemTitle = document.createElement('h4');
  const itemDotes = document.createElement('span');
  const itemBalance = document.createElement('p');
  const divSvg = document.createElement('div');
  const arrowSvg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  );
  const useElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'use',
  );

  item.classList.add('rate__item', 'flex');
  itemLeft.classList.add('rate__left', 'flex');
  itemTitle.classList.add('rate__subtitle');
  itemDotes.classList.add('rate__dotes');
  itemBalance.classList.add('rate__amount');
  divSvg.classList.add('arrow', 'rate__arrow-container', 'flex');
  arrowSvg.classList.add('arrow__img', 'rate__arrow-img');

  itemTitle.textContent = `${currency.from}/${currency.to}`;
  itemBalance.textContent = currency.rate;

  if (currency.change == -1) {
    itemDotes.classList.add('rate__dotes-drop');
    arrowSvg.classList.add('arrow__img-down', 'rate__arrow-down');

    useElement.setAttribute('href', `/images/sprite.svg#arrow-dwn`);
    useElement.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      `/images/sprite.svg#arrow-dwn`,
    );
  } else {
    itemDotes.classList.add('rate__dotes-increase');
    arrowSvg.classList.add('arrow__img-up', 'rate__arrow-up');

    useElement.setAttribute('href', `/images/sprite.svg#arrow-up`);
    useElement.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      `/images/sprite.svg#arrow-up`,
    );
  }

  arrowSvg.appendChild(useElement);
  divSvg.append(arrowSvg);
  itemLeft.append(itemTitle, itemDotes);
  item.append(itemLeft, itemBalance, divSvg);

  return item;
}

export function createCurrencyRateItems(currenciesList, currenciesExchangeArr) {
  currenciesList.innerHTML = '';

  for (const currencyExchangeItem of currenciesExchangeArr) {
    const currenciesItemElement = createCurrencyRateElement(
      currencyExchangeItem.item,
    );
    currenciesList.append(currenciesItemElement);
  }
}
