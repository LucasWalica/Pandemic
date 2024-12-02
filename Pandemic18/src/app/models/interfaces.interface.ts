import { Ciudad } from "./ciudad.models";
import { Personaje } from "./personaje.model";
import { Enfermedad } from "./enfermedad.models";

export interface PartidaI{
    id:number;
    counterTurnos:number;
    jugadas:number;
    listCiudades:any[];
    listaPersonajes:any[];
    listEnfermedades:any[];
}

export interface CiudadI{
    nombre:string;
    listCiudadesColindandes:string[];
    listPersonajes:any[];
    centroInvestigacion:boolean;
    coordenadasX:number;
    coordenadasY:number;
    eVerde:number;
    eRojo:number;
    eAzul:number;
    eAmarillo:number;
}


export interface EnfermedadI{
    name:string;
    turnosParaCurar:number;
    infeccionAColindandes:number;
}

export interface PersonajeI{
    id:number;
    name:string; 
    specialSkill:string;
    movido:boolean;
    ciudadEnLaQueEsta:Ciudad;
    turnoComienzo:number;
    enAccion:boolean;
}