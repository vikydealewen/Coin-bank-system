describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.get('.input-username').should('exist');
    cy.get('.input-password').should('exist');
    cy.get('button.login__btn').should('exist');

    cy.get('.input-username').type('developer');
    cy.get('.input-password').type('skillbox');
    cy.contains('Войти').click();
  });

  it('При авторизации пользователя попадаем на страницу со счетами', () => {
    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost:4000/accounts');
    });
  });

  it('При авторизации видим список счетов пользователя', () => {
    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost:4000/accounts');
    });
    cy.get('.accounts__list').find('li').should('have.length.at.least', 1);
  });

  it('Возможность создания нового счета', () => {
    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost:4000/accounts');
    });

    let initialCount;

    cy.get('#add-btn').should('exist');
    cy.get('.accounts__list li').then((el) => {
      initialCount = el.length;
    });

    cy.get('#add-btn').click();

    cy.then(() => {
      cy.get('.accounts__list li').should(
        'have.length.greaterThan',
        initialCount,
      );
    });
  });

  it('Возможность перевести сумму со счета на счет', () => {
    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost:4000/accounts');
    });

    let accountNumber;
    let transferAmount;

    cy.get('.accounts__list li:first-child')
      .find('.accounts__item-title')
      .invoke('text')
      .then((text) => (accountNumber = text));

    cy.get('.accounts__list li:first-child').contains('Открыть').click();

    cy.then(() => {
      cy.url().should('include', `${accountNumber}`);
    });

    cy.get('[data-id="recipient-account"]').should('exist');
    cy.get('[data-id="transfer-amount"]').should('exist');
    cy.get('#send-btn').should('exist');

    cy.intercept('POST', '**/transfer-funds').as('transferRequest');

    cy.get('#account-balance').invoke('text').as('accountBalance');
    cy.get('[data-id="recipient-account"]').type('10001765506056717151843563');
    cy.get('@accountBalance').then((maxValue) => {
      transferAmount = Math.floor(Math.random() * parseInt(maxValue) + 1);
      cy.get('[data-id="transfer-amount"]').type(transferAmount);
    });
    cy.get('#send-btn').click();

    cy.wait('@transferRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.then(() => {
      cy.get('.history__table tbody tr:first-child')
        .should('contain', '10001765506056717151843563')
        .and('contain', `- ${transferAmount} ₽`);
    });
  });

  it('Проверяем каждую страницу', () => {
    cy.location().should((location) => {
      expect(location.href).to.eq('http://localhost:4000/accounts');
    });

    cy.get('.header__nav').should('exist');
    cy.get('[data-route="atms"]').should('exist');
    cy.get('[data-route="currency"]').should('exist');
    cy.get('[data-route="accounts"]').should('exist');
    cy.get('[data-route="logout"]').should('exist');

    cy.get('[data-route="atms"]').click();

    cy.then(() => {
      cy.url().should('include', 'atms');
    });

    cy.get('[data-route="currency"]').click();

    cy.then(() => {
      cy.url().should('include', 'currency');
    });

    cy.get('[data-route="accounts"]').click();

    cy.then(() => {
      cy.url().should('include', 'accounts');
    });

    cy.get('.accounts__list li:first-child').should('exist');

    let accountNumber;

    cy.get('.accounts__list li:first-child')
      .find('.accounts__item-title')
      .invoke('text')
      .then((text) => (accountNumber = text));

    cy.get('.accounts__list li:first-child').contains('Открыть').click();

    cy.then(() => {
      cy.url().should('include', `${accountNumber}`);
    });

    cy.contains('Динамика баланса').click();
    cy.url().should('include', '/history');

    cy.contains('Вернуться назад').click();

    cy.then(() => {
      cy.url().should('include', `${accountNumber}`);
    });

    cy.contains('Вернуться назад').click();
    cy.url().should('include', '/accounts');

    cy.get('[data-route="logout"]').click();
    cy.url().should('include', '/login');
  });
});
