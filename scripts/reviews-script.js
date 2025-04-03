document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviewsContainer');
    const reviewForm = document.getElementById('reviewForm');

    // Загрузка сохраненных отзывов
    function loadReviews() {
        const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviewsContainer.innerHTML = storedReviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-author">${review.author}</div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-content">${review.content}</div>
            </div>
        `).join('');
    }

    // Сохранение отзыва
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newReview = {
            id: Date.now(),
            author: document.getElementById('name').value,
            email: document.getElementById('email').value,
            content: document.getElementById('content').value,
            date: new Date().toLocaleDateString()
        };

        const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        storedReviews.unshift(newReview);
        localStorage.setItem('reviews', JSON.stringify(storedReviews));

        reviewForm.reset();
        loadReviews();
    });

    // Инициализация
    loadReviews();
});
