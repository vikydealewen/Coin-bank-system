import { Chart } from 'chart.js';
import { getBalanceDynamics } from '../pages/account/getBalanceDynamics';

//плагин для раскрашивания границ
export const chartAreaBorder = {
  id: 'chartAreaBorder',
  beforeDraw(chart, options) {
    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart;
    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  },
};

//плагин для отображения лейблов по оси Y
export const customYLabels = {
  id: 'customYLabels',
  afterDraw(chart, args, options) {
    if (!options.values || !options.values.length) return;

    const { ctx, chartArea, scales } = chart;
    const yScale = scales.y;
    const suffix = options.suffix || '';

    ctx.save();
    ctx.fillStyle = Chart.defaults.color;
    ctx.font = `600 ${Chart.defaults.font.size}px ${Chart.defaults.font.family}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const textHeight = Chart.defaults.font.size;
    const halfTextHeight = textHeight / 2;

    options.values.forEach((value) => {
      if (value >= yScale.min && value <= yScale.max) {
        let yPosition = yScale.getPixelForValue(value);

        // Ограничиваем позицию лейбла границами области графика
        if (yPosition - halfTextHeight < chartArea.top) {
          yPosition = chartArea.top + halfTextHeight;
        } else if (yPosition + halfTextHeight > chartArea.bottom) {
          yPosition = chartArea.bottom - halfTextHeight;
        }

        // Позиционируем справа от области графика
        const xPosition = chartArea.right + 46;
        const labelText = `${value.toLocaleString()} ${suffix}`;

        ctx.fillText(labelText, xPosition, yPosition);
      }
    });

    ctx.restore();
  },
};

export function setGlobalFontDefaults() {
  Chart.defaults.font.size = 20;
  Chart.defaults.font.weight = 700;
  Chart.defaults.color = 'black';
}

export function validateChartSetup(chartContainer, data, chartType = 'chart') {
  if (!chartContainer) {
    console.error('Контейнер для графика не найден');
    return false;
  }

  if (Chart.getChart(chartContainer)) {
    console.log(`График ${chartType} уже существует для данного контейнера`);
    return false;
  }

  if (!data || !data.length) {
    console.error('Нет данных для отображения');
    return false;
  }

  return true;
}

export function getChartOptions(
  min,
  max,
  stacked = false,
  additionalTicks = [],
  suffix = '',
) {
  const allTickValues = [min, max, ...additionalTicks];
  // Убираем дубликаты и сортируем
  const uniqueTickValues = [...new Set(allTickValues)].sort((a, b) => a - b);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: true,
    barThickness: 50,
    layout: {
      padding: {
        left: 1,
        right: 155,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        usePointStyle: true,
      },
      chartAreaBorder: {
        borderColor: 'black',
        borderWidth: 1,
      },
      customYLabels: {
        values: uniqueTickValues,
        suffix: suffix,
      },
    },
    scales: {
      y: {
        position: 'right',
        beginAtZero: true,
        stacked: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        max,
        min,
      },
      x: {
        offset: true,
        grid: {
          display: false,
        },
        stacked: stacked,
      },
    },
  };

  return chartOptions;
}

export function getMonthsLabels(data) {
  const months = {
    1: 'янв',
    2: 'фев',
    3: 'мар',
    4: 'апр',
    5: 'май',
    6: 'июн',
    7: 'июл',
    8: 'авг',
    9: 'сен',
    10: 'окт',
    11: 'ноя',
    12: 'дек',
  };

  return data.map((item) => `${months[item.month]}`);
}

export function dataProcessing(data) {
  const endBalance = data.map((item) => item.endBalance);
  const maxBalanceArr = data.map((item) => item.maxBalance);
  const minBalanceArr = data.map((item) => item.minBalance);
  const max = Math.ceil(Math.max(...maxBalanceArr));
  const min = Math.ceil(Math.min(...minBalanceArr));

  return { endBalance, max, min };
}

export function updateBalanceChart(newData, balanceChart, totalMonths) {
  const data = getBalanceDynamics(newData, totalMonths);
  const { endBalance, max, min } = dataProcessing(data);

  balanceChart.data.labels = getMonthsLabels(data);
  balanceChart.data.datasets[0].data = endBalance;
  balanceChart.options = getChartOptions(min, max, false, [], '₽');

  balanceChart.update();
}
