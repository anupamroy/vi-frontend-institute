import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuotaTypeService {
	api = environment.api2;
  	apiSuffix = "?masterType=QUOTA";

  	constructor(private http: HttpClient) { }

	/**
	* sends a single request
	* 
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof QuotaTypeService
	*/
	getQuotaType(): Observable<any> {
		return this.http.get<any>(`${this.api}/quota/list/${this.apiSuffix}`)
	}

	/**
	* sends a single request
	* 
	* @param {string} id  
	* @returns {Observable<any>} 
	* @memberof QuotaTypeService
	*/
	getQuotaTypeById(id: string): Observable<any> {
		return this.http.get<any>(`${this.api}/quota/getbyid/${id}/${this.apiSuffix}`)
	}


	/**
	* sends a single request
	* 
	* @param {string} id  
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof QuotaTypeService
	*/
	updateQuotaTypeById(id: string, body: any): Observable<any> {
		return this.http.put<any>(`${this.api}/quota/update`, body)
	}

	/**
	* sends a single request
	* 
	* @param {string} id  
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof QuotaTypeService
	*/
	deleteQuotaTypeById(id: string, body: any): Observable<any> {
		return this.http.put<any>(`${this.api}/quota/delete`, body);
	}

	/**
	* sends a single request
	* 
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof QuotaTypeService
	*/
	addQuotaType(body: any): Observable<any> {
		return this.http.post<any>(`${this.api}/quota/save`, body)
	}
}