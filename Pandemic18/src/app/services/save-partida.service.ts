import { Injectable} from '@angular/core';
import { Partida } from '../models/partida.models';
import { PartidaI } from '../models/interfaces.interface';
import { AuthServiceService } from './auth-service.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SavePartidaService {

  
  constructor(private authService:AuthServiceService, private http:HttpClient) {
   
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

  getPartidaList(): Observable<PartidaI[]> {
    const token = this.authService.getToken(); 
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return this.http.get<any[]>('http://127.0.0.1:8000/api/partidas/', { headers }).pipe(
      map((data: any[]) =>
        data.map(partida => ({
          counterTurnos: partida.counterTurnos || 0,
          jugadas: partida.jugadas || 0,
          listCiudades: partida.ciudades.map((ciudad: any) => ({
            nombre: ciudad.nombre,
            listCiudadesColindandes: ciudad.listCiudadesColindantes
              ? ciudad.listCiudadesColindantes.map((colindante: any) => colindante.name)
              : [],
              listPersonajes: ciudad.listPersonajes
              ? ciudad.listPersonajes.map((personaje: any) => ({
                  id: personaje.id || 0,
                  name: personaje.name || '',
                  specialSkill: personaje.specialSkill || '',
                  movido: personaje.movido === 1,
                  turnoComienzo: personaje.turno_comienzo || 0,
                  enAccion: personaje.enAccion || false,
                  ciudadEnLaQueEsta: {
                    nombre: ciudad.name,
                    coordenadasX: ciudad.coordenadasX,
                    coordenadasY: ciudad.coordenadasY,
                    centroInvestigacion: ciudad.centro_investigacion === 1,
                  },
                }))
              : [],
            centroInvestigacion: ciudad.centroInvestigacion || false,
            coordenadasX: ciudad.coordenadasX || 0,
            coordenadasY: ciudad.coordenadasY || 0,
            eVerde: ciudad.eVerde || 0,
            eRojo: ciudad.eRojo || 0,
            eAzul: ciudad.eAzul || 0,
            eAmarillo: ciudad.eAmarillo || 0,
          })),
          listaPersonajes: partida.ciudades.flatMap((ciudad: any) =>
            ciudad.listPersonajes.map((personaje: any) => ({
              id: personaje.id,
              name: personaje.name,
              specialSkill: personaje.specialSkill || '',
              movido: personaje.movido === 1,
              ciudadEnLaQueEsta: personaje.ciudadEnLaQueEsta
                ? {
                    nombre: personaje.ciudadEnLaQueEsta.name,
                    coordenadasX: personaje.ciudadEnLaQueEsta.coordenadasX,
                    coordenadasY: personaje.ciudadEnLaQueEsta.coordenadasY,
                    centroInvestigacion: personaje.ciudadEnLaQueEsta.centro_investigacion === 1,
                  }
                : null,
              turnoComienzo: personaje.turno_comienzo || 0,
              enAccion: personaje.enAccion || false,
            }))
          ),
          listEnfermedades: partida.enfermedades.map((enfermedad: any) => ({
            name: enfermedad.name,
            turnosParaCurar: enfermedad.turnosParaCurar || 0,
            infeccionAColindandes: enfermedad.infeccionAColindandes || 0,
          })),
        }))
      )
    );
  }
}