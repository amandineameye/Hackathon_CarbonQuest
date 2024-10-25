<?php

    // gestion headers selon type requête
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

    // traitement preflight
    if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
        http_response_code(204);
        exit;
    }

    
    // source routes
    require_once '../src/Routes/web.php';

    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $requestUri = explode('?', $_SERVER['REQUEST_URI'], 2)[0];
    $requestUri = str_replace('/public', '', $requestUri);
    
    // appel routeur
    handleRequest($requestUri, $requestMethod);