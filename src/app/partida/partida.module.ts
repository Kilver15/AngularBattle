import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PartidaComponent } from "./partida.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    PartidaComponent,
    CommonModule,
    RouterModule.forChild([
      { path: "", component: PartidaComponent },
    ]),
  ],
})

export class PartidaModule {}
