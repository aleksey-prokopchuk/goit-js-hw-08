/*
    1.  Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message,
        в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
   
    2.  При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы.
        В противном случае поля должны быть пустыми.
    
    3.  При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями
        в консоль.

    4.  Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку
        lodash.throttle.
*/

//feedback-form-state
import debounce from 'lodash.debounce';

const refs = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('input'),
  inputMessage: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', onInputFormData);
refs.inputEmail.addEventListener('input', onEmailInput);
refs.inputMessage.addEventListener('input', debounce(onTextareaInput, 500));

const STOREGE_KEY = 'feedback-form-state';
const inputFormData = {};

populateTextaria();

function onFormSubmit(event) {
  event.preventDefault();
  console.log('Надсилаємо форму');
  //Після надсилання очищаємо формуу
  event.currentTarget.reset();
  //Після надсилання очищаємо локальне сховище
  localStorage.removeItem(STOREGE_KEY);
}

function onInputFormData(event) {
  console.log(event.target.value);
}

function onEmailInput(event) {
  // console.log('Email', event.currentTarget.value);
  // localStorage.setItem(STOREGE_KEY, event.currentTarget.value);
}

function onTextareaInput(event) {
  const message = event.target.value;
  // console.log('Message', message);
  localStorage.setItem(STOREGE_KEY, message);
}

function populateTextaria() {
  const savedMessage = localStorage.getItem(STOREGE_KEY);
  // Перевіряємо чи є щось в локальне сховище
  if (savedMessage) {
    // Якщо щось є, вставляємо в textaria
    refs.inputMessage.value = savedMessage;
    // console.log(savedMessage);
  }
}

console.log(refs.form);
console.log(refs.inputEmail);
console.log(refs.inputMessage);
