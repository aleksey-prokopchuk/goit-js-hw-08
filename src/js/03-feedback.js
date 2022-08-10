/*
    1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message,
       у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
    2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми.
       В іншому випадку поля повинні бути порожніми.
    3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email,
       message та їхніми поточними значеннями.
    4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.
       Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
*/

//feedback-form-state
import throttle from 'lodash.throttle';
// import debounce from 'lodash.debounce';

const refs = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('input'),
  inputMessage: document.querySelector('textarea'),
};

const STOREGE_KEY = 'feedback-form-state';
const inputFormData = {};

refs.form.addEventListener('submit', onFormSubmit);
// throttle зберігає кожні 500 ms
refs.form.addEventListener('input', throttle(onFormDataInput, 500));

populateTextaria();
populateEmail();

// Заборона перезавантаження сторінки
// Прибираємо дані з сховища
//
// Піля надсилання поля очищаються
function onFormSubmit(event) {
  event.preventDefault();
  console.log('Форма надіслана');
  event.currentTarget.reset();
  localStorage.removeItem(STOREGE_KEY);
}

// Отримуємо тескт із всих полів форми
// Зберігаємо його до сховища

function onFormDataInput(event) {
  // const message = event.target.value;

  inputFormData[event.target.name] = event.target.value;
  localStorage.setItem(STOREGE_KEY, JSON.stringify(inputFormData));
  console.log(JSON.parse(localStorage.getItem(STOREGE_KEY)));
}

// function parseInputFormData() {
//   const savedMessege = JSON.parse(localStorage.getItem(STOREGE_KEY));
//   return;
// }

// Отримуємо дані з сховища
// Якщо там щось є заповнюємо Messege
function populateTextaria() {
  const savedMessege = JSON.parse(localStorage.getItem(STOREGE_KEY));
  if (savedMessege.message) {
    // console.log(savedMessege.message);
    refs.inputMessage.value = savedMessege.message;
  }
}

// Отримуємо дані з сховища
// Якщо там щось є заповнюємо Messege
function populateEmail() {
  const savedMessege = JSON.parse(localStorage.getItem(STOREGE_KEY));

  if (savedMessege.email) {
    // console.log(savedMessege.email);
    refs.inputEmail.value = savedMessege.email;
  }
}
