<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    echo 'testing';

    include("DBConnect.php");

    $cnx = new DBConnect();
    $db = $cnx->connect();
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case 'POST':
            $user = json_decode(file_get_contents('php://input'));
            echo $user;
            break;
    }