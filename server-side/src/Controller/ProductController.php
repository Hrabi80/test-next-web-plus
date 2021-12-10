<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Product;
/**
 * @Route("/api/product")
 */
class ProductController extends AbstractController
{
  /**
   * @Route("/addProduct")
   */
  public function AddProduct(Request $request)
  {
      $data = json_decode($request->getContent(), true);
      $product = new Product();
      $product->setName($data["name"]);
      $product->setDescription($data["description"]);
      $product->setPrice($data['price']);
      $categoryId= $data['category']
      $category = $em->getRepository('App:Category')->find($categoryId);
      $product->setCategory($category);
      $em = $this->getDoctrine()->getManager();
      $em->persist($product);
      $em->flush();

      return new JsonResponse(array('success' => true));
  }

  /**
   * @Route("/allProducts", name="allProducts")
   */

  public function getAllProducts(){
      $em = $this->getDoctrine()->getManager();
      $prod = $em->getRepository('App:Product')->findAll();
      return new JsonResponse($prod);
  }

  /**
   * @Route("/productByCategory/{id}")
   */
  public function getProductByCategory($id){
      $em = $this->getDoctrine()->getManager();
      $info = $em->getRepository('App:Product')->findByCategory($id);
       return new JsonResponse($info);
  }
  /**
   * @Route("/productById/{id}")
   */
  public function getProductById($id){
      $em = $this->getDoctrine()->getManager();
      $info = $em->getRepository('App:Product')->find($id);
       return new JsonResponse($info);
  }

  /**
   * @Route("/updateProduct/{id}" , methods="PUT")
   * @param int $id
   */
  public function updateProduct(Request $request,$id){
    $data = json_decode($request->getContent(), true);
    $entityManager = $this->getDoctrine()->getManager();
    $info = $entityManager->getRepository(Product::class)->find($id);
    $info->setName($data['name']);
    $info->setDescription($data['description']);
    $entityManager->flush();
    return new JsonResponse(array('success' => true));
  }

  /**
   * @Route("/deleteProduct/{id}")
   */
  public function deleteProduct($id){
      $em = $this->getDoctrine()->getManager();
      $deletedProd = $em->getRepository('App:Product')->find($id);
      $em->remove($deletedProd);
      $em->flush();
      return new JsonResponse(array('success' => true));
  }
}
