import {
  accountDataUtils,
  accountCurrenciesDataUtils,
} from './sessionStorageUtils';

function validateField(
  input,
  validationFunc,
  errorMessage = 'Некорректное значение',
) {
  if (input.value === '') {
    input.classList.remove('is-invalid', 'is-valid');
    return false;
  }

  if (validationFunc(input.value)) {
    setValid(input);
    return true;
  } else {
    setInvalid(input, errorMessage);
    return false;
  }
}

export function validateUsername(input) {
  return validateField(
    input,
    (value) => {
      return value.length >= 6 ? true : false;
    },
    'Недостаточно символов',
  );
}

export function validatePassword(input) {
  return validateField(
    input,
    (value) => {
      return value.length >= 6 ? true : false;
    },
    'Недостаточно символов',
  );
}

export function validateAccountNumber(input) {
  return validateField(
    input,
    (value) => {
      return value.length > 12 ? true : false;
    },
    'Слишком короткий номер счета получателя',
  );
}

export function validateTransferAmount(input) {
  let accountData = accountDataUtils.getLocalAccountData();

  let balance = accountData.balance;

  if (input.value === '') {
    input.classList.remove('is-invalid', 'is-valid');
    return false;
  }

  const value = Number(input.value);

  if (value <= 0) {
    setInvalid(input, 'Указана отрицательная сумма');
    return false;
  } else if (value > balance) {
    setInvalid(input, 'Сумма для перевода превышает баланс счета');
    return false;
  } else {
    setValid(input);
    return true;
  }
}

export function validateExchangeAmount(input, key) {
  let accountCurrenciesData = accountCurrenciesDataUtils.getLocalAccountData();

  if (input.value === '') {
    input.classList.remove('is-invalid', 'is-valid');
    return false;
  }

  const value = Number(input.value);
  const availableAmount = accountCurrenciesData[key].amount;

  if (value <= 0) {
    setInvalid(input, 'Указана отрицательная сумма');
    return false;
  } else if (value > availableAmount) {
    setInvalid(input, 'Сумма для обмена превышает доступное количество');
    return false;
  } else {
    setValid(input);
    return true;
  }
}

export function setValid(input) {
  input.classList.add('is-valid');
  input.classList.remove('is-invalid');

  const errorElement = input.nextElementSibling;
  if (errorElement && errorElement.classList.contains('form__error-msg')) {
    errorElement.remove();
  }
}

export function setInvalid(input, message) {
  input.classList.add('is-invalid');
  input.classList.remove('is-valid');

  let errorElement = input.nextElementSibling;
  if (errorElement && errorElement.classList.contains('form__error-msg')) {
    errorElement.textContent = message;
  } else {
    errorElement = document.createElement('span');
    errorElement.classList.add('form__error-msg');
    errorElement.textContent = message;
    input.insertAdjacentElement('afterend', errorElement);
  }
}

export function validateForm(form) {
  const inputs = form.querySelectorAll('input');

  let allValid = true;

  inputs.forEach((input) => {
    if (!input.classList.contains('is-valid') || input.value.trim() === '') {
      allValid = false;
    }
  });

  return allValid;
}
