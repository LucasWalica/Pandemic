import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../profileModule/models/profile.models';
import { OnInit } from '@angular/core';
import { ProfileDataService } from '../profileModule/services/profile-data.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']  // Corregir 'styleUrl' a 'styleUrls'
})
export class InicioComponent implements OnInit {
 
  cuadoInicio: boolean = false;
  Rankings: number = 0;
  Partidas: number = 0;
  profile: Profile = {} as Profile;
  notSelectedProfileImage: string = "../../../../public/assets/default\ avatar.jpg";

  ngOnInit(): void {
    this.profile = this.profileService.getProfile();  
  }

  constructor(private router: Router, private profileService: ProfileDataService) { }

  IrAPerfil() {this.router.navigate(['profile']);}

  JugarB() {this.cuadoInicio = !this.cuadoInicio;}

  RankGB() {this.Rankings = 1;}

  RankLB() {this.Rankings = 2;}

  CrearPartida() {this.Partidas = 1;}

  CargarPartida() {this.Partidas = 2;}
}
