import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  userSelected: User;
  action: string;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      (next) => this.users = next
    );
    this.route.queryParams.subscribe(
      (param) => {
        const id = param['id'];
        this.action = param['action'];
        if (id) {
          this.userSelected = (this.users.find(user => user.id === +id)) as User;
        }
      }
    )
  }

  setUser(id: number) {
    this.router.navigate(['admin', 'users'], { queryParams: { id: id, action: 'view' } });
  }

  addUser() {
    this.userSelected = new User();
    this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
    this.formResetService.resetUserFormEvent.emit(this.userSelected);
  }

  

}
