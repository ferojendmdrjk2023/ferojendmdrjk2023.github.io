<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BEECHECK - Login Form</title>
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
            <h4>Login to play</h4>
            <section class="form-box" id="login">
                <form action = "../api/u_authentication.php" onsubmit = "return validation()" method = "POST">
                    <div class="type-labeled">
                        <label for="username"><b>User Name</b></label>
                        <input type="text" placeholder="Enter User Name" name="username" required>
                        <label for="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" required>
                        <div class="button-container">
                            <button type="submit" class= "button">LOGIN</button>
                            <div class="signup-container">
                                <p><b>Not a member yet? <span><a href="../pages/signup.php" class="signup-link" style="font-weight: 600">Sign Up</a></span></b></p>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </main>

</body>
</html>