import { Component, OnInit } from '@angular/core';
import{Reportes} from '../models/reporte.interface'
import{ReporteService} from '../servicios/reporte.service'
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  reporte: Reportes={
    image:'',
    razon:'',
    ubicacion:'',
    estadofisico:'',
  }
  reporteID=null;

  constructor(private routr: ActivatedRoute,
              private  nav : NavController,
              private reporteService: ReporteService,
              private loadingController: LoadingController

  ) 
  {

   }

  ngOnInit() {
  }
async guardarTodo(){
  const loading=await this.loadingController.create({
    message:'Guardando....'
  });
  await loading.present();

  if(this.reporteID){
    //uppdate

    this.reporteService.updateReporte(this.reporte, this.reporteID).then(() =>{
        loading.dismiss();
        this.nav.navigateForward('/selugar');
    });

  }else{
    //add new


    this.reporteService.addReporte(this.reporte).then(() =>{
      loading.dismiss();
      this.nav.pop();
      this.nav.navigateForward('/selugar');
  });
  }

}
}
