// ===== Toy Story Shop - Main JavaScript =====

// Загрузка корзины из localStorage
function loadCart() {
    try {
        const cart = localStorage.getItem('toy-story-cart');
        return cart ? JSON.parse(cart) : {};
    } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
        return {};
    }
}

// Сохранение корзины в localStorage
function saveCart(cart) {
    try {
        localStorage.setItem('toy-story-cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Ошибка сохранения корзины:', error);
    }
}

// Обновление бейджа корзины
function updateCartBadge() {
    const cart = loadCart();
    const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
        
        // Принудительное центрирование текста
        badge.style.display = 'flex';
        badge.style.alignItems = 'center';
        badge.style.justifyContent = 'center';
        badge.style.textAlign = 'center';
        badge.style.lineHeight = '1';
        badge.style.padding = '0';
        badge.style.margin = '0';
    }
}

// Форматирование цены в рублях
function formatRUB(amount) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    initHeroBackground();
    initHomepageAnimations();
});

// Инициализация эффектов фонового изображения
function initHeroBackground() {
    const heroBg = document.getElementById('hero-bg');
    if (!heroBg) return;
    
    // Эффект параллакса при движении мыши
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;
        
        heroBg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    });
    
    // Эффект пульсации
    setInterval(() => {
        heroBg.style.filter = `brightness(${1 + Math.sin(Date.now() / 2000) * 0.1}) saturate(${1.2 + Math.sin(Date.now() / 3000) * 0.1})`;
    }, 50);
    
    // Эффект появления при загрузке без увеличения
    heroBg.style.opacity = '0';
    heroBg.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        heroBg.style.transition = 'opacity 2s ease, transform 2s ease';
        heroBg.style.opacity = '0.8';
        heroBg.style.transform = 'scale(0.8)';
    }, 500);
}

// Инициализация анимаций главной страницы
function initHomepageAnimations() {
    // Анимация появления карточек функций
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + index * 200);
    });
    
    // Анимация появления заголовка
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateX(0)';
        }, 100);
    }
    
    // Анимация появления текста
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            heroText.style.transition = 'opacity 1s ease, transform 1s ease';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateX(0)';
        }, 500);
    }
    
    // Анимация появления кнопки
    const heroButton = document.querySelector('.btn-primary');
    if (heroButton) {
        heroButton.style.opacity = '0';
        heroButton.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroButton.style.transition = 'opacity 1s ease, transform 1s ease';
            heroButton.style.opacity = '1';
            heroButton.style.transform = 'translateY(0)';
        }, 800);
    }
    
    // Добавляем интерактивность к карточкам функций
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Анимация логотипа при наведении
    const logoImage = document.querySelector('.logo-image');
    if (logoImage) {
        logoImage.addEventListener('mouseenter', () => {
            logoImage.style.animation = 'none';
            logoImage.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        logoImage.addEventListener('mouseleave', () => {
            logoImage.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Добавляем эффект печатания для заголовка
    typeWriterEffect();
    
    // Добавляем интерактивные облака
    initInteractiveClouds();
    
    // Убираем эффект частиц (желтые кружочки)
    // createParticleEffect();
    
    // Проверяем и инициализируем коня
    initHorseAnimation();
    
    // Добавляем дополнительные украшения
    addHomepageDecorations();
}

// Эффект печатания для заголовка
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid var(--accent-yellow)';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// Интерактивные облака
function initInteractiveClouds() {
    const clouds = document.querySelectorAll('.hero-cloud');
    
    clouds.forEach(cloud => {
        cloud.addEventListener('mouseenter', () => {
            cloud.style.transform = 'scale(1.2) translateY(-10px)';
            cloud.style.animation = 'none';
        });
        
        cloud.addEventListener('mouseleave', () => {
            cloud.style.transform = '';
            cloud.style.animation = 'float 6s ease-in-out infinite';
        });
    });
}

// Эффект частиц
function createParticleEffect() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Создаем частицы
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-yellow);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        heroSection.appendChild(particle);
    }
    
    // Добавляем CSS для анимации частиц
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translateY(0) translateX(0) scale(1);
                    opacity: 0.7;
                }
                25% {
                    transform: translateY(-20px) translateX(10px) scale(1.2);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-10px) translateX(-10px) scale(0.8);
                    opacity: 0.5;
                }
                75% {
                    transform: translateY(-30px) translateX(5px) scale(1.1);
                    opacity: 0.8;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Инициализация анимации коня
function initHorseAnimation() {
    const horse = document.getElementById('running-horse');
    if (!horse) {
        console.log('Конь не найден в DOM');
        return;
    }
    
    const horseImg = horse.querySelector('img');
    if (!horseImg) {
        console.log('Изображение коня не найдено');
        return;
    }
    
    // Проверяем загрузку изображения
    horseImg.onload = () => {
        console.log('Изображение коня загружено в футере');
        horse.style.opacity = '1';
    };
    
    horseImg.onerror = () => {
        console.log('Ошибка загрузки изображения коня');
        // Создаем заглушку без фона
        horse.innerHTML = '<div style="width: 80px; height: 60px; background: transparent; display: flex; align-items: center; justify-content: center; color: white; font-size: 30px;">🐎</div>';
        horse.style.opacity = '1';
    };
    
    // Устанавливаем начальную прозрачность
    horse.style.opacity = '0';
    horse.style.transition = 'opacity 1s ease';
    
    // Показываем коня через небольшую задержку
    setTimeout(() => {
        horse.style.opacity = '1';
    }, 1000);
}

// Дополнительные украшения для главной страницы
function addHomepageDecorations() {
    // Анимация логотипа при загрузке
    const logoImage = document.querySelector('.logo-image');
    if (logoImage) {
        logoImage.style.animation = 'logoBounce 2s ease-in-out infinite';
    }
    
    // Добавляем CSS для анимации логотипа
    if (!document.getElementById('logo-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'logo-animation-styles';
        style.textContent = `
            @keyframes logoBounce {
                0%, 100% {
                    transform: scale(1) rotate(0deg);
                }
                50% {
                    transform: scale(1.05) rotate(2deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Анимация кнопок при наведении (без увеличения)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '';
        });
    });
    
    // Анимация карточек функций при прокрутке
    const featureCards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'cardSlideIn 0.8s ease forwards';
            }
        });
    });
    
    featureCards.forEach(card => {
        observer.observe(card);
    });
    
    // Добавляем CSS для анимации карточек
    if (!document.getElementById('card-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'card-animation-styles';
        style.textContent = `
            @keyframes cardSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(50px) rotateX(20deg);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Убираем анимацию заголовка при наведении
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     heroTitle.addEventListener('mouseenter', () => {
    //         heroTitle.style.textShadow = '3px 3px 0 var(--accent-yellow), 6px 6px 0 var(--primary-blue)';
    //         heroTitle.style.transform = 'scale(1.02)';
    //     });
    //     
    //     heroTitle.addEventListener('mouseleave', () => {
    //         heroTitle.style.textShadow = '2px 2px 0 var(--accent-yellow)';
    //         heroTitle.style.transform = 'scale(1)';
    //     });
    // }
    
    // Плавающие элементы в hero-секции
    createFloatingElements();
    
    // Анимация новых секций
    initNewSectionsAnimations();
}

// Создание плавающих элементов
function createFloatingElements() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Создаем звездочки
    for (let i = 0; i < 8; i++) {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.innerHTML = '⭐';
        star.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            color: var(--accent-yellow);
            pointer-events: none;
            z-index: 2;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatStar ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        heroSection.appendChild(star);
    }
    
    // Добавляем CSS для анимации звездочек
    if (!document.getElementById('star-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'star-animation-styles';
        style.textContent = `
            @keyframes floatStar {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.7;
                }
                50% {
                    transform: translateY(-20px) rotate(180deg);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
