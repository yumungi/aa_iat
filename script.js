// Variables
const consentScreen = document.getElementById('consent-screen');
const surveyScreen = document.getElementById('survey-screen');
const startButton = document.getElementById('start-survey');
const surveyImage = document.getElementById('survey-image');
const images = ["hair-1.jpg", "alopecia-1.jpg"]; // Add your image filenames here
let randomizedImages = [];
let currentIndex = 0;
let startTime, endTime;
let results = [];

// Preload Images
function preloadImages() {
    return images.map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });
}

// Randomize Images
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start Survey
startButton.addEventListener('click', () => {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    if (!age || !gender) {
        alert('Please fill out all fields.');
        return;
    }

    // Hide consent screen and show survey screen
    consentScreen.style.display = 'none';
    surveyScreen.style.display = 'block';

    // Randomize images and start survey
    randomizedImages = shuffle(images);
    showImage();
});

// Show Image
function showImage() {
    if (currentIndex >= randomizedImages.length) {
        alert('Survey complete!');
        exportToGoogleSheets();
        return;
    }

    surveyImage.src = randomizedImages[currentIndex];
    startTime = Date.now();
}

// Handle Swipe
const hammer = new Hammer(surveyImage);
hammer.on('swipeleft swiperight', (event) => {
    endTime = Date.now();
    const reactionTime = endTime - startTime;

    results.push({
        image: randomizedImages[currentIndex],
        swipe: event.type === 'swipeleft' ? 'disagree' : 'agree',
        reactionTime
    });

    currentIndex++;
    showImage();
});

// Export to Google Sheets
function exportToGoogleSheets() {
    // Use Google Sheets API to export `results`
    console.log('Exporting results:', results);
    alert('Data exported to Google Sheets!');
}
