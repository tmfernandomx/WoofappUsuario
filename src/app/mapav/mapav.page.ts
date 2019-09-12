import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VeterinariasService } from '../servicios/veterinarias.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { vett } from '../models/veterinarias.interface';

declare var mapboxgl:any;
@Component({
  selector: 'app-mapav',
  templateUrl: './mapav.page.html',
  styleUrls: ['./mapav.page.scss'],
})
export class MapavPage implements OnInit, AfterViewInit {
  public vete : any[]=[];
  palabra=''; 
  datoss:vett[];

  eventoDatos: vett={
    id: '',
    estado: '',
    municipio: '',
    logo: '',
    nombre:'',
    ubicacion:'',
    descripcion:'',
    longitud: 20,
    latitud: 20
  }
  ngOnInit() {
  
    this.eventoDatosID=this.activateRoute.snapshot.params['id'];
    if(this.eventoDatosID){
      this.loadLista();
    }
    
    }
  
  eventoDatosID=null;
  geo:any=19.1211;
    geo1:any=91.1212;
    
 

constructor(public veterinarias : VeterinariasService, public navCtrl: NavController,
  private activateRoute: ActivatedRoute, private route: ActivatedRoute, 
  private loadingController: LoadingController, public alertController: AlertController
  ) { }
 
  async loadLista(){
    const loading = await this.loadingController.create({
      message:'Cargando...'
    });
    await loading.present();
    this.veterinarias.getRegistro(this.eventoDatosID).subscribe(res =>{
      loading.dismiss();
      this.eventoDatos = res;
      console.log(this.eventoDatos.latitud);
     console.log(this.eventoDatos.longitud);
     this.geo=this.eventoDatos.longitud;
     this.geo1=this.eventoDatos.latitud;
     this.ngAfterViewInit();
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
  

 
    
    
 ngAfterViewInit(){
   
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybG9zbWFudWVsIiwiYSI6ImNqenNocDJ3NjAxZmYzY24yN2JhbTd5NmMifQ.xvhy0-l6W2XEWiGq8U-daw';
  
  const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 13,
center: [this.geo1, this.geo]
});
 
    map.on('load', () => {

      map.resize();

      new mapboxgl.Marker()
        .setLngLat([this.geo1, this.geo])//lng es geo1 y latitud geo
        .addTo(map);

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
       
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
      labelLayerId = layers[i].id;
      break;
      }
      }
       
      
      });
      
 }
 buscar(event: any){
  //console.log(event);
  this.palabra=this.eventoDatosID;
 
  
  }
  
  
}