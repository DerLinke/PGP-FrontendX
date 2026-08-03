<p align="center">
  <img src="https://derlinke.github.io/logo.svg" width="300" alt="Logo"><br>
  <strong>DerLinke Software Zentrale</strong><br>
  <a href="https://derlinke.github.io/">Offizielle Webseite</a> | <a href="https://github.com/DerLinke/PGP-FrontendX">GitHub Repository</a>
</p>

# PGP-FrontendX

Eine sichere, Web-basierte grafische Oberfläche für PGP-Verschlüsselung und Entschlüsselung.

Das gesamte Krypto-System läuft 100% lokal im Browser über **OpenPGP.js**. Keine privaten Schlüssel, Klartexte oder Passwörter verlassen jemals deinen Rechner! Das Backend dient ausschließlich der Authentifizierung, um das Frontend vor unbefugtem Zugriff zu schützen.

## Features
- **100% Lokale Kryptographie:** Verschlüsselung und Entschlüsselung finden ausschließlich im Browser statt.
- **Nachrichten & Dateien:** PGP-Verschlüsselung für beliebige Texte.
- **Schlüsselverwaltung:** Import und Speicherung von Public/Private Keys sicher im lokalen Browser Storage (LocalStorage).
- **Backend-Schutz:** Login-Schutz über PDO (PostgreSQL/MySQL), damit nur du Zugriff auf das Frontend hast.
- **Modernes Design:** Glassmorphism UI mit Tab-Steuerung und Responsive Design.

## Installation & Setup

1. **Voraussetzungen:** 
   Ein Webserver (z. B. Cosmos Cloud, Nginx, Apache) mit PHP und PDO-Erweiterung (PostgreSQL oder MySQL).

2. **Klonen & Konfigurieren:**
   Kopiere `config.php.example` zu `config.php` und trage deine Datenbank-Zugangsdaten ein.
   ```bash
   cp config.php.example config.php
   ```

3. **Datenbank vorbereiten:**
   Importiere die `schema.sql` in deine Datenbank und lege einen Benutzer an. 
   *(Tipp: Passwörter werden mit `password_hash()` in PHP generiert. Ein Beispiel-Insert für das Passwort "BallaBalla-123" lautet `$2y$10$tZ8k6Pq43Wj1dKx8Yt2n...`)*

4. **Security Check (Wichtig!):**
   Stelle sicher, dass die folgenden Dateien in deiner `.gitignore` stehen und niemals auf einen öffentlichen Server oder Gitea hochgeladen werden:
   ```gitignore
   .env
   config.php
   *.sqlite
   GEMINI.md
   ```

## Nutzung
1. Logge dich mit deinen Zugangsdaten über das Backend ein.
2. Wechsle auf den Tab **Schlüssel** und importiere deine bestehenden PGP Keys (Public und Private).
3. Wechsle auf **Verschlüsseln** oder **Entschlüsseln** und nutze die Keys direkt lokal.

---
<p align="center">
  <br>
  <br>
  <b>PGP-FrontendX</b> v1.0.0<br>
  <i>Secure your communications.</i>
</p>
