import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../interfaces/genero.interface';
@Injectable({
  providedIn: 'root'
})
export class GenerosService {
  private apiUrl = 'http://192.168.115.29:8000/api/generos';
 
  constructor(private http: HttpClient) { }
 
  createGenero(genero: Genero): Observable<Genero> {
     return this.http.post<Genero>(this.apiUrl, genero);
  }
 
  indexgenero(): Observable<Genero[]> {
     return this.http.get<Genero[]>(this.apiUrl);
  }
 
  getGeneroById(id: number): Observable<Genero> {
     return this.http.get<Genero>(`${this.apiUrl}/${id}`);
  }
 
  updateGenero(id: number, genero: Genero): Observable<Genero> {
     return this.http.put<Genero>(`${this.apiUrl}/${id}`, genero);
  }
 deleteGenero(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
   }
   
 }
 
