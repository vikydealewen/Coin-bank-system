import { createTransitionHistoryTableElement } from '../createHistoryTableTrElement';

export function createHistoryTableBodyWithPagination(data, itemsPerPage) {
  const historyTableBody = document.createElement('tbody');
  historyTableBody.classList.add('history-table__body');

  const reversedTransaction = data.transactions.toReversed();

  let currentPage = 1;
  const totalPages = Math.ceil(data.transactions.length / itemsPerPage);

  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('history__pagination', 'pagination');

  function showPage(page) {
    historyTableBody.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    reversedTransaction.slice(startIndex, endIndex).forEach((transaction) => {
      const tr = createTransitionHistoryTableElement(data.account, transaction);
      historyTableBody.append(tr);
    });
  }

  function createPageButtons() {
    paginationContainer.innerHTML = '';

    if (totalPages > 1) {
      // Кнопка "назад"
      const btnPrev = document.createElement('button');
      btnPrev.textContent = '<';
      btnPrev.classList.add(
        'history__btn-prev',
        'pagination__btn',
        'pagination__btn-prev',
      );
      btnPrev.disabled = currentPage === 1;
      btnPrev.onclick = () => {
        if (currentPage > 1) {
          currentPage--;
          showPage(currentPage);
          createPageButtons();
        }
      };
      paginationContainer.append(btnPrev);

      // Если страниц <= 5, показываем все
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.classList.add(
            'history__btn',
            'pagination__btn',
            'pagination__btn-page',
          );
          btn.classList.toggle('pagination__btn-active', currentPage === i);
          btn.onclick = () => {
            currentPage = i;
            showPage(currentPage);
            createPageButtons();
          };
          paginationContainer.append(btn);
        }
      } else {
        // Первая страница
        const btnFirst = document.createElement('button');
        btnFirst.textContent = '1';
        btnFirst.classList.add(
          'history__btn',
          'pagination__btn',
          'pagination__btn-page',
        );
        btnFirst.classList.toggle('pagination__btn-active', currentPage === 1);
        btnFirst.onclick = () => {
          currentPage = 1;
          showPage(currentPage);
          createPageButtons();
        };
        paginationContainer.append(btnFirst);

        // Если текущая страница > 3, показываем многоточие
        if (currentPage > 3) {
          const dots = document.createElement('span');
          dots.textContent = '...';
          dots.classList.add('history__pagination-dots', 'pagination__dots');
          paginationContainer.append(dots);
        }

        // Показываем 2 страницы до и после текущей (если они в диапазоне)
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) {
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.classList.add(
            'history__btn',
            'pagination__btn',
            'pagination__btn-page',
          );
          btn.classList.toggle('pagination__btn-active', currentPage === i);
          btn.onclick = () => {
            currentPage = i;
            showPage(currentPage);
            createPageButtons();
          };
          paginationContainer.append(btn);
        }

        // Если текущая страница < totalPages - 2, показываем многоточие
        if (currentPage < totalPages - 2) {
          const dots = document.createElement('span');
          dots.textContent = '...';
          dots.classList.add('history__pagination-dots', 'pagination__dots');
          paginationContainer.append(dots);
        }

        // Последняя страница
        const btnLast = document.createElement('button');
        btnLast.textContent = totalPages;
        btnLast.classList.add(
          'history__btn',
          'pagination__btn',
          'pagination__btn-page',
        );
        btnLast.classList.toggle(
          'pagination__btn-active',
          currentPage === totalPages,
        );
        btnLast.onclick = () => {
          currentPage = totalPages;
          showPage(currentPage);
          createPageButtons();
        };
        paginationContainer.append(btnLast);
      }

      // Кнопка "вперед"
      const btnNext = document.createElement('button');
      btnNext.textContent = '>';
      btnNext.classList.add(
        'history__btn-next',
        'pagination__btn',
        'pagination__btn-next',
      );
      btnNext.disabled = currentPage === totalPages;
      btnNext.onclick = () => {
        if (currentPage < totalPages) {
          currentPage++;
          showPage(currentPage);
          createPageButtons();
        }
      };
      paginationContainer.append(btnNext);
    }
  }

  createPageButtons();
  showPage(currentPage);

  return { historyTableBody, paginationContainer };
}

//разбить на части логику
