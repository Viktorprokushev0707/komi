// Инициализация Telegram Web App
Telegram.WebApp.ready();
Telegram.WebApp.expand(); // Раскрываем приложение на весь экран

const cards = [
    { komi: "Позьӧ-ӧ латте сёйны?", russian: "Можно мне латте?" },
    { komi: "Лоас-ӧ гожӧм?", russian: "А лето то будет?" },
    { komi: "Пыр нин!", russian: "Отвали уже!" }
];

let currentCardIndex = 0;
let isFlipped = false;

const flashcard = document.getElementById('flashcard');
const komiText = document.getElementById('komi-text');
const russianText = document.getElementById('russian-text');
const nextButton = document.getElementById('next-button');

function displayCard(index) {
    if (index >= 0 && index < cards.length) {
        komiText.textContent = cards[index].komi;
        russianText.textContent = cards[index].russian;
        // Сбрасываем состояние переворота при показе новой карточки
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
        }
        isFlipped = false;
    } else {
        // Если карточки закончились (можно добавить сообщение или зациклить)
        komiText.textContent = "Карточки закончились!";
        russianText.textContent = "";
        nextButton.disabled = true; // Отключаем кнопку "Следующая"
         if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
        }
    }
}

function flipCard() {
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

function nextCard() {
    currentCardIndex++;
    displayCard(currentCardIndex);
}

// Обработчик клика по карточке для переворота
flashcard.addEventListener('click', flipCard);

// Обработчик клика по кнопке "Следующая"
nextButton.addEventListener('click', nextCard);

// Отображаем первую карточку при загрузке
displayCard(currentCardIndex);

// --- Дополнительно: обработка свайпов (простая реализация) ---
let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
  if (touchendX < touchstartX - 50) { // Свайп влево - следующая карточка
    nextCard();
  }
  // Можно добавить свайп вправо для предыдущей карточки, если нужно
  // if (touchendX > touchstartX + 50) {
  //   // prevCard();
  // }
}

flashcard.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
}, { passive: true }); // Используем passive для лучшей производительности

flashcard.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  handleGesture();
}, { passive: true });

// --- Инициализация цвета темы из Telegram ---
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

// Применяем тему при загрузке и при изменении темы
applyTelegramTheme();
Telegram.WebApp.onEvent('themeChanged', applyTelegramTheme);

