import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthentificationService } from '../services/authentification.service';
import { environment } from '../../environments/environment';


@Injectable()

export class JwtInterceptor implements HttpInterceptor {
    private _URLPattern = environment.api_url + '/api';
    constructor(private auth: AuthentificationService
        ) { 
         
        }

        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          console.log('intercepted', req);
           if(req.url.startsWith(this._URLPattern)){
            let token:any = JSON.parse(localStorage.getItem('currentUser')!).token;
            setTimeout(() => {
              console.log("token === ",token);
            }, 3500);
           req = req.clone({
             setHeaders: {
               Authorization: `Bearer ${token}`
             }
           });
         }
           return next.handle(req);
       }
   }