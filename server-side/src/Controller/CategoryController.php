<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Category;
/**
 * @Route("/api/category")
 */
class CategoryController extends AbstractController
{

/**
 * @Route("/addCategory")
 */
public function AddCategory(Request $request)
{
    $data = json_decode($request->getContent(), true);
    $category = new Category();
    $category->setName($data["name"]);
    $category->setDescription($data["description"]);
    $em = $this->getDoctrine()->getManager();
    $em->persist($category);
    $em->flush();

    return new JsonResponse(array('success' => true));
}

/**
 * @Route("/allCategories", name="allCategories")
 */

public function getAllCategories(){
    $em = $this->getDoctrine()->getManager();
    $categories = $em->getRepository('App:Category')->findAll();
    return new JsonResponse($categories);
}

/**
 * @Route("/categoryById/{id}")
 */
public function getPortfolioById($id){
    $em = $this->getDoctrine()->getManager();
    $info = $em->getRepository('App:Category')->find($id);
     return new JsonResponse($info);
}

/**
 * @Route("/updateCategory/{id}" , methods="PUT")
 * @param int $id
 */
public function updatePortfolio(Request $request,$id){
  $data = json_decode($request->getContent(), true);
  $entityManager = $this->getDoctrine()->getManager();
  $info = $entityManager->getRepository(Category::class)->find($id);
  $info->setName($data['name']);
  $info->setDescription($data['description']);
  $entityManager->flush();
  return new JsonResponse(array('success' => true));
}

/**
 * @Route("/deleteCategory/{id}")
 */
public function deleteCategory($id){
    $em = $this->getDoctrine()->getManager();
    $deletedCat = $em->getRepository('App:Category')->find($id);
    $em->remove($deletedCat);
    $em->flush();
    return new JsonResponse(array('success' => true));
}
}
