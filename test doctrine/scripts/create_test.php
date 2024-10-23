<?php
require_once 'doctrine.php';

use App\Entity\Test;

$newTestName = $argv[1];

$ntest = new Test();
$ntest->setName($newTestName);
$ntest->setChaussette("hey");

$entityManager->persist($ntest);
$entityManager->flush();

echo "J'ai créer un test avec comme id " . $ntest->getId() . "\n";