let isHeaderInitialized = false;
let menu = null;

export function createHeader(nav) {
  const header = document.getElementById('header');

  // Если header еще не инициализирован, создаем его полностью
  if (!isHeaderInitialized) {
    initializeHeader(header);
    isHeaderInitialized = true;
  }

  // Управляем видимостью навигации
  toggleNavigation(nav);

  return header;
}

function initializeHeader(header) {
  header.innerHTML = '';

  const headerContainer = document.createElement('div');
  const logo = document.createElement('a');
  const logoSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const useElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'use',
  );

  headerContainer.classList.add('container', 'header__container', 'flex');
  headerContainer.id = 'header-container';
  logo.classList.add('logo', 'header__logo');

  logoSVG.classList.add('logo__img');
  useElement.setAttribute('href', '/images/sprite.svg#logo');
  useElement.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    '/images/sprite.svg#logo',
  );

  logoSVG.appendChild(useElement);
  logo.append(logoSVG);
  headerContainer.prepend(logo);
  header.append(headerContainer);
}

function createHeaderNav() {
  const navList = document.createElement('nav');
  const menuList = document.createElement('ul');
  const menuItems = [
    { text: 'Банкоматы', href: '/atms', route: 'atms' },
    { text: 'Счета', href: '/accounts', route: 'accounts' },
    { text: 'Валюта', href: '/currency', route: 'currency' },
    { text: 'Выйти', href: '/logout', route: 'logout' },
  ];

  menuItems.forEach((item) => {
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');

    navItem.classList.add('nav__item');
    navLink.classList.add('nav__link');
    navLink.textContent = item.text;
    navLink.href = item.href;
    navLink.dataset.navigo = '';
    navLink.dataset.route = item.route;

    navItem.append(navLink);
    menuList.append(navItem);
  });

  menuList.classList.add('list-reset', 'nav__list', 'flex');
  navList.classList.add('header__nav', 'nav');
  navList.append(menuList);

  return navList;
}

export function toggleNavigation(show) {
  const headerContainer = document.getElementById('header-container');

  if (!headerContainer) return;

  if (show && !menu) {
    menu = createHeaderNav();
    headerContainer.append(menu);
  } else if (!show && menu) {
    menu.remove();
    menu = null;
  }
}
