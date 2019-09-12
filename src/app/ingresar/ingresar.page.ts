import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {
  email:string;
  password:string;

  constructor(private authService: AuthService, public router:Router) { }

  ngOnInit() {
  }
  
  onSubmitLogin(){
    this.authService.login(this.email, this.password).then(res=>{
      // this.router.navigate(['/tabs/informacion']);
      location.assign('tabs/informacion');
    }).catch(err=>alert('Los datos son incorrectos o no existe el usuario'))
  }
}
