import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { HttpClient } from '@angular/common/http'
import { CryptoService } from 'src/app/services/crypto.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  invalidLogin: boolean = false

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private cryptoService: CryptoService) { }

  public loginAsNormalUser = (form: NgForm) => {
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
      this.router.navigate(["/home"])
    }, err => {
      this.invalidLogin = true
    })
  }
}
