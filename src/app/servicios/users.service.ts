import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/users.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(db: AngularFirestore) {
    this.userCollection = db.collection<User>('users');

    this.users = this.userCollection.snapshotChanges().pipe(map( actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }
    ));
  }

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  updateUser(user: User, id: string) {
    return this.userCollection.doc(id).update(user);
  }

  addUser(user: User) {
    return this.userCollection.add(user);
  }

  removeUser(id: string) {
    return this.userCollection.doc(id).delete();
  }
}