import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthNormalUserGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpClient) {
  }
  async canActivate() {
    const token = localStorage.getItem("jwt")
    const tokenUserInfo = JSON.parse(localStorage['userInfo'])

    if (token && !this.jwtHelper.isTokenExpired(token) && tokenUserInfo.TypeOfUser == "Usuario") {
      return true
    }
    this.router.navigate(["/login-normal-user"])
    return false
  }

}
