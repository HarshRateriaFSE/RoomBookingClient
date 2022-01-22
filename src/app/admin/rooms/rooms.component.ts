import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/app/model/Room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;
  action:string;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      (next) => this.rooms = next
    );
    this.route.queryParams.subscribe(
      (param) => {
        const id = param['id'];
        if (id) {
          this.selectedRoom = (this.rooms.find(room => room.id === +id)) as Room;
          this.action = param['action'];

        }
        if(param['action'] === 'add'){
          this.selectedRoom = new Room();
          this.action = 'edit';
        }
      }
    )
  }

  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], { queryParams: { id: id, action: 'view' } });
  }

  addRoom(){
    this.router.navigate(['admin', 'rooms'], { queryParams: {  action: 'add' } });

  }
}
