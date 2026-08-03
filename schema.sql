-- PGP-FrontendX Datenbank-Struktur

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Beispiel für den Admin-User (Passwort: BallaBalla-123)
-- INSERT INTO `users` (`email`, `password_hash`) VALUES ('mail@dan.jetzt', '$2y$12$EgfiChsRJk/SR9OqNRHpvuoLEL1yh8.a9cT.dfcyeeTDgrPh8NXZS');
