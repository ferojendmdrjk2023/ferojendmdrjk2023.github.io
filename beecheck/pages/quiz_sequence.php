<?php
session_start();
date_default_timezone_set("Asia/Jakarta");
include '../class/handshake.php';
include '../class/class.global.php';
if (isset($_GET["ret_quizid"])) {
    $ret_quizid = $_GET["ret_quizid"];
    $next_quizid = $ret_quizid + 1;
  }
  else {
    $ret_quizid = "";
  }

if (isset($_SESSION['beecheck_user']) && !empty($_SESSION['beecheck_user'])) {
    $logged_in_user = $_SESSION['beecheck_user'];
} else {
    echo 'NO USER LOGIN';
    session_destroy();   
    session_unset(); 
    echo '<script>location.href = "./";</script>';
    exit();
}

$db = new db();
$db->q("SELECT * FROM tbl_user WHERE user_id = '".$logged_in_user."' ");
$lu = $db->s();
$cmltv = $lu['cmltv_score'];
$thrownscoreai = '0';
$thrownscorehuman = '0';
if ($ret_quizid == '') {
    $db = new db();
    $db->q("SELECT *
    FROM `tbl_quiz`
    where image_weight > (SELECT cmltv_score FROM `tbl_user` WHERE user_id = '".$logged_in_user."')
    LIMIT 1");
    $hu = $db->s();
    $next_quizid = $hu['quiz_id'] + 1;
    if ($hu['made_by'] == 'AIGen-Art') {
        $thrownscoreai = '100';
        $thrownscorehuman = '0';
    } else {
        $thrownscoreai = '0';
        $thrownscorehuman = '100';
    }
} else {
    $db = new db();
    $db->q("SELECT *
    FROM `tbl_quiz`
    WHERE quiz_id = '".$ret_quizid."'
    LIMIT 1");
    $hu = $db->s();
    if ($hu['made_by'] == 'AIGen-Art') {
        $thrownscoreai = '100';
        $thrownscorehuman = '0';
    } else {
        $thrownscoreai = '0';
        $thrownscorehuman = '100';
    }
}

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
                    <div class="quiz-img"> 
                        <img src="<?php echo $hu['quiz_image']; ?>" alt="quiz-image">
                    </div>
                </div>
                     <div class="quiz-label">
                        <?php 
                        if ($cmltv<=1000){$lvl=1;}
                        else if ($cmltv>1000 && $cmltv<=2000){$lvl=2;}
                        else if ($cmltv>2000 && $cmltv<=3000){$lvl=3;}
                        else if ($cmltv>3000 && $cmltv<=4000){$lvl=4;}
                        else $lvl=5;                        ?>
                        <div class="label-bottom"><p1>Level: <?php echo $lvl ?></p1></div>
                    </div>
                    <div class="quiz-btn-cont">
                        <div class="answer-btn">
                                <button type="button" id="human-art-btn" class="button" onclick="location.replace('../api/quiz_seq_next.php?next_quizid=<?php echo $next_quizid; ?>&addedscore=<?php echo $thrownscorehuman; ?>')">Human-Art</button>
                                <button type="button" id="aigen-art-btn" class="button" onclick="location.replace('../api/quiz_seq_next.php?next_quizid=<?php echo $next_quizid; ?>&addedscore=<?php echo $thrownscoreai; ?>')">AI-Gen-Art</button>
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
                        <p style="padding-top: 16px; ">Today's Point: <?php echo number_format ($cmltv, 0); ?></p>
                        <p>Accuracy: <?php if($ret_quizid !="") { $accuracy=$cmltv/$ret_quizid;}
                        else  $accuracy=$cmltv/$next_quizid;
                        echo number_format($accuracy,2); ?> % </p>
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



                         