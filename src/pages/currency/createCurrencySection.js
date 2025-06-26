import { createAccountCurrenciesCard } from './currencyAccount';
import { createCurrencyExchangeCard } from './currencyExchange';
import { createCurrencyRateCard } from './currencyRate';

export function createCurrencySection(currenciesData) {
  const currencySection = document.createElement('section');
  const currencyContainer = document.createElement('div');
  const sectionTitle = document.createElement('h1');
  const wrapperBottom = createCurrencySectionBottom(currenciesData);

  currencySection.classList.add('section', 'currency');
  currencyContainer.classList.add('container', 'currency__container');
  sectionTitle.classList.add('section__title', 'currency__title');

  sectionTitle.textContent = 'Валютный обмен';

  currencyContainer.append(sectionTitle, wrapperBottom);
  currencySection.append(currencyContainer);

  return currencySection;
}

function createCurrencySectionBottom(currenciesData) {
  const wrapperBottom = document.createElement('div');
  wrapperBottom.classList.add('section__bottom', 'currency__bottom', 'grid');

  const accountCurrenciesCard = createAccountCurrenciesCard(currenciesData);
  const currencyExchangeCard = createCurrencyExchangeCard();
  const currencyRateCard = createCurrencyRateCard();

  wrapperBottom.append(
    accountCurrenciesCard,
    currencyExchangeCard,
    currencyRateCard,
  );

  return wrapperBottom;
}
