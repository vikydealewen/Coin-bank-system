import '../../../styles/components/history.scss';
import { createAccountSection } from '../createAccountSection';
import { getAccount } from '../../../modules/api';
import { createAccountBalanceDynamicsCard } from '../createBalanceDynamicsCard';
import { createAccountTransitionHistoryCard } from '../createHistoryTransitionCard';
import { createTransactionsRatioCard } from './createTransactionsRatioCard';

function renderAccountHistoryPage(accountData) {
  const main = document.getElementById('main');
  main.innerHTML = '';

  const chartMonths = 12;
  const tableLength = 25;
  const sectionClass = 'detail-history';

  const section = createAccountSection(accountData, sectionClass);
  const detailHistorySection = section.accountSection;
  const detailHistoryContainer = section.container;

  const detailHistoryBottom = document.createElement('div');
  const { accountBalanceDynamicsCard, balanceDynamicsChart } =
    createAccountBalanceDynamicsCard(accountData, chartMonths, sectionClass);

  const detailHistoryTransitionRatioCard = createTransactionsRatioCard(
    accountData,
    chartMonths,
    sectionClass,
  );

  const detailHistoryTransitionHistoryCard = createAccountTransitionHistoryCard(
    accountData,
    tableLength,
    sectionClass,
  );

  detailHistoryBottom.classList.add(
    `${sectionClass}__wrapper`,
    `${sectionClass}__bottom`,
    'account__wrapper',
    'account__bottom',
    'grid',
  );

  detailHistoryBottom.append(
    accountBalanceDynamicsCard,
    detailHistoryTransitionRatioCard,
    detailHistoryTransitionHistoryCard,
  );

  detailHistoryContainer.append(detailHistoryBottom);
  main.append(detailHistorySection);
}

export async function initAccountHistoryPage(id) {
  const token = sessionStorage.getItem('token');
  let accountData = await getAccount(token, id);

  renderAccountHistoryPage(accountData, token);

  //Запрос данных через определенные промежутки времени для обновления информации на странице(альтернатива websocket)
  setInterval(async () => {
    console.log('запрос');
    accountData = await getAccount(token, id);
    renderAccountHistoryPage(accountData, token);
  }, 1200000);
}
