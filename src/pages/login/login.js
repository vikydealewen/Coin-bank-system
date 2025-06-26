import '../../styles/components/header.scss';
import '../../styles/components/login.scss';
import { validateUsername, validatePassword } from '../../modules/validateForm';
import { createLogInForm } from './createLogInForm';
import { logIn } from '../../modules/api';
import { clearErrorMessage, showErrorMessage } from '../../modules/createError';

async function renderLoginPage(router) {
  const main = document.getElementById('main');
  main.innerHTML = '';

  const loginSection = document.createElement('section');
  const loginContainer = document.createElement('div');
  const blockCenter = document.createElement('div');
  const title = document.createElement('h1');
  const formElements = createLogInForm();
  const form = formElements.form;
  const usernameInput = formElements.usernameInput;
  const passwordInput = formElements.passwordInput;
  const enterBtn = formElements.enterBtn;

  loginSection.classList.add('section', 'login', 'flex');
  loginContainer.classList.add('login__container');

  blockCenter.classList.add('login__center', 'flex');
  title.classList.add('login__title', 'section__title');

  title.textContent = 'Вход в аккаунт';

  blockCenter.append(title, form);
  loginContainer.append(blockCenter);
  loginSection.append(loginContainer);
  main.append(loginSection);

  form.addEventListener(
    'blur',
    (e) => {
      if (e.target.tagName === 'INPUT') {
        const input = e.target;
        const inputType = input.dataset.id;

        switch (inputType) {
          case 'username':
            validateUsername(input);
            break;
          case 'password':
            validatePassword(input);
            break;
          default:
            console.log('Тип валидации не указан или неизвестен');
        }
      }
    },
    true,
  );

  form.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT') {
      const errorElement = e.target.nextElementSibling;

      clearErrorMessage(blockCenter, 'login-error');

      if (errorElement && errorElement.classList.contains('form__error-msg')) {
        errorElement.remove();
      }

      e.target.classList.remove('is-invalid');

      if (usernameInput.value == '' || passwordInput.value == '') {
        enterBtn.disabled = true;
      } else {
        enterBtn.disabled = false;
      }
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    clearErrorMessage(blockCenter, 'login-error');

    let response = await logIn(usernameInput, passwordInput);

    if (response.payload) {
      sessionStorage.setItem('token', response.payload.token);
      router.navigate('/accounts');
    }

    let errorMsg;

    if (response.error) {
      if (response.error === 'No such user') {
        errorMsg = 'Пользователя с таким логином не существует!';
      } else {
        errorMsg = 'Введен неверный пароль!';
      }

      showErrorMessage(
        blockCenter,
        errorMsg,
        'login-error',
        'error-message__sm',
      );
    }
  });
}

export { renderLoginPage };
