// Утилитные функции для работы с датами
export const dateUtils = {
  // Получение месяца и года из даты
  getMonthYear(date) {
    return {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  },

  // Расчет разницы между месяцами
  getMonthDiff(currentDate, compareDate) {
    const { month: currentMonth, year: currentYear } =
      this.getMonthYear(currentDate);
    const { month: compareMonth, year: compareYear } =
      this.getMonthYear(compareDate);

    let monthDiff =
      (currentYear - compareYear) * 12 + (currentMonth - compareMonth);

    if (currentDate.getDate() < compareDate.getDate()) {
      monthDiff--;
    }

    return monthDiff;
  },

  // Сортировка по дате в обратном порядке (от новых к старым)
  sortByDateDesc(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  },
};

export function formatDateLong() {
  return new Intl.DateTimeFormat('ru-Ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateShort() {
  return new Intl.DateTimeFormat('ru-Ru', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}
