const axios = require('axios').default;

// створюємо клас PixabayApiService з методом getImeges()
export default class PixabayApiService {
    constructor() {
        this.inputValue = '';
        this.page = 1;
        this.perPage = 40;
    }
    getImeges() {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '32873967-2df471ca69613a4b365a872ae';
    // console.log('До', this)
    return fetch(`${BASE_URL}/?key=${KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data);
            // Збільшуємо значення this.page += 1
                this.incrementPage()
                //  console.log('Після', this)
                // Повертаємо дата наперед в перший then
                return data;
                }
        )
        .catch(err => console.error(err))   
    }

//     // Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
    // Функція збільшення значення this.page
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1
    }

    get value() {
        return this.inputValue
    }

    set value(newValue) {
        this.inputValue = newValue
    }
}
 
// 1. створюємо клас PixabayApiService з методом getImeges()
// 2. імпортуємо в index.js
// 3. потрібно, щоб з зовнішнього коду в цей клас вказувалась змінна this.inputValue,
//     тому через гетер і сетер 
//      get value() {
//         return this.inputValue
//     }

//     set value(newValue) {
//         this.inputValue = newValue (перезаписуємо значення в конструкторі)
// }
//     значення value приходить з зовн.коду через pixabayApiService.value
    


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

