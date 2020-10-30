import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssociatedPostService {

  api = 'https://vs9ge0mhi9.execute-api.ap-south-1.amazonaws.com/Prod/associatedpost';
  constructor(private http : HttpClient) { }

  getAssociatedPost():Observable<any> {
    return this.http.get<any>(`${this.api}/list?masterType=ASSOCIATED_POST`)
  }

  getAssociatedPostById(id: string): any {
    return this.http.get(`${this.api}/${id}`);
  }

  updateAssociatedPostById(body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/update`, body);
  }

  deleteAssociatedPostById(body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/update`, body);
  }

  addAssociatedPost(body: any): Observable<any> {
    return this.http.post<any>(`${this.api}/save`, body);
  }
}
