const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32873967-2df471ca69613a4b365a872ae';

// створюємо клас PixabayApiService з методом getImeges()
export default class PixabayApiService {
    constructor() {
        this.inputValue = '';
        this.page = 1;
        this.perPage = 40;
    }
    async getImeges() {
        try {
            const response = await axios.get(`${BASE_URL}/?key=${KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`);
            console.log(response.data);
            // Збільшуємо значення this.page += 1
            this.incrementPage();
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

     // Функція збільшення значення this.page
    incrementPage() {
        this.page += 1;
    }
    // Функція оновлення значення this.page
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
