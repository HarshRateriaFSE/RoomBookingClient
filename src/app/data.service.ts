import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Layout, LayoutCapacity, Room } from './model/Room';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Array<Room>;
  private users: Array<User>;

  getRooms(): Observable<Array<Room>> {
    return of(this.rooms);
  }

  getUsers(): Observable<Array<User>> {
    return of(this.users);
  }

  updateUser(user: User): Observable<User> {
    const originalUser: User = this.users.find(u => u.id === user.id) as User;
    originalUser.name = user.name;
    return of(originalUser);
  }

  addUser(newUser: User, password: string): Observable<User> {
    let id = 0;
    for (const user of this.users) {
      if (user.id > id) {
        id = user.id;
      }
    }
    newUser.id = id + 1;
    this.users.push(newUser);
    return of(newUser);
  }

  updateRoom(room: Room): Observable<Room> {
    const originalRoom: Room = this.users.find(r => r.id === room.id) as Room;
    originalRoom.name = room.name;
    originalRoom.location = room.location;
    originalRoom.capacities = room.capacities;
    return of(originalRoom);
  }

  addRoom(newRoom: Room): Observable<Room> {
    let id = 0;
    for (const room of this.rooms) {
      if (room.id > id) {
        id = room.id;
      }
    }
    newRoom.id = id + 1;
    this.rooms.push(newRoom);
    return of(newRoom);
  }

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
