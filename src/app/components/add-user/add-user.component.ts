import { Component, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { User } from 'src/app/interfaces/User'
import { UserService } from 'src/app/services/user.service'
import { STATES } from 'src/app/states'
import { STATES_CITIES } from 'src/app/state-cities';
import { CryptoService } from 'src/app/services/crypto.service'


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userCreate: FormGroup
  user: User | undefined
  states: any = []
  statesCities: any = {}
  listFilter: any | undefined


  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private cryptoService: CryptoService) {
    this.userCreate = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      mail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      postalCode: ['', [Validators.required, Validators.maxLength(5)]],
      typeOfUser: ['', [Validators.required, Validators.minLength(5)]],
      state: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })

  }

  ngOnInit(): void {
    this.states = STATES
    this.statesCities = STATES_CITIES
  }

  createUser() {
    let passEncrypt = this.cryptoService.encryption(this.userCreate.get('password')?.value)

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
      password: passEncrypt,
    }

    // console.log(user.password);

    if (this.userCreate.valid) {
      this.userService.createUserService(user).subscribe(response => {
        console.log(response)
        this.router.navigate(['/dashboard'])
      }, err => {
        console.log(err)
      })
    }

  }

  onSelect(state: string) {
    let cities = this.statesCities[state]
    this.listFilter = cities
  }

}
