<?php


require_once 'auth-guard.php';

$username = htmlspecialchars($_SESSION['username']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Tedy Fruit Store</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body class="dashboard-page-body">
    <main class="container">
        <div class="card dashboard-content">
            <h2>Selamat Datang di Dashboard, <strong><?php echo $username; ?></strong>!</h2>
            <p>Ini adalah halaman yang dilindungi. cuma admin yang bisa akses awokaowkawkow</p>
            <div class="btn-group">
                <a href="index.php" class="btn">Lihat Toko</a>
                <a href="logout.php" class="btn btn--ghost">Logout</a>
            </div>
        </div>
    </main>
</body>
</html>