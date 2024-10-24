import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-pandemic',
  standalone: true,
  imports: [],
  templateUrl: './log-in-pandemic.component.html',
  styleUrl: './log-in-pandemic.component.css'
})
export class LogInPandemicComponent {

  constructor(private router: Router) { }
  IrAInicio() {
    this.router.navigate(['home']);
  }
  IrARegistrer(){
    this.router.navigate(['register']);
  }

}
