import { Injectable } from '@angular/core';
import { Layout, LayoutCapacity, Room } from './model/Room';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rooms: Array<Room>;
  users: Array<User>;

  constructor() {
    this.rooms = new Array<Room>();
    const room1 = new Room();
    room1.id = 1;
    room1.location = 'first floor';
    room1.name = 'first room';

    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 50;

    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.BOARD;
    capacity2.capacity = 10;

    room1.capacities.push(capacity1);
    room1.capacities.push(capacity2);

    const room2 = new Room();
    room2.id = 2;
    room2.location = 'second floor';
    room2.name = 'second room';

    const capacity3 = new LayoutCapacity();
    capacity3.layout = Layout.THEATER;
    capacity3.capacity = 100;

    const capacity4 = new LayoutCapacity();
    capacity4.layout = Layout.USHAPE;
    capacity4.capacity = 20;

    room2.capacities.push(capacity3);
    room2.capacities.push(capacity4);

    this.rooms.push(room1);
    this.rooms.push(room2);

    this.users = new Array<User>();

    const user1 = new User();
    user1.id = 1;
    user1.name = 'Matt';
    const user2 = new User();
    user2.id = 2;
    user2.name = 'Diana';
    const user3 = new User();
    user3.id = 3;
    user3.name = 'Suzanne';
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);

  }
}
