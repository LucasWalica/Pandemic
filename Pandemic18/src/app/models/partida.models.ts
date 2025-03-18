import { Ciudad } from "./ciudad.models";
import { listaPersonas, Personaje, EspecialistaEnCuarentena, Medico, Investigador, BobElConstructor } from "./personaje.model";
import { Enfermedad, eAmarilla, eAzul, eRojo, eVerde } from "./enfermedad.models";
import { todasLasCiudades } from "./ciudad.models";


export class Partida{
    
    counterTurnos:number=0;
    jugadas:number=4;
    listCiudades:Ciudad[];
    listaPersonajes:Personaje[];
    listEnfermedades:Enfermedad[];
    enfermedadesCount:number = 0;
    id:number = 0;

    constructor(counterTurnos:number, jugadas:number, listCiudades:Ciudad[], listEnfermedades:Enfermedad[], listaPersonajes:Personaje[],id:number=0){
        this.counterTurnos=counterTurnos;
        this.jugadas=jugadas;
        this.listCiudades=listCiudades;
        this.listEnfermedades=listEnfermedades;
        this.listaPersonajes = listaPersonajes;    
        this.id = id;
        if(this.id===0){
            this.asignarPersonajes();
        }else{
            this.asignarPersonajePartidaCargada();
        }
    }
    setId(id:number){
        this.id=id;
    }
    
    moverPersonaje(cInicio:Ciudad, cFinal:Ciudad, p:Personaje){
        if(cInicio.communicateWith(cFinal) && this.jugadas>0){
            cInicio.quitarPersonaje(p);
            cFinal.aniadiPersonaje(p);
            p.cambiarCiudad(cFinal);
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

            // expansion enfermedades 
            for(let enfermedad of this.listEnfermedades){
                enfermedad.transmitirse(ciudad, this);
            }


            for(var personaje of ciudad.listPersonajes){
                personaje.movido=false;
                if(personaje.id===3 && personaje.enAccion){
                    personaje.construirCentroInvestigacion(ciudad, this);
                }
                if(personaje.id===2 && personaje.enAccion){
                    personaje.reducirACeroEnfermedad(ciudad, this);
                }

            }
        }
        this.contagiarRandom();
        
        // ordenar ciudades segun rango de infeccion
        this.listCiudades.sort((ciudadA, ciudadB) => {
            const nivelEnfermedadA = ciudadA.calcularNivelEnfermedad();
            const nivelEnfermedadB = ciudadB.calcularNivelEnfermedad();
            return nivelEnfermedadB - nivelEnfermedadA; 
        });

         // modificar enfermedadesCount 
         this.enfermedadesCountModify();
        

    }

    enfermedadesCountModify(){
        let enfermedadesCount = 0;
        for(var ciudad of this.listCiudades){
            enfermedadesCount += ciudad.eAmarillo
            enfermedadesCount += ciudad.eAzul
            enfermedadesCount += ciudad.eRojo
            enfermedadesCount += ciudad.eVerde
        }
        this.enfermedadesCount = enfermedadesCount;
    }

    // works
    contagiarRandom(){
        var enfermedades = [1, 2, 3, 4];
        var gravedadInfeccion = 1;
        if(this.counterTurnos<=4){
            gravedadInfeccion=2;
        }

        for(let i=0; i<4; i++){

            var ciudadRandom = this.listCiudades[Math.floor(Math.random()*this.listCiudades.length)]
            var enfermedadRandom = enfermedades[Math.floor(Math.random()*enfermedades.length)]
            console.log(ciudadRandom, " ciudad random")
            console.log(enfermedadRandom, " enfermedad random")
            switch(enfermedadRandom){
                case 1: {
                    var eAmarilla = this.listEnfermedades.find(enf => enf.name === 'amarilla');
                        if(eAmarilla && eAmarilla.turnosParaCurar>0){
                            ciudadRandom.eAmarillo+=gravedadInfeccion;
                        }
                    break;
                }
                case 2:{
                    var eVerde = this.listEnfermedades.find(enf=>enf.name==="verde");
                    if(eVerde && eVerde.turnosParaCurar>0){
                        ciudadRandom.eVerde+=gravedadInfeccion;
                    }
                    break;
                }
                case 3: {
                    var eRojo = this.listEnfermedades.find(enf=>enf.name==="roja");
                    if(eRojo && eRojo.turnosParaCurar>0){
                        ciudadRandom.eRojo+=gravedadInfeccion;
                    }
                    break;
                }
                case 4:{
                    var eAzul = this.listEnfermedades.find(enf => enf.name ==="azul");
                    if(eAzul && eAzul.turnosParaCurar>0){    
                        ciudadRandom.eAzul+=gravedadInfeccion;
                    }
                    break;
                } 
            }
        }
    }

    eliminarAzul(c:Ciudad){
        if(this.jugadas>0){
            c.eAzul-=1
            this.counterTurnos-=1
        }
    }
    eliminarAmarilla(c:Ciudad){
        if(this.jugadas>0){
            c.eAmarillo-=1
            this.counterTurnos-=1
        }
    }
    eliminarRoja(c:Ciudad){
        if(this.jugadas>0){
            c.eRojo-=1
            this.counterTurnos-=1
        }
    }
    eliminarVerde(c:Ciudad){
        if(this.jugadas>0){
            c.eVerde-=1
            this.counterTurnos-=1
        }
    }
    // metodo llamado al iniciar una partida para asignar personajes de forma aleatoria en las ciudades
    
    asignarPersonajes():void{
        for(let i=0; i<listaPersonas.length; i++){
            let c: Ciudad = this.listCiudades[Math.floor(Math.random()*this.listCiudades.length)]
            c.listPersonajes.push(listaPersonas[i]);
            listaPersonas[i].ciudadEnLaQueEsta = c;
            

        }
    }
    asignarPersonajePartidaCargada():void{
        for(let i=0; i<listaPersonas.length; i++){
            let ciudadName:string = this.listaPersonajes[i].ciudadEnLaQueEsta.nombre
            let ciudad:Ciudad = this.getCiudadByName(ciudadName);
            this.listaPersonajes[i].ciudadEnLaQueEsta = ciudad;
        }
    }

    infeccionTotal(){
        let infeccion = 0;
        for(let i=0; i<this.listCiudades.length; i++){
            let c:Ciudad = this.listCiudades[i];
            infeccion+=c.eAmarillo +  c.eAzul + c.eRojo + c.eVerde;
        }
        return infeccion;
    }

    getCiudadByName(cName:string):Ciudad{
        for(let i=0; i<todasLasCiudades.length; i++){
            if(cName===todasLasCiudades[i].nombre){
                return todasLasCiudades[i];
            }
        }
        // nunca se dara este caso
        return todasLasCiudades[0];
    }
}