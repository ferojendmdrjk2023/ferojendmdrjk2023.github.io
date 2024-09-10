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
    echo '<script>location.href = "./pages/login.php";</script>';
    exit();
}


// Retrieve the next quiz ID and the added score
if (isset($_GET['next_quizid']) && isset($_GET['addedscore'])) {
    $next_quizid = $_GET['next_quizid'];
    $addedscore = $_GET['addedscore'];


// Retrieve the current score
    // $logged_in_user = $_POST['user_id'];
    $db = new db();
    $db->q("SELECT cmltv_score FROM tbl_user WHERE user_id = '".$logged_in_user."'");
    $db->s(); 
    $user_data = $db->s();

// Validation ISTRUE
// $db = new db();
// $db->q("SELECT * FROM tbl_quiz"); 

// Calculate the new score
    if ($user_data) {
        $cur_score = $user_data['cmltv_score'];
        $new_score = $cur_score + $addedscore;

// for display true.png or false.png image after redirect
    if ($addedscore == 100)
    {
        $isTrue = 1; //it will display true.png
    }
    else {
        $isTrue = 2;
    }

// Update the cumulative score 
    $db = new db();
    $db->q("
    UPDATE tbl_user SET 
        cmltv_score = '".$new_score."' 
        WHERE user_id = '".$logged_in_user."'
    ");
    $db->x();


// Redirect to the next quiz
    echo '<script>location.replace("../pages/quiz_sequence.php?ret_quizid='.$next_quizid.'&isTrue='.$isTrue.'");</script>';
} else {
    echo '<script>alert("Error: Missing parameters.");</script>';
}
}

//     // Redirect to the next quiz
//     echo '<script>location.replace("../pages/quiz_sequence.php?ret_quizid='.$next_quizid.'");</script>';
// } else {
//     echo '<script>alert("Error: Missing parameters.");</script>';
// }
// }

?>





