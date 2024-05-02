import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fadeInOutAnimations } from '../animations';
import { User } from '../interfaces/user.interface';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
  ],
  animations: [ fadeInOutAnimations],
  styleUrl: './users.component.css',
  templateUrl: './users.component.html',
})
export class UsersComponent { }
