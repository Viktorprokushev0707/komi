// u0418u043du0438u0446u0438u0430u043bu0438u0437u0430u0446u0438u044f Telegram Web App
Telegram.WebApp.ready();
Telegram.WebApp.expand(); // u0420u0430u0441u043au0440u044bu0432u0430u0435u043c u043fu0440u0438u043bu043eu0436u0435u043du0438u0435 u043du0430 u0432u0435u0441u044c u044du043au0440u0430u043d

// u041cu0430u0441u0441u0438u0432 u043au0430u0440u0442u043eu0447u0435u043a u0441 u0444u0440u0430u0437u0430u043cu0438 u043du0430 u043au043eu043cu0438 u0438 u0440u0443u0441u0441u043au043eu043c
const cards = [
    { komi: "u041fu043eu0437u044cu04e7-u04e7 u043bu0430u0442u0442u0435 u0441u0451u0439u043du044b?", russian: "u041cu043eu0436u043du043e u043cu043du0435 u043bu0430u0442u0442u0435?" },
    { komi: "u041bu043eu0430u0441-u04e7 u0433u043eu0436u04e7u043c?", russian: "u0410 u043bu0435u0442u043e u0442u043e u0431u0443u0434u0435u0442?" },
    { komi: "u041fu044bu0440 u043du0438u043d!", russian: "u041eu0442u0432u0430u043bu0438 u0443u0436u0435!" }
];

// u0418u043du0434u0435u043au0441 u0442u0435u043au0443u0449u0435u0439 u043au0430u0440u0442u043eu0447u043au0438 u0438 u0444u043bu0430u0433 u043fu0435u0440u0435u0432u043eu0440u043eu0442u0430
let currentCardIndex = 0;
let isFlipped = false;

// u041fu043eu043bu0443u0447u0430u0435u043c u0441u0441u044bu043bu043au0438 u043du0430 u044du043bu0435u043cu0435u043du0442u044b DOM
const flashcard = document.getElementById('flashcard');
const komiText = document.getElementById('komi-text');
const russianText = document.getElementById('russian-text');
const nextButton = document.getElementById('next-button');
const flipButton = document.getElementById('flip-button');

/**
 * u041eu0442u043eu0431u0440u0430u0436u0430u0435u0442 u043au0430u0440u0442u043eu0447u043au0443 u0441 u0443u043au0430u0437u0430u043du043du044bu043c u0438u043du0434u0435u043au0441u043eu043c
 * @param {number} index - u0418u043du0434u0435u043au0441 u043au0430u0440u0442u043eu0447u043au0438 u0432 u043cu0430u0441u0441u0438u0432u0435 cards
 */
function displayCard(index) {
    if (index >= 0 && index < cards.length) {
        // u0423u0441u0442u0430u043du0430u0432u043bu0438u0432u0430u0435u043c u0442u0435u043au0441u0442u044b u043du0430 u043au043eu043cu0438 u0438 u0440u0443u0441u0441u043au043eu043c
        komiText.textContent = cards[index].komi;
        russianText.textContent = cards[index].russian;
        
        // u0421u0431u0440u0430u0441u044bu0432u0430u0435u043c u043fu0435u0440u0435u0432u043eu0440u043eu0442 u043fu0440u0438 u043fu043eu043au0430u0437u0435 u043du043eu0432u043eu0439 u043au0430u0440u0442u043eu0447u043au0438
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
        }
        isFlipped = false;
        
        // u0410u043au0442u0438u0432u0438u0440u0443u0435u043c u043au043du043eu043fu043au0438
        flipButton.disabled = false;
        nextButton.disabled = false;
        flipButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';
    } else {
        // u0415u0441u043bu0438 u043au0430u0440u0442u043eu0447u043au0438 u0437u0430u043au043eu043du0447u0438u043bu0438u0441u044c
        komiText.textContent = "u041au0430u0440u0442u043eu0447u043au0438 u0437u0430u043au043eu043du0447u0438u043bu0438u0441u044c!";
        russianText.textContent = "";
        
        // u0421u043au0440u044bu0432u0430u0435u043c u043au043du043eu043fu043au0438
        flipButton.style.display = 'none';
        nextButton.style.display = 'none';
        
        // u0423u0431u0438u0440u0430u0435u043c u043fu0435u0440u0435u0432u043eu0440u043eu0442, u0435u0441u043bu0438 u043eu043d u0431u044bu043b
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
        }
    }
}

/**
 * u041fu0435u0440u0435u0432u043eu0440u0430u0447u0438u0432u0430u0435u0442 u043au0430u0440u0442u043eu0447u043au0443
 */
function flipCard() {
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

/**
 * u041fu0435u0440u0435u0445u043eu0434u0438u0442 u043a u0441u043bu0435u0434u0443u044eu0449u0435u0439 u043au0430u0440u0442u043eu0447u043au0435
 */
function nextCard() {
    currentCardIndex++;
    displayCard(currentCardIndex);
}

// u0414u043eu0431u0430u0432u043bu044fu0435u043c u043eu0431u0440u0430u0431u043eu0442u0447u0438u043au0438 u0441u043eu0431u044bu0442u0438u0439 u0434u043bu044f u043au043du043eu043fu043eu043a
flipButton.addEventListener('click', flipCard);
nextButton.addEventListener('click', nextCard);

// --- u041eu0431u0440u0430u0431u043eu0442u043au0430 u0441u0432u0430u0439u043fu043eu0432 ---
let touchstartX = 0;
let touchendX = 0;

/**
 * u041eu0431u0440u0430u0431u0430u0442u044bu0432u0430u0435u0442 u0436u0435u0441u0442 u0441u0432u0430u0439u043fu0430
 */
function handleGesture() {
    // u0421u0432u0430u0439u043f u0432u043bu0435u0432u043e - u0441u043bu0435u0434u0443u044eu0449u0430u044f u043au0430u0440u0442u043eu0447u043au0430
    if (touchendX < touchstartX - 50 && currentCardIndex < cards.length - 1) {
        nextCard();
    }
    // u041cu043eu0436u043du043e u0434u043eu0431u0430u0432u0438u0442u044c u0441u0432u0430u0439u043f u0432u043fu0440u0430u0432u043e u0434u043bu044f u043fu0440u0435u0434u044bu0434u0443u0449u0435u0439 u043au0430u0440u0442u043eu0447u043au0438, u0435u0441u043bu0438 u043du0443u0436u043du043e
    // else if (touchendX > touchstartX + 50 && currentCardIndex > 0) {
    //   currentCardIndex--;
    //   displayCard(currentCardIndex);
    // }
}

/**
 * u041eu0431u0440u0430u0431u043eu0442u0447u0438u043a u043du0430u0447u0430u043bu0430 u043au0430u0441u0430u043du0438u044f
 */
function handleTouchStart(e) {
    touchstartX = e.changedTouches[0].screenX;
}

/**
 * u041eu0431u0440u0430u0431u043eu0442u0447u0438u043a u043eu043au043eu043du0447u0430u043du0438u044f u043au0430u0441u0430u043du0438u044f
 */
function handleTouchEnd(e) {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
}

// u0414u043eu0431u0430u0432u043bu044fu0435u043c u043eu0431u0440u0430u0431u043eu0442u0447u0438u043au0438 u0441u0432u0430u0439u043fu0430
flashcard.addEventListener('touchstart', handleTouchStart, { passive: true });
flashcard.addEventListener('touchend', handleTouchEnd, { passive: true });

// --- u041fu0440u0438u043cu0435u043du0435u043du0438u0435 u0442u0435u043cu044b Telegram ---
/**
 * u041fu0440u0438u043cu0435u043du044fu0435u0442 u0446u0432u0435u0442u043eu0432u0443u044e u0442u0435u043cu0443 Telegram u043a u044du043bu0435u043cu0435u043du0442u0430u043c u0438u043du0442u0435u0440u0444u0435u0439u0441u0430
 */
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

// u041fu0440u0438u043cu0435u043du044fu0435u043c u0442u0435u043cu0443 u043fu0440u0438 u0437u0430u0433u0440u0443u0437u043au0435 u0438 u043fu0440u0438 u0438u0437u043cu0435u043du0435u043du0438u0438 u0442u0435u043cu044b
applyTelegramTheme();
Telegram.WebApp.onEvent('themeChanged', applyTelegramTheme);

// u041eu0442u043eu0431u0440u0430u0436u0430u0435u043c u043fu0435u0440u0432u0443u044e u043au0430u0440u0442u043eu0447u043au0443 u043fu0440u0438 u0437u0430u0433u0440u0443u0437u043au0435
displayCard(currentCardIndex);