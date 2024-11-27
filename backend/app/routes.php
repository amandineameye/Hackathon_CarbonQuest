<?php
require_once 'config/dbconfig.php';
require_once 'model/Score.php';
require_once 'model/User.php';

// routeur
function handleRequest($uri, $method) {
    switch ($uri) {
        case '/signup':
            addUser();
            break;
        case '/login':
            verifyUser();
            break;
        case '/game' :
            addScore();
            break;
        case '/scores' :
            getScores();
            break;
        default:
            sendResponse(404, $uri);
            break;
    }
}

// 404
function sendResponse($status, $body) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo $body;
}

// connexion db
function connect() {
    try{
        $cnx = new PDO(DSN, USERNAME, PASSWORD);
        $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $e) {
        echo "Database Error : " . $e->getMessage();
    }
    return $cnx;
}

function addUser() {
    $cnx = connect();
    $user = json_decode(file_get_contents('php://input'));

    // vérification compte existant
    $sql = "SELECT * FROM user WHERE email=:email";
    $stmt = $cnx->prepare($sql);
    $stmt->bindValue(':email', $user->email);
    $stmt->execute();
    $checkEmail = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // vérification pseudo pris
    $sql = "SELECT * FROM user WHERE username=:username";
    $stmt = $cnx->prepare($sql);
    $stmt->bindValue(':username', $user->username);
    $stmt->execute();
    $checkUsername = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (!empty($checkEmail)) {
        $data = ['success' => 0, 'message' => "Account already exist for this email"];
    } elseif (!empty($checkUsername)) {
        $data = ['success' => 0, 'message' => "Username already taken"];
    } else {
        // insertion nouveau user
        $sql = "INSERT INTO user (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $cnx->prepare($sql);
        $stmt->bindValue(':username', $user->username);
        $stmt->bindValue(':email', $user->email);
        $stmt->bindValue(':password', password_hash($user->password, PASSWORD_DEFAULT, ['cost' => 12]));
        
        if ($stmt->execute()) {
            $data = ['success' => 1, 'message' => "Account successfully created"];
        } else {
            $data = ['success' => 0, 'message' => "Failed to create account"];
        }
    }
    echo json_encode($data);
}

function verifyUser() {
    $cnx = connect();
    $user = json_decode(file_get_contents('php://input'));

    $sql = "SELECT * FROM user WHERE username=:username";
    $stmt = $cnx->prepare($sql);
    $stmt->bindValue(':username', $user->username);
    $stmt->execute();
    $dbResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // vérification compte existant
    if (empty($dbResponse)) {
        $data = ['success' => 0, 'message' => "Invalid login info"];
    } else {
        if (password_verify($user->password, $dbResponse[0]['password'])) {
            $data = ['success' => 1, 'message' => "Login successfull"];
        } else {
            $data = ['success' => 0, 'message' => "Login failed"];
        }
    }
    echo json_encode($data);
}

function addScore() {
    $cnx = connect();
    $postData = json_decode(file_get_contents('php://input'));   // score, username

    // vérification identifiant reçu
    if (!isset($postData->username)) {
        $data = ['success' => 0, 'message' => "Missing argument 'user identifier', unable to process request)"];
    } else {
        $sql = "SELECT id, username FROM user WHERE username=:username";
        $stmt = $cnx->prepare($sql);
        $stmt->bindValue(':username', $postData->username);
        $stmt->execute();
        $dbResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $user = new User($dbResponse[0]);

        // récupération scores enregistré 
        $sql = "SELECT * FROM score WHERE user_id=:userId";
        $stmt = $cnx->prepare($sql);
        $stmt->bindValue(':userId', $user->getId());
        $stmt->execute();
        $scores = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($scores as $score) {
            $oScore = new Score($score);
            $user->addScore($oScore);
            $unordered[] = $oScore->getValue();
        }

        $notInArray = empty($unordered) ? true : !in_array($postData->score, $unordered);
        // moins de 3 scores enregistrés et score différent de ceux enregistrés
        if (count($scores) < 3 && $notInArray) {
            // insertion nouveau score
            $sql = "INSERT INTO score (user_id, value) VALUES (:userId, :value)";
            $stmt = $cnx->prepare($sql);
            $stmt->bindValue(':userId', $user->getId());
            $stmt->bindValue(':value', $postData->score);
            
            if ($stmt->execute()) {
                $data = ['success' => 1, 'message' => "New score successfully created"];
            } else {
                $data = ['success' => 0, 'message' => "Failed to create new score"];
            }

        } else {
            $ordered = $unordered;
            sort($ordered);
            foreach ($user->getScores() as $score) {
                if ($score->getValue() == $ordered[0]) {
                    $idLowest = $score->getId();
                }
            }

            // score unique meilleur qu'au moins un score enregistré
            if ($postData->score > $ordered[0] && !in_array($postData->score, $ordered)) {
                $sql = "UPDATE score SET value=:value WHERE id=:id";
                $stmt = $cnx->prepare($sql);
                $stmt->bindValue(':value', $postData->score);
                $stmt->bindValue(':id', $idLowest);
                
                if ($stmt->execute()) {
                    $data = ['success' => 1, 'message' => "Player best score successfully updated"];
                } else {
                    $data = ['success' => 0, 'message' => "Failed to update player best score"];
                }

            } else {
                $data = ['success' => 1, 'message' => "Better score already saved, new score ignored"];
            }
        }
    }
    echo json_encode($data);
}

function getScores() {
    $cnx = connect();
    
    $sql = "SELECT id, username FROM user";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $sql = "SELECT * FROM score";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $scores = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($users as $user) {
        $oUser = new User($user);
        foreach ($scores as $score) {
            if ($score['user_id'] == $oUser->getId()) {
                $scoreboard[$oUser->getUsername()][] = $score['value'];
            }
        }
    }

    if ($stmt->execute()) {
        $data = ['success' => 1, 'message' => "Scores successfully retrived", 'scores' => $scoreboard];
    } else {
        $data = ['success' => 0, 'message' => "Failed to retrieve scores", 'scores' => null];
    }
    echo json_encode($data);
}
