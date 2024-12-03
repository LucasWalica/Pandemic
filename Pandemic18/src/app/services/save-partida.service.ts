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

  
  partida:Partida = {} as Partida;
  constructor(private authService:AuthServiceService, private http:HttpClient) {
   
   }  



    //needed to get user ID before calling this method (reEscribir)
  guardarPartida(partida:Partida) {
    if (!this.authService.userIsAuthenticated()) {
      console.error('No se encontró token al guardar la partida.');
      return;
  }
    const partidaSinCiclos = JSON.stringify({
      id:partida.id,
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
          specialSkill: personaje.specialSkill || "sin habilidad especial",
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
        specialSkill: personaje.specialSkill,
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
          id:Number(partida.id),
          turno: Number(partida.turno),
          jugadas: partida.jugadas || 4,
          listCiudades: partida.ciudades.map((ciudad: any) => ({
            nombre: ciudad.name,
            listCiudadesColindandes: ciudad.listCiudadesColindantes
              ? ciudad.listCiudadesColindantes.map((colindante: any) => colindante.name)
              : [],
              listPersonajes: partida.personajes
          .filter((personaje: any) => personaje.ciudadEnLaQueEsta?.name === ciudad.name)  // Verificar si el personaje está en la ciudad
          .map((personaje: any) => ({
            id: personaje.id,
            name: personaje.name,
            specialSkill: personaje.specialSkill,
            movido: personaje.movido === 1, 
            ciudadEnLaQueEsta: personaje.ciudadEnLaQueEsta
              ? {
                  nombre: personaje.ciudadEnLaQueEsta.name,
                  coordenadasX: personaje.ciudadEnLaQueEsta.coordenadasX,
                  coordenadasY: personaje.ciudadEnLaQueEsta.coordenadasY,
                  centroInvestigacion: personaje.ciudadEnLaQueEsta.centro_investigacion === 1,
                }
              : null,
            turnoComienzo: personaje.turno_comienzo,
            enAccion: personaje.enAccion === 1,  
          })),
            centroInvestigacion: ciudad.centroInvestigacion === 1,
            coordenadasX: ciudad.coordenadasX,
            coordenadasY: ciudad.coordenadasY,
            eVerde: ciudad.eVerde,
            eRojo: ciudad.eRoja,
            eAzul: ciudad.eAzul,
            eAmarillo: ciudad.eAmarilla,
          })),
          listaPersonajes: partida.personajes.map((personaje: any) => ({
            id: personaje.id,
            name: personaje.name,
            specialSkill: personaje.specialSkill,
            movido: personaje.movido === 1, 
            ciudadEnLaQueEsta: personaje.ciudadEnLaQueEsta
              ? {
                  nombre: personaje.ciudadEnLaQueEsta.name,
                  coordenadasX: personaje.ciudadEnLaQueEsta.coordenadasX,
                  coordenadasY: personaje.ciudadEnLaQueEsta.coordenadasY,
                  centroInvestigacion: personaje.ciudadEnLaQueEsta.centro_investigacion === 1,
                }
              : null,
            turnoComienzo: personaje.turno_comienzo,
            enAccion: personaje.enAccion === 1,  
          })),          
          listEnfermedades: partida.enfermedades.map((enfermedad: any) => ({
            name: enfermedad.name,
            turnosParaCurar: enfermedad.turnosParaCurar,
            infeccionAColindandes: enfermedad.infeccionAColindandes,
          })),
        }))
      )
    );
  }
}