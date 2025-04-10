// Initialize Telegram Web App
Telegram.WebApp.ready();
Telegram.WebApp.expand();

// Cards array with phrases in Komi and Russian
const cards = [
    { komi: "Позьӧ-ӧ латте сёйны?", russian: "Можно мне латте?" },
    { komi: "Лоас-ӧ гожӧм?", russian: "А лето то будет?" },
    { komi: "Пыр нин!", russian: "Отвали уже!" }
];

// Current card index and flip state
let currentCardIndex = 0;
let isFlipped = false;

// Get DOM elements
const flashcard = document.getElementById('flashcard');
const komiText = document.getElementById('komi-text');
const russianText = document.getElementById('russian-text');
const nextButton = document.getElementById('next-button');
const flipButton = document.getElementById('flip-button');

// Display card with given index
function displayCard(index) {
    if (index >= 0 && index < cards.length) {
        // Set texts
        komiText.textContent = cards[index].komi;
        russianText.textContent = cards[index].russian;
        
        // Reset flip state for new card
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
        }
        isFlipped = false;
        
        // Enable buttons
        flipButton.disabled = false;
        nextButton.disabled = false;
        flipButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';
    } else {
        // No more cards
        komiText.textContent = "Карточки закончились!";
        russianText.textContent = "";
        
        // Hide buttons
        flipButton.style.display = 'none';
        nextButton.style.display = 'none';
        
        // Reset flip state
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
        }
    }
}

// Flip card function
function flipCard() {
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

// Go to next card
function nextCard() {
    currentCardIndex++;
    displayCard(currentCardIndex);
}

// Add event listeners for buttons
flipButton.addEventListener('click', flipCard);
nextButton.addEventListener('click', nextCard);

// Swipe handling
let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
    // Swipe left - next card
    if (touchendX < touchstartX - 50 && currentCardIndex < cards.length - 1) {
        nextCard();
    }
}

function handleTouchStart(e) {
    touchstartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
}

// Add swipe handlers
flashcard.addEventListener('touchstart', handleTouchStart, { passive: true });
flashcard.addEventListener('touchend', handleTouchEnd, { passive: true });

// Apply Telegram theme colors
function applyTelegramTheme() {
    const themeParams = Telegram.WebApp.themeParams;
    if (themeParams) {
        document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color || '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color || '#000000');
        document.documentElement.style.setProperty('--tg-theme-hint-color', themeParams.hint_color || '#aaaaaa');
        document.documentElement.style.setProperty('--tg-theme-link-color', themeParams.link_color || '#007bff');
        document.documentElement.style.setProperty('--tg-theme-button-color', themeParams.button_color || '#007bff');
        document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color || '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', themeParams.secondary_bg_color || '#f0f0f0');
    }
}

// Apply theme on load and when theme changes
applyTelegramTheme();
Telegram.WebApp.onEvent('themeChanged', applyTelegramTheme);

// Display first card on load
displayCard(currentCardIndex);