import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  user: User;

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
  }

  editUser() {
    this.router.navigate(['admin', 'users'], { queryParams: { id: this.user.id, action: 'edit' } });
  }

}
