<?php
date_default_timezone_set("Asia/Jakarta");
include '../class/handshake.php';
include '../class/class.global.php';

$username = $_POST['username'];
$password = $_POST['password'];

//  echo $username;
//  echo '<br>'; 
//  echo $usermail;
//  echo '<br>';
//  echo $password;
//  exit();

$db = new db();
$db->q("SELECT * FROM tbl_user WHERE user_name = '".$username."' AND password = '".$password."' ");
$checkusernamepass = $db->m();

if (count($checkusernamepass) > 0) {
    // exists
    $db = new db();
    $db->q("SELECT * FROM tbl_user WHERE user_name = '".$username."' AND password = '".$password."' ");
    $getit = $db->s();
    session_start();
    $_SESSION['beecheck_user'] = $getit['user_id'];
    echo '<script>location.replace("../pages/quiz.php");</script>';
} else {
    // not exist
    echo '<script>alert("User or Password is not found, please re-enter or SIGN UP");location.replace("../pages/signup.php");</script>';
}


?>





