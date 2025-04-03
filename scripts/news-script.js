// Фон с частицами
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, size, color, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed;
    }

    update() {
        this.x += Math.sin(this.speed) * 2;
        this.y += Math.cos(this.speed) * 2;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 5,
            `hsl(${Math.random() * 360}, 100%, 50%)`,
            Math.random() * 2
        ));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Обратный отсчет до релиза
function updateCountdown() {
    const releaseDate = new Date('2024-12-15T00:00:00');
    const now = new Date();
    const diff = releaseDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.querySelector('.countdown-digit:nth-child(1)').textContent = days.toString().padStart(2, '0');
    document.querySelector('.countdown-digit:nth-child(3)').textContent = hours.toString().padStart(2, '0');
    document.querySelector('.countdown-digit:nth-child(5)').textContent = minutes.toString().padStart(2, '0');
    
    // Анимация разделителей
    const separators = document.querySelectorAll('.countdown-separator');
    separators.forEach(sep => {
        sep.style.opacity = sep.style.opacity === '0' ? '1' : '0';
    });
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Параллакс эффект для карточек новостей
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.news-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
});

// Эффект наведения на кнопки
const buttons = document.querySelectorAll('.news-btn, .watch-btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.boxShadow = `0 0 20px ${getComputedStyle(btn).borderColor}`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = 'none';
    });
});

// Анимация появления элементов при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.news-card, .timeline-item, .stream-widget').forEach(el => {
    observer.observe(el);
    el.classList.add('fade-in');
});

// Появление блоков при скролле
const sections = document.querySelectorAll(".news-section");
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => sectionObserver.observe(section));