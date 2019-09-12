import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { vett } from '../models/veterinarias.interface';


@Injectable({
  providedIn: 'root'
})
export class VeterinariasService {
  private datosvet: AngularFirestoreCollection<vett>;
  private registro: Observable<vett[]>;

  constructor(db: AngularFirestore) { 
    this.datosvet=db.collection<vett>('veterinarias');
    this.registro=this.datosvet.snapshotChanges().pipe(map(actions =>{

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
    return this.datosvet.doc<vett>(id).valueChanges();
  }
}