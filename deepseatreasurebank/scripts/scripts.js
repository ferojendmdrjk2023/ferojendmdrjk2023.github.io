
window.onload=function(){
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
};

// Define the toggleSideMenu function
        function toggleSideMenu() {
            const sideMenu = document.getElementById('side-menu');
            if (sideMenu.style.width === '100%') {
                sideMenu.style.width = '0';
            } else {
                sideMenu.style.width = '100%';
            }
        }


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
