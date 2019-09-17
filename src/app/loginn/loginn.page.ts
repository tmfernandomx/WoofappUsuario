import { Component, OnInit } from '@angular/core';
import {AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-loginn',
  templateUrl: './loginn.page.html',
  styleUrls: ['./loginn.page.scss'],
})
export class LoginnPage implements OnInit {

  public email: string;
public password: string;

  constructor(private auth: AuthService,
              private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmitRegister() {
    if (this.validaisnull()) {
      this.presentToast('Los campos no pueden quedar vacios');
    } else {
      this.auth.register(this.email, this.password).then(auth => {
        console.log(auth);
        this.router.navigate(['tabs/informacion']);
      }).catch(err => {
        this.presentToast('Error' + err);
      });
    }
  }

  validaisnull(): Boolean {
    if (this.email == null || this.password == null) {
      return true;
    }
    return false;
  }

  async presentToast(messagetoast: string) {
    const toast = await this.toastController.create({
      message: messagetoast,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }

}
