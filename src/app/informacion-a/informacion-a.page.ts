import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { datos } from '../models/infoperros.interface';
import { AuthService } from '../servicios/auth.service';
import { AnimalitosService } from '../servicios/animalitos.service';
import { ActivatedRoute } from '@angular/router';
import { loadingController } from '@ionic/core';
import { InfoperrosService } from '../servicios/infoperros.service';
import { NavParams, NavController , LoadingController, AlertController} from '@ionic/angular';
import { animal } from './../servicios/animalitos.service';

import{Adoptar} from '../models/adoptar.interface'
import{AdoptarService}from '../servicios/adoptar.service'
  
@Component({
  selector: 'app-informacion-a',
  templateUrl: './informacion-a.page.html',
  styleUrls: ['./informacion-a.page.scss'],
})
export class InformacionAPage implements OnInit {

  selected = 'info' //Variable que se encarga de controlar que segmento se abre
  //Por default aparace con el primer segment abierto

  // @ViewChild(IonSegment) segment: IonSegment;

  public dat : any=[];
  datoss:datos[];

  adopcion: Adoptar={
    nombres: '',
    apellidos: '',
    fechanaci:'',
    correo: '',
    direccion:'',
    telefono:'',
    ciudad:'',
    estado:'',
    credencial:'',
    comdomi:'',
  }
  adopcionID=null;
  
  eventoDatos: datos={
    id: '',
    nombre: '',
    edad: '',
    genero: '',
    raza: '',
    datosm: '',
    foto: '',
    historia: '',
  }

  eventoDatosID=null;
  constructor(public authservice: AuthService, public animalitos : AnimalitosService,
    private activateRoute: ActivatedRoute,public navCtrl: NavController,
    private loadingController: LoadingController, 
    private adopcionservicio: AdoptarService,
    private nav: NavController,
    private info: InfoperrosService, public alertController: AlertController) { }

  ngOnInit() {
    // this.segment.value = 'adopcion' ;
    this.eventoDatosID=this.activateRoute.snapshot.params['id'];
      if(this.eventoDatosID){
        this.loadLista();
      }
 }
  
 segmentChanged(event){
  const valorSegmento= event.detail.value;
  console.log( valorSegmento);
}
 async loadLista(){
  const loading = await this.loadingController.create({
    message:'Cargando...'
  });
  await loading.present();
  this.info.getRegistro(this.eventoDatosID).subscribe(res =>{
    loading.dismiss();
    this.eventoDatos = res;
  });
}
// acion para seguir comprando o cancelar
async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Alerta',
    // subHeader: 'Subtitle',
    message: 'Desea seguir comprando.',
    buttons: [
      {
        text: 'Pagar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
         
          console.log('Cancelar');
        }
      },
      {
          text: 'ok',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Botón OK');
          }
      }
    ]
  });

  await alert.present();
}



async guardarTodo(){
  const loading=await this.loadingController.create({
    message:'Guardando....'
  });
  await loading.present();

  if(this.adopcionID){
    //uppdate

    this.adopcionservicio.updateAdoptar(this.adopcion, this.adopcionID).then(() =>{
        loading.dismiss();
        this.nav.navigateForward('/selugar');
    });

  }else{
    //add new


    this.adopcionservicio.addAdoptar(this.adopcion).then(() =>{
      loading.dismiss();
      this.nav.pop();
      this.nav.navigateForward('/selugar');
  });
  }

}

}



 
  



interface listasolicitudes{
  name: string;
  redirectTo: string;
}
