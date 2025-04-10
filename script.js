// Initialize Telegram Web App
Telegram.WebApp.ready();
Telegram.WebApp.expand();

// Cards array with phrases in Komi and Russian
const cards = [
    { komi: "Позьӧ-ӧ латте сёйны?", russian: "Можно мне латте?" },
    { komi: "Лоас-ӧ гожӧм?", russian: "А лето то будет?" },
    { komi: "Пыр нин!", russian: "Отвали уже!" },
    { komi: "Ме сӧмын видзӧда, ог торк", russian: "Я просто смотрю, не трогаю" },
    { komi: "Кӧні менам кофе?", russian: "Где мой кофе?" },
    { komi: "Мед некутшӧм драма оз ло", russian: "Давай без драм" },
    { komi: "Тайӧ менам гӧрд флаг", russian: "Это мой красный флаг" },
    { komi: "Яснӧй!", russian: "Чётенько!" }
];

// Shuffle the cards array
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle cards initially
shuffleCards(cards);

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
    // Always show a valid card
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
    }
}

// Flip card function
function flipCard() {
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

// Go to next card - show a random card
function nextCard() {
    // Get a random index different from the current one
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * cards.length);
    } while (newIndex === currentCardIndex && cards.length > 1);
    
    currentCardIndex = newIndex;
    displayCard(currentCardIndex);
}

// Add event listeners for buttons
flipButton.addEventListener('click', flipCard);
nextButton.addEventListener('click', nextCard);

// Swipe handling
let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
    // Swipe left - next card (always works since we're showing random cards infinitely)
    if (touchendX < touchstartX - 50) {
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