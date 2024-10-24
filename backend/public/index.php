<?php

// test connection front - back

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

var_dump($_POST);