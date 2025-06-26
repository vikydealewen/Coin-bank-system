import { toggleNavigation } from '../components/header';
import { renderLoginPage } from '../pages/login/login';
import { initAccountsPage } from '../pages/accounts/accounts';
import { initAccountPage } from '../pages/account/main/account';
import { initAccountHistoryPage } from '../pages/account/history/history';
import { initCurrencyPage } from '../pages/currency/currency';
import { renderAtmsPage } from '../pages/atms/atms';
import { updateActiveNavLink } from './updateHeaderLinks';
import {
  tokenUtils,
  accountDataUtils,
  accountCurrenciesDataUtils,
  currencyRateUtils,
} from './sessionStorageUtils';

const main = document.getElementById('main');
const loader = document.getElementById('loader');

const getRouteFromUrl = (url) => {
  const routeMap = {
    '/accounts': 'accounts',
    '/currency': 'currency',
    '/atms': 'atms',
  };

  return Object.keys(routeMap).find((route) => url.startsWith(route))
    ? routeMap[Object.keys(routeMap).find((route) => url.startsWith(route))]
    : null;
};

//Подсвечивание кнопок навигации
const updateNavigation = (url) => {
  if (url === '/login') return;

  const currentRoute = getRouteFromUrl(url);
  if (currentRoute) {
    updateActiveNavLink(currentRoute);
  }
};

const protectedRoute = (handler, route, router) => async (params) => {
  try {
    loader.style.display = '';

    //защита от ввода ссылки в адресную строку вручную
    if (!tokenUtils.isAuthenticated()) {
      router.navigate('/login');
      return;
    }

    toggleNavigation(true);
    updateNavigation(route);
    await handler(params);
  } catch (error) {
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('error-message__bg');
    errorMsg.textContent = error.message;
    main.prepend(errorMsg);
  } finally {
    setTimeout(() => {
      loader.style.display = 'none';
    }, 300);
  }
};

export const routes = (router) => [
  {
    path: '/',
    handler: () => {},
    protected: false,
  },
  {
    path: '/login',
    handler: async () => {
      if (tokenUtils.isAuthenticated()) {
        router.navigate('/accounts');
        return;
      }

      try {
        loader.style.display = '';
        await renderLoginPage(router);
      } catch (error) {
        console.log(error);
      } finally {
        loader.style.display = 'none';
      }
    },
    protected: false,
  },
  {
    path: '/accounts',
    handler: protectedRoute(initAccountsPage, '/accounts', router),
    protected: true,
  },
  {
    path: '/accounts/:id',
    handler: protectedRoute(
      ({ data: { id } }) => initAccountPage(id),
      '/accounts',
    ),
    protected: true,
  },
  {
    path: '/accounts/:id/history',
    handler: protectedRoute(
      ({ data: { id } }) => initAccountHistoryPage(id),
      '/accounts',
    ),
    protected: true,
  },
  {
    path: '/currency',
    handler: protectedRoute(initCurrencyPage, '/currency', router),
    protected: true,
  },
  {
    path: '/atms',
    handler: protectedRoute(renderAtmsPage, '/atms', router),
    protected: true,
  },
  {
    path: '/logout',
    handler: () => {
      tokenUtils.removeToken();
      accountDataUtils.removeLocalAccountData();
      accountCurrenciesDataUtils.removeLocalAccountData();
      currencyRateUtils.removeCurrencyRateList();
      toggleNavigation(false);
      router.navigate('/login');
    },
    protected: false,
  },
];
