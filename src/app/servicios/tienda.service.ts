import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';//importar estas tres
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{Tienda} from '../models/tienda.interface';
@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private tiendaCollection: AngularFirestoreCollection<Tienda>;
  private store: Observable<Tienda[]>;
   constructor(db:AngularFirestore) {
     this.tiendaCollection= db.collection<Tienda>('tienda');
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
     return this.tiendaCollection.doc<Tienda>(id).valueChanges();
   }
   updateTienda(solicitud: Tienda, id: string) {
     return this.tiendaCollection.doc(id).update(solicitud);
   }

  addTienda(solicitud: Tienda) {
    return this.tiendaCollection.add(solicitud);
  }
  removeTienda(id: string) {
    return this.tiendaCollection.doc(id).delete();
  }
}
