import { Component, OnInit } from '@angular/core';
import { VeterinariasService } from '../servicios/veterinarias.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-veterinarias',
  templateUrl: './veterinarias.page.html',
  styleUrls: ['./veterinarias.page.scss'],
})
export class VeterinariasPage implements OnInit {
  public vete : any[]=[];
  texto = '';

  constructor(public veterinarias : VeterinariasService, public navCtrl: NavController,
    private activateRoute: ActivatedRoute,
    ) { }

    buscar(event: any){
      console.log(event);
      this.texto = event.detail.value;
    }

  ngOnInit() {
    this.veterinarias.getRegistros().subscribe(vet=>{
     console.log(vet);
     this.vete =vet; 
    })
    this.veterinarias.getRegistros().subscribe(res => this.vete=res)
  }
  }

  

