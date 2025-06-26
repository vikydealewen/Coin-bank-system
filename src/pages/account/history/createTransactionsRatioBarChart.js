import { Chart, registerables } from 'chart.js';
import {
  validateChartSetup,
  setGlobalFontDefaults,
  getChartOptions,
  getMonthsLabels,
  chartAreaBorder,
  customYLabels,
} from '../../../components/chartSettings';

// Регистрируем все компоненты Chart.js (включая BarController)
Chart.register(...registerables);

export function createTransactionsRatioBarChart(
  transitionMonthlyData,
  chartContainer,
) {
  if (
    !validateChartSetup(
      chartContainer,
      transitionMonthlyData,
      'TransitionRatio',
    )
  ) {
    return;
  }

  const data = transitionMonthlyData;
  const transactionsFrom = data.map((item) => item.transactionsFromSum);
  const transactionsTo = data.map((item) => item.transactionsToSum);

  const percentageTransactionsFrom = data.map((item) => {
    if (item.transactionsSum !== 0) {
      return Math.ceil((item.transactionsFromSum / item.transactionsSum) * 100);
    } else {
      return 0;
    }
  });

  const percentageTransactionsTo = data.map((item) => {
    if (item.transactionsSum !== 0) {
      return Math.ceil((item.transactionsToSum / item.transactionsSum) * 100);
    } else {
      return 0;
    }
  });

  let maxValueFrom = Math.max(...percentageTransactionsFrom);
  let maxValueTo = Math.max(...percentageTransactionsTo);

  let max;
  let center;

  if (maxValueFrom > maxValueTo) {
    max = maxValueFrom;
    center = maxValueTo;
  } else {
    max = maxValueTo;
    center = maxValueFrom;
  }

  const min = 0;

  //Стиль шрифта
  setGlobalFontDefaults();

  //Инициализация графика
  try {
    const chart = new Chart(chartContainer, {
      type: 'bar',
      options: getChartOptions(min, max, true, [center], '%'),
      data: {
        labels: getMonthsLabels(data),
        datasets: [
          {
            label: 'Перевод на счет',
            data: percentageTransactionsTo,
            backgroundColor: '#76CA66',
          },
          {
            label: 'Перевод со счета',
            data: percentageTransactionsFrom,
            backgroundColor: '#FD4E5D',
          },
        ],
      },
      plugins: [chartAreaBorder, customYLabels],
    });

    chart.canvas.style.height = '200px';
    chart.canvas.style.width = '100%';

    chartContainer.style.overflow = 'visible';
    chartContainer.style.position = 'relative';

    console.log('График успешно создан');
  } catch (error) {
    console.error('Ошибка создания графика:', error);
  }
}
