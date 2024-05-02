import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerosService } from '../generos.service';
import { CommonModule } from '@angular/common';
import { Genero } from '../../interfaces/genero.interface';
import { fadeInOutAnimations } from '../../animations';
@Component({
  selector: 'app-generos-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generos-edit.component.html',
  styleUrl: './generos-edit.component.css',
  animations: [fadeInOutAnimations]
})
export class GenerosEditComponent {
  generosEditForm!: FormGroup;
  id: number = 0;
  cargando: boolean = true;
  isLoading = false;
 constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private generosService: GenerosService
 ) {}

 ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadGenero();
    this.initForm();
 }

 private initForm(): void {
    this.generosEditForm = this.formBuilder.group({
      nombre: ['', Validators.required]
    });
 }

 private loadGenero(): void {
  if (this.id) {
     this.generosService.getGeneroById(this.id).subscribe((genero: Genero) => {
       this.generosEditForm.patchValue({
         nombre: genero.nombre
       });
       this.cargando = false;
     });
  }
 }

 onSubmit(): void {
    if (this.generosEditForm.valid) {
      this.isLoading = true;
      this.generosService.updateGenero(this.id, this.generosEditForm.value).subscribe(
        response=>{
          console.log('genero editado con exito');
      alert('Informacion actualizada con exito');
      this.router.navigate(['/generos/index']);
        },
        error => console.error('Error al crear el genero:', error)
      );
    }
 }
}