import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import{map} from 'rxjs/operators';
import { casashogar } from '../models/veterinariasinfo.interface';


@Injectable({
  providedIn: 'root'
})
export class DatosfService {
  private datosfund: AngularFirestoreCollection<casashogar>;
  private registro: Observable<casashogar[]>;



  constructor(db: AngularFirestore) {
    this.datosfund=db.collection<casashogar>('fundaciones');
    this.registro=this.datosfund.snapshotChanges().pipe(map(actions =>{

      return actions.map(a => {
        const data= a.payload.doc.data();
        const id= a.payload.doc.id;
        return{
          id, ...data
        };
      });
    }));

   }
   getRegistros(){
     return this.registro;
   }
   getRegistro(id: string){
     return this.datosfund.doc<casashogar>(id).valueChanges();
   }
}
