import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-in-pandemic',
  standalone: true,
  imports: [],
  templateUrl: './register-in-pandemic.component.html',
  styleUrl: './register-in-pandemic.component.css'
})
export class RegisterInPandemicComponent {

  constructor(private router: Router) { }
  
  IrALogin(){
    this.router.navigate(['']);
  }
}
