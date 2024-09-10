<?php
session_start();
date_default_timezone_set("Asia/Jakarta");
include '../class/handshake.php';
include '../class/class.global.php';
if (isset($_SESSION['beecheck_user']) && !empty($_SESSION['beecheck_user'])) {
    $logged_in_user = $_SESSION['beecheck_user'];
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
    <title>BEECHECK - Weekly Leaderboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../styles/global.css">
    <link rel="stylesheet" href="../styles/leaderboard.css">
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
        <h2>Top 10 Players</h2>
        <section class="quiz-container" id="ldb">
            <div class="leaderboard">
                <table>
                    <tr>
                        <th><p1>Rank</p1></th>
                        <th><p1>Player</p1></th>
                        <th><p1>Points</p1></th>
                    </tr>
                    <?php
                    $db=new db();
                    $db->q("SELECT user_name, cmltv_score FROM tbl_user ORDER BY cmltv_score DESC LIMIT 10");
                    $ldb = $db->m();
                    if ($ldb) {
                        foreach ($ldb as $index => $ldb_entry) {
                            echo "<tr>";
                            echo "<td class='rank'>" . ($index + 1) . "</td>";
                            echo "<td>". $ldb_entry['user_name'] . "</td>";
                            echo "<td class='points'>" . number_format($ldb_entry['cmltv_score'],0) . "</td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='3'>No players found</td></tr>";
                    }
                    ?>
                </table>
            </div> 
        </div> 
        <div id="side">
            <div class="side-column">
                    <div class="playagain-btn" id="playagain-btn" style="margin-top: 250px;">
                        <button type="submit" onclick="window.location.href='../pages/quiz.php';" class= "button">PLAY AGAIN</button>
                    </div>
               
            </div>
        </div>
     
</main>
 /body>
</html>



                         