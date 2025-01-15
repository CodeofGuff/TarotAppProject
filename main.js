import { cards } from "./cards.js";

function drawRandomCard() {
  const card = cards[Math.floor(Math.random() * cards.length)];
  const cardPlaceholder = document.querySelector(".card-placeholder");
  const cardDescription = document.querySelector(".card-description");

  // Clear placeholder and create new image
  cardPlaceholder.innerHTML = "";
  const img = document.createElement("img");
  img.className = "card-image";
  img.src = `./assets/${card.name}.jpg`;
  img.alt = card.name;

  // Add image to placeholder and update description
  cardPlaceholder.appendChild(img);
  cardDescription.textContent = card.meaning;
}

function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("show");
}

function hidePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("show");
}

let clickCount = 0;
// Handle card drawing with popup
function handleCardDraw() {

  if (document.querySelector(".card-image")) {
    clickCount++;
    if (clickCount === 2) {
      showPopup();
      clickCount = 0;
    }
  } else {
    drawRandomCard();
    clickCount = 0;
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
confirmButton.addEventListener("click", () => {
  hidePopup();
  drawRandomCard();
});

cancelButton.addEventListener("click", hidePopup);

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
