import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroc'
})
export class FiltrocPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    if (texto === ''){
      return arreglo;
    }
 
    texto = texto.toLocaleLowerCase();
 
   return arreglo.filter( item =>{
      return item.fundacion.toLowerCase().includes(texto);
      
    })
   
   }
   
 

}
