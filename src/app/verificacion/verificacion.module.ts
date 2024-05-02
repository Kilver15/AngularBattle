import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificacionComponent } from './verificacion.component';
import { RouterModule } from '@angular/router';

@NgModule({
 imports: [
    VerificacionComponent,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: VerificacionComponent },
    ]),
 ],
})
export class VerificacionModule {}
