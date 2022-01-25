import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Booking } from 'src/app/model/Booking';
import { Layout, Room } from 'src/app/model/Room';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {


  booking: Booking;
  rooms: Array<Room>;
  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  users: Array<User>;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      room => this.rooms = room
    );

    this.dataService.getUsers().subscribe(
      user => this.users = user
    );

    const id = this.route.snapshot.queryParams['id'];
    if (id) {

      this.dataService.getBooking(+id).subscribe(
        next => this.booking = next
      );
    } else {
      this.booking = new Booking();
    }
  }

  onSubmit() {
    if (this.booking.id != null) {
      
      this.dataService.saveBooking(this.booking).subscribe(
        next => this.router.navigate([''])
        );
    }else{
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    }
  }

  

}
