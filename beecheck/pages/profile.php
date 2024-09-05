<?php
session_start();
date_default_timezone_set("Asia/Jakarta");
include '../class/handshake.php';
include '../class/class.global.php';
if (isset($_SESSION['beecheck_user']) && !empty($_SESSION['beecheck_user'])) {
    $logged_in_user = $_SESSION['beecheck_user'];
} else {
    session_destroy();   
    session_unset(); 
    echo '<script>location.href = "./";</script>';
    exit();
}

$db = new db();
$db->q("SELECT * FROM tbl_user WHERE user_id = '".$logged_in_user."' ");
$row = $db->s();

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BEECHECK - ACCOUNT PROFILE</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/profile.css">
</head>

<body>
<main>
        <div id="left_logo">
                <div class="logo_cont">
                    <img src="../assets/logo01.png" alt="Logo">
                </div>
        </div>  
     
        <div id="center"> 
        <div class="user_pro">    
            <section class="form-box-user" id="profile">
                <form id="userForm" method="post">
                <div class="userprofile">
                    <p>Hello, <?php echo $row['user_name']?></p>
                </div>
                    <div class="type-labeled">
                        <label for="email"><b>Email</b></label>
                        <input type="text" name="email"  value="<?php echo $row['email']?>">
                        <label for="password"><b>Password</b></label>
                        <input type="password" name="password"  value="<?php echo $row['password']?>">
                    </div>
                    <div class="profile-btn-cont">
                        <div class="profile-btn" style="margin-top: 150px";>
                            <button type="button" onclick="location.replace('../api/u_delprof.php?_=<?php echo $row['user_id']; ?>')">DELETE ACCOUNT</button>
                            <button type="submit" formaction="../api/u_updateprof.php">UPDATE PROFILE</button>

                        </div>
                    </div>
                    </form>
                </section>
            </div>
        </div>

          
        
        <div id="side">
            <div class="side-column">
                    <div class="contributor-btn" id="contributor">
                        <button type="submit">Become Contributor</button>
                    </div>
               
                    <div class="badge-icon-box" id="badge-icon-lvl">
                        <div class="badge-icon"><img src="../assets/badge.png" alt="badge award"></div>
                    </div>

                    <div class="playagain-btn" id="playagain-btn">
                        <button type="submit" onclick="window.location.href='../pages/quiz.php';">PLAY AGAIN</button>
                    </div>
               
            </div>
        </div>
     
</body>
</html>

