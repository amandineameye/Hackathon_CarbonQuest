<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <title>Document</title>
</head>

<body>

    <?php

    // 1. Obtenir les données du formulaire 
    // $titre = $_POST['titre'];
    // $description = $_POST['description'];
    // $duree = $_POST['duree'];

use Faker\Factory;

    // $faker = Factory::create();

    // 2. Connecter à la BD (PDO)
    include "./dbconfig.php";

    try {
        // essayer de connecter
        $cnx = new PDO(DSN, USERNAME, PASSWORD);
    } catch (Exception $e) {
        // problème de connexion!!
        // instructions à suivre en cas de 
        // problème de connexion
        print("<h3>Un problème est survenu</h3>");
        print("<img src='./image.jpg'>");
        print("<a href='./accueil.php'>Accueil</a>");

        // var_dump ($e->getMessage());
        die();
    }

    // 3. Créer une requête du type INSERT
    $sql = "SELECT * FROM question, answer";
    // $sql = "SELECT * FROM score";

    // 4. Préparer la requête
    $stmt = $cnx->prepare($sql); // pbjet PDOStatement

    // $stmt->bindValue(":idUser", 1);
    // $stmt->bindValue(":value", rand(20,258));

    // 5. Lancer la requête
    $stmt->execute();

    // 6. Recuperer donnees
    $arrayResp = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // for ($i = 0; $i < 4; $i++){
    //     var_dump($arrayResp[$i]);
    // }
    var_dump($arrayResp);



    ?>
</body>

</html>