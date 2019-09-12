import { Component, OnInit } from '@angular/core';
import { AuthService } from './../servicios/auth.service';
import { User } from '../models/users.interface';
import { UsersService } from '../servicios/users.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  user: User = {
    nombre: '',
    apellidos: '',
    domicilio: '',
    telefono: '',
    foto: ''
  };

  userId = null;

  constructor(
    private authService: AuthService,
    private nav: NavController,
    private _user: UsersService,
    private loadingController: LoadingController) {
      this.userId = localStorage.getItem('id');
    }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this._user.getUserById(this.userId).subscribe( data => {
      console.log(data);
      this.user = data;
      loading.dismiss();
    });
  }

  async saveDataUser() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });

    await loading.present();

    if(this.userId != null) {
      //uppdate
      this._user.updateUser(this.user, this.userId).then(() => {
          loading.dismiss();
          this.nav.navigateForward('/selugar');
      });
    }
  }

  Onlogout() {
    this.authService.logout();
  }

}
