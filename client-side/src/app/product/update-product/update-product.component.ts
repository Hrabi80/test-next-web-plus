import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder , FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
import { product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id:any;
  updateProductform! : FormGroup;
  myprod! :product;
  constructor(private service : ProductService,
    private route: ActivatedRoute,
    private fb :FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');   
    this.updateProductform=this.fb.group({
      name: new FormControl(''),
      description: new FormControl(''),
    }); 
    this.getProductById();
  }

  getProductById(){
    this.service.getProductById(this.id)
    .then((res:any)=>{
      console.log("categorybyid",res);
      this.myprod = res.data;
    });
  }
  update(){
    this.service.updateProduct(this.updateProductform.value,this.id)
    .then((res:any)=>{
      console.log("ss",this.updateProductform.value)
      console.log(res);
      swal.fire(
        'Updated!',
        'this category is updated successfuly.',
        'success'
      )
    });
  }

}
