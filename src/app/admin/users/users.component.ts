import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  userSelected: User;
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      (next) => this.users = next
    );
    this.route.queryParams.subscribe(
      (param) => {
        const id = param['id'];
        if (id) {
          this.userSelected = (this.users.find(user => user.id === +id)) as User;
        }
      }
    )
  }

  setUser(id: number) {
    this.router.navigate(['admin', 'users'], { queryParams: { id: id } });
  }

}
