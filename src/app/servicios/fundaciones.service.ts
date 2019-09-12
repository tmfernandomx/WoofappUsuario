import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface fundd{
  id: string;
  estado: string;
  municipio: string;
  logo: string;
  nombre:string;
  ubicacion:string;
  descripcion:string;
}

@Injectable({
  providedIn: 'root'
})
export class FundacionesService {
  

  constructor(private db: AngularFirestore) {   }

  getfundaciones(){
    return this.db.collection('fundaciones').snapshotChanges().pipe(map(funda=>{
      return funda.map(a=>{
        const data=a.payload.doc.data() as fundd;
        data.id=a.payload.doc.id;
        return data;
      })
    }))

  }
  
}
