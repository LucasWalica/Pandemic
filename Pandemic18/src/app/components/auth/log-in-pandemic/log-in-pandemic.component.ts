import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-log-in-pandemic',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './log-in-pandemic.component.html',
  styleUrl: './log-in-pandemic.component.css'
})
export class LogInPandemicComponent {

  constructor(private router: Router, private authService:AuthServiceService) { }


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
  });


  enviar(event:Event){
    event.preventDefault();
    this.authService.logear(
      this.loginForm.get('email')?.value??'',
      this.loginForm.get('password')?.value?? ''
    )

  }



  IrAInicio() {
    this.router.navigate(['profile']);
  }
  IrARegistrer(){
    this.router.navigate(['register']);
  }

}
