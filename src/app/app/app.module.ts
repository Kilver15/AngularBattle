import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useExisting: AuthInterceptor, 
      multi: true }, CookieService]
})
export class AppModule { }