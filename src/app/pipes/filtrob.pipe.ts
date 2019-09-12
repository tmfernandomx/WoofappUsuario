import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrob'
})
export class FiltrobPipe implements PipeTransform {

  
  transform(arreglo: any[], texto: string): any[] {
    if (texto === ''){
      return arreglo;
    }
 
    texto = texto.toLocaleLowerCase();
 
   return arreglo.filter( item =>{
      return item.edad.toLowerCase().includes(texto)
      || item.raza.toLowerCase().includes(texto) || item.genero.toLowerCase().includes(texto);
      
    })
   
   }

}
