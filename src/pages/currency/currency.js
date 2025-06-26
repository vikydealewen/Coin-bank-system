import '../../styles/components/currency.scss';
import {
  getAccountCurrencies,
  getChangedCurrency,
  exchangeCurrency,
} from '../../modules/api';
import {
  tokenUtils,
  accountCurrenciesDataUtils,
} from '../../modules/sessionStorageUtils';
import { createCurrencyRateElement } from './currencyRate';
import { createCurrencySection } from './createCurrencySection';
import {
  validateExchangeAmount,
  validateForm,
} from '../../modules/validateForm';
import { currencyRateUtils } from '../../modules/sessionStorageUtils';
import { updateAccountCurrenciesList } from './currencyAccount';
import { toggleSpinner } from '../../modules/toggleSpinnerOnBtn';
import { clearErrorMessage, showErrorMessage } from '../../modules/createError';

const websocket = await getChangedCurrency();

async function subscribeOnWebsocket(socket) {
  const currencyRateList = document.getElementById('currency-rate-list');
  let currencyRateData;

  //Подписываемся на события вебсокет и отрисовываем из sessionStorage список валют
  socket.onopen = function () {
    console.log('Соединение установлено');
  };

  socket.onerror = function (error) {
    throw new Error('Ошибка WebSocket:', error);
  };

  socket.onclose = function (event) {
    console.log('Соединение закрыто:', event.code, event.reason);
  };

  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    currencyRateData = data;

    let currenciesExchangeArr = currencyRateUtils.getCurrencyRateList();

    if (currenciesExchangeArr.length == 21) {
      currenciesExchangeArr.splice(0, 1);
      currencyRateUtils.saveCurrencyRateList(currenciesExchangeArr);

      const lastItem = currencyRateList.lastElementChild;
      if (lastItem) {
        lastItem.remove();
      }
    }

    currencyRateUtils.createCurrencyRateItemLocal({
      item: currencyRateData,
    });

    const newItemElement = createCurrencyRateElement(currencyRateData);
    currencyRateList.insertBefore(newItemElement, currencyRateList.firstChild);
  };
}

async function renderCurrencyPage(token) {
  const main = document.getElementById('main');
  main.innerHTML = '';

  let accountCurrenciesData = accountCurrenciesDataUtils.getLocalAccountData();

  const currencySection = createCurrencySection(accountCurrenciesData);

  main.append(currencySection);

  try {
    subscribeOnWebsocket(websocket);
  } catch (error) {
    throw new Error(error);
  }

  const currencyExchangeForm = document.getElementById(
    'currency-exchange-form',
  );

  //Перевод валюты между счетами
  currencyExchangeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currencyExchangeCard = document.getElementById(
      'currency__exchange-card',
    );

    clearErrorMessage(currencyExchangeCard, 'exchange-error');

    const amountInput = document.querySelector('input');
    const selectFrom = document.getElementById('exchange-select-from');
    const selectTo = document.getElementById('exchange-select-to');
    const exchangeBtn = document.getElementById('exchange-btn');

    const inputType = amountInput.dataset.id;
    const codeFrom = selectFrom.value;
    const codeTo = selectTo.value;

    if (inputType == 'exchange-amount') {
      validateExchangeAmount(amountInput, codeFrom);
    }

    if (validateForm(currencyExchangeForm) == true) {
      toggleSpinner(exchangeBtn, true, true, 'Обмен');

      try {
        const newAccountCurrenciesData = await exchangeCurrency(
          token,
          codeFrom,
          codeTo,
          amountInput.value.trim(),
        );

        accountCurrenciesDataUtils.setLocalAccountData(
          newAccountCurrenciesData,
        );

        updateAccountCurrenciesList(newAccountCurrenciesData);
        amountInput.value = '';
      } catch (error) {
        showErrorMessage(
          currencyExchangeCard,
          error.message,
          'exchange-error',
          'error-message__sm',
        );
      } finally {
        toggleSpinner(exchangeBtn, false, true);
      }
    }
  });
}

export async function initCurrencyPage() {
  const token = tokenUtils.getToken();
  const accountCurrenciesData = await getAccountCurrencies(token);

  accountCurrenciesDataUtils.setLocalAccountData(accountCurrenciesData);

  await renderCurrencyPage(token);
}
