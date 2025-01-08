import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SavePartidaService } from '../../services/save-partida.service';
import { Partida } from '../../models/partida.models';
import { PartidaI } from '../../models/interfaces.interface';
import { Router } from '@angular/router';
import { Personaje } from '../../models/personaje.model';
import { Enfermedad } from '../../models/enfermedad.models';
import { Ciudad } from '../../models/ciudad.models';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-partida-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida-list.component.html',
  styleUrl: './partida-list.component.css'
})
export class PartidaListComponent implements OnInit {


  partidas:Partida[] = [] as Partida[];
  constructor(private gameService:SavePartidaService, private router:Router, private authService:AuthServiceService){}
  
  ngOnInit(): void {
    this.loadGames();
  }
  
  cargarPartida(p:Partida){
    this.gameService.partida = p;
    console.log("Datos de partida cargada: ", p);
    this.router.navigate(['newGame']);
  }

 
  loadGames(){
    this.gameService.getPartidaList().subscribe({
      next: (partidas: PartidaI[]) => {
        this.partidas = partidas.map((partidaI) => {
          // Mapea las ciudades a instancias de la clase Ciudad
          const ciudades = partidaI.listCiudades.map(ciudadData => 
            new Ciudad(ciudadData.nombre, 
                       ciudadData.listCiudadesColindandes, 
                       ciudadData.centroInvestigacion,
                       ciudadData.listPersonajes,
                       ciudadData.coordenadasX,
                       ciudadData.coordenadasY,
                       ciudadData.eVerde,
                       ciudadData.eRojo,
                       ciudadData.eAzul,
                       ciudadData.eAmarillo)
          );
  
          // Mapea los personajes a instancias de la clase Personaje
          const personajes = partidaI.listaPersonajes.map(personajeData =>{

            let p = new Personaje(
              personajeData.id, 
              personajeData.name, 
              personajeData.specialSkill, 
              personajeData.movido,  
              personajeData.turnoComienzo, 
              personajeData.enAccion)
              p.ciudadEnLaQueEsta = personajeData.ciudadEnLaQueEsta
             return p;
            }
          );
  
          // Mapea las enfermedades a instancias de la clase Enfermedad
          const enfermedades = partidaI.listEnfermedades.map(enfermedadData =>
            new Enfermedad(enfermedadData.name, 
                           enfermedadData.turnosParaCurar, 
                           enfermedadData.infeccionAColindandes)
          );
  
          // Crea una nueva instancia de Partida con los datos mapeados
          return new Partida(partidaI.turno, 
                             partidaI.jugadas, 
                             ciudades, 
                             enfermedades, 
                             personajes, 
                             partidaI.id);
        });
        console.log('Partidas cargadas:', this.partidas);
      },
      error: (err) => {
        console.error('Error al cargar las partidas:', err);
      },
    });
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