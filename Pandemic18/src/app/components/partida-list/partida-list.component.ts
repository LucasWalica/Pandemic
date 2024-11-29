import { Component, OnInit } from '@angular/core';
import { SavePartidaService } from '../../services/save-partida.service';
import { Partida } from '../../models/partida.models';
import { PartidaI } from '../../models/interfaces.interface';
@Component({
  selector: 'app-partida-list',
  standalone: true,
  imports: [],
  templateUrl: './partida-list.component.html',
  styleUrl: './partida-list.component.css'
})
export class PartidaListComponent implements OnInit {


  partidas:Partida[] = [] as Partida[];
  constructor(private gameService:SavePartidaService){

  }
  ngOnInit(): void {
    this.gameService.getPartidaList().subscribe({
      next: (data: PartidaI[]) => {
        for(let i=0; i<data.length; i++){
          const partidaData = data[i]; 
          const p: Partida = new Partida(
            partidaData.counterTurnos, 
            partidaData.jugadas, 
            partidaData.listCiudades, 
            partidaData.listaPersonajes, 
            partidaData.listEnfermedades
          );
          this.partidas.push(p);
        }
        console.log('Partidas cargadas:', this.partidas);
      },
      error: (err) => {
        console.error('Error al cargar las partidas:', err);
      }
    });
  }
  
}
