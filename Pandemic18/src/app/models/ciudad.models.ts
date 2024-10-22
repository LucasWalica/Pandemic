import { Personaje } from "./personaje.model";

export class Ciudad{
    listCiudadesColindandes:Ciudad[];
    listPersonajes:Personaje[]=[] as Personaje[];
    centroInvestigacion:boolean=false;
    coordenadasX:number;
    coordenadasY:number;
    eVerde:number=0;
    eRojo:number=0;
    eAzul:number=0;
    eAmarillo:number=0;

    constructor(listCiudadesColindantes:Ciudad[], centroInvestigacion:boolean,
        listPersonajes:Personaje[], eVerde:number,eRojo:number,eAzul:number,eAmarillo:number,
        coordenadasX:number, coordenadasY:number){
        this.listCiudadesColindandes=listCiudadesColindantes;
        this.centroInvestigacion=centroInvestigacion;
        this.listPersonajes=listPersonajes;
        this.eVerde=eVerde;
        this.eRojo=eRojo;
        this.eAmarillo=eAmarillo;
        this.eAzul=eAzul;
        this.coordenadasX=coordenadasX;
        this.coordenadasY=coordenadasY;
     }

     isInfected(){
        if(this.eAmarillo==0 || this.eAzul==0 || this.eRojo==0 || this.eVerde==0){
            return false;
        }
        return true;
     }

     isInfectedTotally(){
        if(this.eAmarillo==4 || this.eAzul==4 || this.eRojo==4 || this.eVerde==4){
            return true;
        }
        return false;
     }
     
     allCitiesAreInfected(){
        for(var city of this.listCiudadesColindandes){
            if(!city.isInfected()){
                return false;
            }
        }
        return true;
     }

     communicateWith(c:Ciudad){
        if(this.centroInvestigacion && c.centroInvestigacion){
            return true;
        }
        for(var ciudad of this.listCiudadesColindandes){
            if(c==ciudad){
                return true;
            }
        }
        return false;
     }

     quitarPersonaje(p:Personaje){
        var count = 0;
        for(var personaje of this.listPersonajes){
            if(p==personaje){
                delete this.listPersonajes[count];
            }
            count++;
        }
     }
     aniadiPersonaje(p:Personaje){
        this.listPersonajes.push(p);
     }

     especialistaEnCuarentenasEstaPresente(){
        for(var personaje of this.listPersonajes){
            if(personaje.id==1){
                return true;
            }
        }
        return false;
     }   
}   