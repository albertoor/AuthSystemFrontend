import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../interfaces/User'

const options = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private BASE_URL = "http://localhost:5000/api/users"
  private API_URL_USERS_LIST = "/list"
  private API_URL_CREATE_USER = "/create"
  private API_URL_DELETE_USER = "/delete/"
  private API_URL_UPDATE_USER = "/update/"
  private API_URL_USER = "/user/"

  constructor(private http: HttpClient) { }

  getUsersListService(): Observable<any> {
    return this.http.get(this.BASE_URL + this.API_URL_USERS_LIST)
  }

  createUserService(user: User): Observable<any> {
    return this.http.post(this.BASE_URL + this.API_URL_CREATE_USER, user, options)
  }

  deleteUserSerivce(id: number): Observable<any> {
    return this.http.delete(this.BASE_URL + this.API_URL_DELETE_USER + id);
  }

  updateUserService(id: number, user: User): Observable<any> {
    return this.http.put(this.BASE_URL + this.API_URL_UPDATE_USER + id, user);
  }

  getUserService(id: number): Observable<any> {
    return this.http.get(this.BASE_URL + this.API_URL_USER + id)
  }
}
