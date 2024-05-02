import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerosIndexComponent } from './generos-index.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: 
  [
    GenerosIndexComponent,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: GenerosIndexComponent},
    ]),
  ]
})
export class GenerosIndexModule { }
