import { Component, OnInit, } from '@angular/core';
import { IonSegment } from '@ionic/angular';


import{ViewChild} from '@angular/core'

import{Tienda,Tiendados} from '../../models/tienda.interface';
import{TiendaService}from '../../servicios/tienda.service';
import{TiendadosService}from '../../servicios/tiendados.service';

import{TiendaRopa} from '../../models/tiendaropa.interface';
import{TiendaropaService}from '../../servicios/tiendaropa.service';


import{TiendaRopados} from '../../models/tiendaropados.interface';
import{TiendaropadosService}from '../../servicios/tiendaropados.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})

export class TiendaPage implements OnInit {

   tiendas:Tienda[];
   tiendados:Tiendados[];
    tiendasropa:TiendaRopa[];
   tiendasropados:TiendaRopados[];
   selected = 'alimento';
  //  @ViewChild(IonSegment)segment:IonSegment;
  constructor(private tiendaService: TiendaService,
              private tiendadosService:TiendadosService,
              private tiendaropaService:TiendaropaService,
              private tiendaropadosService: TiendaropadosService
             ) { }

  ngOnInit() {
    // this.segment.value='alimento';
    this.tiendaService.getTiendas().subscribe(res => this.tiendas=res);
    this.tiendadosService.getTiendas().subscribe(res => this.tiendados=res);
    this.tiendaropaService.getTiendasropa().subscribe(res=>this.tiendasropa=res);
    this.tiendaropadosService.getTiendasropasdos().subscribe(res => this.tiendasropados=res);

  
  }
  segmentChanged(event){
    const valorSegmento= event.detail.value;
    console.log( valorSegmento);
  }

}
