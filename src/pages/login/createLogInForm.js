export function createLogInForm() {
  const form = document.createElement('form');
  const usernameInputBox = document.createElement('div');
  const usernameLabel = document.createElement('label');
  const usernameInput = document.createElement('input');

  const passwordInputBox = document.createElement('div');
  const passwordLabel = document.createElement('label');
  const passwordInput = document.createElement('input');
  const enterBtn = document.createElement('button');

  form.classList.add('form', 'login__form');
  enterBtn.classList.add('btn-reset', 'btn', 'login__btn');

  usernameInputBox.classList.add(
    'form__wrapper',
    'login__form-wrapper',
    'flex',
  );
  usernameLabel.classList.add('form__label', 'login__label', 'flex');
  usernameInput.classList.add('form__input', 'login__input', 'input-username');

  passwordInputBox.classList.add(
    'form__wrapper',
    'login__form-wrapper',
    'flex',
  );
  passwordLabel.classList.add('form__label', 'login__label', 'flex');
  passwordInput.classList.add('form__input', 'login__input', 'input-password');

  usernameLabel.textContent = 'Логин';
  passwordLabel.textContent = 'Пароль';
  enterBtn.textContent = 'Войти';

  usernameInput.dataset.id = 'username';
  passwordInput.dataset.id = 'password';

  usernameLabel.for = 'username';
  usernameInput.name = 'username';
  usernameInput.placeholder = 'Placeholder';
  passwordLabel.for = 'password';
  passwordInput.name = 'password';
  passwordInput.placeholder = 'Placeholder';
  passwordInput.type = 'password';
  enterBtn.type = 'submit';

  enterBtn.disabled = true;

  usernameInputBox.append(usernameLabel, usernameInput);
  passwordInputBox.append(passwordLabel, passwordInput);
  form.append(usernameInputBox, passwordInputBox, enterBtn);

  return {
    form,
    usernameInput,
    passwordInput,
    enterBtn,
  };
}
