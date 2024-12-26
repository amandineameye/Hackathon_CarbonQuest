# Informations pour les tests

## Serveurs

Pour tester l'api il faut activer les serveurs suivants :
1. Apache (via XAMPP / MAMP)
2. mySQL (via XAMPP / MAMP)
3. localhost:8000 (via la ligne de commande `php -S localhost:8000` dans un terminal ouvert en `/backend`)

## Base de données

URI code sql : `app/db/carbonquest.sql` <br />
* code contenant une instruction de construction de la bd et une instruction d'insertion de données pour les tests
* test avec le user pré-existant : Pseudo = User & Mot de passe = password

**Importer la bd :**
1. Dans XAMPP / MAMP, lancer les serveurs Apache et MySQL.
2. Dans un browser, ouvrir phpMyAdmin (localhost/phpmyadmin/).
3. Dans la barre de menu (horizontale), cliquer sur IMPORT (localhost/phpmyadmin/index.php?route=/server/import).
4. Uploader `carbonquest.sql` et cliquer sur le bouton Import en bas de page.
5. Vérifier qu'une base de données carbonquest est bien apparue dans le menu latéral gauche.

## Connexion API en XAMPP vs MAMP
-> màj 26 oct

Les informations pour la connexion à la base de donnée ne sont pas les mêmes selon si vous utiliser XAMPP ou MAMP.

Dans le fichier `app/config/dbconfig.php`, (dé)commenter la version de ces informations selon vos besoins.