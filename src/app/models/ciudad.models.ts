import { Personaje } from "./personaje.model";

export class Ciudad{
    listCiudadesColindandes:Ciudad[];
    centroInvestigacion:boolean=false;
    listPersonajes:Personaje[]=[] as Personaje[];
    eVerde:number=0;
    eRojo:number=0;
    eAzul:number=0;
    eAmarillo:number=0;

    constructor(listCiudadesColindantes:Ciudad[], centroInvestigacion:boolean,
     listPersonajes:Personaje[], eVerde:number,eRojo:number,eAzul:number,eAmarillo:number){
        this.listCiudadesColindandes=listCiudadesColindantes;
        this.centroInvestigacion=centroInvestigacion;
        this.listPersonajes=listPersonajes;
        this.eVerde=eVerde;
        this.eRojo=eRojo;
        this.eAmarillo=eAmarillo;
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
}   