<?php
session_start();
date_default_timezone_set("Asia/Jakarta");
include '../class/handshake.php';
include '../class/class.global.php';
session_destroy();   
session_unset(); 
if (isset($_SESSION['beecheck_user']) && !empty($_SESSION['beecheck_user'])) {
    $logged_in_user = $_SESSION['beecheck_user'];
} else {
    echo 'YOUR SESSION IS ENDED.';
    session_destroy();   
    session_unset(); 
    echo '<script>location.href = "./";</script>';
    exit();
}

echo '<script>alert("You have been LOG OUT"); location.replace("../index.php");</script>';


?>