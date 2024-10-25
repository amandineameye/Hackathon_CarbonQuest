<?php

/**
 * Si le temps, faire controllers pour que ce soit plus propre
 *  -> y déplacer fonctions autres que handleRequest()
 *  -> rajouter require_once '../controllers/nomcontroller.php';
*/

// marche pas pour une obscure raison ??
// require_once '../config/dbconfig.php';
const DSN = "mysql:host=localhost;dbname=carbonquest;port=3306;charset=utf8";
const USERNAME = "root";
const PASSWORD = "";

// routeur
function handleRequest($uri, $method) {
    // str_replace('/public', '', $uri);
    switch ($uri) {
        case '/signup':
            addUser();
            break;
        case '/login':
            verifyUser();
            break;
        case '/game' :
            if ($method === 'POST') { addScore(); }
            if ($method === 'GET') { getScores(); }
            break;
        default:
            sendResponse(404, $uri);
            break;
    }
}

// gestion requêtes
function addUser() {
    try{
        $cnx = new PDO(DSN, USERNAME, PASSWORD);
        $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $e) {
        echo "Database Error : " . $e->getMessage();
    }
    // récupération données
    $user = json_decode(file_get_contents('php://input'));

    // vérification compte existant
    $sql = "SELECT * FROM user WHERE email=:email";
    $stmt = $cnx->prepare($sql);
    $stmt->bindValue(':email', $user->email);
    $stmt->execute();
    $dbResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (!empty($dbResponse)) {
        $data = ['success' => 0, 'message' => "Account already exist for this email"];
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
    try{
        $cnx = new PDO(DSN, USERNAME, PASSWORD);
        $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $e) {
        echo "Database Error : " . $e->getMessage();
    }
    // récupération données
    $user = json_decode(file_get_contents('php://input'));

    // vérification compte existant
    $sql = "SELECT * FROM user WHERE username=:username";
    $stmt = $cnx->prepare($sql);
    $stmt->bindValue(':username', $user->username);
    $stmt->execute();
    $dbResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (!empty($existing)) {
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

// besoin de voir ce qu'on reçoit
function addScore() {
    try{
        $cnx = new PDO(DSN, USERNAME, PASSWORD);
        $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $e) {
        echo "Database Error : " . $e->getMessage();
    }
    // vérifier ce qu'on reçoit quand mis en place
    $score = json_decode(file_get_contents('php://input'));

    // vérification si score déjà existant
    // gros doute sur le SQL, il est 2h du mat
    $sql = "SELECT * FROM score WHERE user_id=:userId";
    $stmt = $cnx->prepare($sql);
    // $stmt->bindValue(':userId', );
    $stmt->execute();
    $dbResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($dbResponse)) {
        // insertion nouveau score
        $sql = "INSERT INTO score (user_id, value) VALUES (:userID, :value)";
        $stmt = $cnx->prepare($sql);
        // $stmt->bindValue(':userID', );
        // $stmt->bindValue(':value', );
        
        if ($stmt->execute()) {
            $data = ['success' => 1, 'message' => "New score successfully created"];
        } else {
            $data = ['success' => 0, 'message' => "Failed to create new score"];
        }
    } else {
        // nouveau record
        if ($score > $dbResponse[0]['id']) {
            $sql = "UPDATE score SET value=:value WHERE id=:id";
            $stmt = $cnx->prepare($sql);
            // $stmt->bindValue(':value', );
            $stmt->bindValue(':id', $dbResponse[0]['id']);
            
            if ($stmt->execute()) {
                $data = ['success' => 1, 'message' => "Player best score successfully updated"];
            } else {
                $data = ['success' => 0, 'message' => "Failed to update player best score"];
            }

        } else {
            $data = ['success' => 1, 'message' => "Better score already saved, new score ignored"];
        }
    }
    echo json_encode($data);
}

// trouver où appelé pour tester
function getScores() {
    try{
        $cnx = new PDO(DSN, USERNAME, PASSWORD);
        $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $e) {
        echo "Database Error : " . $e->getMessage();
    }
    
    $sql = "SELECT * FROM score";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $dbResponse = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($stmt->execute()) {
        $data = ['success' => 1, 'message' => "Scores successfully retrived", 'scores' => $dbResponse];
    } else {
        $data = ['success' => 0, 'message' => "Failed to retrieve scores"];
    }
}

// schéma réponse (aide en cas de 404)
function sendResponse($status, $body) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo $body;
}