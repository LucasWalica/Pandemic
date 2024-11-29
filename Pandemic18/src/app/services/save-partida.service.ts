import { Injectable} from '@angular/core';
import { Partida } from '../models/partida.models';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SavePartidaService {

  
  constructor(private authService:AuthServiceService) {
   
   }  



    //needed to get user ID before calling this method (reEscribir)
  guardarPartida(partida:Partida) {
    if (!this.authService.userIsAuthenticated()) {
      console.error('No se encontró token al guardar la partida.');
      return;
  }
    const partidaSinCiclos = JSON.stringify({
      counterTurnos: partida.counterTurnos,
      jugadas: partida.jugadas,
      listCiudades: partida.listCiudades.map(ciudad => ({
        nombre: ciudad.nombre,
        listCiudadesColindantes: ciudad.listCiudadesColindandes.map(ciudad_colindante=>({
          name:ciudad_colindante
        })),
        centroInvestigacion: ciudad.centroInvestigacion,
        coordenadasX: ciudad.coordenadasX,
        coordenadasY: ciudad.coordenadasY,
        eAmarillo: ciudad.eAmarillo,
        eAzul: ciudad.eAzul,
        eRojo: ciudad.eRojo,
        eVerde: ciudad.eVerde,
        listPersonajes: ciudad.listPersonajes.map(personaje => ({
          name: personaje.name,
          movido: personaje.movido,
          en_accion: personaje.enAccion,
          turno_comienzo: personaje.turnoComienzo
        }))
      })),
      listEnfermedades: partida.listEnfermedades.map(enfermedad => ({
        name: enfermedad.name,
        turnosParaCurar: enfermedad.turnosParaCurar,
        infeccionAColindandes: enfermedad.infeccionAColindandes,
      })),
      listaPersonajes: partida.listaPersonajes.map(personaje => ({
        name: personaje.name,
        movido: personaje.movido,
        en_accion: personaje.enAccion,
        turno_comienzo: personaje.turnoComienzo
      })),
      // corregir user ID, no es necesario, se agregaria el tokensico
      // user_id: user_Id,
    });

    console.log(partidaSinCiclos);  

    fetch('http://127.0.0.1:8000/api/partidas/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      },
      body: partidaSinCiclos  
    })
    .then(response => {
      console.log(response);  
      return response.json();  
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

  getPartidaList(): Promise<Partida[]> {
    return fetch('http://127.0.0.1:8000/api/partidas/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener partidas');
      }
      return response.json(); 
    })
    .then((data: Partida[]) => {
      return data; 
    })
    .catch(error => {
      console.error("Error:", error);
      throw error;
    });
  }
  


  

}
