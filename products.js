// ===== Toy Story Shop - Products Page =====

// Данные о товарах с локальными изображениями
const productsData = [
    {
        id: 'woody',
        name: 'Woody',
        priceRUB: 1499,
        imageURL: 'Woody.png',
        description: 'Ковбой Вуди — отважный лидер игрушек и верный друг.',
        category: 'main'
    },
    {
        id: 'buzz',
        name: 'Buzz Lightyear',
        priceRUB: 1999,
        imageURL: 'Buzz Lightyear.png',
        description: 'Космический рейнджер Базз Лайтер — к бесконечности и дальше!',
        category: 'main'
    },
    {
        id: 'jessie',
        name: 'Jessie',
        priceRUB: 1299,
        imageURL: 'Jessie.png',
        description: 'Джесси — весёлая и энергичная ковбойша из банды Вуди.',
        category: 'main'
    },
    {
        id: 'rex',
        name: 'Rex',
        priceRUB: 999,
        imageURL: 'Rex.png',
        description: 'Рекс — добрый динозавр, который боится своего рыка.',
        category: 'friends'
    },
    {
        id: 'hamm',
        name: 'Hamm',
        priceRUB: 799,
        imageURL: 'Hamm.png',
        description: 'Хэмм — саркастичная свинья-копилка с острым умом.',
        category: 'friends'
    },
    {
        id: 'slinky',
        name: 'Slinky Dog',
        priceRUB: 1099,
        imageURL: 'Slinky Dog.png',
        description: 'Слинки — верный пёс-пружинка, всегда готов помочь друзьям.',
        category: 'friends'
    },
    {
        id: 'bopeep',
        name: 'Bo Peep',
        priceRUB: 1599,
        imageURL: 'Bo Peep.png',
        description: 'Бо Пип — храбрая и независимая пастушка.',
        category: 'main'
    },
    {
        id: 'alien',
        name: 'Alien (Little Green Men)',
        priceRUB: 499,
        imageURL: 'Alien (Little Green Men).png',
        description: 'Зелёные человечки — поклонники Когти и верные друзья.',
        category: 'aliens'
    }
];

// Инициализация страницы товаров
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(productsData);
    setupSearch();
});

// Отображение товаров
function displayProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; font-size: 1.2rem; color: #666;">Товары не найдены 😔</p>';
        return;
    }
    
    products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

// Создание карточки товара
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${escapeHtml(product.imageURL)}" 
             alt="${escapeHtml(product.name)}" 
             class="product-image"
             loading="lazy"
             onerror="this.src='https://via.placeholder.com/400x400/CCCCCC/666666?text=${encodeURIComponent(product.name)}'">
        <div class="product-info">
            <h3 class="product-name">${escapeHtml(product.name)}</h3>
            <p class="product-description">${escapeHtml(product.description)}</p>
            <div class="product-price">${formatRUB(product.priceRUB)}</div>
            <button class="btn btn-primary" data-product-id="${product.id}">
                Добавить в корзину
            </button>
        </div>
    `;
    
    // Обработчик добавления в корзину
    const button = card.querySelector('button');
    button.addEventListener('click', (e) => {
        addToCart(product.id);
        showNotification();
        animateToCart(e.target, product);
    });
    
    return card;
}

// Добавление товара в корзину
function addToCart(productId) {
    const cart = loadCart();
    cart[productId] = (cart[productId] || 0) + 1;
    saveCart(cart);
    updateCartBadge();
}

// Показ уведомления
function showNotification() {
    const notification = document.getElementById('add-to-cart-notification');
    if (!notification) return;
    
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 2000);
}

// Настройка поиска
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayProducts(productsData);
            return;
        }
        
        const filtered = productsData.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filtered);
    });
}

// Анимация полета товара в корзину
function animateToCart(button, product) {
    // Получаем позицию кнопки
    const buttonRect = button.getBoundingClientRect();
    
    // Получаем позицию иконки корзины
    const cartIcon = document.querySelector('.cart-icon');
    const cartRect = cartIcon.getBoundingClientRect();
    
    // Создаем летящий элемент
    const flyingItem = document.createElement('div');
    flyingItem.className = 'flying-item';
    flyingItem.innerHTML = `<img src="${product.imageURL}" alt="${product.name}">`;
    
    // Устанавливаем начальную позицию
    flyingItem.style.left = buttonRect.left + buttonRect.width / 2 - 30 + 'px';
    flyingItem.style.top = buttonRect.top + buttonRect.height / 2 - 30 + 'px';
    
    // Добавляем в DOM
    document.body.appendChild(flyingItem);
    
    // Запускаем анимацию
    setTimeout(() => {
        flyingItem.classList.add('animate');
        
        // Устанавливаем конечную позицию
        flyingItem.style.left = cartRect.left + cartRect.width / 2 - 30 + 'px';
        flyingItem.style.top = cartRect.top + cartRect.height / 2 - 30 + 'px';
    }, 10);
    
    // Удаляем элемент после анимации
    setTimeout(() => {
        if (flyingItem.parentNode) {
            flyingItem.parentNode.removeChild(flyingItem);
        }
    }, 800);
}

// Экранирование HTML для безопасности
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
