// register.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';

@NgModule({
 imports: [
    RegisterComponent,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RegisterComponent },
    ]),
 ],
})
export class RegisterModule {}
