<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User extends BaseUser implements \JsonSerializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */

    protected $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $tel;



    public function getId(): ?int
    {
        return $this->id;
    }


        /**
     * Set username
     *
     * @param string $username
     *
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

        /**
     * Set mail
     *
     * @param string $mail
     *
     * @return User
     */
    public function setMail($email)
    {

        $this->email = $email;


        return $this;
    }

    /**
     * Get mail
     *
     * @return string
     */
    public function getMail()
    {

        return $this->email;

    }




        public function getTel(): ?string
        {
            return $this->tel;
        }

        public function setTel(?string $tel): self
        {
            $this->tel = $tel;

            return $this;
        }


  

        public function jsonSerialize() {

        return  get_object_vars($this);
    }
}
