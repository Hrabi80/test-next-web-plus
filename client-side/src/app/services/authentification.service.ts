import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Subject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public token!: string;
  private loggedInStatus = false;
  private _url = environment.url ;
  constructor(private _http:HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    
    return this._http.post(this._url+'login_check', {username: username, password: password} )
    .pipe(map((response: any) =>  {
        // login successful if there's a jwt token in the response
        this.token = response.token;
        if (this.token) {
          // set token property
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', JSON.stringify({ token: this.token }));
          localStorage.setItem('Username', JSON.stringify({username}));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })
      )
  }


  /*loggedIn function to check if the user is logged in or not */
  loggedIn() {
    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == undefined )
      return false;
    else return true;
  }

  logout() :void {    
    localStorage.removeItem('token');    
    }  

}
