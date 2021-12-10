import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2';  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  error: any;
  jwt!: any;
  loginForm!: FormGroup;  
  message!: string;  
  returnUrl= "/dashboard";
  constructor(private auth: AuthentificationService,
              private fb : FormBuilder,  
              private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({  
      username: ['', Validators.required],  
      password: ['', Validators.required]  
   });  
    this.auth.logout();
  }

  get f() { return this.loginForm.controls; }

  login(){
    this.auth.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      (result) => {
        this.jwt = localStorage.getItem('token');
        this.router.navigate(['dashboard'])
       },
      (err) => {
        this.error = 'Could not authenticate';
        swal.fire(
          'failed to login!',
          `${this.error}`,
          'error'
        )
      }
    );

  }  

}
