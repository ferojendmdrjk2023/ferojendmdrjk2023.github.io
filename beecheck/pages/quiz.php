<?php
session_start();
date_default_timezone_set("Asia/Jakarta");
include '../class/handshake.php';
include '../class/class.global.php';
if (isset($_SESSION['beecheck_user']) && !empty($_SESSION['beecheck_user'])) {
    $logged_in_user = $_SESSION['beecheck_user'];
// } else {
//     echo 'YOUR SESSION IS ENDED. LOGIN TO CONTINUE';
//     session_destroy();   
//     session_unset(); 
//     // echo '<script>location.href = "./";</script>';
//      echo '<script>location.href = "./pages/login.php";</script>';
//     exit();
// }

} else {
    echo 'YOUR SESSION IS ENDED. LOGIN TO CONTINUE';
    session_destroy();   
    session_unset(); 
    echo '<script>alert("Your Session is ended. LOGIN AGAIN BRUH"); location.replace("../index.php");</script>';
    exit();
}

$db = new db();
$db->q("SELECT * FROM tbl_user WHERE user_id = '".$logged_in_user."' ");
$lu = $db->s();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BEECHECK - QUIZ</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../styles/global.css">
    <link rel="stylesheet" href="../styles/quiz.css">
</head>

<body>
    <main>
        <div id="left_logo">
                <div class="logo_cont">
                    <img src="../assets/logo01.png" alt="Logo">
                </div>
                <div class="profile-btn">
                        <button type="button" onclick="window.location.href='../pages/profile.php';" class="button">PROFILE</button>
                </div>    
                <div class="exit-btn">
                        <button type="button" onclick="location.replace('../api/u_logout.php?_=<?php echo $lu['user_id']; ?>');" class="button">LOG OUT</button>
                </div> 
        </div>  
        <div id="center">
            <section class="quiz-container" id="quiz">
                <div class="quiz-box">
                    <p1>Can you detect AI-Gen art? <br>
                    Sharpen your eye,<br>
                    spot the non-human-art<br></p1>
                    <div class="start-btn">
                        <button type="button" onclick="window.location.href='quiz_sequence.php';" class="button">START PLAYING</button>
                    </div>
                    </div>
                </div>
            </section>
        </div>

        <div id="side">
            <section class="user-point-form" id="point">
                <form id="pointForm">
                    <div class="point-labeled">
                        <h3> Hello,  <?php echo $lu['user_name']?></h3> 
                        <p style="padding-top: 16px; ">Today's Point:</p>
                        <p>Accuracy:</p>
                    </div>
                </form>
                    <div class="rank-btn">
                        <button type="button" onclick="window.location.href='../pages/leaderboard.php';" class="button">CHECK RANK</button>
                    </div> 
            </section>  
        </div> 
    </main>
    



</body>
</html>



