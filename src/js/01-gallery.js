import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const gallery = document.querySelector('.gallery');
console.log(gallery);

//Створюю розмітку по масиву
const imageLi = galleryItems.reduce(
  (acc, item) =>
    acc +
    `<a class="gallery__item" href="${item.original}">
  <img class="gallery__image" src="${item.preview}" alt="${item.description}" title="${item.description}" />
</a>`,
  ''
);
console.log(imageLi);

// Добавляю розмітку в DOM
gallery.insertAdjacentHTML('beforeend', imageLi);

//Відкриття повного зображення з підписом під зображенням.
var lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
