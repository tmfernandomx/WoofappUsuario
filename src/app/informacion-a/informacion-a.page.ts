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

}



 
  



interface listasolicitudes{
  name: string;
  redirectTo: string;
}
