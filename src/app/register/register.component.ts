import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { CommonModule } from '@angular/common';
import { PostService } from './post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,RouterLinkActive],
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
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, 
    private postService: PostService,
    private router: Router,) {}
 
    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', Validators.required],
      }, {
        validators: this.passwordMatchValidator
      });
    }

    passwordMatchValidator(group: FormGroup) {
      const password = group.get('password')?.value;
      const password_confirmation = group.get('password_confirmation')?.value;
      return password === password_confirmation ? null : { mismatch: true };
    }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.postService.registerUser(this.registerForm.value).subscribe(
        response => {
          console.log(response);
          alert('Usuario registrado con exito, verifica tu correo electrónico.');
          this.router.navigate(['/login']);
        },
        error => {
          console.error(error);
          alert('Error al registrar la cuenta. Verifica tus datos e intenta nuevamente.');
        }
      );
    }
     console.log(this.registerForm.value);
  }
 }