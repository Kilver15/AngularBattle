import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VerificacionService } from './verificacion.service';
import { CookieService } from 'ngx-cookie-service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
 selector: 'app-verificacion',
 templateUrl: './verificacion.component.html',
 styleUrls: ['./verificacion.component.css'],
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
export class VerificacionComponent implements OnInit {
  authForm!: FormGroup
  isLoading = false;
  
 constructor(private formBuilder: FormBuilder, 
  private router: Router,
  private verificacionService: VerificacionService,
  private cookieService: CookieService,
  private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      code: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]],
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.isLoading = true;
      const code = this.authForm.get('code')?.value;
      this.verificacionService.verifyCode(code).subscribe(
        data => {
          console.log('Código verificado exitosamente', data);
          localStorage.setItem('authToken', data.token);
          this.cookieService.set('authToken', data.token);
          this.changeDetectorRef.detectChanges(); // Detectar cambios
          window.location.reload();
        },
        error => console.error('Error al verificar el código', error)
      );
    }
  }
}
