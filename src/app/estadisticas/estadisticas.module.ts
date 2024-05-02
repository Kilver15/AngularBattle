import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EstadisticasComponent } from "./estadisticas.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    EstadisticasComponent,
    CommonModule,
    RouterModule.forChild([
      { path: "", component: EstadisticasComponent },
    ]),
  ],
})

export class EstadisticasModule {}
