import { createCustomSelect } from '../../components/createCustomSelect';

export function createCurrencyExchangeCard() {
  const currencyExchangeCard = document.createElement('div');
  const cardTitle = document.createElement('h3');

  currencyExchangeCard.classList.add(
    'section__card',
    'section__card-light',
    'currency__exchange',
    'currency__card',
    'exchange',
  );

  currencyExchangeCard.id = 'currency__exchange-card';

  cardTitle.classList.add(
    'section__card-title',
    'currency__card-title',
    'account__card-title',
  );
  cardTitle.textContent = 'Обмен валюты';
  const currencyExchangeForm = createCurrencyExchangeForm();

  currencyExchangeCard.append(cardTitle, currencyExchangeForm);

  return currencyExchangeCard;
}

function createCurrencyExchangeForm() {
  const currencyExchangeForm = document.createElement('form');
  const currencyExchangeBtn = document.createElement('button');

  const currencyExchangeWrapperLeft = document.createElement('div');
  const currencyExchangeWrapperTop = document.createElement('div');
  const currencyExchangeLabelFrom = document.createElement('label');
  const currencyExchangeSelectFrom = document.createElement('select');
  const currencyExchangeLabelTo = document.createElement('label');
  const currencyExchangeSelectTo = document.createElement('select');
  const currencyExchangeWrapperBottom = document.createElement('div');
  const currencyExchangeLabelAmount = document.createElement('label');
  const currencyExchangeInputAmount = document.createElement('input');

  currencyExchangeForm.id = 'currency-exchange-form';
  currencyExchangeForm.classList.add('exchange__form', 'flex', 'form');
  currencyExchangeBtn.classList.add(
    'btn',
    'btn-reset',
    'exchange__form-btn',
    'flex',
  );
  currencyExchangeWrapperLeft.classList.add('exchange__left');
  currencyExchangeWrapperTop.classList.add('exchange__left-top', 'flex');
  currencyExchangeLabelFrom.classList.add(
    'exchange__form-label',
    'exchange__label',
    'form__label',
    'exchange__label-from',
  );
  currencyExchangeSelectFrom.classList.add(
    'exchange__form-select',
    'exchange__select',
    'form__select',
    'exchange__select-from',
  );
  currencyExchangeLabelTo.classList.add(
    'exchange__form-label',
    'exchange__label',
    'form__label',
    'exchange__label-from',
  );
  currencyExchangeSelectTo.classList.add(
    'exchange__form-select',
    'exchange__select',
    'form__select',
    'exchange__select-from',
  );
  currencyExchangeWrapperBottom.classList.add('exchange__left-bottom', 'flex');
  currencyExchangeLabelAmount.classList.add(
    'exchange__form-label',
    'exchange__label',
    'form__label',
    'exchange__label-amount',
  );
  currencyExchangeInputAmount.classList.add(
    'exchange__form-input',
    'exchange__input',
    'form__input',
    'exchange__input-amount',
  );

  currencyExchangeLabelFrom.textContent = 'Из';
  currencyExchangeLabelTo.textContent = 'в';
  currencyExchangeLabelAmount.textContent = 'Сумма';
  currencyExchangeBtn.textContent = 'Обменять';
  currencyExchangeBtn.disabled = true;

  currencyExchangeInputAmount.dataset.id = 'exchange-amount';
  currencyExchangeSelectFrom.id = 'exchange-select-from';
  currencyExchangeSelectTo.id = 'exchange-select-to';
  currencyExchangeBtn.id = 'exchange-btn';

  currencyExchangeBtn.type = 'submit';

  const options = [
    'AUD',
    'BTC',
    'BYR',
    'CAD',
    'CHF',
    'CNH',
    'ETH',
    'EUR',
    'GBP',
    'HKD',
    'JPY',
    'NZD',
    'RUB',
    'UAH',
    'USD',
  ];

  options.forEach((option) => {
    const item = document.createElement('option');
    item.textContent = option;
    item.classList.add('exchange__select-option');
    currencyExchangeSelectFrom.append(item);
    //копирование элемента и вставка в другой селект
    currencyExchangeSelectTo.append(item.cloneNode(true));
  });

  currencyExchangeWrapperTop.append(
    currencyExchangeLabelFrom,
    currencyExchangeSelectFrom,
    currencyExchangeLabelTo,
    currencyExchangeSelectTo,
  );
  currencyExchangeWrapperBottom.append(
    currencyExchangeLabelAmount,
    currencyExchangeInputAmount,
  );
  currencyExchangeWrapperLeft.append(
    currencyExchangeWrapperTop,
    currencyExchangeWrapperBottom,
  );
  currencyExchangeForm.append(currencyExchangeWrapperLeft, currencyExchangeBtn);

  createCustomSelect(currencyExchangeSelectFrom, '', 'currency-select', 'from');
  createCustomSelect(currencyExchangeSelectTo, '', 'currency-select');

  currencyExchangeInputAmount.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT') {
      const errorElement = e.target.nextElementSibling;

      if (errorElement && errorElement.classList.contains('form__error-msg')) {
        errorElement.remove();
      }

      e.target.classList.remove('is-invalid');
    }

    if (currencyExchangeInputAmount.value !== '') {
      currencyExchangeBtn.disabled = false;
    } else {
      currencyExchangeBtn.disabled = true;
    }
  });

  return currencyExchangeForm;
}
