import { Component, OnInit, HostListener } from '@angular/core';
import { Partida } from '../../models/partida.models';
import { todasLasCiudades, Ciudad } from '../../models/ciudad.models';
import { CommonModule} from '@angular/common';
@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida.component.html',
  styleUrl: './partida.component.css'
})
export class PartidaComponent implements OnInit {
  partida:Partida = new Partida(0, 4, todasLasCiudades);
  scalingFactorX: number = {} as number;
  scalingFactorY: number = {} as number;
  originalWidth = 850;  
  originalHeight = 1550; 
  // 1550 alto 850 ancho
  ngOnInit(): void {
    const container = document.querySelector('.map-container');
    if (container) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Calcular los factores de escalado
      this.scalingFactorX = containerWidth / this.originalWidth;
      this.scalingFactorY = containerHeight / this.originalHeight;
      }
    }

  
}
