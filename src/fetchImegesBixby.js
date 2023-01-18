import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32873967-2df471ca69613a4b365a872ae';
const axios = require('axios').default;

export default function getImeges(name) {
    return fetch(`${BASE_URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(resp => resp.json())
        .catch(err => console.error(err))   
}

// export default function getImeges(name) {
// axios.get(`${BASE_URL}/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
// }

