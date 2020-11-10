import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  private userName = new BehaviorSubject<string>('Anonymous');
  private headerForUser = new BehaviorSubject<any>(null);

  constructor() {
  }

  getUserName(): Observable<any>{
    return this.userName.asObservable();
  }

  setUserName(username: string){
    this.userName.next(username);
  }
  getHeaderForUser () :Observable<any>{
  return this.headerForUser.asObservable();
  }
  setHeaderForUser (param:any) {
     this.headerForUser.next(param);
    }
}
