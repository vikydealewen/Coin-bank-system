import './styles/common.scss';
import './styles/components/header.scss';

import Navigo from 'navigo';
import { routes } from './modules/routes';
import { tokenUtils } from './modules/sessionStorageUtils';
import { createHeader } from './components/header';

export const router = new Navigo('/', { hash: false });

// Регистрация маршрутов
routes(router).forEach(({ path, handler }) => {
  router.on(path, handler);
});

router.notFound(() => {
  router.navigate('/login');
});

router.hooks({
  before: (done, match) => {
    if (match.url === '/' || match.url === '/login') {
      done();
      return;
    }

    if (tokenUtils.isAuthenticated()) {
      done();
    } else {
      done(false);
      router.navigate('/login');
    }
  },
});

//Для начальной загрузки страницы
const initializeApp = () => {
  const currentPath = window.location.pathname;

  // Создаем header заранее с правильной видимостью навигации
  const isLoginPage =
    currentPath === '/login' ||
    (!tokenUtils.isAuthenticated() && currentPath !== '/logout');
  createHeader(false);

  // Определение начального маршрута
  if (currentPath === '/' || currentPath === '/main.html') {
    const targetRoute = tokenUtils.isAuthenticated() ? '/accounts' : '/login';
    router.navigate(targetRoute);
  } else {
    router.navigate(currentPath);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  router.resolve();
});
