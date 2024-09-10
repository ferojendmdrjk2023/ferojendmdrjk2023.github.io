<?php
session_start();
date_default_timezone_set("Asia/Jakarta");
include '../class/handshake.php';
include '../class/class.global.php';

$user_id = $_GET['_'];

$db = new db();
$db->q("
DELETE FROM tbl_user WHERE user_id = '".$user_id."'
");
$db->x();

session_destroy();   
session_unset(); 
echo '<script>alert("Succesfully delete profile.");location.replace("../");</script>';
exit();
?>

<script>location.replace('../pages/index.php');</script>