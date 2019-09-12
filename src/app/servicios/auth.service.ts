import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { promise } from 'protractor';
import { reject, isRejected } from 'q';
import { resolve } from 'dns';
import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { Router } from "@angular/router";
import { auth } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth,
              private router: Router,
              private db: AngularFirestore) { }

  login(email: string, password: string) {

    return new Promise((resolve, rejected)=>{
      this.AFauth.auth.signInWithEmailAndPassword(email,password).then(user=>{
        localStorage.setItem('id', user.user.uid)
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  register(email: string,
           password: string,
           nombre: string = '',
           apellidos: string = '',
           domicilio: string = '',
           telefono: string = '',
           foto: string = '') {
      return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        console.log(res.user.uid);
        localStorage.setItem('id', res.user.uid);
        const uid = res.user.uid;
        if(foto === '') {
          // tslint:disable-next-line: max-line-length
          foto = 'https://firebasestorage.googleapis.com/v0/b/woofapp-78c4e.appspot.com/o/imagen.png?alt=media&token=80353dba-5200-4406-bcc5-9e2963904536';
        }
        this.db.collection('users').doc(uid).set({
        email,
        password,
        nombre,
        apellidos,
        domicilio,
        telefono,
        foto,
        uid
      });
        resolve(res);
      }).catch(err => reject(err));
    });
  }

  logout(){
    this.AFauth.auth.signOut().then(() =>{
      //this.router.navigate(['/ingresar']);
      location.assign('/ingresar');
    });
  }
}
