import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Juego } from '../interfaces/juego.interface';

@Injectable({
 providedIn: 'root'
})
export class JuegosService {
 private apiUrl = 'http://192.168.252.185:8000/api/juego';

 constructor(private http: HttpClient) { }

 index(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.apiUrl);
 }

indexTerminadas(id: number): Observable<Juego[]> {
   return this.http.get<Juego[]>(`${this.apiUrl}/usuarios/${id}`);
}

 createJuego(juego: Juego): Observable<Juego> {
    return this.http.post<Juego>(this.apiUrl, juego);
 }

unirsePartida(juego: Juego, id: number): Observable<Juego> {
   return this.http.put<Juego>(`${this.apiUrl}/${id}`, juego);
}

 buscarJuego(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.apiUrl}/${id}`);
 }

   sendCasilla(casilla: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/casilla`, { casilla });
   }

terminarJuego(juego: Juego,id: number): Observable<Juego> {
   return this.http.put<Juego>(`${this.apiUrl}/finalizar/${id}`, juego);
}

cancelarJuego(juego: Juego,id: number): Observable<Juego> {
   return this.http.put<Juego>(`${this.apiUrl}/cancelar/${id}`, juego);
}
}