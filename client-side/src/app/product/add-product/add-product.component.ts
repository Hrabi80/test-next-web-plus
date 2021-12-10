import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productform!: FormGroup;
  idCategory!:any;
  productToAdd! : product;
  constructor(private service : ProductService, 
              private fb : FormBuilder,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.idCategory = this.route.snapshot.paramMap.get('id'); 
    this.productform = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3)]],
      description:  ['', [Validators.required, ]],
      price:  ['', [Validators.required, ]],

    })
  }
  addProduct(){
    this.productToAdd = this.productform.value;
    this.productToAdd["category"] = this.idCategory;
    console.log('product object before sen http req', this.productToAdd)
    this.service.addProduct(this.productform.value).then(

       (res) => {

         console.log("add prod res==>",res);
         setTimeout(() => {
          Swal.fire(
            'added !',
            'new category is added to the database !',
            'success'
          );
        }, 3000);
      }
      );
     
  }

  

}
