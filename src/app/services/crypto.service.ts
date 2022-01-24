import { Injectable } from '@angular/core'
import { SHA1 } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encryption(password: string) {
    let cipherPassword = SHA1(password).toString()
    return cipherPassword
  }
}
