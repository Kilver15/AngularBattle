export interface Juego {
    id?: number;
    jugador1: number;
    jugador2?: number;
    puntuacion1?: number;
    puntuacion2?: number;
    estado?: string;
    ganador?: number;
}