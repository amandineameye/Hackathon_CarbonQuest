<?php

    class DataGateway {
        
        // propriété random null juste pour que ça compte comme classe
        private $db = null;

        public function __construct($db)
        {
            $this->db = $db;
        }

        public function getQnA()
        {
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


        }

        public function findUser()
        {

        }

        public function insertScore()
        {
            
        }

        public function findScore()
        {
            
        }

        public function updateScore()
        {
            
        }

    }