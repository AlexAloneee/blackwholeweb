// Параллакс эффект
document.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax-bg');
    const scrolled = window.pageYOffset;
    parallax.style.transform = `translateY(${scrolled * 0.4}px)`;
});

// Анимация при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('cyber-visible');
        }
    });
}, {threshold: 0.5});

document.querySelectorAll('.character-hologram, .weapon-card').forEach((el) => {
    observer.observe(el);
});

document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('[data-depth]').forEach(layer => {
        const depth = layer.getAttribute('data-depth');
        const x = (window.innerWidth - e.pageX * depth)/100;
        const y = (window.innerHeight - e.pageY * depth)/100;
        layer.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Анимация появления карточек
const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.setAttribute('data-scroll', entry.isIntersecting ? 'in' : 'out');
    });
}, {threshold: 0.3});

document.querySelectorAll('.story-card').forEach(el => {
    storyObserver.observe(el);
});

// Эффект наклона для изображений
document.querySelectorAll('[data-tilt]').forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = (e.clientX - rect.left)/img.offsetWidth - 0.5;
        const y = (e.clientY - rect.top)/img.offsetHeight - 0.5;
        img.style.transform = `perspective(1000px) rotateX(${y*10}deg) rotateY(${x*10}deg)`;
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'none';
    });
});
