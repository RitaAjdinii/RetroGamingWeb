// About.js

// Select the text element and the audio element
const aboutText = document.getElementById('about-text');
const coinSound = document.getElementById('coin-sound');

// Add event listener to play audio on mouseover
aboutText.addEventListener('mouseover', () => {
    coinSound.play();
});



const navLinkSound = document.getElementById('jump-sound');

// Function to play the click sound
function playClickSound() {
    navLinkSound.play();
}

// Select all navigation links and add click event listeners
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', playClickSound);
});

