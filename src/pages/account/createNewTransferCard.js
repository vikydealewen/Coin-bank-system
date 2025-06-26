export function createAccountNewTransferCard() {
  const newTransferCard = document.createElement('div');
  const cardTitle = document.createElement('h3');
  const newTransferCardForm = document.createElement('form');
  const sendBtn = document.createElement('button');
  const envelopeSvg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  );
  const useElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'use',
  );

  const accountRecipientInputBox = document.createElement('div');
  const accountRecipientLabel = document.createElement('label');
  const accountRecipientInput = document.createElement('input');

  const transferAmountInputBox = document.createElement('div');
  const transferAmountLabel = document.createElement('label');
  const transferAmountInput = document.createElement('input');

  newTransferCard.classList.add(
    'section__card',
    'section__card-dark',
    'account-main__card',
    'account-main__transfer',
    'transfer',
  );
  cardTitle.classList.add(
    'section__card-title',
    'account-main__card-title',
    'transfer__title',
  );
  newTransferCardForm.classList.add(
    'account-main__form',
    'transfer__form',
    'form',
  );
  newTransferCardForm.id = 'account-transfer-form';
  sendBtn.classList.add(
    'btn',
    'btn-reset',
    'account-main__form-btn',
    'transfer__form-btn',
    'flex',
  );
  envelopeSvg.classList.add('btn__svg', 'envelope-svg');
  useElement.setAttribute('href', `/images/sprite.svg#envelope`);
  useElement.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    `/images/sprite.svg#envelope`,
  );

  accountRecipientInputBox.classList.add(
    'account-main__form-box',
    'transfer__form-box',
    'flex',
  );
  accountRecipientLabel.classList.add(
    'account-main__form-label',
    'transfer__form-label',
    'form__label',
  );
  accountRecipientInput.classList.add(
    'account-main__form-input',
    'transfer__form-input',
    'form__input',
  );

  transferAmountInputBox.classList.add(
    'account-main__form-box',
    'transfer__form-box',
    'flex',
  );
  transferAmountLabel.classList.add(
    'account-main__form-label',
    'transfer__form-label',
    'form__label',
  );
  transferAmountInput.classList.add(
    'account-main__form-input',
    'transfer__form-input',
    'form__input',
  );

  cardTitle.textContent = 'Новый перевод';
  accountRecipientLabel.textContent = 'Номер счёта получателя';
  transferAmountLabel.textContent = 'Сумма перевода';
  sendBtn.textContent = 'Отправить';

  accountRecipientInput.dataset.id = 'recipient-account';
  transferAmountInput.dataset.id = 'transfer-amount';

  accountRecipientLabel.for = 'account-number';
  accountRecipientInput.name = 'account-number';
  accountRecipientInput.placeholder = 'Placeholder';
  accountRecipientInput.autocomplete = 'cc-name';
  transferAmountLabel.for = 'amount';
  transferAmountInput.name = 'amount';
  transferAmountInput.placeholder = 'Placeholder';
  sendBtn.type = 'submit';
  sendBtn.disabled = true;
  sendBtn.id = 'send-btn';

  newTransferCardForm.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT') {
      const errorElement = e.target.nextElementSibling;

      if (errorElement && errorElement.classList.contains('form__error-msg')) {
        errorElement.remove();
      }

      e.target.classList.remove('is-invalid');
    }

    if (
      accountRecipientInput.value !== '' &&
      transferAmountInput.value !== ''
    ) {
      sendBtn.disabled = false;
    } else {
      sendBtn.disabled = true;
    }
  });

  accountRecipientInputBox.append(accountRecipientLabel, accountRecipientInput);
  transferAmountInputBox.append(transferAmountLabel, transferAmountInput);
  envelopeSvg.appendChild(useElement);
  sendBtn.prepend(envelopeSvg);

  newTransferCardForm.append(
    accountRecipientInputBox,
    transferAmountInputBox,
    sendBtn,
  );
  newTransferCard.append(cardTitle, newTransferCardForm);

  return {
    newTransferCard,
    newTransferCardForm,
  };
}
