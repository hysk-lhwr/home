import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginRequest } from '../models/log-in-request';
import { Role } from '../models/role';
import { User } from '../models/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;
  logInForm: FormGroup = this.formBuilder.group({
    username: '',
    password: '',
  })

  logInRequest: LoginRequest = {
    username: '',
    password: ''
  }

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);
  }

  isAdmin() {
    return this.user.role == Role.ADMIN;
  }

  // logout() {
  //   const mockUser: User = {
  //     username: '',
  //     email: '',
  //     role: Role.VISITOR,
  //     timeLoggedin: null
  //   }
  //   this.user = mockUser;
  // }

  onSubmit() {
    this.logInRequest.username = this.logInForm.value.username;
    this.logInRequest.password = this.logInForm.value.password;
    console.log(this.logInRequest);
    this.login();
  }

  private login() {
    this.userService.validateLogin(this.logInRequest);
  }
}
