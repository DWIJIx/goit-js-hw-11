import './css/styles.css';
import getImeges from './fetchImegesBixby'
import Notiflix from 'notiflix';


// const debounce = require('lodash.debounce');


const refs = {
    formEl: document.querySelector('.search-form'),
    divEl: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

refs.formEl.addEventListener('submit', onSearch);

function onSearch(evt) {
    evt.preventDefault();
  clearMarkup();
  refs.loadMoreBtn.classList.remove("is-hidden")
    const inputValue = evt.currentTarget.elements.searchQuery.value;
    // console.dir(inputValue)

  getImeges(inputValue)
    .then(data => {
      console.log(data);
       if (data.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
       } else {
         createMarkup(data.hits)
       }
      
     }
      );
  
  
    }


function createMarkup (dataArray) {
    const oneMarkup = obj => {
        return `<div class="photo-card">
            <img src="${obj.webformatURL}" alt="${obj.tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                 <b>${obj.likes}</b>
                </p>
                <p class="info-item">
                  <b>${obj.views}</b>
                </p>
                <p class="info-item">
                  <b>${obj.comments}</b>
                </p>
                <p class="info-item">
                  <b>${obj.downloads}</b>
                </p>
              </div>
          </div>`;
        }

    const markup = dataArray.map(oneMarkup).join('');
    refs.divEl.insertAdjacentHTML('afterbegin', markup)
}

function clearMarkup() {
    refs.divEl.innerHTML = ''
}






/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */