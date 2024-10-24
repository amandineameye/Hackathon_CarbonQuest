<?php

    class DBConnect {

        private string $DNS = "mysql:host=localhost;dbname=carbonquest;port=3306;charset=utf8";
        private string $USERNAME = "root";
        private string $PASSWORD = "";

        public function connect() {
            try {
                $cnx = new PDO($this->DNS, $this->USERNAME, $this->PASSWORD);
                $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $cnx;
            } catch (Exception $e) {
                echo "Database Error : " . $e->getMessage();
            }
        }
    }