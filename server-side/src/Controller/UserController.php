<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;

/**
* @Route("/user")
*/
class UserController extends AbstractController
{
  /**
   * @Route("/all", name="all_clientss")
   */
  public function getClientss(){
      $em = $this->getDoctrine()->getManager();
      $ser = $em->getRepository('App:User')->findAll();
      $arrayCollection = array();
      foreach($ser as $item) {
      $arrayCollection[] = array(
       'id' => $item->getId(),
       'name' => $item->getUsername(),
       'mail'=> $item->getMail(),
       'tel'=> $item->getTel(),
       );
      }
       return new JsonResponse($arrayCollection);
  }


  /**
  * @Route("/add", name="add_a_client")
  */
 public function AddAdmin(Request $request, UserPasswordEncoderInterface $encoder)
 {
      $data = json_decode($request->getContent(), true);

     $user->setMail($request->get('email'));
     $user->setTel($request->get('tel'));
     $user->setUsername($request->get('username'));
     $encoded = $encoder->encodePassword($user, $request->get('password'));
     $user->setPassword($encoded);
     $user->setEnabled(true);
     $user->addRole('ROLE_SUPER_ADMIN');
     $em = $this->getDoctrine()->getManager();
     $em->persist($user);
     $em->flush();

     return new JsonResponse(array('success' => true));
 }




/**
 * @Route("/delete/{id}")
 */
public function deleteAdmin($id){
    $em = $this->getDoctrine()->getManager();
    $user = $em->getRepository('App:User')->find($id);
    $em->remove($user);
    $em->flush();

    return new JsonResponse(array('success' => true));
}


/**
 * @Route("/AdminById/{id}")
 */
public function getAdminById($id){
    $em = $this->getDoctrine()->getManager();
    $info = $em->getRepository('App:User')->find($id);
    return new JsonResponse($info);
}


/**
 * @Route("/update/{id}" , name="updateAdmin", methods="PUT")
 * @param int $id
 */
public function updateClient(Request $request,$id){
  $data = json_decode($request->getContent(), true);
  $entityManager = $this->getDoctrine()->getManager();

  $info = $entityManager->getRepository(User::class)->find($id);
  $info->setUsername($data['username']);
  $info->setEmail($data['email']);
  $info->setTel($data['tel']);

  $entityManager->flush();
  return new JsonResponse(array('success' => true));
}

/**
 * @Route("/updatePassword/{id}" , name="updatePassword", methods="PUT")
 * @param int $id
 */
public function updatePassword(Request $request,$id, UserPasswordEncoderInterface $encoder){
  $data = json_decode($request->getContent(), true);
  $entityManager = $this->getDoctrine()->getManager();

  $info = $entityManager->getRepository(User::class)->find($id);
  $encoded = $encoder->encodePassword($info, $request->get('password'));
  $info->setPassword($encoded);

  $entityManager->flush();
  return new JsonResponse(array('success' => true));
}



}
