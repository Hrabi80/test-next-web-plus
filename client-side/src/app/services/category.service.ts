import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { category } from '../models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.api_url;
  constructor(private http : HttpClient) { }

  addCategory(data:category) {
    return new Promise(resolve => {
      this.http.post(this.url + 'category/addCategory', data).subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }

  getCategoryById(id:number) {
    return new Promise(resolve => {
      this.http.get(this.url+ 'category/categoryById/' + id).subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }
 
  getCategories() {
    return new Promise(resolve => {
      this.http.get(this.url + 'category/allCategories').subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }

  updateCategory(data:category,id:any) {
    return new Promise(resolve => {
      this.http.put(this.url + 'category/updateCategory/'+id, data).subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }

  deleteCategories(id:number) {
    return new Promise(resolve => {
      this.http.get(this.url + 'deleteCategory/'+id).subscribe((res: any) => {
        resolve({ status: true, data: res });
      }, (err) => {
        resolve({ status: false, error: err });
      });
    });
  }
}
