import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeesService {
  api = 'https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/fees';

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  getFeesHeadById(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }

  updateFeesHeadById(id: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      }),
    };

    return this.http.put<any>(
      `${this.api}/${id}`,
      {
        body,
      },
      httpOptions
    );
  }
}
