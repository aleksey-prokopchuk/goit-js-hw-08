import throttle from 'lodash.throttle';
// import debounce from 'lodash.debounce';

const STOREGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('input'),
  inputMessage: document.querySelector('textarea'),
};

let inputFormData = {};

refs.form.addEventListener('submit', onFormSubmit);
// throttle зберігає кожні 500 ms
refs.form.addEventListener('input', throttle(onFormDataInput, 500));

initForm();

// Заборона перезавантаження сторінки
// Прибираємо дані з сховища
// Піля надсилання поля очищаються
function onFormSubmit(event) {
  event.preventDefault();
  console.log('Форма надіслана');
  inputFormData = {};
  event.currentTarget.reset();
  localStorage.removeItem(STOREGE_KEY);
}

// Отримуємо тескт із всих полів форми
// Зберігаємо його до сховища

function onFormDataInput(event) {
  inputFormData[event.target.name] = event.target.value;
  localStorage.setItem(STOREGE_KEY, JSON.stringify(inputFormData));
  console.log(JSON.parse(localStorage.getItem(STOREGE_KEY)));
}

// Отримуємо дані з сховища
// Якщо там щось є заповнюємо поля
function initForm() {
  let filterInputForm = localStorage.getItem(STOREGE_KEY);
  if (filterInputForm) {
    filterInputForm = JSON.parse(filterInputForm);
    Object.entries(filterInputForm).forEach(([name, value]) => {
      console.log(name, value);
      inputFormData[name] = value;
      refs.form.elements[name].value = value;
    });
  }
}
