import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { category } from '../models/category';
import { product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.api_url;
  constructor(private http : HttpClient) { }
  addProduct(data:product) {
    return new Promise(resolve => {
      this.http.post(this.url + 'product/addProduct', data).subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }

  getProductById(id:number) {
    return new Promise(resolve => {
      this.http.get(this.url+ 'product/productById/' + id).subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }
  
  getProdcutByCategory(id:any){
    return new Promise(resolve => {
      this.http.get(this.url + 'product/productsByCategory').subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }
  getProducts() {
    return new Promise(resolve => {
      this.http.get(this.url + 'product/allProducts').subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }

  updateProduct(data:category,id:any) {
    return new Promise(resolve => {
      this.http.put(this.url + 'prouct/updateProduct/'+id, data).subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }

  deleteProduct(id:number) {
    return new Promise(resolve => {
      this.http.get(this.url + 'product/deleteProduct/'+id).subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }
}
