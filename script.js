//Sujan Rokad, 000882948

//Declaration of variables
let refreshIntervalId = null;
let updateCount = -3;
let updated = [false, false, false];
let imageClicked;
let isImageSelection = false;

//Array for the images
const imagesArray = [   
    ["image_1.png","image_2.png","image_3.png", "image_12.png"],
    ["image_4.png","image_5.png","image_6.png", "image_11.png"],
    ["image_7.png","image_8.png","image_9.png", "image_10.png"]
];

//Function to select images from an array
function imageSelection(){

    // Get all the images from html file
    const images = document.querySelectorAll('img');

    // Loop for selection an image from imagesArray
    for (let i = 0; i < images.length; i++) {
        switch (i) {
            case 0:
                images[i].src = imagesArray[Math.floor(Math.random()*3)][Math.floor(Math.random()*4)];
                break;
            case 1:
                images[i].src = imagesArray[Math.floor(Math.random()*3)][Math.floor(Math.random()*4)];
                break;
            case 2:
                images[i].src = imagesArray[Math.floor(Math.random()*3)][Math.floor(Math.random()*4)];
                break;
            default:
                break;
        }

        // Add an event listener to each image that triggers an animation and calls the Click funtion
        images[i].addEventListener('click', () => {
            imageClicked = images[i];
            do_animation(imageClicked);
            Click(i);
        });
    }

    // Function that performs an animation on an image
    function do_animation(target){
        console.log("do_animation(target) called");
        target.classList.remove('spin');
        setTimeout(() => {
            target.classList.add('spin');
        }, 0)
    }
    
    // Function that updates an image after it has been clicked 
    function imageUpdate(i) {
        const images = document.querySelectorAll('.image');   
    }

    // Function that handles a click event on an image
    function Click(i){
        images[i].classList.add('spin');
        images[i].removeEventListener('click', () => Click(i));
        setTimeout(() => {
            images[i].classList.remove('spin');

            // If statement to check if image has already been updated
            if(!updated[i]){
                imageUpdate(i);
                updated[i] = true;
                updateCount++;
                document.getElementById('displayCount').textContent = updateCount;
            }

            // Add an event listener back to the image and updates an images as if it was an image that was clicked
            images[i].addEventListener('click', () => Click(i));
            if (images[i] === imageClicked) {
                imageClicked.src = imagesArray[Math.floor(Math.random()*3)][Math.floor(Math.random()*4)];
                const timeRefresh = document.getElementById('timeRefresh').value;
                clearInterval(refreshIntervalId);
                refreshIntervalId = setInterval(imageSelection, timeRefresh);
            }
        }, 1000)

        // reset updated flag for the image 
        updated[i] = false;
    }

    // Increment an update count to 3 and displays it
    updateCount += 3;
    document.getElementById('displayCount').textContent = updateCount;
}

// Function to handle randomize button that updates images when randomize button is clicked
function Randomize(){
    if (isImageSelection) {
        return;
    }

    isImageSelection = true;
    imageSelection();
    const timeRefresh = document.getElementById('timeRefresh').value;
    clearInterval(refreshIntervalId);

    // Clears timeRefresh when randomize button is clicked
    refreshIntervalId = setInterval(() => {
        Timeout();
        Randomize();
    }, timeRefresh);
    isImageSelection = false;
}

window.addEventListener('load',() => {
    Timeout();
});

// Function that handles timeRefresh value
function Timeout(){
    const timeRefresh = document.getElementById('timeRefresh').value;
    clearInterval(refreshIntervalId)
    refreshIntervalId = setInterval(Randomize, timeRefresh)
    countdown();
}


