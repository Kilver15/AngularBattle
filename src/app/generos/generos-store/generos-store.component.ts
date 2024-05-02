import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInOutAnimations } from '../../animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';
import { GenerosService } from '../generos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-generos-store',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './generos-store.component.html',
  styleUrl: './generos-store.component.css',
  animations: [fadeInOutAnimations]
})
export class GenerosStoreComponent {
  generosStoreForm!: FormGroup;
  isLoading = false;
  constructor(private formBuilder: FormBuilder,
    private generosService: GenerosService,
    private router: Router) { }

  ngOnInit(): void {
    this.generosStoreForm = this.formBuilder.group({
      nombre: ['',[ Validators.required]],
    });
  }

  

  onSubmit(): void {
    if (this.generosStoreForm.valid) {
      this.isLoading = true;
      console.log(this.generosStoreForm.value);
      this.generosService.createGenero(this.generosStoreForm.value).subscribe(
        response => {
          console.log('Genero creado:', response);
        alert('Genero creado con exito.');
        this.router.navigate(['/generos/index']);
        },
        error => console.error('Error al crear el genero:', error)
      );
    }
    }
  }
