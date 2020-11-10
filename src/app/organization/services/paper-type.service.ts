import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaperTypeService {
	api = environment.api2;
  	apiSuffix = "?masterType=PAPER_TYPE";

  	constructor(private http: HttpClient) { }

	/**
	* sends a single request
	* 
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof PaperTypeService
	*/
	getPaperType(): Observable<any> {
		return this.http.get<any>(`${this.api}/papertype/list/${this.apiSuffix}`)
	}

	/**
	* sends a single request
	* 
	* @param {string} id  
	* @returns {Observable<any>} 
	* @memberof PaperTypeService
	*/
	getPaperTypeById(id: string): Observable<any> {
		return this.http.get<any>(`${this.api}/papertype/getbyid/${id}/${this.apiSuffix}`)
	}


	/**
	* sends a single request
	* 
	* @param {string} id  
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof PaperTypeService
	*/
	updatePaperTypeById(id: string, body: any): Observable<any> {
		return this.http.put<any>(`${this.api}/papertype/update`, body)
	}

	/**
	* sends a single request
	* 
	* @param {string} id  
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof PaperTypeService
	*/
	deletePaperTypeById(id: string, body: any): Observable<any> {
		return this.http.put<any>(`${this.api}/papertype/delete`, body);
	}

	/**
	* sends a single request
	* 
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof PaperTypeService
	*/
	addPaperType(body: any): Observable<any> {
		return this.http.post<any>(`${this.api}/papertype/save`, body)
	}
}