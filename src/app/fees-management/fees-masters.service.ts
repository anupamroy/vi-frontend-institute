import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesMastersService {

  private api: string = ' https://wb732s8fm0.execute-api.ap-south-1.amazonaws.com/Prod';
  private apiSuffixForList: string = 'orgTableType=FEES&type=list';
  //private org_id : string = sessionStorage.getItem('user_id');
  private org_id = "qwertyuiop";
  private getByIdSuffix : string = 'orgTableType=FEES'
  constructor(private _http: HttpClient) { }

  addFeesMaster(body: any): Observable<any> {
    return this._http.post<any>(`${this.api}/fees/save`, body);
  }

  getFeesMaster(): Observable<any> {
    return this._http.get<any>(`${this.api}/fees/list/${this.org_id}?${this.apiSuffixForList}`);
  }

  getFeesMasterById(_id: string): Observable<any> {
    return this._http.get(`${this.api}/fees/getbyid/${_id}?${this.getByIdSuffix}`);
  }
  updateFeesMaster(_id : string,body:any) :Observable<any>{
    return this._http.put(`${this.api}/fees/update`,body);
  }

  deleteFeesMaster(_id: string, body: any): Observable<any> {
    return this._http.delete(`${this.api}/fees/delete`, body);
  }

  activateFeesMaster(_id:string,body:any) : Observable<any>{
    return this._http.put<any>(`${this.api}/fees/change-status`,body);
  }
}
