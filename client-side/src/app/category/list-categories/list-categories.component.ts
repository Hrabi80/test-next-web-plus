import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { category } from '../../models/category';
import swal from 'sweetalert2';
@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  categorylist : Array<category>=[];

  constructor(private serv : CategoryService) { }

  ngOnInit(): void {
    this.getlistCategory();
  }
  
  getlistCategory(){
    this.serv.getCategories().then((res:any)=>{
      console.log("res",res.data);
      this.categorylist = res.data;
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
         this.serv.deleteCategories(id).then(
           data => {
             console.log(data);
             swal.fire(
               'Deleted !',
               'This category is deleted from database',
               'success'
             );
               const index = this.categorylist.findIndex((x: { id: any; }) => x.id ===id);
               this.categorylist.splice(index, 1);
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
