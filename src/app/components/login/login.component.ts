import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value)
    this.authService.doLogin(credentials).subscribe(response => {
      const token = (<any>response).token
      const userObj = JSON.parse(response.userJSON);
      // console.log(JSON.parse(response.userJSON));

      // const userObj = (<any>response).userJSON
      localStorage.setItem("jwt", token)
      localStorage.setItem("userInfo", JSON.stringify(userObj));

      this.invalidLogin = false
      this.router.navigate(["/dashboard"])
    }, err => {
      this.invalidLogin = true
    })

  }
}
