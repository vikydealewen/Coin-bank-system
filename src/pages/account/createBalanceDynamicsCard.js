import { getBalanceDynamics } from './getBalanceDynamics';
import { createBalanceDynamicsBarChart } from './createBalanceDynamicsBarChart';
import { router } from '../../main';

export function createAccountBalanceDynamicsCard(
  data,
  totalMonths,
  sectionClass,
) {
  const accountBalanceDynamicsCard = document.createElement('div');
  let cardTitle;
  sectionClass == 'account-main'
    ? (cardTitle = document.createElement('a'))
    : (cardTitle = document.createElement('h3'));
  const balanceDynamicsChartContainer = document.createElement('div');
  const chartContainer = document.createElement('canvas');

  const accountId = data.account;

  accountBalanceDynamicsCard.classList.add(
    'section__card',
    'section__card-light',
    'account__balance-dynamics',
    `${sectionClass}__balance-dynamics`,
    `${sectionClass}__card-chart`,
    'balance-dynamics',
  );

  cardTitle.classList.add(
    'section__card-title',
    `${sectionClass}__card-title`,
    'balance-dynamics__title',
  );

  if (sectionClass == 'account-main') {
    cardTitle.href = `/accounts/${accountId}/history`;
    cardTitle.dataset.navigo = '';

    cardTitle.addEventListener('click', (e) => {
      const href = e.target.getAttribute('href');
      e.preventDefault();
      router.navigate(href);
    });
  }

  balanceDynamicsChartContainer.classList.add(
    'account__chart',
    `${sectionClass}__chart`,
    'balance-dynamics__chart',
  );

  cardTitle.textContent = 'Динамика баланса';

  const balanceDynamics = getBalanceDynamics(data, totalMonths);

  balanceDynamicsChartContainer.append(chartContainer);
  accountBalanceDynamicsCard.append(cardTitle, balanceDynamicsChartContainer);

  const balanceDynamicsChart = createBalanceDynamicsBarChart(
    balanceDynamics,
    chartContainer,
  );

  return { accountBalanceDynamicsCard, balanceDynamicsChart };
}
