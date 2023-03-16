
// Unsplash API

const count = 10;
const apiKey = "7IPvGoAMuhYIc1A0jCO3Ix01k1dVJ02gP6eD_XN0xy0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Get photos from unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data); 

    } catch (error) {
        // Catch Error Here
    }
}

// On Load 
getPhotos();
