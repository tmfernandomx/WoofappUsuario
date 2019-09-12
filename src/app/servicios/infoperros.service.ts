import { Injectable } from '@angular/core';
import { datos } from '../models/infoperros.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfoperrosService {
  private datosani: AngularFirestoreCollection<datos>;
  private registro: Observable<datos[]>;

  constructor(db: AngularFirestore) { 
    this.datosani=db.collection<datos>('catalogos');
    this.registro=this.datosani.snapshotChanges().pipe(map(actions =>{

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
    return this.datosani.doc<datos>(id).valueChanges();
  }
}
