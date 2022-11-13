-- phpMyAdmin SQL Dump
-- version 5.2.0-1.fc36
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 16 oct. 2022 à 21:18
-- Version du serveur : 8.0.30
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `store_job`
--

-- --------------------------------------------------------

--
-- Structure de la table `advertisements`
--

CREATE TABLE `advertisements` (
  `advert_id` int NOT NULL,
  `user_id` int NOT NULL,
  `advert_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `advert_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `advert_contract` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `advert_contract_categories` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `advert_contract_type` tinyint(1) NOT NULL DEFAULT '0',
  `advert_contract_time` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `advert_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `advert_localisation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `advert_wages` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `advert_publication_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `advert_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `advert_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

CREATE TABLE `companies` (
  `id_companie` int NOT NULL,
  `id_advert` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_info`
--

CREATE TABLE `job_info` (
  `info_id` int NOT NULL,
  `advert_id` int NOT NULL,
  `user_id` int NOT NULL,
  `job_info_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_info_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_lastname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_firstname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_cv` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_society` tinyint(1) NOT NULL DEFAULT '0',
  `user_active` tinyint(1) NOT NULL DEFAULT '1',
  `user_admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `user_lastname`, `user_firstname`, `user_email`, `user_password`, `user_phone`, `user_cv`, `user_society`, `user_active`, `user_admin`) VALUES
(1, 'ADMIN', 'Admin', 'admin@gmail.com', '$2b$10$F5Mp9XDO.d6q0WMcuJDXteMY9gdQvSkDeqG9iQeu2dCvJ1SQO6ZYq', NULL, NULL, 0, 1, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `advertisements`
--
ALTER TABLE `advertisements`
  ADD PRIMARY KEY (`advert_id`);

--
-- Index pour la table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id_companie`);

--
-- Index pour la table `job_info`
--
ALTER TABLE `job_info`
  ADD PRIMARY KEY (`info_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`user_email`),
  ADD UNIQUE KEY `phone` (`user_phone`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `advert_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `companies`
--
ALTER TABLE `companies`
  MODIFY `id_companie` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `job_info`
--
ALTER TABLE `job_info`
  MODIFY `info_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
