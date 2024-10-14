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


     isInfected(){}
     isInfectedTotally(){}
     allCitiesAreInfected(){
        for(Ciudad c:this.listCiudadesColindandes){
            if(!c.isInfected()){
                return false;
            }
        }
        return true;
     }
}   