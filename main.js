async function loadCards() {
    try {
        const response = await fetch('./card.json');
        const data = await response.json();
        return data.cards;
    } catch (error) {
        console.error('Error loading cards:', error);
        return [];
    }
}

async function drawRandomCard() {
    const cards = await loadCards();
    if (cards.length === 0) {
        console.error('No cards available');
        return;
    }
    
    // Get random index
    const randomIndex = Math.floor(Math.random() * cards.length);
    const card = cards[randomIndex];
    
    // Get existing elements
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

// Add event listeners to the card frame
const cardButton = document.querySelector('.card-button');
const cardFrame = document.querySelector('.card-frame');

// Mouse click
cardButton.addEventListener('click', drawRandomCard);
cardFrame.addEventListener('click', drawRandomCard);

// Keyboard accessibility
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