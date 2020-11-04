import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectAttributeService {

  api = environment.api2
  apiSuffix = '?masterType=SUBJECT_ATTRIBUTE'

  constructor(private http: HttpClient) { }

  saveSubjectAttribute = (body: any): Observable<any> => {
    return this.http.post<any>(`${this.api}/subjectattribute/save`, body);
  }

  getAllSubjectAttribute = () :Observable<any> =>{
    return this.http.get<any>(`${this.api}/subjectattribute/list${this.apiSuffix}`)
  }

  deleteSubjectAttribute = (id:string,body:any) : Observable<any> => {
    return this.http.put<any>(`${this.api}/subjectattribute/delete`,body)
  }

  activateSubjectAttribute = (id:string, body:any) :Observable<any> =>{
    return this.http.put<any>(`${this.api}/subjectattribute/change-status`,body)
  }

  updateSubjectAttribute = (id:string,body:any) :Observable<any> =>{
    return this.http.put<any>(`${this.api}/subjectattribute/update`,body)
  }

  getSubjectAttributeById = (id:string) :Observable<any> =>{
    return this.http.get(`${this.api}/subjectattribute/getbyid/${id}/${this.apiSuffix}`)
  }

}
