document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const sideMenu = document.getElementById('side-menu');
    const closeBtn = document.querySelector('.side-menu .close-btn');
    const sideMenuLoginButton = document.querySelector('.side-menu .login-container button');

    hamburger.addEventListener('click', () => {
        sideMenu.style.width = '100%';
    });

    closeBtn.addEventListener('click', () => {
        sideMenu.style.width = '0';
    });

    sideMenuLoginButton.addEventListener('click', () => {
        openModal('login-form');
        sideMenu.style.width = '0';
    });
});

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openSignupForm() {
    closeModal('login-form');
    openModal('signup-form');
}

window.onclick = function(event) {
    if (event.target == document.getElementById('login-form')) {
        closeModal('login-form');
    }
    if (event.target == document.getElementById('signup-form')) {
        closeModal('signup-form');
    }
}

function validateSignupForm() {
    // Add your signup form validation logic here
    return false;
}

function switchToSignup() {
    closeModal('login-form');
    openModal('signup-form');
}

function redirectToHomepage() {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('putithere');
    const moreBtn = document.getElementById('seemore');
    const eachofit = '<div class="sp-card"><img src="images/promo.jpg" alt="Small treasure"><h3>Small treasure</h3></div>';
    let currentCount = 0;

    function addProducts(count) {
        let productsHTML = '';
        for (let i = 0; i < count; i++) {
            productsHTML += eachofit;
        }
        productGrid.innerHTML += productsHTML;
        currentCount += count;
    }

    // Initial load
    addProducts(4);

    moreBtn.addEventListener('click', () => {
        addProducts(4);
        if (currentCount >= 20) {
            moreBtn.style.display = 'none';
        }
    });
});
