import { Ciudad } from "./ciudad.models";
import { Personaje } from "./personaje.model";

export class Partida{
    counterTurnos:number=0;
    jugadas:number=4;
    listCiudades:Ciudad[];

    constructor(counterTurnos:number, jugadas:number, listCiudades:Ciudad[]){
        this.counterTurnos=counterTurnos;
        this.jugadas=jugadas;
        this.listCiudades=listCiudades;
    }

    moverPersonaje(cInicio:Ciudad, cFinal:Ciudad, p:Personaje){
        if(cInicio.communicateWith(cFinal)){
            cInicio.quitarPersonaje(p);
            cFinal.aniadiPersonaje(p);
            p.movido=true;
            this.jugadas-=1;
        }
    }  
    

    // testear
    pasarTurno(){        
        this.counterTurnos+=1;
        this.jugadas=4;
        // los personajes se vuelven movibles a menos que esten realizando una accion larga
        for(var ciudad of this.listCiudades){
            for(var personaje of ciudad.listPersonajes){
                personaje.movido=false;
                if(personaje.construirCentroInvestigacion(ciudad, this)===true){
                    personaje.movido=false;
                }
                if(personaje.reducirACeroEnfermedad(ciudad, this)==true){
                    personaje.movido=false;
                }
            }
        }
        this.contagiarRandom()
    }

    // testear
    contagiarRandom(){
        var counter = 0;
        var enfermedades = [1, 2, 3, 4];
        var gravedadInfeccion = 1;
        if(this.counterTurnos<=4){
            gravedadInfeccion=2;
        }
        while(counter>4){
            var ciudadRandom = this.listCiudades[Math.floor(Math.random()*this.listCiudades.length)]
            var enfermedadRandom = enfermedades[Math.floor(Math.random()*enfermedades.length)]
            switch(enfermedadRandom){
                case 1: {
                    ciudadRandom.eAmarillo+=gravedadInfeccion;
                    break;
                }
                case 2:{
                    ciudadRandom.eVerde+=gravedadInfeccion;
                    break;
                }
                case 3: {
                    ciudadRandom.eRojo+=gravedadInfeccion;
                    break;
                }
                case 4:{
                    ciudadRandom.eAzul+=gravedadInfeccion;
                    break;
                } 
            }
        }
    }

    eliminarAzul(c:Ciudad){
        c.eAzul-=1
        this.counterTurnos-=1
    }
    eliminarAmarilla(c:Ciudad){
        c.eAmarillo-=1
        this.counterTurnos-=1
    }
    eliminarRoja(c:Ciudad){
        c.eRojo-=1
        this.counterTurnos-=1
    }
    eliminarVerde(c:Ciudad){
        c.eVerde-=1
        this.counterTurnos-=1
    }
}