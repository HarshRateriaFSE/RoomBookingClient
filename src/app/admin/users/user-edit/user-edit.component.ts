import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  user: User
  formUser: User;
  password: string;
  password2: string;
  nameIsValid = false;
  passwordIsValid = false;
  passwordIsSame = false;

  message: string;

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.formUser = Object.assign({}, this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordIsValid();

  }

  onSubmit() {
    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (user) => { this.router.navigate(['admin', 'users'], { queryParams: { id: this.formUser.id, action: 'view' } }) }
      );
    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => { this.router.navigate(['admin', 'users'], { queryParams: { id: this.formUser.id, action: 'view' } }) }
      );
    }
  }

  checkIfNameIsValid() {
    if (this.formUser.name) {

      this.nameIsValid = this.formUser.name.trim().length > 0;
    } else {
      this.nameIsValid = false;
    }
  }

  checkIfPasswordIsValid() {
    if (this.formUser.id != null) {
      this.passwordIsSame = true;
      this.passwordIsValid = true;
    } else {
      this.passwordIsSame = this.password === this.password2;
      if (this.password) {
        this.passwordIsValid = this.password.trim().length > 0;
      } else {
        this.passwordIsValid = false;
      }
    }
  }


}
