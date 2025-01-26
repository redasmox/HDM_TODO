# HDM Todo List - README

## Description

HDM Todo List est une application de gestion de tâches construite en utilisant **NestJS** pour le backend et **React** pour le frontend. Elle permet de :

- Créer des tâches.
- Modifier des tâches.
- Supprimer des tâches.
- Afficher toutes les tâches existantes.
- Recherche et filtrage des tâches.

L'application utilise **Prisma** comme ORM et **MySQL** comme base de données.

---

## Choix techniques

### Backend : NestJS

- **NestJS** 
- **Prisma ORM** 
- **API REST** 

### Frontend : React

- **React** 
- **Material-UI (MUI)**

### Base de données : MySQL

- **MySQL** 

---

## Défis rencontrés

### Problème avec Prisma

Lors de l'utilisation de Prisma, l'injection du service Prisma dans certains fichiers a causé des erreurs de compilation.

### Gestion des états dans le frontend

La mise à jour locale des tâches dans React a nécessité une gestion minutieuse pour éviter les conflits entre l'état local et les données récupérées depuis l'API.

### Synchronisation entre le frontend et le backend

Assurer que les tâches créées, modifiées ou supprimées sur le frontend sont immédiatement reflétées dans la base de données via des appels API.

---

## Décisions prises

- Utilisation de **React State** pour gérer les tâches localement avant de synchroniser avec le backend.
- Mise en place de contrôles pour désactiver le bouton "Enregistrer" si aucune modification n'a été apportée à une tâche.
- Ajout de vérifications dans le backend pour éviter les erreurs lors de la mise à jour ou de la suppression des tâches inexistantes.

---

## Commandes pour tester le projet

### Prérequis

- Node.js (version 16 ou supérieure)
- Yarn (gestionnaire de packages)
- Docker (pour MySQL)

### Installation

1. **Cloner le projet** :

   ```bash
   git clone https://github.com/redasmox/HDM_TODO
   cd test
   ```

2. **Configurer la base de données** :

   - Créer la base de données :
     ```sql
     CREATE DATABASE hdm_todo;
     ```
   - Vérifier que les informations de connexion dans le fichier `.env` sont correctes.

3. **Installer les dépendances du backend** :

   ```bash
   cd backend
   yarn install
   ```

4. **Appliquer les migrations Prisma** :

   ```bash
   yarn prisma migrate dev
   ```

5. **Lancer le backend** :

   ```bash
   yarn start:dev
   ```

6. **Installer les dépendances du frontend** :

   ```bash
   cd ../frontend
   yarn install
   ```

7. **Lancer le frontend** :

   ```bash
   yarn dev
   ```

---

## Utilisation

1. **Accéder à l'application** :

   - Frontend : [http://localhost:5173] 

2. **Actions possibles** :

   - Ajouter une tâche via le champ "Nouvelle tâche" et le bouton "Ajouter une tâche".
   - Modifier une tâche existante en changeant son texte et en cliquant sur l'icône de check (✔).
   - Supprimer une tâche via l'icône de poubelle (🗑).
   - Recherche et filtrage des tâches.

---

## Structure du projet

- **Backend** : Situé dans le dossier `backend/`.
- **Frontend** : Situé dans le dossier `frontend/`.
- **Base de données** : Gérée par MySQL localement.

---

