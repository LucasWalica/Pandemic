import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SavePartidaService } from '../../services/save-partida.service';
import { Partida } from '../../models/partida.models';
import { Router } from '@angular/router';
import { EspecialistaEnCuarentena, Personaje, Medico, BobElConstructor, Investigador } from '../../models/personaje.model';
import { Enfermedad } from '../../models/enfermedad.models';
import { Ciudad } from '../../models/ciudad.models';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-partida-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida-list.component.html',
  styleUrl: './partida-list.component.css'
})
export class PartidaListComponent implements OnInit {


  partidas:Partida[] = [] as Partida[];
  cargado:boolean = false;
  constructor(private gameService:SavePartidaService, private router:Router, private authService:AuthServiceService){}
  
  ngOnInit(): void {
    this.loadGames();
  }
  
  cargarPartida(p:Partida){
    this.gameService.partida = p;
    console.log("Datos de partida cargada: ", p);
    this.router.navigate(['newGame']);
  }

 
  async loadGames() {
    try {
      this.partidas = await firstValueFrom(this.gameService.getPartidaList());
      console.log('Partidas cargadas:', this.partidas);
      this.cargado = true;
    } catch (error) {
      console.error('Error al cargar las partidas:', error);
    }
  }

  goToProfile(){
    this.router.navigate(['profile']);
  }

  goToInicio(){
    this.router.navigate(['home'])
  }

  goLogout(){
    this.authService.logout();
    this.router.navigate([''])
  } 

}