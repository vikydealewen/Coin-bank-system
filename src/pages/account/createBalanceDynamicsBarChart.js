import { Chart, registerables } from 'chart.js';
import {
  validateChartSetup,
  setGlobalFontDefaults,
  getChartOptions,
  getMonthsLabels,
  chartAreaBorder,
  customYLabels,
  dataProcessing,
} from '../../components/chartSettings';

// Регистрируем все компоненты Chart.js (включая BarController)
Chart.register(...registerables);

export function createBalanceDynamicsBarChart(
  balanceMonthlyData,
  chartContainer,
) {
  if (
    !validateChartSetup(chartContainer, balanceMonthlyData, 'BalanceDynamics')
  ) {
    console.log('тут');
    return;
  }

  const data = balanceMonthlyData;
  const { endBalance, max, min } = dataProcessing(data);

  //Стиль шрифта
  setGlobalFontDefaults();

  //Инициализация графика
  try {
    const chart = new Chart(chartContainer, {
      type: 'bar',
      options: getChartOptions(min, max, false, [], '₽'),
      data: {
        labels: getMonthsLabels(data),
        datasets: [
          {
            label: 'Баланс',
            data: endBalance,
            backgroundColor: '#116ACC',
          },
        ],
      },
      plugins: [chartAreaBorder, customYLabels],
    });

    chartContainer.style.overflow = 'visible';
    chartContainer.style.position = 'relative';

    console.log('График успешно создан');
    return chart;
  } catch (error) {
    console.error('Ошибка создания графика:', error);
    return null;
  }
}
