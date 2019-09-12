import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { FiltrocPipe } from './filtroc.pipe';
import { FiltrobPipe } from './filtrob.pipe';
import { FiltromapPipe } from './filtromap.pipe';
import { FiltrovetePipe } from './filtrovete.pipe';

@NgModule({
  declarations: [FiltroPipe, FiltrocPipe, FiltrobPipe, FiltromapPipe, FiltrovetePipe],
  exports:[ FiltroPipe, FiltrocPipe, FiltrobPipe, FiltromapPipe, FiltrovetePipe ]
 
})
export class PipesModule { }
