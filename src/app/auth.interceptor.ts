import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from './cookies.service';


export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const cookieService = new CookieService(); // Asegúrate de que esto funcione en tu contexto
  const token = cookieService.getCookie('authToken');
  if (token) {
     const authReq = req.clone({
       headers: req.headers.set('Content-Type', 'application/json')
         .set('Authorization', `Bearer ${token}`),
       withCredentials: true
     });
     return next(authReq);
  }
  return next(req);
 };
 