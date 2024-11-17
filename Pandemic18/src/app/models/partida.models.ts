import { Ciudad } from "./ciudad.models";
import { Enfermedad } from "./enfermedad.models";
import { listaPersonas, Personaje } from "./personaje.model";


export class Partida{
    counterTurnos:number=0;
    jugadas:number=4;
    listCiudades:Ciudad[];

    constructor(counterTurnos:number, jugadas:number, listCiudades:Ciudad[]){
        this.counterTurnos=counterTurnos;
        this.jugadas=jugadas;
        this.listCiudades=listCiudades;
        this.asignarPersonajes();
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



   // dibujarLineas(c:Ciudad){
        //for(var inicioLinea=0; inicioLinea < this.listCiudades.length; inicioLinea++){
           // var lx1=c.coordenadasX;
           // var ly1=c.coordenadasY;
           // for(var finLinea=0; finLinea < c.todasLasCiudadesColindandes.length; finLinea++){
                
         //   }
       // }
     //   91//numero de lineas en total, por si me sirve de algo en el tripe bucle
    //}
    

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
                if(personaje.reducirACeroEnfermedad(ciudad, this)===true){
                    personaje.movido=false;
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
    }

    // testear
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
}