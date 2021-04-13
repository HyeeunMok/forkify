import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(type, currentPage) {
    return `
      <button data-goto="${
        type === 'next' ? currentPage + 1 : currentPage - 1
      }" class="btn--inline pagination__btn--${type}">
        ${type === 'next' ? `<span>Page ${currentPage + 1}</span>` : ''}
        <svg class="search__icon">
           <use href="${icons}#icon-arrow-${
      type === 'next' ? 'right' : 'left'
    }"></use>
        </svg>
        ${type === 'prev' ? `<span>Page ${currentPage - 1}</span>` : ''}
      </button>
    `;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1)
      return this._generateMarkupButton('next', currentPage);

    // Last page
    if (currentPage === numPages && numPages > 1)
      return this._generateMarkupButton('prev', currentPage);

    // Other page
    if (currentPage < numPages)
      return `${this._generateMarkupButton(
        'next',
        currentPage
      )}${this._generateMarkupButton('prev', currentPage)}`;

    // Page 1, no other pages
    return '';
  }
}

export default new PaginationView();

// _generateMarkup() {
//   const curPage = this._data.page;
//   const numPages = Math.ceil(
//     this._data.results.length / this._data.resultsPerPage
//   );

//   // Page 1, and there are other pages
//   if (curPage === 1 && numPages > 1) {
//     return `
//       <button data-goto="${
//         curPage + 1
//       }" class="btn--inline pagination__btn--next">
//         <span>Page ${curPage + 1}</span>
//         <svg class="search__icon">
//           <use href="${icons}#icon-arrow-right"></use>
//         </svg>
//       </button>`;
//   }
//   // Last page
//   if (curPage === numPages && numPages > 1) {
//     return `
//       <button data-goto="${
//         curPage - 1
//       }" class="btn--inline pagination__btn--prev">
//         <svg class="search__icon">
//           <use href="${icons}#icon-arrow-left"></use>
//         </svg>
//         <span>Page ${curPage - 1}</span>
//       </button>`;
//   }
//   // Other page
//   if (curPage < numPages) {
//     return `
//       <button data-goto="${
//         curPage - 1
//       }" class="btn--inline pagination__btn--prev">
//         <svg class="search__icon">
//           <use href="${icons}#icon-arrow-left"></use>
//         </svg>
//         <span>Page ${curPage - 1}</span>
//       </button>
//       <button data-goto="${
//         curPage + 1
//       }" class="btn--inline pagination__btn--next">
//         <span>Page ${curPage + 1}</span>
//         <svg class="search__icon">
//           <use href="${icons}#icon-arrow-right"></use>
//         </svg>
//       </button>`;
//   }
//   // Page 1, and there are No other pages
//   return ``;
// }
// }
