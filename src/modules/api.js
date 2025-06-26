export async function logIn(usernameInput, passwordInput) {
  return await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: `${usernameInput.value.trim()}`,
      password: `${passwordInput.value.trim()}`,
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      if (error.name === 'SyntaxError') {
        throw new Error('Произошла ошибка, попробуйте обновить страницу позже');
      } else if (
        error instanceof TypeError &&
        error.message.includes('fetch')
      ) {
        throw new Error('Произошла ошибка, проверьте подключение к интернету');
      } else {
        throw error;
      }
    });
}

export async function getAccountsList(token) {
  return await fetch('http://localhost:3000/accounts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      //Проверка на пустые данные
      if (!data || !data.payload || data.payload.length == 0) {
        return [];
      }

      return data.payload;
    })
    .catch((error) => {
      if (error.name === 'SyntaxError') {
        throw new Error('Произошла ошибка, попробуйте обновить страницу позже');
      } else if (
        error instanceof TypeError &&
        error.message.includes('fetch')
      ) {
        throw new Error('Произошла ошибка, проверьте подключение к интернету');
      } else {
        throw error;
      }
    });
}

export async function createNewAccount(token) {
  return await fetch('http://localhost:3000/create-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.payload)
    .catch((error) => {
      if (error.name === 'SyntaxError') {
        throw new Error('Произошла ошибка, попробуйте обновить страницу позже');
      } else if (
        error instanceof TypeError &&
        error.message.includes('fetch')
      ) {
        throw new Error('Произошла ошибка, проверьте подключение к интернету');
      } else {
        throw error;
      }
    });
}

export async function getAccount(token, id) {
  return await fetch(`http://localhost:3000/account/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.payload)
    .catch((error) => {
      if (error.name === 'SyntaxError') {
        throw new Error('Произошла ошибка, попробуйте обновить страницу позже');
      } else if (
        error instanceof TypeError &&
        error.message.includes('fetch')
      ) {
        throw new Error('Произошла ошибка, проверьте подключение к интернету');
      } else {
        throw error;
      }
    });
}

export async function transferFunds(token, from, to, amount) {
  return await fetch('http://localhost:3000/transfer-funds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
    body: JSON.stringify({
      from: `${from}`,
      to: `${to.value.trim()}`,
      amount: `${Number(amount.value.trim())}`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return {
        success: true,
        newBalance: data.payload.balance,
        data: data.payload,
      };
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function getAccountCurrencies(token) {
  return await fetch('http://localhost:3000/currencies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      //Проверка на пустые данные
      if (!data || !data.payload || data.payload.length == 0) {
        return [];
      }

      return data.payload;
    })
    .catch((error) => {
      if (error.name === 'SyntaxError') {
        throw new Error('Произошла ошибка, попробуйте обновить страницу позже');
      } else if (
        error instanceof TypeError &&
        error.message.includes('fetch')
      ) {
        throw new Error('Произошла ошибка, проверьте подключение к интернету');
      } else {
        throw error;
      }
    });
}

export async function exchangeCurrency(token, from, to, amount) {
  return await fetch('http://localhost:3000/currency-buy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
    body: JSON.stringify({
      from: `${from}`,
      to: `${to}`,
      amount: `${Number(amount)}`,
    }),
  })
    .then((res) => res.json())
    .then((data) => data.payload)
    .catch((error) => {
      if (error.name === 'SyntaxError') {
        throw new Error('Произошла ошибка, попробуйте обновить страницу позже');
      } else if (
        error instanceof TypeError &&
        error.message.includes('fetch')
      ) {
        throw new Error('Произошла ошибка, проверьте подключение к интернету');
      } else {
        throw error;
      }
    });
}

export async function getChangedCurrency() {
  return new WebSocket('ws://localhost:3000/currency-feed');
}

export async function getAtmsLocation(token) {
  return await fetch('http://localhost:3000/banks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data || !data.payload || data.payload.length == 0) {
        return [];
      }

      return data.payload;
    })
    .catch((error) => {
      if (error.name === 'SyntaxError') {
        throw new Error('Произошла ошибка, попробуйте обновить страницу позже');
      } else if (
        error instanceof TypeError &&
        error.message.includes('fetch')
      ) {
        throw new Error('Произошла ошибка, проверьте подключение к интернету');
      } else {
        throw error;
      }
    });
  1;
}
