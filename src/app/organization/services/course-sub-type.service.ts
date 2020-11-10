import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseSubTypeService {
	api = environment.api2;
  	apiSuffix = "?masterType=COURSE_SUB_TYPE";

  	constructor(private http: HttpClient) { }

	/**
	* sends a single request
	* 
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof CourseSubTypeService
	*/
	getCourseSubType(): Observable<any> {
		return this.http.get<any>(`${this.api}/coursesubtype/list/${this.apiSuffix}`)
	}

	/**
	* sends a single request
	* 
	* @param {string} id  
	* @returns {Observable<any>} 
	* @memberof CourseSubTypeService
	*/
	getCourseSubTypeById(id: string): Observable<any> {
		return this.http.get<any>(`${this.api}/coursesubtype/getbyid/${id}/${this.apiSuffix}`)
	}


	/**
	* sends a single request
	* 
	* @param {string} id  
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof CourseSubTypeService
	*/
	updateCourseSubTypeById(id: string, body: any): Observable<any> {
		return this.http.put<any>(`${this.api}/coursesubtype/update`, body)
	}

	/**
	* sends a single request
	* 
	* @param {string} id  
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof CourseSubTypeService
	*/
	deleteCourseSubTypeById(id: string, body: any): Observable<any> {
		return this.http.put<any>(`${this.api}/coursesubtype/delete`, body);
	}

	/**
	* sends a single request
	* 
	* @param {any} body  
	* @returns {Observable<any>} 
	* @memberof CourseSubTypeService
	*/
	addCourseSubType(body: any): Observable<any> {
		return this.http.post<any>(`${this.api}/coursesubtype/save`, body)
	}
}