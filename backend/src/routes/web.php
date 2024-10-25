<?php

/**
 * Si le temps, faire controllers pour que ce soit plus propre
 *  -> y déplacer fonctions autres que handleRequest()
 *  -> rajouter require_once '../controllers/nomcontroller.php';
*/

// not working for some reason ??
// require_once '../config/dbconfig.php';
const DSN = "mysql:host=localhost;dbname=carbonquest;port=3306;charset=utf8";
const USERNAME = "root";
const PASSWORD = "";

// routeur
function handleRequest($uri, $method) {
    // str_replace('/public', '', $uri);
    switch ($uri) {
        case '/signup':
            createUser();
            break;
        case '/login':
            verifyUser();
            break;
        case '/game' :
            // fonction
            break;
        default:
            sendResponse(404, $uri);
            break;
    }
}

// gestion requêtes
function createUser() {
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

// Helper function to send responses
function sendResponse($status, $body) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo $body;
}