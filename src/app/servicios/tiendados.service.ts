import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';//importar estas tres
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{Tiendados} from '../models/tienda.interface';

@Injectable({
  providedIn: 'root'
})
export class TiendadosService {
  private tiendaCollection: AngularFirestoreCollection<Tiendados>;
  private store: Observable<Tiendados[]>;
   constructor(db:AngularFirestore) {
     this.tiendaCollection= db.collection<Tiendados>('tiendados');
     this.store= this.tiendaCollection.snapshotChanges().pipe(map(
       actions => {
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { id, ...data };
         });
       }
     ));
    }
    getTiendas() {
     return this.store;
   }
   getTienda(id: string) {
     return this.tiendaCollection.doc<Tiendados>(id).valueChanges();
   }
   updateTienda(solicitud: Tiendados, id: string) {
     return this.tiendaCollection.doc(id).update(solicitud);
   }

  addTienda(solicitud: Tiendados) {
    return this.tiendaCollection.add(solicitud);
  }
  removeTienda(id: string) {
    return this.tiendaCollection.doc(id).delete();
  }
 
}


