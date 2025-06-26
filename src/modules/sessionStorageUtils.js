export const tokenUtils = {
  isAuthenticated: () => !!sessionStorage.getItem('token'),
  getToken: () => sessionStorage.getItem('token'),
  removeToken: () => sessionStorage.removeItem('token'),
};

export const accountDataUtils = {
  getLocalAccountData: () => {
    let accountData = sessionStorage.getItem('localAccountData');

    if (accountData !== null && accountData !== '') {
      return JSON.parse(accountData);
    } else {
      return [];
    }
  },
  setLocalAccountData: (data) =>
    sessionStorage.setItem('localAccountData', JSON.stringify(data)),
  removeLocalAccountData: () => sessionStorage.removeItem('localAccountData'),
};

export const accountCurrenciesDataUtils = {
  getLocalAccountData: () => {
    let currenciesData = sessionStorage.getItem('localCurrencyData');

    if (currenciesData !== null && currenciesData !== '') {
      return JSON.parse(currenciesData);
    } else {
      return [];
    }
  },
  setLocalAccountData: (data) =>
    sessionStorage.setItem('localCurrencyData', JSON.stringify(data)),
  removeLocalAccountData: () => sessionStorage.removeItem('localCurrencyData'),
};

export const currencyRateUtils = {
  getCurrencyRateList: () => {
    let sessionCurrencyRateList = sessionStorage.getItem('currencyRateArr');

    if (sessionCurrencyRateList !== null && sessionCurrencyRateList !== '') {
      return JSON.parse(sessionCurrencyRateList);
    } else {
      return [];
    }
  },
  saveCurrencyRateList: (list) =>
    sessionStorage.setItem('currencyRateArr', JSON.stringify(list)),
  createCurrencyRateItemLocal: ({ item }) => {
    let sessionCurrencyRateList =
      currencyRateUtils.getCurrencyRateList('currencyRateArr');

    let newItem = { item };

    sessionCurrencyRateList.push(newItem);
    currencyRateUtils.saveCurrencyRateList(
      sessionCurrencyRateList,
      'currencyRateArr',
    );
    return newItem;
  },
  removeCurrencyRateList: () => sessionStorage.removeItem('currencyRateArr'),
};
