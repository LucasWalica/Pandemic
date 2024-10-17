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
    reducirACeroEnfermedad(c:Ciudad, p:Partida):boolean|void{}
    construirCentroInvestigacion(c:Ciudad, p:Partida):boolean|void{}
    investigar(e:Enfermedad, p:Partida){}
    
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
    turnoComienzo:number=0;
    constructor(id:number, name:string, specialSkill:string, movido:boolean){
        super(id, name, specialSkill, movido);
    }
    // funcion asincrona?
    override reducirACeroEnfermedad(c:Ciudad, p:Partida){

        if(this.turnoComienzo=0){
            const tC = p.counterTurnos;
            this.turnoComienzo = tC;
            p.jugadas-=1;
        }
        while(p.counterTurnos<this.turnoComienzo+4){
            this.movido=true;
            return false;
        }
        if(p.counterTurnos=this.turnoComienzo+4){
            c.eAmarillo=0;
            c.eAzul=0;
            c.eRojo=0;
            c.eVerde=0;
            this.turnoComienzo=0;
            return true;
        }
        return true;
    }
}
// id = 3
export class BobElConstructor extends Personaje{

    turnoComienzo:number=0;

    constructor(id:number, name:string, specialSkill:string, movido:boolean){
        super(id, name, specialSkill, movido);
    }

    override construirCentroInvestigacion(c:Ciudad, p:Partida){
        
        if(c.centroInvestigacion==false){

            if(this.turnoComienzo=0){
                const tC = p.counterTurnos;
                this.turnoComienzo = tC;
            }

            while(p.counterTurnos<this.turnoComienzo+4){
                this.movido=true;
                return false;
            }
            if(p.counterTurnos=this.turnoComienzo+4){
                c.centroInvestigacion=true;
                this.turnoComienzo=0;
                return true;
            }
        }
        return true;
    }
}
// id = 4
export class Investigador extends Personaje{
    constructor(id:number, name:string, specialSkill:string, movido:boolean){
        super(id, name, specialSkill, movido);
    }
    override investigar(e:Enfermedad, p:Partida){
        var c:Ciudad|null=this.getCiudadActual(p);
        if(c?.centroInvestigacion==true){
            e.turnosParaCurar-=20;
        }else{
            e.turnosParaCurar-=10;
        }          
        this.movido=true;
    }
}