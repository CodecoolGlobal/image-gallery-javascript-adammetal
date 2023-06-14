import { UploadForm } from "./src/upload/form";
import { createEl } from "./src/utils/createEl";
import { initGallery, createSwiperSlide } from "./src/gallery";

import "./index.css";

const app = document.querySelector("#app");

/**
 * <div id="app">
 * <nav>
 * </nav>
 * <section>
 *  <div><form...</div>
 *  <div><form...</div>
 * </section>
 * </div>
*/

async function main() {
  const nav = createEl("nav");
  const mainSection = createEl("section");
  const images = createEl('div', { className: 'images' });
  const formBox1 = createEl("div", { className: "form" });
  
  // Instantiation (Peldanyositas)
  const form1 = new UploadForm(
    "form1",
    "http://localhost:8000/api/image",
    "POST",
    async (event) => {
      event.preventDefault();
      const { target } = event;
      const formData = new FormData(target);
      const response = await fetch(target.action, {
        method: target.method,
        body: formData
      });
      const image = await response.json();
      console.log(image);
      
      const swiperWrapper = document.querySelector('.swiper-wrapper')
      const newSwiperSlide = createSwiperSlide(image)
      swiperWrapper.append(newSwiperSlide)
      gallery.update()
      
      /* const imageEl = createEl('img', {
        src: `http://localhost:8000${image.url}`
      })
      images.append(imageEl); */
    }
  );
  
  form1.render(formBox1);
  
  mainSection.append(images, formBox1);
  
  app.append(nav, mainSection);
  
  const gallery = await initGallery()
}

window.onload = main;
