import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register-in-pandemic',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-in-pandemic.component.html',
  styleUrl: './register-in-pandemic.component.css'
})
export class RegisterInPandemicComponent {

  constructor(private router: Router) { }
  
  registrationForm = new FormGroup({
    nickName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
  }, {
    validators: passwordConfirmationValidator("password", "password2"),
  });
  
  enviar(){
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value)
    }else{
      console.log("No valido el formulario")
    }
  }


  IrALogin(){
    this.router.navigate(['']);
  }
}


// passwordConfirmationValidator
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordConfirmationValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(controlName);
    const confirmPasswordControl = formGroup.get(matchingControlName);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}

