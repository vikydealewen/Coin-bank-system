import { router } from '../../main';

export function createAccountSectionTop(data, sectionClass) {
  const accountWrapperTop = document.createElement('div');
  const accountWrapperTopTitle = document.createElement('div');
  const accountWrapperTopSubtitle = document.createElement('div');
  const title = document.createElement('h1');
  const accountNumber = document.createElement('h2');

  accountWrapperTop.classList.add(`${sectionClass}__top`, 'account__top');
  accountWrapperTopTitle.classList.add(
    `${sectionClass}__top-title`,
    'account__top-title',
    'flex',
  );
  accountWrapperTopSubtitle.classList.add(
    `${sectionClass}__top-subtitle`,
    'account__top-subtitle',
    'flex',
  );
  title.classList.add('section__title', `${sectionClass}__title`);
  accountNumber.classList.add('section__subtitle', `${sectionClass}__subtitle`);

  if (sectionClass == 'account-main') {
    title.textContent = 'Просмотр счёта';
  } else {
    title.textContent = 'История баланса';
  }

  accountNumber.textContent = `№ ${data.account}`;

  const btnBack = document.createElement('a');
  const arrowBackSvg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  );
  const useElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'use',
  );
  const balanceWrapper = document.createElement('div');
  const balanceText = document.createElement('h3');
  const balanceInfo = document.createElement('p');

  btnBack.classList.add(
    'btn-reset',
    'btn',
    'account__btn',
    'account__btn-back',
    `${sectionClass}__btn`,
    `${sectionClass}__btn-back`,
    'flex',
  );
  arrowBackSvg.classList.add('btn__svg', 'arrow-back');
  useElement.setAttribute('href', `/images/sprite.svg#arrow-back`);
  useElement.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    `/images/sprite.svg#arrow-back`,
  );

  balanceWrapper.classList.add(
    `${sectionClass}__balance`,
    'account__balance',
    'flex',
  );
  balanceText.classList.add(
    'account__balance-text',
    `${sectionClass}__balance-text`,
  );
  balanceInfo.classList.add(
    'account__balance-info',
    `${sectionClass}__balance-info`,
  );
  balanceInfo.id = 'account-balance';

  btnBack.textContent = 'Вернуться назад';
  balanceText.textContent = 'Баланс';
  balanceInfo.textContent = `${data.balance} ₽`;
  btnBack.dataset.navigo = '';

  if (sectionClass == 'account-main') {
    btnBack.href = `/accounts`;
  } else {
    btnBack.href = `/accounts/${data.account}`;
  }

  btnBack.addEventListener('click', (e) => {
    const href = e.target.getAttribute('href');
    e.preventDefault();
    router.navigate(href);
  });

  balanceWrapper.append(balanceText, balanceInfo);
  arrowBackSvg.appendChild(useElement);
  btnBack.prepend(arrowBackSvg);
  accountWrapperTopTitle.append(title, btnBack);
  accountWrapperTopSubtitle.append(accountNumber, balanceWrapper);
  accountWrapperTop.append(accountWrapperTopTitle, accountWrapperTopSubtitle);

  return accountWrapperTop;
}
