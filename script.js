const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;


// Unsplash API

let initialCount = 5;
const count = 30;
const apiKey = "7IPvGoAMuhYIc1A0jCO3Ix01k1dVJ02gP6eD_XN0xy0";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

// Update Api Unsplash
function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }

// Check if all images are were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      photoReady = true;
      loader.hidden = true;
    }
  }

// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for ( const key in attributes ) {
         element.setAttribute(key, attributes[key]);
    }
}

// Create elements for Links & Photos ADD to DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes( item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> to display photo from Unsplash
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);


        // Put the image inside <a> element, then put both inside image-container Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    }
    );
}


// Get photos from unsplash API

async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
      if (isInitialLoad) { // NEW LINE ****
        updateAPIURLWithNewCount(30) // NEW LINE ****
        isInitialLoad = false // NEW LINE ****
      } // NEW LINE ****
    } catch (error) {
      // Catch Error Here
    }
  }

// Check to see if scrolling near botton of page, Load more photos
window.addEventListener('scroll',() => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && photoReady) {
    photoReady = false;
    getPhotos();
   }
});

// On Load 
getPhotos();
