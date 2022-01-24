import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: User[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsersListService().subscribe((data) => (
      this.usersList = data.data
    ))
  }

  deleteUser(id: any) {
    this.userService.deleteUserSerivce(id).subscribe((data) => {
      this.getUsers()
    })
  }
}
