import { Injectable } from '@angular/core';
import { animal } from './animalitos.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FirebaseAppConfig } from '@angular/fire';


export interface animal{
  id: string;
  nombre: string;
  genero: string;
  edad: string;
  raza:string;
  datosm:string;
  rasgos:string;
  historia:string;
  foto:string;
  fundacion:string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalitosService {

  constructor(private db: AngularFirestore) {   }

 

  getanimales(){
    return this.db.collection('catalogos').snapshotChanges().pipe(map(funda=>{
      return funda.map(a=>{
        const data=a.payload.doc.data() as animal;
        data.id=a.payload.doc.id;
        return data;
      })
    }))
  }

  getfundaciones(){
    return this.db.collection('catalogos').snapshotChanges().pipe(map(funda=>{
      return funda.map(a=>{
        const data=a.payload.doc.data() as animal;
        return data.fundacion;
      })
    }))
}
}