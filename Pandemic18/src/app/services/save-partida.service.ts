import { Injectable} from '@angular/core';
import { Partida } from '../models/partida.models';
import { Personaje } from '../models/personaje.model';
import { AuthServiceService } from './auth-service.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Enfermedad } from '../models/enfermedad.models';
import { Ciudad } from '../models/ciudad.models';
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
  getPartidaList(): Observable<Partida[]> {
    const token = this.authService.getToken(); 
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    return this.http.get<any[]>('http://127.0.0.1:8000/api/partidas/', { headers }).pipe(
      map((data: any[]) =>
        data.map(partida => {
          // Crear ciudades
          const ciudades = partida.ciudades.map((ciudad: any) => new Ciudad(
            ciudad.name,
            ciudad.listCiudadesColindantes ? ciudad.listCiudadesColindantes.map((colindante: any) => colindante.name) : [],
            ciudad.centroInvestigacion === 1,
            [], // Se llenará luego con los personajes correctos
            ciudad.coordenadasX,
            ciudad.coordenadasY,
            ciudad.eVerde,
            ciudad.eRoja,
            ciudad.eAzul,
            ciudad.eAmarilla
          ));
  
          // Crear personajes y asignarlos a ciudades
          const personajes = partida.personajes.map((personaje: any) => {
            const ciudad = ciudades.find((c: Ciudad) => c.nombre === personaje.ciudadEnLaQueEsta?.name) 
                           || new Ciudad("", [], false, [], 0, 0, 0, 0, 0, 0); // Si no existe la ciudad, crear una vacía
            
            // Crear personaje
            const p = new Personaje(
              personaje.id,
              personaje.name,
              personaje.specialSkill,
              personaje.movido === 1,
              personaje.turno_comienzo,
              personaje.enAccion
            );
  
            p.ciudadEnLaQueEsta = ciudad;
  
            // Asegurar que `listPersonajes` de la ciudad no sea `undefined`
            if (!ciudad.listPersonajes) {
              ciudad.listPersonajes = [];
            }
            ciudad.listPersonajes.push(p);
  
            // ⬇️ Asegurar que el prototipo del personaje esté correctamente asignado
            Object.setPrototypeOf(p, Personaje.prototype);  // Restablecer el prototipo de la clase Personaje
            
            return p;
          });
  
          // Crear enfermedades
          const enfermedades = partida.enfermedades.map((enfermedad: any) => new Enfermedad(
            enfermedad.name,
            enfermedad.turnosParaCurar,
            enfermedad.infeccionAColindandes
          ));
  
          // Retornar la instancia completa de la partida
          return new Partida(
            partida.turno,
            partida.jugadas || 4,
            ciudades,
            enfermedades,
            personajes,
            partida.id
          );
        })
      )
    );
  }
  
}