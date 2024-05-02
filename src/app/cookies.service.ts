import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  setCookie(name: string, value: string, daysToExpire?: number) {
    let expires = '';
    if (daysToExpire) {
      const date = new Date();
      date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
      expires = ';expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + ';path=/';
  } 

  getCookie(name: string): string | null {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() ?? null : null;
  }

  deleteCookie(name: string, path: string = '/', domain: string = '', secure: boolean = false, sameSite: 'Lax' | 'None' | 'Strict' = 'Lax') {
    const date = new Date();
    date.setTime(date.getTime() - 1); // Establece la fecha de expiración en el pasado
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + ';' + expires + ';path=' + path + ';domain=' + domain + (secure ? ';secure' : '') + ';SameSite=' + sameSite;
   }

   deleteFCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
   
}