import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInOutAnimations } from '../animations';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from '../cookies.service';
import { PusherserviceService } from '../pusherservice.service';
import { Juego } from '../interfaces/juego.interface';
import { JuegosService } from '../juegos/juegos.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users/user.service';
import { Barco } from '../interfaces/barco.interface';
@Component({
  selector: 'app-funciones-index',
  standalone: true,
  imports: [CommonModule, RouterLink],
  animations: fadeInOutAnimations,
  templateUrl: './partida.component.html',
  styleUrl: './partida.component.css'
})

export class PartidaComponent {
  playerId: number = 0;
  isPlayer1: boolean = false;
  isPlayer2: boolean = false;
  gameid:number  = 0;
  readyJugador2: boolean = false;
  gamestarted: number = 0;
  gamefinished: number = 0;
  juegoActual: Juego = {
    id: this.gameid,
    jugador1: 0,
    jugador2: 0,
    puntuacion1: 0,
    puntuacion2: 0,
    estado: '',
    ganador: 0
  };
  ganador = false;
  perdedor = false;
  turno: boolean = true;
  totalShips = 15;
  shipCoordinates: Barco[] = [];
  columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  rows = [0, 1, 2, 3, 4];
  myBoard = Array.from({ length: 5 }, () => Array.from({ length: 8 }, () => false));
  hit = Array.from({ length: 5 }, () => Array.from({ length: 8 }, () => false));
  noHit = Array.from({ length: 5 }, () => Array.from({ length: 8 }, () => false));
  opponentBoard = Array.from({ length: 5 }, () => Array.from({ length: 8 }, () => false));

  constructor(private juegoService: JuegosService,
    private pusherService: PusherserviceService,
    private route: ActivatedRoute,
    private userService: UsersService,
    private router : Router,
  ) { }

  ngOnInit() {
    this.generateShips();
      this.gameid = Number(this.route.snapshot.paramMap.get('id'));
      this.buscarPartida(this.gameid);
  
      this.pusherService.subscribeToJoinGame((data) => {
        this.buscarPartida(this.gameid);
        console.log('Jugador 2 ingreso:', this.juegoActual.jugador2);
      });
      this.userService.getCurrentUser().subscribe(userId => {
        this.juegoService.buscarJuego(this.gameid).subscribe((juego: Juego) => {
          this.playerId = userId;
          if (juego.jugador1 === userId) {
            console.log("Eres el jugador 1");
            this.isPlayer1 = true;
            this.turno = false;
  
          } else if (juego.jugador2 === userId) {
            console.log("Eres el jugador 2");
            this.isPlayer2 = true;
          } else {
            console.log("No estás asociado con esta partida");
          }
        });
      });

      this.pusherService.onShotReceived((shot) => {
        const { casilla } = shot;
        const { row, column } = casilla;
        console.log('Evento recibido');
        console.log('Fila:', row);
        console.log('Columna:', column);
        // Actualizar el tablero del oponente
        if (!this.turno) {
          this.turno = true;
          const hitShip = this.shipCoordinates.find(coord => coord.row === row && coord.column === column);
          if (hitShip) {
            this.myBoard[row][this.columns.indexOf(column)] = false;
            this.hit[row][this.columns.indexOf(column)] = true;
            this.totalShips--;
            if (this.totalShips === 0) {
              console.log('Juego terminado');
              this.perdedor = true;
              console.log("Partida terminada: ", this.perdedor, this.ganador);
              if (this.isPlayer1) {
                this.juegoActual.ganador = this.juegoActual.jugador2!;
                this.gamefinished = this.juegoActual.jugador2!;
              } else {
                this.juegoActual.ganador = this.juegoActual.jugador1;
                this.gamefinished = this.juegoActual.jugador1!;
              }
              this.juegoService.terminarJuego(this.juegoActual,this.gameid).subscribe(
                response => {
                  this.perdedor = true;
                  console.log("Partida terminada: ", response);

                },
                error => {
                  console.log(error);
                }
              );
            }
          } else {
            this.myBoard[row][this.columns.indexOf(column)] = false;
            this.noHit[row][this.columns.indexOf(column)] = true;
          }
        } else { 
          this.turno = false;
        }
    });

    this.pusherService.finPartida((data) => {
      console.log('Fin de la partida');
      console.log('Ganador:', this.gamefinished);
      if (this.gamefinished == 0) {
        this.ganador = true;
      }
      
    });
  }

  buscarPartida(id: number) {
    this.juegoService.buscarJuego(id).subscribe((juego: Juego) => {
      this.juegoActual = juego;
      console.log('Juego:', this.juegoActual);
      if (this.readyJugador2 || this.juegoActual.jugador2 !== null) {
        this.gamestarted = 1;
      }
    });
  }

  generateShips() {
    while (this.shipCoordinates.length < this.totalShips) {
      const randomRow = Math.floor(Math.random() * this.rows.length);
      const randomColumn = Math.floor(Math.random() * this.columns.length);

      if (!this.myBoard[randomRow][randomColumn]) {
        this.myBoard[randomRow][randomColumn] = true;
        this.shipCoordinates.push({ row: randomRow, column: this.columns[randomColumn] });
      }
    }

    console.log(this.shipCoordinates);
  }

  makeMove(row: number, column: string) {
    if (!this.turno) {
      return;
    }
    row = Number(row);
    const move = { row, column };
    this.opponentBoard[row][this.columns.indexOf(column)] = true;
    this.juegoService.sendCasilla(move).subscribe(
      response => {
        console.log("Disparo a " + move.row + move.column + " del enemigo"); 
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
  
  salir() {
    this.juegoService.cancelarJuego(this.juegoActual,this.gameid).subscribe(
      response => {
        console.log("Partida terminada: ", response);
        this.router.navigate(['/juegos']);
      },
      (error: any) => { // Explicitly specify the type of 'error' parameter as 'any'
        console.log(error);
      }
    );
  }
}