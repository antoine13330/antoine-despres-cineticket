# Cineticket

## Description

Cineticket est un projet de gestion de tickets de cinéma développé principalement en TypeScript. Ce projet inclut des composants front-end en CSS et JavaScript.

## Installation

Pour installer et configurer le projet localement, suivez ces étapes :

1. **Clonez le dépôt :**

   ```sh
   git clone https://github.com/antoine13330/antoine-despres-cineticket.git
   cd antoine-despres-cineticket
   ```

2. **Installez les dépendances :**

   Assurez-vous d'avoir `npm` installé sur votre machine.

   ```sh
   npm install --force 
   ```

## Mode Développement

Pour lancer le projet en mode développement, utilisez la commande suivante :

```sh
npm run dev
```

Cela démarrera un serveur de développement et vous pourrez accéder au projet via `http://localhost:3000`.

## Déploiement

Pour déployer le projet en production, suivez ces étapes :

1. **Construisez le projet :**

   ```sh
   npm run build
   ```

   Cela génèrera un dossier `dist` contenant les fichiers de production.

2. **Déployez les fichiers générés :**

   Copiez le contenu du dossier `dist` sur votre serveur web.

### Déploiement sur Vercel

Ce projet est également déployé sur [Vercel](https://vercel.com/). Vous pouvez accéder à la version de production via l'URL suivante : [https://antoine-despres-cineticket.vercel.app](https://antoine-despres-cineticket.vercel.app).


## Spécificités Importantes

- **Langages Utilisés :**
  - TypeScript (98.3%)
  - CSS (1.4%)
  - JavaScript (0.3%)

- **Structure du Projet :**
  - `src/` : Contient le code source principal du projet.
  - `public/` : Contient les fichiers statiques.

- **Scripts Utiles :**
  - `npm run lint` : Lint le code pour détecter les erreurs de style et de syntaxe.
  - `npm run test` : Exécute les tests unitaires. Non présent dans cette version.

## Utilisation d'IndexedDB

Ce projet utilise IndexedDB pour le stockage local des données. IndexedDB est une solution de stockage côté client qui offre plusieurs avantages :

- **Stockage Hors-Ligne :** Permet aux utilisateurs d'accéder aux données même en l'absence de connexion Internet.
- **Performance :** IndexedDB permet un accès rapide aux données locales, améliorant ainsi les performances de l'application.
- **Capacité de Stockage :** IndexedDB offre une capacité de stockage plus importante comparée à d'autres solutions comme LocalStorage ou SessionStorage.

IndexedDB est utilisé dans ce projet pour stocker temporairement les données des tickets, ce qui améliore l'expérience utilisateur en permettant une interaction fluide et rapide avec l'application.

