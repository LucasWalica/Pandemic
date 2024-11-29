import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../profileModule/models/profile.models';
import { OnInit } from '@angular/core';
import { ProfileDataService } from '../profileModule/services/profile-data.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { AuthServiceService } from '../../services/auth-service.service';
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
    if(!this.authService.userIsAuthenticated()){
      this.router.navigate(['']);
    }  
  }

  constructor(private router: Router, private profileService: ProfileDataService, private authService:AuthServiceService) { }

  IrAPerfil() {this.router.navigate(['profile']);}
  goToRanking(){
    this.router.navigate(['ranking']);
  }
  goToNewGame(){
    this.router.navigate(['newGame'])
  }
  gotoInfo(){
    this.router.navigate(['info'])
  }

  goToPartidaList(){
    this.router.navigate(['partidaList'])
  }
  JugarB() {this.cuadoInicio = !this.cuadoInicio;}

  CrearPartida() {this.Partidas = 1;}

  CargarPartida() {this.Partidas = 2;}
}
