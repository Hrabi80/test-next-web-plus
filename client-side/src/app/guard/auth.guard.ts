import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService} from '../services/authentification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthentificationService
) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      
      console.log('can activate');

    if(this.auth.loggedIn()) {
      return true;
     }else{
      this.router.navigate(['']);

      return false;
    }

  }


 



}

