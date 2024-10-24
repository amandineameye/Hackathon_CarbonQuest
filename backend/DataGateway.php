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
            // questions + réponses
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