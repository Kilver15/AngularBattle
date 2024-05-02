import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { AuthInterceptor } from '../auth.interceptor';

interface VerificationResponse {
  token: string;
  rol_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {
  private apiUrl = 'http://192.168.252.185:8000/api/auth/verify-code';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  token = this.cookieService.get('sanctToken');

 verifyCode(code: number): Observable<VerificationResponse> {
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer ' + this.token);

  const options = { headers, withCredentials: true, skipInterceptors: [AuthInterceptor] };
  
    return this.http.post<VerificationResponse>(this.apiUrl, {code}, options).pipe(
      tap(response => {
        this.cookieService.delete('sanctToken');
          
      })
    );;
 }
}