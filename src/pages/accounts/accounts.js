import '../../styles/components/accounts.scss';
import { createAccountsSection } from './createAccountsSection';
import { createAccountItems } from './accountsItems';
import { toggleSpinner } from '../../modules/toggleSpinnerOnBtn';
import { getAccountsList, createNewAccount } from '../../modules/api';

const main = document.getElementById('main');
let currentSortProp = 'transactions';

function createAccountsList() {
  const list = document.createElement('ul');
  list.classList.add('accounts__list', 'grid', 'list-reset');
  return list;
}

async function renderUserAccountsPage(token, accountsData) {
  const components = createAccountsSection();
  const accountsSection = components.section;
  const sectionContainer = components.sectionContainer;
  const addAccountBtn = components.addAccountBtn;
  const selectSortElement = components.selectSort;
  const accountsList = createAccountsList();
  const bottom = document.createElement('div');

  bottom.classList.add('bottom', 'section__bottom', 'accounts__bottom');

  // Сначала добавим DOM-элементы на страницу
  bottom.append(accountsList);
  sectionContainer.append(bottom);
  main.append(accountsSection);

  selectSortElement.value = currentSortProp;

  createAccountItems(
    accountsList,
    accountsData,
    selectSortElement,
    currentSortProp,
  );

  //события клика по выбранной опции
  selectSortElement.addEventListener('choice', async (e) => {
    if (!accountsData || accountsData.length === 0) {
      return;
    }

    currentSortProp = e.detail.value;
    // Получаем актуальные данные при каждой сортировке
    createAccountItems(
      accountsList,
      accountsData,
      selectSortElement,
      currentSortProp,
    );
  });

  addAccountBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    toggleSpinner(addAccountBtn, true, false, 'Создание');

    try {
      await createNewAccount(token);

      const updatedAccounts = await getAccountsList(token);

      createAccountItems(
        accountsList,
        updatedAccounts,
        selectSortElement,
        currentSortProp,
      );

      accountsData = updatedAccounts;
    } catch (error) {
      throw new Error('Не удалось создать новый счет');
    } finally {
      toggleSpinner(addAccountBtn, false, false);
    }
  });
}

async function initAccountsPage() {
  const token = sessionStorage.getItem('token');
  main.innerHTML = '';

  const accountsData = await getAccountsList(token);
  await renderUserAccountsPage(token, accountsData);
}

export { initAccountsPage };
