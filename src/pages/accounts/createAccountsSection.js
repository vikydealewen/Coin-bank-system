import { createCustomSelect } from '../../components/createCustomSelect';

export function createAccountsSection() {
  const section = document.createElement('section');
  const sectionContainer = document.createElement('div');
  const top = document.createElement('div');
  const sectionTitle = document.createElement('h1');
  const selectSort = document.createElement('select');
  const addAccountBtn = document.createElement('button');
  const plusSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const useElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'use',
  );

  const options = [
    { account: 'По номеру' },
    { balance: 'По балансу' },
    { transactions: 'По последней транзакции' },
  ];

  options.forEach((option) => {
    const item = document.createElement('option');

    for (const key in option) {
      item.textContent = `${option[key]}`;
      item.value = `${key}`;
    }

    item.classList.add('select__option');

    selectSort.append(item);
  });

  section.classList.add('section', 'accounts');
  sectionContainer.classList.add('container', 'accounts__container');
  top.classList.add('section__top', 'accounts__top', 'flex', 'top');
  sectionTitle.classList.add('section__title', 'accounts__title');
  selectSort.classList.add('accounts__select', 'select', 'select-default');
  addAccountBtn.classList.add(
    'btn',
    'add-btn',
    'top__btn',
    'btn-reset',
    'flex',
  );
  addAccountBtn.id = 'add-btn';

  plusSvg.classList.add('btn__svg', 'plus');
  useElement.setAttribute('href', `/images/sprite.svg#plus`);
  useElement.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    `/images/sprite.svg#plus`,
  );

  sectionTitle.textContent = 'Ваши счета';
  addAccountBtn.textContent = 'Создать новый счет';

  plusSvg.appendChild(useElement);
  addAccountBtn.prepend(plusSvg);
  top.append(sectionTitle, selectSort, addAccountBtn);
  sectionContainer.append(top);
  section.append(sectionContainer);

  createCustomSelect(selectSort, 'Сортировка', 'sort-select');

  return { section, sectionContainer, addAccountBtn, selectSort };
}
