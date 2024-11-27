import { Injectable } from '@angular/core';
import { Personaje, BobElConstructor, Investigador, EspecialistaEnCuarentena, Medico, listaPersonas } from '../models/personaje.model';
import { Enfermedad, eAmarilla, eAzul, eRojo, eVerde } from '../models/enfermedad.models';
import { Partida } from '../models/partida.models';
import { todasLasCiudades, Ciudad } from '../models/ciudad.models';
import { listEnfermedades } from '../models/enfermedad.models';

@Injectable({
  providedIn: 'root'
})

export class InitialDataService {

  constructor() { }
  // hacen falta los datos de las ciudades para inicializar este objeto
  // inicializar datos de todas las partidas para cargarlas 
  Partidas:Partida[] = []; 

  // personajes 
  especialistaCuarentena = new EspecialistaEnCuarentena(1, "Especialista en Cuarentenas", "Bloquea la expansión de las enfermedades en su ciudad y las colindantes", false, 0 , false);
  medico = new Medico(2, "Médico", "Elimina enfermedades en una ciudad a los 4 turnos", false, 0, false);
  bobContructor = new BobElConstructor(3, "Bob el constructor", "Construye un centro de investigación a los 4 turno", false, 0, false);
  investigador = new Investigador(4, "Investigador", "Investiga la cura de una determinada enfermedad, esto mejora si está en una ciudad con centro de investigación", false, 0, false);
  
  Personajes:Personaje[] = [this.especialistaCuarentena, this.medico, this.bobContructor, this.investigador];

  // seleccionar nombres
  enfAmarilla = new eAmarilla("PAX-9", 100, 1);
  enfAzul = new eAzul("PAX-10", 200, 1);
  enfRojo = new eRojo("PAX-11", 100, 2);
  enfVerde = new eVerde("PAX-12", 100, 1);

  Enfermedades:Enfermedad[] = [this.enfAmarilla, this.enfAzul, this.enfRojo, this.enfVerde];

  Ciudades:Ciudad[] = todasLasCiudades;
  
  createGame(){
    var partidaNueva = new Partida(0, 4,  this.Ciudades, listEnfermedades, listaPersonas);
    this.Partidas.push(partidaNueva);
  }
}
