<?php

class Score {

    private int $id;
    private int $user;
    private int $value;

    public function __construct(array $data)
    {
        $this->hydrate($data);
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

    public function getUser() :int
    {
        return $this->user;
    }

    public function setUser(int $user) :void
    {
        $this->user = $user;
    }

    public function getValue() :int
    {
        return $this->value;
    }

    public function setValue(int $value) :void
    {
        $this->value = $value;
    }

}