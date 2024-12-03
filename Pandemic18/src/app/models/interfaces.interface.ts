import { Ciudad } from "./ciudad.models";
import { Personaje } from "./personaje.model";
import { Enfermedad } from "./enfermedad.models";

export interface PartidaI{
    id:number;
    turno:number;
    jugadas:number;
    listCiudades:Ciudad[];
    listaPersonajes:Personaje[];
    listEnfermedades:Enfermedad[];
}

export interface CiudadI{
    nombre:string;
    listCiudadesColindandes:string[];
    listPersonajes:Personaje[];
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