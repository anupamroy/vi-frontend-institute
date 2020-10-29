import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  private userName = new BehaviorSubject<string>('Anonymous');

  constructor() {
  }

  getUserName(): Observable<any>{
    return this.userName.asObservable();
  }

  setUserName(username: string){
    this.userName.next(username);
  }
}
