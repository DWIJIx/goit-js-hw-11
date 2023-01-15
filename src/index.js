import './css/styles.css';
import getImeges from './fetchImegesBixby'
import Notiflix from 'notiflix';


// const debounce = require('lodash.debounce');


const refs = {
    formEl: document.querySelector('.search-form'),
    divEl: document.querySelector('.gallery')
}

refs.formEl.addEventListener('submit', onSearch);

function onSearch(evt) {
    evt.preventDefault();
    clearMarkup();
    const inputValue = evt.currentTarget.elements.searchQuery.value;
    // console.dir(inputValue)

    getImeges(inputValue)
            .then(data => console.log(data))
    }


// function createMarkup (dataArray) {
//     const oneMarkup = obj => {
//         if (dataArray.length < 2) {
//             const languagesList = Object.values(dataArray[0].languages)
//             return `
//             <li class = "list_item">
//                 <h2 class = "list_item_title">
//                      <img src="${obj.flags.svg}" alt="${obj.name.common}" width = 70 class = "list_item_img">
//                     ${obj.name.common}
//                 </h2>
//                 <h3>Capital:   <span class = "list_item_span">${obj.capital}</span></h3>
//                 <h3>Population:   <span class = "list_item_span">${obj.population}</span></h3>
//                 <h3>Languages:   <span class = "list_item_span">${languagesList}</span></h3>
//             </li>
//             `;
//         } else {
//             return `
//              <li class = "list_item">
//                 <h3>
//                     <img src="${obj.flags.svg}" alt="${obj.name.common}" width = 40>
//                     ${obj.name.common}
//                 </h3>
//             </li>
//             `;
//         }
//     }
//     const markup = dataArray.map(oneMarkup).join('');
//     refs.ulContiner.insertAdjacentHTML('afterbegin', markup)
// }

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