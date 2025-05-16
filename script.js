// Данные товаров
const products = [
    {
        id: 1,
        name: "Реалистичный дилдо 'Монстр'",
        price: 2499,
        image: "https://via.placeholder.com/300x300?text=Dildo+1",
        badge: "Хит",
        description: "Реалистичный дилдо из медицинского силикона с текстурой, имитирующей натуральную кожу. Длина 20 см, диаметр 4 см. Идеально подходит для разнообразия интимной жизни."
    },
    {
        id: 2,
        name: "Вибратор 'Нежность'",
        price: 1899,
        image: "https://via.placeholder.com/300x300?text=Dildo+2",
        badge: "Новинка",
        description: "Мощный вибратор с 10 режимами вибрации. Водонепроницаемый, сделан из безопасного силикона. Работает от батареек AAA (в комплект не входят)."
    },
    {
        id: 3,
        name: "Анальный стимулятор 'Глубина'",
        price: 1599,
        image: "https://via.placeholder.com/300x300?text=Dildo+3",
        description: "Специально разработан для анального удовольствия. Имеет удобное основание для безопасного использования. Материал - медицинский силикон."
    },
    {
        id: 4,
        name: "Дилдо 'Гигант' XXL",
        price: 3499,
        image: "https://via.placeholder.com/300x300?text=Dildo+4",
        badge: "XXL",
        description: "Для настоящих ценителей больших размеров. Длина 30 см, диаметр 6 см. Мягкий, но упругий медицинский силикон обеспечивает непередаваемые ощущения."
    },
    {
        id: 5,
        name: "Двойной дилдо 'Пара'",
        price: 2999,
        image: "https://via.placeholder.com/300x300?text=Dildo+5",
        description: "Уникальный двойной дилдо для парного использования. Позволяет получать удовольствие одновременно двум партнерам. Материал - гипоаллергенный силикон."
    },
    {
        id: 6,
        name: "Вибродилдо 'Экстаз'",
        price: 2799,
        image: "https://via.placeholder.com/300x300?text=Dildo+6",
        badge: "Выбор покупателей",
        description: "Комбинация классического дилдо и мощного вибратора. 15 режимов вибрации, беспроводное управление, водонепроницаемый корпус. Зарядка через USB."
    }
];

// Корзина
let cart = [];

// DOM элементы
const productGrid = document.getElementById('product-grid');
const cartCount = document.querySelector('.cart-count');
const modal = document.getElementById('product-modal');
const modalProductView = document.getElementById('modal-product-view');
const closeModal = document.querySelector('.close');

// Отображение товаров
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price.toLocaleString()} ₽</div>
                <div class="product-actions">
                    <a href="#" class="btn view-details" data-id="${product.id}">Подробнее</a>
                    <a href="#" class="btn add-to-cart" data-id="${product.id}">В корзину</a>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Добавляем обработчики событий
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(button.getAttribute('data-id'));
            showProductModal(productId);
        });
    });
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(button.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Показать модальное окно с товаром
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        modalProductView.innerHTML = `
            <div class="modal-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-product-info">
                <h2>${product.name}</h2>
                <div class="modal-product-price">${product.price.toLocaleString()} ₽</div>
                <div class="modal-product-description">
                    <p>${product.description}</p>
                </div>
                <div class="modal-product-actions">
                    <a href="#" class="btn add-to-cart" data-id="${product.id}">Добавить в корзину</a>
                </div>
            </div>
        `;
        
        // Добавляем обработчик события для кнопки в модальном окне
        document.querySelector('.modal-product-actions .add-to-cart').addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(productId);
            modal.style.display = 'none';
        });
        
        modal.style.display = 'block';
    }
}

// Добавить товар в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartCount();
        showNotification(`"${product.name}" добавлен в корзину`);
    }
}

// Обновить счетчик корзины
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Показать уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Закрыть модальное окно при клике на крестик
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрыть модальное окно при клике вне его
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // Добавляем стили для уведомлений
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #ff6b9d;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
        }
        
        .notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});