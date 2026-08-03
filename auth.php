<?php
session_start();

// Config for Open Source Release
// Users should change these credentials in their own deployment
$CONFIG = [
    'ADMIN_USER' => 'mail@dan.jetzt',
    // Hash for 'BallaBalla-123'
    'ADMIN_HASH' => '$2y$12$EgfiChsRJk/SR9OqNRHpvuoLEL1yh8.a9cT.dfcyeeTDgrPh8NXZS'
];

if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';
    
    if ($user === $CONFIG['ADMIN_USER'] && password_verify($pass, $CONFIG['ADMIN_HASH'])) {
        $_SESSION['logged_in'] = true;
        $_SESSION['username'] = $user;
        header("Location: index.php");
        exit;
    } else {
        $error = "Falscher Benutzername oder Passwort!";
    }
}

// Function to protect pages
function require_login() {
    if (empty($_SESSION['logged_in'])) {
        show_login_form();
        exit;
    }
}

function show_login_form() {
    global $error;
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PGP-FrontendX | Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="_css/style.css">
    <style>
        .login-container {
            max-width: 400px;
            margin: 0 auto;
            text-align: center;
        }
        .login-form {
            text-align: left;
            margin-top: 30px;
        }
        .error {
            color: #e74c3c;
            background: rgba(231, 76, 60, 0.1);
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        input {
            width: 100%;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--glass-border);
            color: #fff;
            padding: 12px;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
            transition: border 0.3s ease;
            margin-bottom: 15px;
        }
        input:focus {
            border-color: var(--primary);
        }
    </style>
</head>
<body>
    <div class="glass-container login-container">
        <header>
            <div class="logo">
                <img src="src/logo.png" alt="Logo" width="40">
                <h1>Login</h1>
            </div>
            <p>Geschützter Bereich</p>
        </header>

        <main>
            <?php if(!empty($error)): ?>
                <div class="error"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>

            <form method="POST" class="login-form">
                <div class="form-group">
                    <label>E-Mail Adresse</label>
                    <input type="email" name="username" required placeholder="name@domain.com">
                </div>
                <div class="form-group">
                    <label>Passwort</label>
                    <input type="password" name="password" required placeholder="••••••••">
                </div>
                <button type="submit" name="login" class="action-btn">Einloggen</button>
            </form>
        </main>
    </div>
</body>
</html>
<?php
}
?>
