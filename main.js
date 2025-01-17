import { cards } from "./cards.js";


document.addEventListener('DOMContentLoaded', () => {
    setBackgroundCards();
});


async function drawRandomCard() {
    try {
        const card = cards[Math.floor(Math.random() * cards.length)];
        const cardPlaceholder = document.querySelector(".card-placeholder");
        const cardDescription = document.querySelector(".card-description");
        const cardDescriptionExtra = document.querySelector(".card-description-extra");
        const backgroundCards = document.querySelector(".background-cards");

        // Hide background cards
        backgroundCards.classList.add('hide');

        // Clear placeholder and create new image
        document.querySelector('header').style.display = 'none';
        cardPlaceholder.innerHTML = "<div class='loading'>Loading your card...</div>";

        // Create and load image
        const img = document.createElement("img");
        img.className = "card-image";
        
        // Wait for image to load
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = `./assets/${card.name}.jpg`;
            img.alt = card.name;
        });

        // Clear loading message and add image
        cardPlaceholder.innerHTML = "";
        cardPlaceholder.appendChild(img);

        // Fade in text with slight delay
        setTimeout(() => {
            cardDescription.textContent = card.meaning;
            cardDescriptionExtra.textContent = card.extra[Math.floor(Math.random() * card.extra.length)];
            cardDescription.style.opacity = 1;
            cardDescriptionExtra.style.opacity = 1;
        }, 150);

    } catch (error) {
        console.error('Error loading card:', error);
        cardPlaceholder.innerHTML = "Error loading card. Please try again.";
    }
}

function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("show");
}

function hidePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("show");
}

let isCardDisplayed = false;
// Handle card drawing with popup
async function handleCardDraw() {
  if (!isCardDisplayed) {
    await drawRandomCard();
    isCardDisplayed = true;
  } else {
    showPopup();
  }
}

// Get elements
const cardButton = document.querySelector(".card-button");
const cardFrame = document.querySelector(".card-frame");
const confirmButton = document.getElementById("confirm");
const cancelButton = document.getElementById("cancel");

// Add event listeners
cardButton.addEventListener("click", handleCardDraw);
cardFrame.addEventListener("click", handleCardDraw);

// Popup button listeners
confirmButton.addEventListener("click", async () => {
  hidePopup();
  await drawRandomCard();
  isCardDisplayed = true;
});

cancelButton.addEventListener("click", () => {
  hidePopup();
  resetView();
});

// Keyboard accessibility
cardFrame.addEventListener("keypress", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleCardDraw();
  }
});

cardButton.addEventListener("keypress", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleCardDraw();
  }
});
// Card arch on screen load
function getRandomCards(count) {
  // Create a copy of the cards array to avoid modifying the original
  let cardsCopy = [...cards];
  let randomCards = [];
  
  // Get random cards
  for(let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * cardsCopy.length);
      randomCards.push(cardsCopy[randomIndex]);
      // Remove selected card to avoid duplicates
      cardsCopy.splice(randomIndex, 1);
  }
  return randomCards;
}

function setBackgroundCards() {
  const backgroundCards = document.querySelectorAll('.background-card');
  const randomCards = getRandomCards(backgroundCards.length);
  
  backgroundCards.forEach((card, index) => {
      card.style.backgroundImage = `url('./assets/${randomCards[index].name}.jpg')`;
  });
}