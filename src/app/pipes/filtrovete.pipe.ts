import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrovete'
})
export class FiltrovetePipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    if (texto === ''){
      return arreglo;
    }
 
    texto = texto.toLocaleLowerCase();
 
   return arreglo.filter( item =>{
      return item.estado.toLowerCase().includes(texto)
      || item.municipio.toLowerCase().includes(texto);
      
    })
   
   }
  }