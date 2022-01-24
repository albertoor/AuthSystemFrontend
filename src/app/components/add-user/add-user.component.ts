import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { User } from 'src/app/interfaces/User'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userCreate: FormGroup
  user: User | undefined

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.userCreate = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      mail: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      typeOfUser: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void { }

  createUser() {
    const user: User = {
      name: this.userCreate.get('name')?.value,
      userName: this.userCreate.get('username')?.value,
      mail: this.userCreate.get('mail')?.value,
      phone: this.userCreate.get('phone')?.value,
      address: this.userCreate.get('address')?.value,
      postalCode: this.userCreate.get('postalCode')?.value,
      typeOfUser: this.userCreate.get('typeOfUser')?.value,
      state: this.userCreate.get('state')?.value,
      city: this.userCreate.get('city')?.value,
      password: this.userCreate.get('password')?.value,
    }

    console.log(user)

    this.userService.createUserService(user).subscribe(response => {
      console.log(response)
      this.router.navigate(['/dashboard'])
    }, err => {
      console.log(err)
    })

  }
}
