import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JuegosComponent } from "./juegos.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    JuegosComponent,
    CommonModule,
    RouterModule.forChild([
      { path: "", component: JuegosComponent },
    ]),
  ],
})

export class JuegosModule {}
