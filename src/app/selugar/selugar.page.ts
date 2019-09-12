import { Component, OnInit } from '@angular/core';
import { DatosfService } from './../servicios/datosf.service';
import { casashogar } from './../models/veterinariasinfo.interface';
import { ActivatedRoute } from '@angular/router';
import { HomePage } from './../home/home.page';
import { FundacionesService, fundd } from './../servicios/fundaciones.service';
import { AuthService } from '../servicios/auth.service';

import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-selugar',
  templateUrl: './selugar.page.html',
  styleUrls: ['./selugar.page.scss'],
})
export class SelugarPage implements OnInit {

  public fundacion : any[]=[];
  textoBuscar = '';
  fundaciones:casashogar[];


  constructor(public authservice: AuthService, public fundacionesservice : FundacionesService, public navCtrl: NavController,
    private datoservice: DatosfService, 
    private activateRoute: ActivatedRoute,

    ) { 


    }

   
    buscar(event: any){
      //console.log(event);
      this.textoBuscar = event.detail.value;
     
      
      }

  ngOnInit() {
    this.fundacionesservice.getfundaciones().subscribe(fund=>{
     console.log(fund);
     this.fundacion =fund;
    })


     this.datoservice.getRegistros().subscribe(res => this.fundaciones=res)
  }

 
}
