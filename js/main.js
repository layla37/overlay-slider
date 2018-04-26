(function() {
const API_KEY = 'API key placeholder'; <------ replace with your flickr API key
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${API_KEY}&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1`;
let slider;

const galleryImage = (imgUrl, title = 'photo') => {
  return `
    <div class="image">
      <img class="thumbnail" src=${imgUrl} alt="flickr image: ${title}" />
    </div>
  `;
};

const getImageInfo = (data) => {
  const items = data.photos;

  return items.photo.map(item => {
    const farmId = item.farm;
    const serverId = item.server;
    const id = item.id;
    const secret = item.secret;
    const imgUrl = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;

    return {
      imgUrl: imgUrl,
      title: item.title
    };
  });
};

/*
imageInfo (array {imgSrc and title})
*/
const imagesGallery = (imageInfo) => {
  return `
    <div class="container">
      ${imageInfo.map(item => {
        return galleryImage(item.imgUrl, item.title);
      }).join('')}
    </div>
  `;
};


const addImageClickHandler = (el, index) => {
  el.addEventListener('click', function() {
    slider.setSlide(index);
    slider.show();
  });
};

const addClickHandlers = () => {
  const imagesInGallery = document.getElementsByClassName('image');
  for (let i = 0; i < imagesInGallery.length; i++) {
    addImageClickHandler(imagesInGallery[i], i);
  }
};

const renderHTML = (imagesArray, containerDiv) => {
  // array of image sources and image titles
  const imagesGalleryHTML = imagesGallery(imagesArray);
  containerDiv.innerHTML = imagesGalleryHTML;
  addClickHandlers();
};

const createGallery = (data) => {
  const imagesArray = getImageInfo(data);
  const mainDiv = document.getElementsByClassName('main')[0];
  renderHTML(imagesArray, mainDiv);
  slider = new Slider(mainDiv, imagesArray);
};

const makeRequest = () => {
  const AJAXrequest = new XMLHttpRequest();

  AJAXrequest.open('GET', proxyUrl + targetUrl);

  AJAXrequest.onload = function() {
    const data = JSON.parse(AJAXrequest.responseText);
    createGallery(data);
  }

  AJAXrequest.onerror = function(err) {
    console.error('ERROR: ', err);
  };

  AJAXrequest.send();
};

makeRequest();

}());
