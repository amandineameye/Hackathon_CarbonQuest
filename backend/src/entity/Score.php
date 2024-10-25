<?php

    class Score {

        private int $id;
        private int $userId;
        private int $value;

        public function __construct($id, $userId, $value)
        {
            $this->id = $id;
            $this->userId = $userId;
            $this->value = $value;
        }
    }