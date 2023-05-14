import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryList = document.querySelector('.gallery');

const createGalleryItemMarkup = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
};

const createGalleryMarkup = items => {
  return items.map(item => createGalleryItemMarkup(item)).join('');
};

galleryList.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

const gallery = new SimpleLightbox('.gallery a');

