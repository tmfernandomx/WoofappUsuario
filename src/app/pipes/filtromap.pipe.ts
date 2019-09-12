import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtromap'
})
export class FiltromapPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    if (texto === ''){
      return arreglo;
    }
 
    texto = texto.toLocaleLowerCase();
 
   return arreglo.filter( item =>{
      return item.id.toLowerCase().includes(texto);
      
    })
   
   }
}
