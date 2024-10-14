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

    moverJugador(cInicio:Ciudad, cFinal:Ciudad, p:Personaje){
        if(cInicio.communicateWith(cFinal)){
            cInicio.quitarPersonaje(p);
            cFinal.aniadiPersonaje(p);
        }
    }      
}