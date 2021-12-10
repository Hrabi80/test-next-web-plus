import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { category } from '../../models/category';
import swal from 'sweetalert2';
import { ProductService } from 'src/app/services/product.service';
import { product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  productlist : Array<product>=[];
  id:any;
  constructor(private serv : ProductService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); 
    this.getlistProduct();
  }
  getlistProduct(){
    this.serv.getProdcutByCategory(this.id).then((res:any)=>{
      console.log("res",res.data);
      this.productlist = res.data;
    })
  }

  delete(id:number){

    swal.fire({
      // type:'warning',
       title: 'Are you sure you are going to delete this category ? ',
       text: 'Every product associated with this category will be deleted !',
       showCancelButton: true,
       confirmButtonColor: '#049F0C',
       cancelButtonColor:'#ff0000',
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, keep it',
     }).then((res) => {
       if (res.value) {
         this.serv.deleteProduct(id).then(
           data => {
             console.log(data);
             swal.fire(
               'Deleted !',
               'This category is deleted from database',
               'success'
             );
               const index = this.productlist.findIndex((x: { id: any; }) => x.id ===id);
               this.productlist.splice(index, 1);
           });
       }else{
         swal.fire(
           'Canceled !',
           'Operation canceled .',
           'success'
         )
       }
     });

  }

}
