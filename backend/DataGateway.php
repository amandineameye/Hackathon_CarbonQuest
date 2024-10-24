<?php

    class DataGateway {
        
        // propriété random null juste pour que ça compte comme classe
        private $db = null;

        public function __construct($db)
        {
            $this->db = $db;
        }

        public function getAllQuestions()
{   
    // Requête SQL pour récupérer toutes les questions
    $sql = "SELECT id AS idQuestion, content AS question FROM question";

    try {
        // Préparer la requête
        $stmt = $this->db->prepare($sql);

        // Exécuter la requête
        $stmt->execute();

        // Récupérer les résultats
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Retourner les résultats ou un tableau vide si aucun résultat n'est trouvé
        return $results ?: [];

    } catch (PDOException $e) {
        echo "Erreur lors de la récupération des questions : " . $e->getMessage();
        return [];
    }


}

public function getAllAnswers()
{   
    // Requête SQL pour récupérer toutes les réponses
    $sql = "SELECT id AS idAnswer, value AS response, question_id AS idQuestion FROM answer";

    try {
        // Préparer la requête
        $stmt = $this->db->prepare($sql);

        // Exécuter la requête
        $stmt->execute();

        // Récupérer les résultats
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Retourner les résultats ou un tableau vide si aucun résultat n'est trouvé
        return $results ?: [];

    } catch (PDOException $e) {
        echo "Erreur lors de la récupération des réponses : " . $e->getMessage();
        return [];
    }
}


            // Appel pour récupérer les questions et les réponses
            // $questionsResponses = $dataGateway->getQuestionsAndResponses();
            // if (!empty($questionsResponses)) {
            //     foreach ($questionsResponses as $item) {
            //         echo "ID Question: " . $item['idQuestion'] . " - Question: " . $item['question'] . " - Réponse: " . $item['response'] . "<br>";
            //     }
            // } else {
            //     echo "Aucune question ou réponse trouvée.";
            // }
       
        public function findUser($pseudo = null, $email = null, $password)
        {
            // Initialiser la requête SQL
            if ($pseudo) {
                $sql = "SELECT * FROM users 
                        WHERE pseudo = :pseudo 
                        AND password = :password";
            } elseif ($email) {
                $sql = "SELECT * FROM users 
                        WHERE email = :email 
                        AND password = :password";
            } else {
                return null; // Si ni pseudo ni email n'est fourni, la recherche ne peut pas avoir lieu
            }

            try {
                // Préparation de la requête
                $stmt = $this->db->prepare($sql);

                // Liaison des paramètres selon ce qui est fourni
                if ($pseudo) {
                    $stmt->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
                } else {
                    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
                }
                $stmt->bindValue(':password', $password, PDO::PARAM_STR); 

                // Exécution de la requête
                $stmt->execute();

                // Récupération du résultat
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                // Retourner l'utilisateur trouvé ou null si aucun utilisateur n'est trouvé
                return $user ? $user : null;

            } catch (PDOException $e) {
                echo "Erreur lors de la recherche de l'utilisateur : " . $e->getMessage();
                return null;
            }
        }

        public function insertScore($userId, $score)
        {
            // Requête SQL pour insérer un score pour un utilisateur spécifique
            $sql = "INSERT INTO scores (user_id, score) VALUES (:user_id, :score)";

            try {
                // Préparer la requête
                $stmt = $this->db->prepare($sql);

                // Lier les paramètres
                $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT);
                $stmt->bindValue(':score', $score, PDO::PARAM_INT);

                // Exécuter la requête
                $stmt->execute();

                // Retourner true si l'insertion a réussi
                return true;

                } catch (PDOException $e) {
                    echo "Erreur lors de l'insertion du score : " . $e->getMessage();
                    return false;
                }

            
                //Appel pour un ueser id 1 et un score de 150
                //     $scoreInserted = $dataGateway->insertScore(1, 150);
                // if ($scoreInserted) {
                //     echo "Score inséré avec succès.";
                // } else {
                //     echo "Erreur lors de l'insertion du score.";
                // }
        }

        public function findScore($userId)
        {
            //requête SQL pour un score spécifique
            //SELECT * FROM scores WHERE user_id = :user_id AND score = :score;


            // Requête SQL pour récupérer les scores d'un utilisateur
            $sql = "SELECT * FROM scores WHERE user_id = :user_id";

            include("DBConnect.php");

            

            // try {
            //     // Préparer la requête
            //     $stmt = $this->db->prepare($sql);

            //     // Lier le paramètre user_id
            //     $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT);

            //     // Exécuter la requête
            //     $stmt->execute();

            //     // Récupérer tous les scores associés à l'utilisateur
            //     $scores = $stmt->fetchAll(PDO::FETCH_ASSOC);

            //     // Retourner les scores ou un tableau vide si aucun score n'est trouvé
            //     return $scores ? $scores : [];

          
        

            // } catch (PDOException $e) {
            //     echo "Erreur lors de la recherche des scores : " . $e->getMessage();
            //     return [];
            // }

            // Appel de récupération d'un score pour ID 1

            //     $scores = $dataGateway->findScore(1);
            // if (!empty($scores)) {
            //     foreach ($scores as $score) {
            //         echo "Score: " . $score['score'] . " - Date: " . $score['created_at'] . "<br>";
            //     }
            // } else {
            //     echo "Aucun score trouvé pour cet utilisateur.";
            // }

            
        }

        public function findLastThreeScores($userId)
        {
            // Requête SQL pour récupérer les 3 derniers scores d'un utilisateur
            $sql = "SELECT * FROM scores WHERE user_id = :user_id ORDER BY created_at DESC LIMIT 3";

            try {
                // Préparer la requête
                $stmt = $this->db->prepare($sql);

                // Lier le paramètre user_id
                $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT);

                // Exécuter la requête
                $stmt->execute();

                // Récupérer les 3 derniers scores associés à l'utilisateur
                $scores = $stmt->fetchAll(PDO::FETCH_ASSOC);

                // Retourner les scores ou un tableau vide si aucun score n'est trouvé
                return $scores ? $scores : [];

            } catch (PDOException $e) {
                echo "Erreur lors de la recherche des derniers scores : " . $e->getMessage();
                return [];
            }

            // Appel pour les 3 derniers scores
            //     $lastThreeScores = $dataGateway->findLastThreeScores(1);
            // if (!empty($lastThreeScores)) {
            //     foreach ($lastThreeScores as $score) {
            //         echo "Score: " . $score['score'] . " - Date: " . $score['created_at'] . "<br>";
            //     }
            // } else {
            //     echo "Aucun score trouvé pour cet utilisateur.";
            // }
        }

        public function updateScore($id, $newScore)
        {
            // Requête SQL pour mettre à jour le score d'un utilisateur
            $sql = "UPDATE scores SET score = :score WHERE id = :id";

            try {
                // Préparer la requête
                $stmt = $this->db->prepare($sql);

                // Lier les paramètres
                $stmt->bindValue(':score', $newScore, PDO::PARAM_INT);
                $stmt->bindValue(':id', $id, PDO::PARAM_INT);

                // Exécuter la requête
                $stmt->execute();

                // Vérifier si une ligne a été modifiée
                if ($stmt->rowCount() > 0) {
                    return true; // Mise à jour réussie
                } else {
                    return false; // Aucune ligne modifiée (peut-être que l'ID n'existe pas)
                }

            } catch (PDOException $e) {
                echo "Erreur lors de la mise à jour du score : " . $e->getMessage();
                return false;
            }

            //Appel pour id1 et un score de 200

            //     $scoreUpdated = $dataGateway->updateScore(1, 200);
            // if ($scoreUpdated) {
            //     echo "Score mis à jour avec succès.";
            // } else {
            //     echo "Erreur lors de la mise à jour du score ou score non trouvé.";
            // }
        }

    }