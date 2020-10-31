import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReqInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO get from auth service
    const headerSecret = sessionStorage.getItem('token');;
   
    if (headerSecret) {
      req = req.clone({
        setHeaders: {
          Authorization: `${headerSecret}`
        }
      })
    }

    return next.handle(req);

  }
}
