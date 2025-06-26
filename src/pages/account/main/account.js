import '../../../styles/components/account-main.scss';
import { getAccount } from '../../../modules/api';
import {
  tokenUtils,
  accountDataUtils,
} from '../../../modules/sessionStorageUtils';
import { createAccountSection } from '../createAccountSection';
import { createAccountNewTransferCard } from '../createNewTransferCard';
import { createAccountTransitionHistoryCard } from '../createHistoryTransitionCard';
import { createAccountBalanceDynamicsCard } from '../createBalanceDynamicsCard';
import {
  validateForm,
  validateAccountNumber,
  validateTransferAmount,
} from '../../../modules/validateForm';
import { transferFunds } from '../../../modules/api';
import { toggleSpinner } from '../../../modules/toggleSpinnerOnBtn';
import {
  clearErrorMessage,
  showErrorMessage,
} from '../../../modules/createError';
import { updateBalanceChart } from '../../../components/chartSettings';
import { updateTableBodyWithoutPagination } from './createHistoryTableBodyWithoutPagination';

async function renderAccountPage(token) {
  let accountData = accountDataUtils.getLocalAccountData();

  const main = document.getElementById('main');
  main.innerHTML = '';

  const chartMonths = 6;
  const tableLength = 10;
  const sectionClass = 'account-main';

  const section = createAccountSection(accountData, sectionClass);
  const accountSection = section.accountSection;
  const accountContainer = section.container;

  const accountWrapperBottom = document.createElement('div');
  const { newTransferCard, newTransferCardForm } =
    createAccountNewTransferCard();
  const { accountBalanceDynamicsCard, balanceDynamicsChart } =
    createAccountBalanceDynamicsCard(accountData, chartMonths, sectionClass);

  const accountTransitionHistoryCard = createAccountTransitionHistoryCard(
    accountData,
    tableLength,
    sectionClass,
  );

  accountWrapperBottom.classList.add('account-main__bottom', 'grid');

  accountWrapperBottom.append(
    newTransferCard,
    accountBalanceDynamicsCard,
    accountTransitionHistoryCard,
  );

  accountContainer.append(accountWrapperBottom);
  main.append(accountSection);

  newTransferCardForm.addEventListener(
    'submit',
    async (e) => {
      e.preventDefault();
      clearErrorMessage(newTransferCard, 'transfer-error');

      const inputs = document.querySelectorAll('input');
      const sendBtn = document.getElementById('send-btn');

      inputs.forEach((input) => {
        const inputType = input.dataset.id;

        if (inputType == 'recipient-account') {
          console.log(input.value);
          validateAccountNumber(input);
        }

        if (inputType == 'transfer-amount') {
          validateTransferAmount(input);
        }
      });

      if (validateForm(newTransferCardForm) == true) {
        toggleSpinner(sendBtn, true, true, 'Перевод');

        try {
          const result = await transferFunds(
            token,
            accountData.account,
            inputs[0],
            inputs[1],
          );

          const newData = result.data;
          sessionStorage.setItem('localAccountData', JSON.stringify(newData));

          inputs[0].value = '';
          inputs[1].value = '';

          //обновляем график
          updateBalanceChart(newData, balanceDynamicsChart, chartMonths);

          //обновляем таблицу
          updateTableBodyWithoutPagination(newData, tableLength);

          //обновляем баланс
          const balance = document.getElementById('account-balance');
          balance.textContent = `${newData.balance} ₽`;
        } catch (error) {
          console.log(error);
          showErrorMessage(
            newTransferCard,
            'Неверный счет получателя',
            'transfer-error',
            'error-message__sm',
          );
        } finally {
          toggleSpinner(sendBtn, false, true);
        }
      }
    },
    true,
  );
}

export async function initAccountPage(id) {
  const token = tokenUtils.getToken();
  let accountData = await getAccount(token, id);

  accountDataUtils.setLocalAccountData(accountData);

  await renderAccountPage(token);

  //Запрос данных через определенные промежутки времени для обновления информации на странице(альтернатива websocket)
  setInterval(async () => {
    console.log('запрос');
    accountData = await getAccount(token, id);
    accountDataUtils.setLocalAccountData(accountData);

    await renderAccountPage(token);
  }, 1200000);
}
