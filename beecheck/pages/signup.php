<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BEECHECK - Sign Up Form</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="../styles/global.css">
    <link rel="stylesheet" href="../styles/login-signup.css">
</head>

<body>
<main>
    <div id="left_logo">
                <div class="logo_cont">
                    <img src="../assets/logo01.png" alt="Logo">
                </div>
    </div>      
    <div id="center">
            <section class="form-box" id="signup-form">
                <form id="signUpForm" action="../api/u_new_user.php" method="POST">
                    <div class="type-labeled">
                        <label for="newusername"><b>User Name</b></label>
                        <input type="text" placeholder="Enter User Name" name="newusername" required>
                        <label for="newuseremail"><b>Email</b></label>
                        <input type="email" placeholder="Enter Email" name="newuseremail" required>
                        <label for="newpassword"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="newpassword" required>
                        <label for="confirmnewpassword"><b>Confirm Password</b></label>
                        <input type="password" placeholder="Confirm Password" name="confirmnewpassword" required>
                        <label id="show-password-toggle" style="cursor: pointer; text-align: right; font-style: italic; font-size: 12px; display: block;">Show Password</label>
                        <div class="password-rules" id="password-rules">
                            <p>Password must contain:</p>
                            <p><input type="checkbox" id="length-check" disabled> At least 8 characters</p>
                            <p><input type="checkbox" id="uppercase-check" disabled> At least one uppercase letter</p>
                            <p><input type="checkbox" id="number-check" disabled> At least one number</p>
                            <p><input type="checkbox" id="special-check" disabled> At least one special character</p>
                        </div>
                        <button type="submit" style="margin-top: 25px" class="button">SIGN UP</button>
                        <div class="error-message" id="signup-error-message"></div>
                    </div>
                </form>
            </section>
    </div>
</div>
 
<script>
    document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.querySelector('input[name="newpassword"]');
    const confirmPasswordInput = document.querySelector('input[name="confirmnewpassword"]');
    const lengthCheck = document.getElementById('length-check');
    const uppercaseCheck = document.getElementById('uppercase-check');
    const numberCheck = document.getElementById('number-check');
    const specialCheck = document.getElementById('special-check');
    const signUpButton = document.querySelector('button[type="submit"]');
    const showPasswordToggle = document.getElementById('show-password-toggle'); // Show password label

    
    function validatePassword() {
        const password = passwordInput.value;
        lengthCheck.checked = password.length >= 8;
        uppercaseCheck.checked = /[A-Z]/.test(password);
        numberCheck.checked = /\d/.test(password);
        specialCheck.checked = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        signUpButton.disabled = !(lengthCheck.checked && uppercaseCheck.checked && numberCheck.checked && specialCheck.checked);
    }

  
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', function() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("Passwords do not match");
        } else {
            confirmPasswordInput.setCustomValidity("");
        }
    });

    showPasswordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
            showPasswordToggle.textContent = 'Hide Password'; // Change text to "Hide Password"
        } else {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
            showPasswordToggle.textContent = 'Show Password'; // Change text back to "Show Password"
        }
    });

    validatePassword();
});

</script> 

</body>
</html>



