  // плавное появление блоков
document.addEventListener('DOMContentLoaded', () => {
const elements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
  entry.target.classList.add('visible');
  observer.unobserve(entry.target); 
}
});
}, {
threshold: 0.2 
});

elements.forEach(element => observer.observe(element));
});




const themes = [
  {
    primary: "#ff00ff",
    secondary: "#00ffff",
    background: "#000",
    text: "#EAEAEA"
  },
  {
    primary: "#FF2E63",
    secondary: "#08D9D6",
    background: "#000",
    text: "#EAEAEA"
  },
  {
    primary: "#7CFC00",
    secondary: "#8B00FF", 
    background: "#000000",
    text: "#EAEAEA"
  },
];

// Загрузка сохраненной темы
let currentTheme = parseInt(localStorage.getItem('theme')) || 0;

// Применяем сохраненную тему при загрузке
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const savedTheme = themes[currentTheme];

  root.style.setProperty("--primary-color", savedTheme.primary);
  root.style.setProperty("--secondary-color", savedTheme.secondary);
  root.style.setProperty("--background-dark", savedTheme.background);
  root.style.setProperty("--text-color", savedTheme.text);
});

function toggleTheme() {
  currentTheme = (currentTheme + 1) % themes.length;

  // Сохраняем текущую тему
  localStorage.setItem('theme', currentTheme);

  const root = document.documentElement;
  const newTheme = themes[currentTheme];

  root.style.setProperty("--primary-color", newTheme.primary);
  root.style.setProperty("--secondary-color", newTheme.secondary);
  root.style.setProperty("--background-dark", newTheme.background);
  root.style.setProperty("--text-color", newTheme.text);
}
