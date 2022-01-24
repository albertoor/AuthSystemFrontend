import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private cryptoService: CryptoService) { }

  public login = (form: NgForm) => {
    let encrypt = this.cryptoService.encryption(form.value.password)

    const credentials = {
      username: form.value.username,
      password: encrypt
    }

    this.authService.doLogin(credentials).subscribe(response => {
      const token = (<any>response).token
      const userObj = JSON.parse(response.userJSON);
      console.log(userObj);
      localStorage.setItem("jwt", token)
      localStorage.setItem("userInfo", JSON.stringify(userObj));

      this.invalidLogin = false
      this.router.navigate(["/dashboard"])
    }, err => {
      this.invalidLogin = true
    })

  }
}

