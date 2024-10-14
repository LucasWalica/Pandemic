import { Ciudad } from "./ciudad.models";

export class Enfermedad{
    name:string;
    turnosParaCurar:number;
    infeccionAColindandes:number;

    constructor(name:string, turnosParaCurar:number, infeccionAColindandes:number){
        this.name=name;
        this.turnosParaCurar=turnosParaCurar;
        this.infeccionAColindandes=infeccionAColindandes;
    }

    transmitirse(cInicio:Ciudad , cExpansion:Ciudad){

    }

    aumentarEnCiudad(ciudad:Ciudad){
        
    }
}