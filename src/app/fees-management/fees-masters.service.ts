import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesMastersService {

  private api: string = '';
  private apiSuffix: string = '';
  constructor(private _http: HttpClient) { }

  addFeesMaster(body: any): Observable<any> {
    return this._http.post<any>(`${this.api}fees/save`, body);
  }

  getFeesMaster(): Observable<any> {
    return this._http.get<any>(`${this.api}/fees/list/${12345}/${this.apiSuffix}`);
  }

  getFeesMansterById(_id: string): Observable<any> {
    return this._http.get(`${this.api}/fees/getbyid/${_id}/${this.apiSuffix}`);
  }

  deleteFeesMaster(_id: string, body: any): Observable<any> {
    return this._http.delete(`${this.api}/fees/delete`, body);
  }

  activateFeesMaster(_id:string,body:any) : Observable<any>{
    return this._http.put<any>(`${this.api}/fees/change-status`,body);
  }
}
