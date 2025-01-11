// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Configurar el toggle del tema
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('change', toggleTheme);
    
    // Configurar la transición suave para cambios de tema
    document.documentElement.style.transition = 'all 0.3s ease-in-out';

    // Inicializar filtros de productos
    initializeProductFilters();

    // Inicializar eventos de productos
    initializeProducts();
});

// Función para establecer el tema
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
   
    // Actualizar el estado del toggle
    const toggle = document.getElementById('theme-toggle');
    toggle.checked = theme === 'dark';

    // Actualizar los colores de fondo de los placeholder-img
    const placeholderImages = document.querySelectorAll('.placeholder-img');
    placeholderImages.forEach(img => {
        img.style.background = '#ac948a';
    });

    updateDarkModeStyles(theme);
}

// Función para actualizar estilos en modo oscuro
function updateDarkModeStyles(theme) {
    // Actualizar category-cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        if (theme === 'dark') {
            card.style.background = '#2a2a2a';
            card.style.color = '#ffffff';
        } else {
            card.style.background = '';
            card.style.color = '';
        }
    });

    // Actualizar product-lines
    const productLines = document.querySelectorAll('.product-line');
    productLines.forEach(line => {
        if (theme === 'dark') {
            line.style.background = '#2a2a2a';
            line.style.color = '#a67c52';
        } else {
            line.style.background = '';
            line.style.color = '#a67c52';
        }
    });

    // Actualizar títulos y párrafos
    updateTextStyles(theme);
}

// Función para actualizar estilos de texto
function updateTextStyles(theme) {
    // Títulos de product-lines
    document.querySelectorAll('.product-line h3').forEach(title => {
        title.style.color = '#a67c52';
    });

    // Títulos de category-cards
    document.querySelectorAll('.category-card h3').forEach(title => {
        title.style.color = theme === 'dark' ? '#ffffff' : '';
    });

    // Párrafos de category-cards
    document.querySelectorAll('.category-card p').forEach(p => {
        p.style.color = theme === 'dark' ? '#cccccc' : '';
    });

    // Párrafos de product-lines
    document.querySelectorAll('.product-line p').forEach(p => {
        p.style.color = '#a67c52';
    });
}

// Función para alternar el tema
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Función para inicializar filtros de productos
function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const products = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProducts(button.getAttribute('data-filter'), products);
        });
    });
}

// Función para filtrar productos
function filterProducts(filter, products) {
    products.forEach(product => {
        const productLine = product.getAttribute('data-line');
        const shouldShow = filter === 'todos' || filter === productLine;

        if (shouldShow) {
            product.classList.remove('hidden');
            setTimeout(() => product.classList.add('visible'), 10);
        } else {
            product.classList.remove('visible');
            setTimeout(() => product.classList.add('hidden'), 300);
        }
    });
}

// Función para inicializar productos
function initializeProducts() {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        product.classList.add('visible');
        product.addEventListener('click', () => {
            const productName = product.getAttribute('data-name');
            const price = parseFloat(product.getAttribute('data-price'));
            contactWhatsApp(productName, price);
        });
    });
}

// Función para contactar por WhatsApp
function contactWhatsApp(productName, price) {
    const phoneNumber = '5493875877277';
    const message = `¡Hola! Estoy interesadx en el ${productName} de $${price.toLocaleString()}. ¿Me podrías dar más información?`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

// Detectar preferencia del sistema
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
prefersDarkScheme.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
});