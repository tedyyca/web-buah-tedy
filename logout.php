<?php
session_start();  //untuk mengakses fungsi session

session_unset();

session_destroy();

// Redirect ke halaman login
header('Location: login.php');
exit();
?>