import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';//importar estas tres
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{TiendaRopa} from '../models/tiendaropa.interface';
@Injectable({
  providedIn: 'root'
})
export class TiendaropaService {

  private tiendaropaCollection: AngularFirestoreCollection<TiendaRopa>;
  private store: Observable<TiendaRopa[]>;
  constructor(db:AngularFirestore) {
    this.tiendaropaCollection= db.collection<TiendaRopa>('tiendaropa');
    this.store= this.tiendaropaCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
   }
   getTiendasropa() {
    return this.store;
  }
  getTiendaropa(id: string) {
    return this.tiendaropaCollection.doc<TiendaRopa>(id).valueChanges();
  }
  updateTienda(solicitud: TiendaRopa, id: string) {
    return this.tiendaropaCollection.doc(id).update(solicitud);
  }

 addTienda(solicitud: TiendaRopa) {
   return this.tiendaropaCollection.add(solicitud);
 }
 removeTienda(id: string) {
   return this.tiendaropaCollection.doc(id).delete();
 }
}
