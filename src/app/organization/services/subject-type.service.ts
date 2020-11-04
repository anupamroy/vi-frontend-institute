import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SubjectTypeService {
	api = environment.api2;
  	apiSuffix = "?masterType=SUBJECT_TYPE";

  	constructor(private http: HttpClient) { }

	/**
	* sends a single request
	* 
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof SubjectTypeService
	*/
	getSubjectType(): Observable<any> {
		return this.http.get<any>(`${this.api}/subjecttype/list/${this.apiSuffix}`)
	}

	/**
	* sends a single request
	* 
	* @param {string} id  
	* @returns {Observable<any>} 
	* @memberof SubjectTypeService
	*/
	getSubjectTypeById(id: string): Observable<any> {
		return this.http.get<any>(`${this.api}/subjecttype/getbyid/${id}/${this.apiSuffix}`)
	}


	/**
	* sends a single request
	* 
	* @param {string} id  
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof SubjectTypeService
	*/
	updateSubjectTypeById(id: string, body: any): Observable<any> {
		return this.http.put<any>(`${this.api}/subjecttype/update`, body)
	}

	/**
	* sends a single request
	* 
	* @param {string} id  
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof SubjectTypeService
	*/
	deleteSubjectTypeById(id: string, body: any): Observable<any> {
		return this.http.put<any>(`${this.api}/subjecttype/delete`, body);
	}

	/**
	* sends a single request
	* 
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof SubjectTypeService
	*/
	addSubjectType(body: any): Observable<any> {
		return this.http.post<any>(`${this.api}/subjecttype/save`, body)
	}
}