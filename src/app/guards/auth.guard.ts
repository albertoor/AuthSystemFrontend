import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpClient) {
  }
  async canActivate() {
    const token = localStorage.getItem("jwt")
    const tokenUserInfo = JSON.parse(localStorage['userInfo'])

    if (token && !this.jwtHelper.isTokenExpired(token) && tokenUserInfo.TypeOfUser == "Admistrador") {
      return true
    }
    this.router.navigate(["/login"])
    return false
  }
}


