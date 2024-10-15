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


    // para estos dos metodos hace falta establecer una forma de aumentar el numero en las ciudades de una determinada enfermedad o
    // en cada enfermedad guardar todas las ciudades infectadas con su numero de infeccion (a mi parecer)
    transmitirse(cInicio:Ciudad , cExpansion:Ciudad){

    }

    aumentarEnCiudad(ciudad:Ciudad){
        
    }

    // posible refactorizacion
    curacion(curado:number){
        this.turnosParaCurar-=curado;
    }
    
}