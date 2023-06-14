import { createEl } from '../utils/createEl';
import './index.css';

import Swiper from 'swiper';
import 'swiper/css'

const root = document.querySelector('#app');

function getImages() {
  return fetch('http://localhost:8000/api/images')
    .then(res => res.json())
}

function createImageEl(url) {
  return createEl('img', {
    src: `http://localhost:8000${url}`
  })
}

export function createSwiperSlide(imageData) {
  const swiperSlide = createEl('div', { className: 'swiper-slide' })
  const swiperImage = createImageEl(imageData.url)
  swiperSlide.append(swiperImage)
  return swiperSlide
}

function createSwiper(imagesData) {
  const swiperContainer = createEl('div', { className: 'swiper' })
  const swiperWrapper = createEl('div', { className: 'swiper-wrapper' })

  imagesData.forEach(imageData => swiperWrapper.append(createSwiperSlide(imageData)))

  swiperContainer.append(swiperWrapper)
  return swiperContainer
}

export async function initGallery() {
  const gallery = document.createElement('div');
  gallery.className = 'gallery';
  
  const imagesData = await getImages()
  const swiperEl = createSwiper(imagesData)

  gallery.append(swiperEl)
  root.append(gallery);

  const swiper = new Swiper('.swiper')
  return swiper
}
