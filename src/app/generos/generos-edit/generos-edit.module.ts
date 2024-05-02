import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerosEditComponent } from './generos-edit.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    GenerosEditComponent,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: GenerosEditComponent },
    ]),
 ],
})
export class GenerosEditModule { }
