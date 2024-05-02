import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://192.168.252.185:8000/api/usuarios';

  constructor(private http: HttpClient) { }

  indexuser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getCurrentUser(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/current`);
  }

}