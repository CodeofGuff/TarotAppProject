import { cards } from './cards.js';

function drawRandomCard() {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const card = cards[randomIndex];
    const cardPlaceholder = document.querySelector('.card-placeholder');
    const cardDescription = document.querySelector('.card-description');
    
    // Clear placeholder and create new image
    cardPlaceholder.innerHTML = '';
    const img = document.createElement('img');
    img.className = 'card-image';
    img.src = `./assets/${card.name}.jpg`;
    img.alt = card.name;

    // Add image to placeholder
    cardPlaceholder.appendChild(img);
    
    // Update description
    cardDescription.textContent = card.meaning;
}

const cardButton = document.querySelector('.card-button');
const cardFrame = document.querySelector('.card-frame');

cardButton.addEventListener('click', drawRandomCard);
cardFrame.addEventListener('click', drawRandomCard);



// Keyboard accessibility for funsies
cardFrame.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        drawRandomCard();
    }
});

cardButton.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        drawRandomCard();
    }
});

