import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Booking } from '../model/Booking';
import { User } from '../model/User';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings: Array<Booking>;
  selectedDate: string;

  constructor(private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-IN');
        }
        this.dataService.getBookings(this.selectedDate).subscribe(
          next => this.bookings = next
        );
      }
    );

    this.dataService.getUser(13).subscribe(
      (next) => {
        console.log(next.name);
        console.log(typeof next);

        let user: User = next;
        console.log(user);
        console.log(typeof user);

        let user2 = next as User;
        console.log(user2);
        console.log(typeof user2);
        console.log(next.getRole());

        let user3 : User = User.fromHttp(next);
        console.log(user3);
        console.log(typeof user3);
        console.log(user3.getRole());


      }
    );
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], { queryParams: { id } });
  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id: number) {
    this.dataService.deleteBooking(id).subscribe(next => this.router.navigate(['']));
  }

  dateChanged() {
    this.router.navigate([''], { queryParams: { date: this.selectedDate } });
  }

}
