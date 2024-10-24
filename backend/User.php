<?php

    class User {

        private string $pseudo;
        private string $email;
        private string $password;

        public function __construct($pseudo, $email, $password)
        {
            $this->pseudo = $pseudo;
            $this->email = $email;
            $this->password = $password;
        }
        
    }