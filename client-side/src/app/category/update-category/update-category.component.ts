import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder , FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category.service';
import { category } from 'src/app/models/category';
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  id:any;
  updateCategoryform! : FormGroup;
  mycategory! :category;
  constructor(private service : CategoryService,
              private route: ActivatedRoute,
              private fb :FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');   
    this.updateCategoryform=this.fb.group({
      name: new FormControl(''),
      description: new FormControl(''),
    }); 
    this.getCategoryById();
  }

  getCategoryById(){
    this.service.getCategoryById(this.id)
    .then((res:any)=>{
      console.log("categorybyid",res);
      this.mycategory = res.data;
    });
  }

  update(){
    this.service.updateCategory(this.updateCategoryform.value,this.id)
    .then((res:any)=>{
      console.log("ss",this.updateCategoryform.value)
      console.log(res);
      swal.fire(
        'Updated!',
        'this category is updated successfuly.',
        'success'
      )
    });
  }

}
