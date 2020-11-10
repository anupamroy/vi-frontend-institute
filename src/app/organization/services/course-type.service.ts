import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {
	api = environment.api2;
  	apiSuffix = "?masterType=COURSE_TYPE";

  	constructor(private http: HttpClient) { }

	/**
	* sends a single request
	* 
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof CourseTypeService
	*/
	getCourseType(): Observable<any> {
		return this.http.get<any>(`${this.api}/coursetype/list/${this.apiSuffix}`)
	}

	/**
	* sends a single request
	* 
	* @param {string} id  
	* @returns {Observable<any>} 
	* @memberof CourseTypeService
	*/
	getCourseTypeById(id: string): Observable<any> {
		return this.http.get<any>(`${this.api}/coursetype/getbyid/${id}/${this.apiSuffix}`)
	}


	/**
	* sends a single request
	* 
	* @param {string} id  
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof CourseTypeService
	*/
	updateCourseTypeById(id: string, body: any): Observable<any> {
		return this.http.put<any>(`${this.api}/coursetype/update`, body)
	}

	/**
	* sends a single request
	* 
	* @param {string} id  
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof CourseTypeService
	*/
	deleteCourseTypeById(id: string, body: any): Observable<any> {
		return this.http.put<any>(`${this.api}/coursetype/delete`, body);
	}

	/**
	* sends a single request
	* 
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof CourseTypeService
	*/
	addCourseType(body: any): Observable<any> {
		return this.http.post<any>(`${this.api}/coursetype/save`, body)
	}
}