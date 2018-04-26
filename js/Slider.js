/**
* Slider class
*/
class Slider {
  /**
   * Create the slider.
   *
   * @param {Object} divContainer - The DOM element that you want the slider to render in.
   * @param {array} imagesArray - Array of objects with image source and image title.
  */
  constructor(divContainer, imagesArray) {

    this.imagesArray = imagesArray;
    this.divContainer = divContainer;
    this.index = 0;

    this.numberOfSlides = this.imagesArray.length;

    const sliderDiv = this.render();
    this.divContainer.insertAdjacentHTML('beforeend', sliderDiv);
    this.overlay = this.divContainer.getElementsByClassName('overlay-gallery')[0];
    const sliderCloseButton = this.divContainer.getElementsByClassName('slider-close')[0];

    sliderCloseButton.addEventListener('click', () => {
      this.hide();
    });

    const nextButton = this.divContainer.getElementsByClassName('next')[0];
    nextButton.addEventListener('click', () => {
      this.next();
    });

    const prevButton = this.divContainer.getElementsByClassName('prev')[0];
    prevButton.addEventListener('click', () => {
      this.prev();
    });
  }

  next() {
    let nextIndex = this.index + 1;
    if (this.index === this.numberOfSlides - 1) {
      nextIndex = 0;
    }

    this.setSlide(nextIndex, true);
  }

  prev() {
    let prevIndex;
    if (this.index === 0) {
      prevIndex = this.numberOfSlides - 1;
    } else {
     prevIndex = this.index - 1;
    }

    this.setSlide(prevIndex, true);
  }

  show() {
    if (this.overlay.classList.contains('hide')) {
      this.overlay.classList.remove('hide');
      this.overlay.classList.add('slider-active');
    }

    const currentSlide = this.divContainer.querySelector(`#slide-${this.index}`);
    currentSlide.classList.remove('hide');
    currentSlide.classList.add('active');
  }

  hide() {
    const activeSlide = this.divContainer.getElementsByClassName('active')[0];

    if (!this.overlay.classList.contains('hide')) {
      this.overlay.classList.add('hide');
      this.overlay.classList.remove('slider-active');
    }

    if (activeSlide.classList.contains('active')) {
      activeSlide.classList.remove('active');
      activeSlide.classList.add('hide');
    }
  }

  /**
   * Sets the current slide index and activates that slide.
   *
   * @param {int} index - The current slide index.
   * @param {Bool} show - whether to show the slider or not.
  */
  setSlide(index, show = false) {
    const oldIndex = this.index;
    this.index = index;

    if (show)
    {
      const oldSlide = this.divContainer.querySelector(`#slide-${oldIndex}`);
      const newSlide = this.divContainer.querySelector(`#slide-${this.index}`);

      oldSlide.classList.remove('active');
      oldSlide.classList.add('hide');
      newSlide.classList.remove('hide');
      newSlide.classList.add('active');
    }
  }

  render() {
    return `
      <div class="overlay-gallery hide">
        <div class="gallery-container">
          <div class="slider-container">
            <button class="arrow prev">
              <i aria-label="next" class="ui-prev"></i>
            </button>
            <button class="arrow next">
              <i aria-label="next" class="ui-next"></i>
            </button>
            <button class="slider-close">
              <i aria-label="Close Gallery" class="ui-close"></i>
            </button>
            <ul class="slides">
              ${this.imagesArray.map((image, index) => {
                return `
                  <li class="gallery-list-item">
                    <div id="slide-${index}" class="hide">
                      <img class="gallery-image" src="${image.imgUrl}" alt="${image.title}">
                      <div class="image-title">${image.title}</div>
                    </div>
                  </li>`;
              }).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}
