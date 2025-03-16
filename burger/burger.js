function toggleMenu() {
    const nav = document.getElementById('burgerNav');
    nav.classList.toggle('active');
}

function checkScreenSize() {
    const burgerMenu = document.querySelector('.burger-menu');
    const bottomNav = document.querySelector('.bottom-nav');

    if (window.innerWidth <= 768) {
        burgerMenu.style.display = 'block';
        bottomNav.style.display = 'none';
    } else {
        burgerMenu.style.display = 'none';
        bottomNav.style.display = 'block';
    }
}

window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);
