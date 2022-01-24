import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { UserService } from 'src/app/services/user.service'
import { Validators } from '@angular/forms'
import { User } from 'src/app/interfaces/User'
import { STATES } from 'src/app/states'
import { STATES_CITIES } from 'src/app/state-cities'
import { CryptoService } from 'src/app/services/crypto.service'


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
  states: any = []
  statesCities: any = {}
  listFilter: any | undefined

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private activateRoute: ActivatedRoute, private cryptoService: CryptoService) {
    this.userUpdate = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      mail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]],
      typeOfUser: ['', [Validators.required, Validators.minLength(5)]],
      state: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(5)]],
    })
    this.currentUserId = Number(this.activateRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getCurrentUserInfo()
    this.states = STATES
    this.statesCities = STATES_CITIES
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
    }

    if (this.userUpdate.valid) {
      this.userService.updateUserService(this.currentUserId, user).subscribe((data) => {
        this.router.navigate(['/dashboard'])
      })
    }
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
      })
    })
  }

  onSelect(state: string) {
    let cities = this.statesCities[state]
    this.listFilter = cities
  }

}


