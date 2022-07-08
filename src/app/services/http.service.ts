import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getData(url: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get(url, { params }).pipe(
      catchError( error => throwError(error))
    );
  }

}
