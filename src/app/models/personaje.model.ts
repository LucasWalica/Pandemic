import { Ciudad } from "./ciudad.models";
import { Enfermedad } from "./enfermedad.models";
import { Partida } from "./partida.models";

export class Personaje{
    id:number;
    name:string; 
    specialSkill:string;
    movido:boolean=false;

    constructor(id:number, name:string, specialSkill:string, movido:boolean){
        this.id=id;
        this.name=name;
        this.specialSkill=specialSkill;
        this.movido=movido;
    }
    // no se le puede pasar partida
    getCiudadActual(p:Partida):Ciudad|null{
        for(var ciudad of p.listCiudades){
            for(var personaje of ciudad.listPersonajes){
                if(personaje.id==this.id){
                    return ciudad;
                }
            }
        }
        return null;
    }
}
// id = 1
export class EspecialistaEnCuarentena extends Personaje{
    constructor(id:number, name:string, specialSkill:string, movido:boolean){
        super(id, name, specialSkill, movido);
    }
    // metodo anular transmision implementado en clase enfermedad
}
// id = 2
export class Medico extends Personaje{
    turnoComienzo:number;
    constructor(id:number, name:string, specialSkill:string, movido:boolean, turnoComienzo:number){
        super(id, name, specialSkill, movido);
        this.turnoComienzo=turnoComienzo;
    }
    // funcion asincrona?
    reducirACeroEnfermedad(c:Ciudad, p:Partida){
        const tC = p.counterTurnos;
        this.turnoComienzo = tC;
        while(p.counterTurnos<this.turnoComienzo+4){
            this.movido=true;
        }
        if(p.counterTurnos=this.turnoComienzo+4){
            c.eAmarillo=0;
            c.eAzul=0;
            c.eRojo=0;
            c.eVerde=0;
        }
    }
}
// id = 3
// bloquear X turnos
export class BobElConstructor extends Personaje{
    turnoComienzo:number;
    constructor(id:number, name:string, specialSkill:string, movido:boolean, turnoComienzo:number){
        super(id, name, specialSkill, movido);
        this.turnoComienzo=turnoComienzo;
    }
    construirCentroInvestigacion(c:Ciudad, p:Partida){
        if(c.centroInvestigacion==false){
            const tC = p.counterTurnos;
        this.turnoComienzo = tC;
        while(p.counterTurnos<this.turnoComienzo+4){
            this.movido=true;
        }
        if(p.counterTurnos=this.turnoComienzo+4){
                c.centroInvestigacion=true;
            }
        }
    }
}
// id = 4
export class Investigador extends Personaje{
    constructor(id:number, name:string, specialSkill:string, movido:boolean){
        super(id, name, specialSkill, movido);
    }
    investigar(e:Enfermedad, p:Partida){
        var c:Ciudad|null=this.getCiudadActual(p);
        if(c?.centroInvestigacion==true){
            e.turnosParaCurar-=20;
        }else{
            e.turnosParaCurar-=10;
        }          
        this.movido=true;
    }
}