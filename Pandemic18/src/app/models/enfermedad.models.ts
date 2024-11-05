import { Ciudad } from "./ciudad.models";
import { Partida } from "./partida.models";

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
    transmitirse(cInicio:Ciudad, partida:Partida){}
    // posible refactorizacion llamando al investigador y centros de investigacion
    curacion(curado:number){
        this.turnosParaCurar-=curado;
    }
    getRandomArrElement(arr:string[]): string{
        return arr[Math.floor(Math.random()*arr.length)]
    }
    getRandomCiudad(cInicio:Ciudad, partida:Partida):Ciudad{
        var nombreCiudad = this.getRandomArrElement(cInicio.listCiudadesColindandes);
        var ciudad:Ciudad = {} as Ciudad;
        for(let i=0; i<partida.listCiudades.length; i++){
            if(nombreCiudad==partida.listCiudades[i].nombre){
                  ciudad = partida.listCiudades[i];
            }
        }
        return ciudad;
    }
}
// hace falta refactorizar los metodos por si hay personajes en la ciudad
// enfermedad vanilla
export class eAmarilla extends Enfermedad {
    
    constructor(name:string, turnosParaCurar:number, infeccionAColindandes:number){
        super(name, turnosParaCurar, infeccionAColindandes)
    }

    override transmitirse(cInicio: Ciudad, partida:Partida): void {
        if(!cInicio.especialistaEnCuarentenasEstaPresente()){
            if(cInicio.eAmarillo==4){
                let ciudad:Ciudad = this.getRandomCiudad(cInicio, partida); 
                ciudad.eAmarillo+=1;             
            }else if(cInicio.eAmarillo>=1 && cInicio.eAmarillo<4){
                cInicio.eAmarillo+=1
            }
        }
    }
}
export class eVerde extends Enfermedad{

    constructor(name:string, turnosParaCurar:number, infeccionAColindandes:number){
        super(name, turnosParaCurar, infeccionAColindandes)
    }
    override transmitirse(cInicio: Ciudad, partida:Partida): void {
        if(!cInicio.especialistaEnCuarentenasEstaPresente()){
            if(cInicio.eVerde>=1 && !cInicio.allCitiesAreInfected()){
                var cProv:Ciudad = this.getRandomCiudad(cInicio, partida);
                if(cProv.eVerde==0){
                    cProv.eVerde+=1;
                }
            }else if(cInicio.allCitiesAreInfected()){
                cInicio.eVerde+=1;
            }
        }
    }
}

export class eRojo extends Enfermedad{
    constructor(name:string, turnosParaCurar:number, infeccionAColindandes:number){
        super(name, turnosParaCurar, infeccionAColindandes)
    }
    override transmitirse(cInicio: Ciudad, partida:Partida): void {
        if(!cInicio.especialistaEnCuarentenasEstaPresente()){
            if(cInicio.eRojo==4){
                var cProv:Ciudad = this.getRandomCiudad(cInicio, partida);
                cProv.eRojo+=1;
            }else if(cInicio.eRojo>=1 && cInicio.eRojo<4){
                cInicio.eRojo+=1
            }
        }
    }
}

// asignar mayor dificultad para curar
export class eAzul extends Enfermedad{
    constructor(name:string, turnosParaCurar:number, infeccionAColindandes:number){
        super(name, turnosParaCurar, infeccionAColindandes)
    }
    override transmitirse(cInicio: Ciudad, partida:Partida): void {
        if(!cInicio.especialistaEnCuarentenasEstaPresente()){
            if(cInicio.eAmarillo==4){
                var ciudad:Ciudad = this.getRandomCiudad(cInicio, partida);
                ciudad.eAzul+=1;
            }else if(cInicio.eAmarillo>=1 && cInicio.eAmarillo<4){
                cInicio.eAmarillo+=1
            }
        }
    }
}

