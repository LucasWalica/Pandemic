import { Injectable } from '@angular/core';
import { Partida } from '../models/partida.models';
@Injectable({
  providedIn: 'root'
})
export class SavePartidaService {

  constructor() { }


    //needed to get user ID before calling this method (reEscribir)
  guardarPartida(partida:Partida, user_Id:number) {
    const userId = 1;
    // Asumimos que 'this.partida' es un objeto con las entidades completas
    const partidaSinCiclos = JSON.stringify({
      counterTurnos: partida.counterTurnos,
      jugadas: partida.jugadas,
      listCiudades: partida.listCiudades.map(ciudad => ({
        nombre: ciudad.nombre,
        //partida_id: 1,
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
        //partida_id: 1,
      })),
      listaPersonajes: partida.listaPersonajes.map(personaje => ({
        name: personaje.name,
        //partida_id:1,
        movido: personaje.movido,
        en_accion: personaje.enAccion,
        turno_comienzo: personaje.turnoComienzo
      })),
      user_id: userId,
    });

    console.log(partidaSinCiclos);  // Verifica la estructura antes de enviarla

    fetch('http://127.0.0.1:8000/api/partidas/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: partidaSinCiclos  // Enviar el objeto de manera estructurada sin referencias cíclicas
    })
    .then(response => {
      console.log(response);  // Verifica la respuesta en la consola
      return response.json();  // Solo intentar parsear si la respuesta es válida
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

  

}
