const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = 'k0wvr44GhFUEqkkyurGodRstbFvcHE2xuXTfASXb5bo';
const apiUrl =`https://api.unsplash.com/photos/random/
?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded () {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden= true;
        console.log('ready', ready);
    }
}

// Helper function to set attributes on DOM element
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}



// Create elements for links and photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
        totalImages = photosArray.length;
        console.log('total images', totalImages);
        photosArray.forEach((photo) => {
            //Create <a> to link to Unsplash
            const item = document.createElement('a');
            setAttributes(item, {
                href: photo.links.html,
                target: '_blank',
            });
            // Create <img> for photo
            const img = document.createElement('img');
            setAttributes(img, {
                src: photo.urls.regular,
                alt: photo.alt_description,
                title: photo.alt_description,
    
            });
             // Event listener, check when each is finished loading
             img.addEventListener('load', imageLoaded)
            // Put <img> inside <a>, then put both inside imageContainer element
            item.appendChild(img);
            imageContainer.appendChild(item);
        });
    }
    // Run function for each object in photosArray
    





// Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch error here
    }
}

// Check to see if scrolling near bottom pf page, Load more photos
window.addEventListener('scroll', () => {
 if (window.innerHeight + window.scrollY >= 
    document.body.offsetHeight - 1000 && ready){
        ready = false;
getPhotos();
 }
});

//On load
getPhotos();