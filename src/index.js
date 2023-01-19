import './css/styles.css';
// імпортуємо клас PixabayApiService
import PixabayApiService from './fetchImegesBixby'
import Notiflix from 'notiflix';

// const debounce = require('lodash.debounce');

const refs = {
    formEl: document.querySelector('.search-form'),
    divEl: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}
// створюємо об'єкт pixabayApiService на основі класу PixabayApiService
const pixabayApiService = new PixabayApiService();

refs.formEl.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore)


function onSubmit(evt) {
  evt.preventDefault();
  refs.loadMoreBtn.classList.add('is-hidden')
  if (evt.currentTarget.elements.searchQuery.value === '') {
    Notiflix.Notify.failure('Sorry')
    return;
  }
  clearMarkup();
  // refs.loadMoreBtn.classList.remove("is-hidden")
  // через сетер класу PixabayApiService записуємо значення this.inputValue
  pixabayApiService.value = evt.currentTarget.elements.searchQuery.value;
  // Скидаємо методом resetPage() обєкта pixabayApiService this.page до 1
  pixabayApiService.resetPage();
// викликаємо метод getImeges об'єкта pixabayApiService і then-им проміс, який повертає цей метод
  pixabayApiService.getImeges().then(data => {
     if (data.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
     } else {
       Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
      //  console.log(data);
       createMarkup(data.hits);
       refs.loadMoreBtn.classList.remove('is-hidden')
       checkTotalHits(data);
      }
  })
 
}

function createMarkup (dataArray) {
    const oneMarkup = obj => {
        return `<div class="photo-card">
            <img src="${obj.webformatURL}" alt="${obj.tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                 <b>Likes: ${obj.likes}</b>
                </p>
                <p class="info-item">
                  <b>Views: ${obj.views}</b>
                </p>
                <p class="info-item">
                  <b>Comments: ${obj.comments}</b>
                </p>
                <p class="info-item">
                  <b>Downloads: ${obj.downloads}</b>
                </p>
              </div>
          </div>`;
        }

    const markup = dataArray.map(oneMarkup).join('');
    refs.divEl.insertAdjacentHTML('beforeend', markup)  
}

function onLoadMore() {
   pixabayApiService.getImeges().then(data => {
     createMarkup(data.hits);
     checkTotalHits(data);

     // Плавне прокручування: ================================
     const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
});
    
    
  })
}

function clearMarkup() {
    refs.divEl.innerHTML = ''
}

function checkTotalHits(data) {
  const mult = (pixabayApiService.page - 1) * pixabayApiService.perPage;
  if (mult >= data.totalHits) {
       refs.loadMoreBtn.classList.add('is-hidden');
       Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
     }
}


