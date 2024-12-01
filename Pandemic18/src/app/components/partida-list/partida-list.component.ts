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

  // se pierden datos en esta funcion
  ngOnInit(): void {
    this.gameService.getPartidaList().subscribe({
      next: (partidas: PartidaI[]) => {
        this.partidas = partidas.map((partidaI) => new Partida(partidaI.counterTurnos, partidaI.jugadas, partidaI.listCiudades, partidaI.listEnfermedades, partidaI.listaPersonajes)); // Los datos ya están completamente mapeados
        console.log('Partidas cargadas:', this.partidas);
        console.log('Primera partida:', this.partidas[0]);
      },
      error: (err) => {
        console.error('Error al cargar las partidas:', err);
      },
    });
  }
  
}
