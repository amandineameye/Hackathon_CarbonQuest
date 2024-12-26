<?php
require_once 'Score.php';

class User {

    private int $id;
    private string $username;
    private string $email;
    private string $password;
    private array $scores;

    public function __construct(array $data, array $scores = [])
    {
        $this->hydrate($data);
        $this->scores = $scores;
    }

    public function hydrate(array $data)
    {
        foreach ($data as $k => $v) {
            $method = 'set' . ucfirst($k);
            if (method_exists($this, $method)) {
                $this->$method($v);
            }
        }
    }
    
    public function getId() :int
    {
        return $this->id;
    }

    public function setId(int $id) :void
    {
        $this->id = $id;
    }

    public function getUsername() :string
    {
        return $this->username;
    }

    public function setUsername(string $username) :void
    {
        $this->username = $username;
    }

    public function getEmail() :string
    {
        return $this->email;
    }

    public function setEmail(string $email) :void
    {
        $this->email = $email;
    }

    public function getPassword() :string
    {
        return $this->password;
    }

    public function setPassword(string $password) :void
    {
        $this->password = $password;
    }

    public function getScores() :array
    {
        return $this->scores;
    }

    public function addScore(Score $score) :void
    {
        $this->scores[] = $score;
    }

}