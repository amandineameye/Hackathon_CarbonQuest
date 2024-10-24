<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 1000');
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
    }
    exit(0);
}
header("content-type: application/json");

include("../../DbConnect.php");
$objDB = new DbConnect();
$cnx = $objDB->connect();

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(204);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case 'GET':
        // $user = json_decode(file_get_contents('php://input'));
        // $sql = "INSERT INTO users(id, name, email, mobile, created_at) values(null, :name, :email, :mobile, :created_at)";
        // $stmt = $db->prepare($sql);
        // $date = date('Y-m-d');
        // $stmt->bindParam(':name', $user->name);
        // $stmt->bindParam(':email', $user->email);
        // $stmt->bindParam(':mobile', $user->mobile);
        // $stmt->bindParam(':created_at', $date);

        // if($stmt->execute()) {
        //     $data = ['status' => 1, 'message' => "Record successfully created"];
        // } else {
        //     $data = ['status' => 0, 'message' => "Failed to create record."];
        // }
        $data = ['success' => true, 'status' => 1, 'methode' => $method];
        echo json_encode($data);
        break;

    case 'POST':
        // $user = json_decode(file_get_contents('php://input'));
        // $sql = "INSERT INTO users(id, name, email, mobile, created_at) values(null, :name, :email, :mobile, :created_at)";
        // $stmt = $db->prepare($sql);
        // $date = date('Y-m-d');
        // $stmt->bindParam(':name', $user->name);
        // $stmt->bindParam(':email', $user->email);
        // $stmt->bindParam(':mobile', $user->mobile);
        // $stmt->bindParam(':created_at', $date);
        
        // if($stmt->execute()) {
        //     $data = ['status' => 1, 'message' => "Record successfully created"];
        // } else {
        //     $data = ['status' => 0, 'message' => "Failed to create record."];
        // }
        $data = ['success' => true, 'status' => 1, 'methode' => $method];
        echo json_encode($data);
        break;
}