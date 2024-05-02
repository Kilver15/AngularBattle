import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private loginService: LoginService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    const userData: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      name: '',
      rol: 0,
      is_active: 0
    };

    this.loginService.loginUser(userData).subscribe(
      (response: { message: string; token?: string }) => {
          console.log(response);
        if (response.token) {
          let cookietoken = response.token;
          this.cookieService.set('sanctToken', cookietoken);
          this.router.navigate(['/verificacion']);
        } else {
          alert('Por favor, primero activa tu cuenta desde tu correo electronico.');
        }
      },
      error => {
        console.error(error);
        alert('Algo salio mal, por favor intenta de nuevo');
      }
    );
  }

}
