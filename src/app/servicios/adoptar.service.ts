import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';//importar estas tres
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import{Adoptar} from '../models/adoptar.interface'
@Injectable({
  providedIn: 'root'
})
export class AdoptarService {
  private adoptarcollection: AngularFirestoreCollection<Adoptar>;
  
  private adopt: Observable<Adoptar[]>;


   constructor(db:AngularFirestore) {
     this.adoptarcollection= db.collection<Adoptar>('Adopciones');
     this.adopt= this.adoptarcollection.snapshotChanges().pipe(map(
       actions => {
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { id, ...data };
         });
       } 
     ));
    }
    getAdoptados() {
     return this.adopt;
   }
   getAdotar(id: string) {
     return this.adoptarcollection.doc<Adoptar>(id).valueChanges();
   }
 
   updateAdoptar(adopcion: Adoptar, id: string) {
     return this.adoptarcollection.doc(id).update(adopcion);
   }
 
   addAdoptar(adopcion: Adoptar) {
     return this.adoptarcollection.add(adopcion);
   }
}
