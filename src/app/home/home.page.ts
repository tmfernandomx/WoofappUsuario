import { animal } from './../servicios/animalitos.service';
import { casashogar } from './../models/veterinariasinfo.interface';
import { NavParams, NavController , LoadingController, ActionSheetController} from '@ionic/angular';
import { fundd } from './../servicios/fundaciones.service';
import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { AnimalitosService } from '../servicios/animalitos.service';
import { ActivatedRoute } from '@angular/router';
import { DatosfService } from '../servicios/datosf.service';
import { datos } from '../models/infoperros.interface';
import { InfoperrosService } from '../servicios/infoperros.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public catalogo : any=[];
  textoBuscarr = '';
  palabra='';  
  fundaciones:datos[];
  
  

  eventoNombre: casashogar={
    nombre:'',
    id:'',
    foto:'',
  }
 
  
 
  eventoNombreID=null;
  constructor(public authservice: AuthService, public animalitos : AnimalitosService,
    private activateRoute: ActivatedRoute,public navCtrl: NavController,
    private LoadingController: LoadingController, private servicio: DatosfService, private actionSheetCtrl: ActionSheetController,
    private datoservice: DatosfService , private info: InfoperrosService,private  SocialSharing:SocialSharing) {
   
   }

   buscar(event: any){
    console.log(event);
    this.textoBuscarr = this.eventoNombreID;
    
    
    }

  buscarperro(event: any){
      //console.log(event);
      this.palabra = event.detail.value;
     
      
      }

  ngOnInit() {

     this.eventoNombreID=this.activateRoute.snapshot.params['id'];
     this.animalitos.getanimales().subscribe(fund=>{
          this.catalogo=fund;
          console.log(this.catalogo);
          console.log(this.eventoNombreID);
          
        })}
  
        async favoritoperro() {
          const actionSheet = await this.actionSheetCtrl.create({
            buttons: [
             {
              text: 'Favorito',
              icon: 'star',
              handler: () => {
                console.log('Favorito');
              }
            },
            {
              text: 'Cancelar',
              icon: 'close',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }]
          });
          await actionSheet.present();
        }
      
      //codgo para compartir el perro en las redes
       async compartirperro(){
          const actionSheet = await this.actionSheetCtrl.create({
            buttons: [{
              text: 'Compartir',
              icon: 'share',
              handler: () => {
                console.log('Share clicked');
                this.SocialSharing.share(
                  this.eventoNombre.nombre,
                  this.eventoNombre.foto
                )
              }
            },
            {
              text: 'Cancelar',
              icon: 'close',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }]
          });
          await actionSheet.present();
        }
  
     
    

}