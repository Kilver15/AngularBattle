import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerosStoreComponent } from './generos-store.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    GenerosStoreComponent,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: GenerosStoreComponent },
    ]),
 ],
})
export class GenerosStoreModule { }
