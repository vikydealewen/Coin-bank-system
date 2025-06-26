// @param {boolean} isDesc - сортировка по убыванию (true) или возрастанию (false)

export function sortAccountsList(arr, prop, isDesc = true) {
  // Создаем копию массива, чтобы не изменять оригинальный массив
  let result = [...arr].sort((a, b) => {
    // Для сортировки по дате последней транзакции
    if (prop === 'transactions') {
      const dateA =
        a.transactions.length > 0
          ? new Date(a.transactions[a.transactions.length - 1].date).getTime()
          : 0;
      const dateB =
        b.transactions.length > 0
          ? new Date(b.transactions[b.transactions.length - 1].date).getTime()
          : 0;

      return isDesc ? dateB - dateA : dateA - dateB;
    }

    // Для сортировки по номеру счета или балансу
    if (typeof a[prop] === 'string') {
      return isDesc
        ? b[prop].localeCompare(a[prop])
        : a[prop].localeCompare(b[prop]);
    } else {
      return isDesc ? b[prop] - a[prop] : a[prop] - b[prop];
    }
  });

  return result;
}
