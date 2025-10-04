<?php
session_start();

if (isset($_SESSION['username'])) {
    header('Location: dashboard.php');
    exit();
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username === 'admin' && $password === 'admin') {
        $_SESSION['username'] = $username;
        header('Location: dashboard.php');
        exit();
    } else {
        $error = 'Username atau password salah!';
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Tedy Fruit Store</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body class="login-page-body">
    <main class="container">
        <div class="card login-card">
            <h2 style="text-align: center; color: var(--accent-strong);">Login Admin</h2>
            
            <?php if ($error): ?>
                <div class="error-message"><?php echo $error; ?></div>
            <?php endif; ?>

            <form class="contact-form" action="login.php" method="POST" style="grid-template-columns: 1fr;">
                <div>
                    <label for="username">Username</label>
                    <input id="username" name="username" type="text" placeholder="Masukkan username" required />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="Masukkan password" required />
                </div>
                <div class="contact-actions">
                    <button class="btn" type="submit">Login</button>
                </div>
                 <div style="text-align: center; margin-top: 15px;">
                    <a href="index.php">Kembali ke Toko</a>
                </div>
            </form>
        </div>
    </main>
</body>
</html>