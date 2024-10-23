<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'test')]
class Test
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string')]
    // #[ORM\Column(length: 50)]
    private string $name;

    #[ORM\Column(type: 'string')]
    // #[ORM\Column(length: 50)]
    private string $chaussette;

    

    /**
     * Get the value of name
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Set the value of name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }
    
    /**
     * Get the value of id
     */
    public function getId(): ?int
    {
        return $this->id;
        }

    /**
     * Get the value of chaussette
     */
    public function getChaussette(): string
    {
        return $this->chaussette;
    }

    /**
     * Set the value of chaussette
     */
    public function setChaussette(string $chaussette): void
    {
        $this->chaussette = $chaussette;
    }

}