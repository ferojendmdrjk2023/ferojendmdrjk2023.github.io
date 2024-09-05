<?php
date_default_timezone_set("Asia/Jakarta");
include '../class/handshake.php';
include '../class/class.global.php';


$newusername = $_POST['newusername'];
$newuseremail = $_POST['newuseremail'];
$newpassword = $_POST['newpassword'];
$newconfirmationpw = $_POST['confirmnewpassword'];


// echo $newusername;
// echo '<br>'; 
// echo $newuseremail;
// echo '<br>';
// echo $newpassword;
// exit();

$db = new db();
$db->q("
INSERT INTO tbl_user (user_name, email, password, cmltv_score)
VALUES ('".$newusername."','".$newuseremail."','".$newpassword."','')
");
$db->x();

echo '<script>alert("You are set. Login to start.");location.replace("../pages/login.php");</script>';



?>




