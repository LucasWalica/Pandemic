import { Component, OnInit } from '@angular/core';
import { SavePartidaService } from '../../services/save-partida.service';
import { Partida } from '../../models/partida.models';
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

  async ngOnInit(): Promise<void> {
    try {
      this.partidas = await this.gameService.getPartidaList();
      console.log(this.partidas);
    } catch (error) {
      console.error("Error al cargar las partidas:", error);
    }
  }
  
}
