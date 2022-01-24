import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const options = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:4200"
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL_LOGIN = "http://localhost:5000/api/auth/login"

  constructor(private http: HttpClient) { }

  doLogin(credentials: any): Observable<any> {
    return this.http.post(this.API_URL_LOGIN, credentials, options)
  }
}
