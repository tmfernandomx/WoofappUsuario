import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';//importar estas tres
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Reportes} from '../models/reporte.interface'
@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private reporteCollection: AngularFirestoreCollection<Reportes>;
  
  private report: Observable<Reportes[]>;


   constructor(db:AngularFirestore) {
     this.reporteCollection= db.collection<Reportes>('reportes');
     this.report= this.reporteCollection.snapshotChanges().pipe(map(
       actions => {
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { id, ...data };
         });
       }
     ));
    }
    getReportes() {
     return this.report;
   }
   getReporte(id: string) {
     return this.reporteCollection.doc<Reportes>(id).valueChanges();
   }
 
   updateReporte(solicitud: Reportes, id: string) {
     return this.reporteCollection.doc(id).update(solicitud);
   }
 
   addReporte(solicitud: Reportes) {
     return this.reporteCollection.add(solicitud);
   }
  
}
