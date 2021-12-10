import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryform!: FormGroup;
  error!: string;
  constructor(private service : CategoryService,
              private fb : FormBuilder) { }

  ngOnInit(): void {

    this.categoryform = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3)]],
      description:  ['', [Validators.required, ]],
    })
  }

  addCategory(){

    this.service.addCategory(this.categoryform.value).then(

       (res) => {

         console.log("add category res==>",res);
         console.log("sqdqdqbva=>",this.categoryform.value);
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
