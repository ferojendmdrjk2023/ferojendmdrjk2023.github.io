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

// Validate signup form
function validateSignupForm() {
    const password = document.querySelector("input[name='psw']").value;
    const confirmPassword = document.querySelector("input[name='psw-repeat']").value;
    
    const passwordRules = [
        /[a-z]/,       // At least one lowercase letter
        /[A-Z]/,       // At least one uppercase letter
        /\d/,          // At least one number
        /[^A-Za-z0-9]/,// At least one special character
        /.{8,}/        // At least 8 characters
    ];

    let valid = true;
    passwordRules.forEach(rule => {
        if (!rule.test(password)) {
            valid = false;
        }
    });

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (!valid) {
        alert("Password does not meet the required criteria.");
        return false;
    }

    return true;
}

//CONTACT FORM
document.addEventListener('DOMContentLoaded', () => {
    function closeContactForm() {
        window.location.href = 'index.html';
    }
    
    function validateForm(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const product = document.getElementById('product').value;
        const recaptcha = document.querySelector('.g-recaptcha-response').value;
        
        if (!name || !email || !phone || !product || !recaptcha) {
            alert('Please fill in all fields and complete the reCAPTCHA.');
            return false;
        }
        
        // Submit the form or do any further processing here.
        alert('Form submitted successfully!');
        document.getElementById('contact-form').reset();
        closeContactForm();
    }
    
    window.closeContactForm = closeContactForm;
    window.validateForm = validateForm;
});