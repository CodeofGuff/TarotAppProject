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
    const cardTitle = document.querySelector('.card-title');
    const cardDescription = document.querySelector('.card-description');
    
    // Clear existing content
    cardFrame.innerHTML = '';
    
    // Create and set up image
    const img = document.createElement('img');
    const imagePath = `./assets/${card.name}.jpg`;
    console.log('Attempting to load image:', imagePath); // Debug log
    
    img.onerror = () => {
        console.error('Failed to load image:', imagePath);
        cardFrame.innerHTML = '[Image Failed to Load]';
    };
    
    img.onload = () => {
        console.log('Image loaded successfully:', imagePath);
    };
    
    img.src = imagePath;
    img.alt = card.name;
    img.style.maxWidth = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    
    // Update content
    cardFrame.appendChild(img);
    cardTitle.textContent = card.name;
    cardDescription.textContent = card.meaning;
}

// Add event listener to the draw button
document.querySelector('.draw-button').addEventListener('click', drawRandomCard);