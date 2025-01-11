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
        // Usar el nuevo color #ac948a para el fondo de las imágenes
        img.style.background = '#ac948a';
    });

    // Actualizar los estilos de las category-cards
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

    // Actualizar los estilos de los product-lines
    const productLines = document.querySelectorAll('.product-line');
    productLines.forEach(line => {
        if (theme === 'dark') {
            line.style.background = '#2a2a2a';
            // Usar el color del título --accent-brown
            line.style.color = '#a67c52';
        } else {
            line.style.background = '';
            // Usar el color del título --accent-brown en modo claro también
            line.style.color = '#a67c52';
        }
    });

    // Actualizar los títulos h3 dentro de product-lines
    const productTitles = document.querySelectorAll('.product-line h3');
    productTitles.forEach(title => {
        if (theme === 'dark') {
            title.style.color = '#a67c52';
        } else {
            title.style.color = '';
        }
    });

    // Actualizar los títulos h3 dentro de category-cards
    const cardTitles = document.querySelectorAll('.category-card h3');
    cardTitles.forEach(title => {
        if (theme === 'dark') {
            title.style.color = '#ffffff';
        } else {
            title.style.color = '';
        }
    });

    // Actualizar los párrafos dentro de category-cards
    const cardParagraphs = document.querySelectorAll('.category-card p');
    cardParagraphs.forEach(p => {
        if (theme === 'dark') {
            p.style.color = '#cccccc';
        } else {
            p.style.color = '';
        }
    });

    // Actualizar los párrafos dentro de product-lines
    const productParagraphs = document.querySelectorAll('.product-line p');
    productParagraphs.forEach(p => {
        if (theme === 'dark') {
            // Usar el mismo color que los títulos
            p.style.color = '#a67c52';
        } else {
            // Usar el mismo color que los títulos en modo claro
            p.style.color = '#a67c52';
        }
    });
}

// El resto del código permanece igual
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('change', toggleTheme);
    
    document.documentElement.style.transition = 'all 0.3s ease-in-out';
});

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
prefersDarkScheme.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
});