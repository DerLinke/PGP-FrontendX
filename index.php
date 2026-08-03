<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PGP-FrontendX | Sichere Verschlüsselung</title>
    <!-- Modern Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="_css/style.css">
    <!-- OpenPGP.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/openpgp/5.10.1/openpgp.min.js"></script>
</head>
<body>
    <div class="glass-container">
        <header>
            <div class="logo">
                <img src="src/logo.png" alt="PGP-FrontendX Logo" width="40">
                <h1>PGP-FrontendX</h1>
            </div>
            <p>100% lokale Verschlüsselung im Browser.</p>
        </header>

        <main>
            <div class="tabs">
                <button class="tab-btn active" onclick="switchTab('encrypt')">Verschlüsseln</button>
                <button class="tab-btn" onclick="switchTab('decrypt')">Entschlüsseln</button>
                <button class="tab-btn" onclick="switchTab('keys')">Schlüssel</button>
            </div>

            <div id="encrypt" class="tab-content active">
                <h2>Nachricht oder Datei verschlüsseln</h2>
                <div class="form-group">
                    <label>Empfänger (Public Key):</label>
                    <select id="recipient-key">
                        <option value="">Bitte Schlüssel auswählen...</option>
                    </select>
                </div>
                <textarea id="encrypt-text" placeholder="Geben Sie hier Ihren Text ein..."></textarea>
                <button class="action-btn" onclick="encryptMessage()">Verschlüsseln</button>
                <div class="result-area" id="encrypt-result"></div>
            </div>

            <div id="decrypt" class="tab-content">
                <h2>Nachricht entschlüsseln</h2>
                <textarea id="decrypt-text" placeholder="PGP-Nachricht hier einfügen..."></textarea>
                <button class="action-btn" onclick="decryptMessage()">Entschlüsseln</button>
                <div class="result-area" id="decrypt-result"></div>
            </div>

            <div id="keys" class="tab-content">
                <h2>Schlüsselverwaltung</h2>
                <div class="key-import">
                    <textarea id="import-key-text" placeholder="Öffentlichen oder Privaten Schlüssel (ASCII Armor) einfügen..."></textarea>
                    <button class="action-btn" onclick="importKey()">Importieren</button>
                </div>
                <div class="key-list">
                    <h3>Gespeicherte Schlüssel</h3>
                    <ul id="key-list-ul"></ul>
                </div>
            </div>
        </main>

        <footer>
            <p>DerLinke Software Zentrale | <a href="https://derlinke.github.io/" target="_blank">Offizielle Webseite</a></p>
        </footer>
    </div>
    <script src="_js/app.js"></script>
</body>
</html>
