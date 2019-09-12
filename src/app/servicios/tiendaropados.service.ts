import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';//importar estas tres
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{TiendaRopados} from '../models/tiendaropados.interface';

@Injectable({
  providedIn: 'root'
})
export class TiendaropadosService {
  private tiendaropadosCollection: AngularFirestoreCollection<TiendaRopados>;
  private store: Observable<TiendaRopados[]>;
  constructor(db:AngularFirestore) {
    this.tiendaropadosCollection= db.collection<TiendaRopados>('tiendaropados');
    this.store= this.tiendaropadosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
   }
   getTiendasropasdos() {
    return this.store;
  }
  getTiendaropados(id: string) {
    return this.tiendaropadosCollection.doc<TiendaRopados>(id).valueChanges();
  }
  updateTiendados(solicitud: TiendaRopados, id: string) {
    return this.tiendaropadosCollection.doc(id).update(solicitud);
  }

 addTiendados(solicitud: TiendaRopados) {
   return this.tiendaropadosCollection.add(solicitud);
 }
 removeTiendados(id: string) {
   return this.tiendaropadosCollection.doc(id).delete();
 }
}
