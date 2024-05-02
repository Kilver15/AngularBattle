import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fadeInOutAnimations } from '../animations';
import { Juego } from '../interfaces/juego.interface';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../users/user.service';
import { Router, RouterLink } from '@angular/router';
import { JuegosService } from '../juegos/juegos.service';
import { PusherserviceService } from '../pusherservice.service';
import { OnDestroy, OnInit } from '@angular/core';
@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [
    CommonModule,
  ],
  animations: [ fadeInOutAnimations],
  styleUrl: './estadisticas.component.css',
  templateUrl: './estadisticas.component.html'
})
export class EstadisticasComponent { 
  juegos: Juego[] = [];
  users: User[] = [];
  countJugador1: number = 0;
  countJugador2: number = 0;
  currentId: number = 0;
  partidaId: number = 0;
  constructor(private usersService: UsersService, 
    private router: Router, 
    private juegosService: JuegosService,
    private pusherService: PusherserviceService) { }

  ngOnInit(): void {
    this.getUser();
    this.pusherService.subscribeToGeneroUpdatedEvent((data) => {
      this.getJuegos(this.currentId);
    });
  }

  getUser(): void {
    this.usersService.getCurrentUser().subscribe(userId => {
      this.currentId = userId;
      this.getJuegos(userId);
      console.log("Usuario: ", userId);
    });
  }

  getUniqueNames(): string[] {
    const uniqueNames = [...new Set(this.users.map(user => user.name))];
    return uniqueNames;
  }

  getUserNombre(userId: number): string {
    const users = this.users.find(user => user.id === userId);
    if (users?.id === this.currentId) {}
    return users ? users.name : 'Usuario no encontrado';
 }

  getJuegos(userId: number): void {
    this.usersService.indexuser().subscribe(users => this.users = users);
    this.juegosService.indexTerminadas(userId).subscribe(juegos => {
      this.juegos = juegos;
      console.log("Juegos: ", juegos);
    });
  }
  countWinners1(): number {
    this.countJugador1 = this.juegos.filter(juego => juego.ganador === juego.jugador1).length;
    return this.countJugador1;
   }
   countWinners2(): number {
    this.countJugador2 = this.juegos.filter(juego => juego.ganador === juego.jugador2).length;
    return this.countJugador2;
   }
   
  }
