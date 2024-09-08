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



$newuseremail = $_POST['email'];
$newpassword = $_POST['password'];


// echo $newusername;
// echo '<br>'; 
// echo $newuseremail;
// echo '<br>';
// echo $newpassword;
// exit();

$db = new db();
$db->q("
UPDATE tbl_user SET
    email = '".$newuseremail."',
    password = '".$newpassword."'
WHERE user_id = '".$logged_in_user."'
");
$db->x();




echo '<script>alert("Profile Update. Login to start.");location.replace("../pages/login.php");</script>';
?>
