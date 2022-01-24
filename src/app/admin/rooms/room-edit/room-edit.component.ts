import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { Layout, LayoutCapacity, Room } from 'src/app/model/Room';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit, OnDestroy {

  @Input()
  room: Room

  layouts = Object.keys(Layout);
  layoutEnum = Layout as any;

  resetEventSubscription: Subscription;

  roomForm: FormGroup;




  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private formResetService: FormResetService) { }
  

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetRoomFormEvent.subscribe(
      room => {
        this.room = room;
        this.initializeForm();
      }
    )
  }

  initializeForm() {
    this.roomForm = this.formBuilder.group(
      {
        roomName: [this.room.name, Validators.required],
        roomLocation: [this.room.location, [Validators.required, Validators.minLength(2)]],

      }
    );



    for (const layout of this.layouts) {
      const layoutCapacity = this.room.capacities.find(lc => lc.layout === this.layoutEnum[layout]);
      const initialCapacity = layoutCapacity?.capacity;
      this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(initialCapacity));
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
    if (this.room.id != null) {
      this.dataService.updateRoom(this.room).subscribe(
        room => {
          this.router.navigate(['admin', 'rooms'], { queryParams: { id: room.id, action: 'view' } });
        }
      );
    } else {
      this.dataService.addRoom(this.room).subscribe(
        room => {
          this.router.navigate(['admin', 'rooms'], { queryParams: { id: room.id, action: 'view' } });
        }
      );
    }

  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }


}

