// ===== Toy Story Shop - Cart Page =====

// Данные о товарах (дублируем из products.js)
const productsData = [
    {
        id: 'woody',
        name: 'Woody',
        priceRUB: 1499,
        imageURL: 'Woody.png',
        description: 'Ковбой Вуди — отважный лидер игрушек и верный друг.'
    },
    {
        id: 'buzz',
        name: 'Buzz Lightyear',
        priceRUB: 1999,
        imageURL: 'Buzz Lightyear.png',
        description: 'Космический рейнджер Базз Лайтер — к бесконечности и дальше!'
    },
    {
        id: 'jessie',
        name: 'Jessie',
        priceRUB: 1299,
        imageURL: 'Jessie.png',
        description: 'Джесси — весёлая и энергичная ковбойша из банды Вуди.'
    },
    {
        id: 'rex',
        name: 'Rex',
        priceRUB: 999,
        imageURL: 'Rex.png',
        description: 'Рекс — добрый динозавр, который боится своего рыка.'
    },
    {
        id: 'hamm',
        name: 'Hamm',
        priceRUB: 799,
        imageURL: 'Hamm.png',
        description: 'Хэмм — саркастичная свинья-копилка с острым умом.'
    },
    {
        id: 'slinky',
        name: 'Slinky Dog',
        priceRUB: 1099,
        imageURL: 'Slinky Dog.png',
        description: 'Слинки — верный пёс-пружинка, всегда готов помочь друзьям.'
    },
    {
        id: 'bopeep',
        name: 'Bo Peep',
        priceRUB: 1599,
        imageURL: 'Bo Peep.png',
        description: 'Бо Пип — храбрая и независимая пастушка.'
    },
    {
        id: 'alien',
        name: 'Alien (Little Green Men)',
        priceRUB: 499,
        imageURL: 'Alien (Little Green Men).png',
        description: 'Зелёные человечки — поклонники Когти и верные друзья.'
    }
];

// Инициализация страницы корзины
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    setupCartActions();
    initCartAnimations();
});

// Отображение корзины
function displayCart() {
    const cart = loadCart();
    const cartContainer = document.getElementById('cart-container');
    const cartEmpty = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartContainer) return;
    
    const cartItems = Object.entries(cart);
    
    if (cartItems.length === 0) {
        cartContainer.classList.add('hidden');
        cartSummary.classList.add('hidden');
        cartEmpty.classList.remove('hidden');
        // Запускаем анимацию пустой корзины
        setTimeout(() => animateEmptyCart(), 100);
        return;
    }
    
    cartContainer.classList.remove('hidden');
    cartSummary.classList.remove('hidden');
    cartEmpty.classList.add('hidden');
    
    cartContainer.innerHTML = '';
    
    let totalItems = 0;
    let totalPrice = 0;
    
    cartItems.forEach(([productId, quantity]) => {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;
        
        const itemElement = createCartItem(product, quantity);
        cartContainer.appendChild(itemElement);
        
        totalItems += quantity;
        totalPrice += product.priceRUB * quantity;
    });
    
    // Обновляем итоги
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = formatRUB(totalPrice);
    
    // Запускаем анимации
    setTimeout(() => {
        animateCartItems();
        animateCartSummary();
    }, 100);
}

// Создание элемента товара в корзине
function createCartItem(product, quantity) {
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.dataset.productId = product.id;
    
    const itemTotal = product.priceRUB * quantity;
    
    item.innerHTML = `
        <img src="${escapeHtml(product.imageURL)}" 
             alt="${escapeHtml(product.name)}" 
             class="cart-item-image"
             loading="lazy"
             onerror="this.src='https://via.placeholder.com/100x100/CCCCCC/666666?text=${encodeURIComponent(product.name)}'">
        <div class="cart-item-info">
            <h3>${escapeHtml(product.name)}</h3>
            <p class="cart-item-price">${formatRUB(product.priceRUB)} × ${quantity} = ${formatRUB(itemTotal)}</p>
        </div>
        <div class="cart-item-controls">
            <div class="quantity-controls">
                <button class="quantity-btn decrease-btn" data-product-id="${product.id}">−</button>
                <span class="quantity-value">${quantity}</span>
                <button class="quantity-btn increase-btn" data-product-id="${product.id}">+</button>
            </div>
            <button class="remove-btn" data-product-id="${product.id}">Удалить</button>
        </div>
    `;
    
    // Обработчики событий
    item.querySelector('.decrease-btn').addEventListener('click', () => decreaseQuantity(product.id));
    item.querySelector('.increase-btn').addEventListener('click', () => increaseQuantity(product.id));
    item.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(product.id));
    
    return item;
}

// Увеличение количества
function increaseQuantity(productId) {
    const cart = loadCart();
    cart[productId] = (cart[productId] || 0) + 1;
    saveCart(cart);
    updateCartBadge();
    displayCart();
}

// Уменьшение количества
function decreaseQuantity(productId) {
    const cart = loadCart();
    if (cart[productId] > 1) {
        cart[productId]--;
        saveCart(cart);
    } else {
        removeFromCart(productId);
        return;
    }
    updateCartBadge();
    displayCart();
}

// Удаление товара из корзины
function removeFromCart(productId) {
    const cart = loadCart();
    delete cart[productId];
    saveCart(cart);
    updateCartBadge();
    displayCart();
}

// Настройка действий корзины
function setupCartActions() {
    const clearBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите очистить корзину?')) {
                clearCart();
            }
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            showCheckoutModal();
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            hideCheckoutModal();
            clearCart();
            window.location.href = 'index.html';
        });
    }
}

// Очистка корзины
function clearCart() {
    saveCart({});
    updateCartBadge();
    displayCart();
}

// Показ модального окна оформления заказа
function showCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// Скрытие модального окна
function hideCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Экранирование HTML для безопасности
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Инициализация анимаций корзины
function initCartAnimations() {
    // Анимация появления элементов корзины
    const cartContainer = document.getElementById('cart-container');
    const cartEmpty = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');
    
    if (cartContainer && !cartContainer.classList.contains('hidden')) {
        animateCartItems();
    }
    
    if (cartEmpty && !cartEmpty.classList.contains('hidden')) {
        animateEmptyCart();
    }
    
    if (cartSummary && !cartSummary.classList.contains('hidden')) {
        animateCartSummary();
    }
}

// Анимация товаров в корзине
function animateCartItems() {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

// Анимация пустой корзины
function animateEmptyCart() {
    const emptyIcon = document.querySelector('.empty-icon');
    const emptyTitle = document.querySelector('.cart-empty h3');
    const emptyText = document.querySelector('.cart-empty p');
    const emptyButton = document.querySelector('.cart-empty .btn');
    
    if (emptyIcon) {
        emptyIcon.style.opacity = '0';
        emptyIcon.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            emptyIcon.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            emptyIcon.style.opacity = '1';
            emptyIcon.style.transform = 'scale(1)';
        }, 200);
    }
    
    if (emptyTitle) {
        emptyTitle.style.opacity = '0';
        emptyTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            emptyTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            emptyTitle.style.opacity = '1';
            emptyTitle.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (emptyText) {
        emptyText.style.opacity = '0';
        emptyText.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            emptyText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            emptyText.style.opacity = '1';
            emptyText.style.transform = 'translateY(0)';
        }, 800);
    }
    
    if (emptyButton) {
        emptyButton.style.opacity = '0';
        emptyButton.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            emptyButton.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            emptyButton.style.opacity = '1';
            emptyButton.style.transform = 'translateY(0)';
        }, 1000);
    }
}

// Анимация итогов корзины
function animateCartSummary() {
    const summaryRows = document.querySelectorAll('.summary-row');
    const cartActions = document.querySelector('.cart-actions');
    
    summaryRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            row.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, index * 200);
    });
    
    if (cartActions) {
        cartActions.style.opacity = '0';
        cartActions.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            cartActions.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            cartActions.style.opacity = '1';
            cartActions.style.transform = 'translateY(0)';
        }, 600);
    }
}