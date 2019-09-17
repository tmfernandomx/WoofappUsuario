import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {
  email:string;
  password:string;

  constructor(private authService: AuthService,
              public router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    console.log(this.email + ' ' + this.password + ' ' + this.validaisnull());
    if(this.validaisnull()) {
      this.presentToast('Los campos no pueden quedar vacios');
    } else {
      this.authService.login(this.email, this.password).then(res => {
        // this.router.navigate(['/tabs/informacion']);
        location.assign('tabs/informacion');
      })
      .catch(err => {
        this.presentToast('El usuario o contraseña son incorrectos');
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
