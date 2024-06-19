<?php
$db_host = 'localhost';
$db_name = 'id22278938_pendataran';
$db_user = 'root';
$db_pass = '@Arifok123';

$con = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}
?>
