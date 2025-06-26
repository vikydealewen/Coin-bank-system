import { getTransactionsRatioData } from './getTransactionRatio';
import { createTransactionsRatioBarChart } from './createTransactionsRatioBarChart';

export function createTransactionsRatioCard(data, totalMonths, sectionClass) {
  const accountTransitionRatioCard = document.createElement('div');
  const cardTitle = document.createElement('h3');
  const transitionRatioChartContainer = document.createElement('div');
  const chartContainer = document.createElement('canvas');

  accountTransitionRatioCard.classList.add(
    'section__card',
    'section__card-light',
    'account__transition-ratio',
    `${sectionClass}__transition-ratio`,
    `${sectionClass}__card-chart`,
    'transition-ratio',
  );

  cardTitle.classList.add(
    'section__card-title',
    `${sectionClass}__card-title`,
    'transition-ratio__title',
  );

  transitionRatioChartContainer.classList.add(
    `${sectionClass}__chart`,
    'account__chart',
    'transition-ratio-chart',
  );

  cardTitle.textContent = 'Соотношение входящих и исходящих транзакций';

  const transitionRatio = getTransactionsRatioData(data, totalMonths);
  createTransactionsRatioBarChart(transitionRatio, chartContainer);

  transitionRatioChartContainer.append(chartContainer);
  accountTransitionRatioCard.append(cardTitle, transitionRatioChartContainer);

  return accountTransitionRatioCard;
}
