const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];


// Unsplash API

const count = 10;
const apiKey = "7IPvGoAMuhYIc1A0jCO3Ix01k1dVJ02gP6eD_XN0xy0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for ( const key in attributes ) {
         element.setAttribute(key, attributes[key]);
    }
}

// Create elements for Links & Photos ADD to DOM

function displayPhotos() {
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


    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near botton of page, Load more photos
window.addEventListener('scroll',() => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    getPhotos();
    console.log("aca debe cargar la siguiente foto");
   }
});

// On Load 
getPhotos();
