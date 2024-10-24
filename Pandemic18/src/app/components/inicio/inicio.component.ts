import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
 
  cuadoInicio:number=0;
  RankGlobal:boolean=false;
  RankLocal:boolean = false;

  constructor(private router: Router) { }
  IrAPerfil() {
    this.router.navigate(['profile']);
  }

  JugarB(){
    this.cuadoInicio = 1
  }
  RankGB(){
    this.RankGlobal=true
  }
  RankLB(){
    this.RankLocal=true;
  }
}
