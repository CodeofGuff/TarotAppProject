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
    const cardFrame = document.querySelector('.card-frame');
    const cardImage = document.querySelector('.card-image');
    const cardTitle = document.querySelector('.card-title');
    const cardDescription = document.querySelector('.card-description');
    
    // Update image
    cardImage.src = `./assets/${card.name}.jpg`;
    cardImage.alt = card.name;
    
    // Update content
    cardTitle.textContent = card.name;
    cardDescription.textContent = card.meaning;
}

// Add event listeners to the card frame
const cardFrame = document.querySelector('.card-frame');

// Mouse click
cardFrame.addEventListener('click', drawRandomCard);

// Keyboard accessibility
cardFrame.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        drawRandomCard();
    }
});
