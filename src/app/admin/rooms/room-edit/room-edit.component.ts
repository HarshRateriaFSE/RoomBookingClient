import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Layout, LayoutCapacity, Room } from 'src/app/model/Room';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  @Input()
  room: Room

  layouts = Object.keys(Layout);
  layoutEnum = Layout as any;



  roomForm = new FormGroup(
    {
      roomName: new FormControl('roomName'),
      roomLocation: new FormControl('roomLocation')
    }
  );


  constructor() { }

  ngOnInit(): void {
    this.roomForm.patchValue({
      roomName: this.room.name,
      roomLocation: this.room.location
    });

    for (const layout of this.layouts) {
      this.roomForm.addControl(`layout${layout}`, new FormControl(`layout${layout}`));
    }
  }

  onSubmit() {
    this.room.name = this.roomForm.value['roomName'];
    this.room.location = this.roomForm.controls['roomLocation'].value;
    this.room.capacities = Array<LayoutCapacity>();
    for (const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = this.layoutEnum[layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);
    }
    console.log(this.room);

  }
}
