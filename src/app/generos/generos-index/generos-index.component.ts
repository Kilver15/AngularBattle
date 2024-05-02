import { Component } from '@angular/core';
import { GenerosService } from '../generos.service';
import { Genero } from '../../interfaces/genero.interface';
import { CommonModule } from '@angular/common';
import { fadeInOutAnimations } from '../../animations';
import { RouterLink } from '@angular/router';
import { CookieService } from '../../cookies.service';
import { PusherserviceService } from '../../pusherservice.service';

@Component({
  selector: 'app-generos-index',
  standalone: true,
  imports: [CommonModule, RouterLink],
  animations: fadeInOutAnimations,
  templateUrl: './generos-index.component.html',
  styleUrl: './generos-index.component.css'
})
export class GenerosIndexComponent {
  generos: Genero[] = [];
  cargando: boolean = true;
  rolId: number = 0;

  constructor(private generosService: GenerosService,
    private cookieService: CookieService, private pusherService: PusherserviceService) { }

  ngOnInit() {
    this.actualizargenero();
    this.rolId = parseInt(this.cookieService.getCookie('rol') || '0', 10);
    this.pusherService.subscribeToGeneroUpdatedEvent((data) => {
      this.actualizargenero();
    });
  }
  actualizargenero() {
    this.generosService.indexgenero().subscribe(
      generos => {
        this.generos = generos;
        this.cargando = false; 
      },
      error => {
        console.error('Error al obtener los generos:', error);
        
      }
    );
  }
  confirmDelete(id: any): void {
    if (confirm('¿Estás seguro de que deseas eliminar este genero?')) {
       this.deleteGenero(id);
    }
   }
   
   deleteGenero(id: number): void {
    this.generosService.deleteGenero(id).subscribe(
      response=>{
        console.log('genero elimnado con exito');
      alert('genero eliminado');
      this.cargando = true; 
      this.actualizargenero();
      },
      error => console.error('Error al obtener los generos:', error)
    );
     }
}
