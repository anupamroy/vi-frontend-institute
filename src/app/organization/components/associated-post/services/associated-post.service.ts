import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssociatedPostService {

  // api = 'https://vs9ge0mhi9.execute-api.ap-south-1.amazonaws.com/Prod/associatedpost';
  api =environment.api2;
  constructor(private http : HttpClient) { }

  /**
   * Provides the list of all associated post
   * @returns {Observable} with associated post
   * @memberof AssociatedPostService
   */
  getAssociatedPost():Observable<any> {
    return this.http.get<any>(`${this.api}/associatedpost/list?masterType=ASSOCIATED_POST`)
  }

  /**
   * Provides a specific associated post
   * @param id of selected associate post
   * @returns {Observable} with associated post
   * @memberof AssociatedPostService
   */
  getAssociatedPostById(id: string): any {
    return this.http.get(`${this.api}/associatedpost/getbyid/${id}`);
  }

  /**
   * Updates a specific associate post
   * @param body of newly updated object
   * @returns {Observable} with associated post
   * @memberof AssociatedPostService
   */
  updateAssociatedPostById(body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/associatedpost/update`, body);
  }

  /**
   * Updates a specific associate post
   * @param body of newly updated object
   * @returns {Observable} with associated post
   * @memberof AssociatedPostService
   */
  deleteAssociatedPostById(body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/associatedpost/delete`, body);
  }

  /**
   * Adds a specific associate post
   * @param body of newly updated object
   * @returns {Observable} with associated post
   * @memberof AssociatedPostService
   */
  addAssociatedPost(body: any): Observable<any> {
    return this.http.post<any>(`${this.api}/associatedpost/save`, body);
  }
}
