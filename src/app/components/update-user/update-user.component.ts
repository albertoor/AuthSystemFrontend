import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userUpdate: FormGroup
  user: User | undefined
  currentUserId = 0;
  typerOfUsersArr: string[] = ['Admnistrador', 'Usuario'];

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private activateRoute: ActivatedRoute) {
    this.userUpdate = this.fb.group({
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
    this.currentUserId = Number(this.activateRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getCurrentUserInfo()
  }

  updateUser() {
    const user: User = {
      id: this.currentUserId,
      name: this.userUpdate.get('name')?.value,
      userName: this.userUpdate.get('username')?.value,
      mail: this.userUpdate.get('mail')?.value,
      phone: this.userUpdate.get('phone')?.value,
      address: this.userUpdate.get('address')?.value,
      postalCode: this.userUpdate.get('postalCode')?.value,
      typeOfUser: this.userUpdate.get('typeOfUser')?.value,
      state: this.userUpdate.get('state')?.value,
      city: this.userUpdate.get('city')?.value,
      password: this.userUpdate.get('password')?.value
    }
    this.userService.updateUserService(this.currentUserId, user).subscribe((data) => {
      this.router.navigate(['/dashboard'])
    })
  }

  getCurrentUserInfo() {
    this.userService.getUserService(this.currentUserId).subscribe((data) => {
      console.log(data.data)
      this.user = data.data
      this.userUpdate.patchValue({
        name: data.data.name,
        username: data.data.userName,
        mail: data.data.mail,
        phone: data.data.phone,
        address: data.data.address,
        postalCode: data.data.postalCode,
        typeOfUser: data.data.typeOfUser,
        state: data.data.state,
        city: data.data.city,
        password: data.data.password
      })
    })
  }
}


