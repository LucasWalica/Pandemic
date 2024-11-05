import { Personaje } from "./personaje.model";


export class Ciudad{
    nombre:string;
    listCiudadesColindandes:string[];
    listPersonajes:Personaje[]=[] as Personaje[];
    centroInvestigacion:boolean=false;
    coordenadasX:number;
    coordenadasY:number;
    eVerde:number=0;
    eRojo:number=0;
    eAzul:number=0;
    eAmarillo:number=0;

    constructor(nombre:string, listCiudadesColindantes:string[], centroInvestigacion:boolean,
        listPersonajes:Personaje[],coordenadasX:number, coordenadasY:number, eVerde:number,eRojo:number,eAzul:number,eAmarillo:number){
        this.nombre = nombre;
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
        for(var cityName of this.listCiudadesColindandes){
            const ciudad = todasLasCiudades.find(c => c.nombre == cityName)
            if(!ciudad || !ciudad.isInfected()){
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
            if(c.nombre==ciudad){
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


export const todasLasCiudades: Ciudad[] = [
    new Ciudad ('San Francisco', ['Chicago', 'Los Angeles', 'Manila', 'Tokio'], false, [], 115, 500, 0, 0, 0, 0),
    new Ciudad ('Chicago', ['San Francisco', 'Montreal', 'Atlanta', 'Mexico DF', 'Los Angeles'],false, [], 200, 450, 0, 0, 0, 0),
    new Ciudad ('Atlanta', ['Chicago', 'Miami', 'Washington'],false, [], 205, 540, 0, 0, 0, 0),
    new Ciudad ('Montreal', ['Chicago', 'Nueva York', ' Washington'],false, [], 350, 280, 0, 0, 0, 0),
    new Ciudad ('Nueva York', ['Montreal', 'Washington', 'Londres', 'Madrid'],false, [], 380, 290, 0, 0, 0, 0),
    new Ciudad ('Washington', ['Montreal', 'Nueva York', 'Atlanta', 'Miami'],false, [], 360, 330, 0, 0, 0, 0),
    new Ciudad ('Londres', ['Nueva York', 'Madrid', 'Paris', 'Essen'],false, [], 700, 230, 0, 0, 0, 0),
    new Ciudad ('Madrid', ['Nueva York', 'Londres', 'Paris', 'Sao Paulo', 'Argel'],false, [], 687, 290, 0, 0, 0, 0),
    new Ciudad ('Paris', ['Madrid', 'Londres', 'Essen', 'Argel', 'Milan'],false, [], 727, 250, 0, 0, 0, 0),
    new Ciudad ('Essen', ['Londres', 'Paris', 'San Petersburgo', 'Milan'],false, [], 755, 190, 0, 0, 0, 0),
    new Ciudad ('Milan', ['Essen', 'Paris', 'Estambul'],false, [], 755, 235, 0, 0, 0, 0),
    new Ciudad ('San Petersburgo', ['Essen', 'Estambul', 'Moscu'],false, [], 815, 210, 0, 0, 0, 0),
    new Ciudad ('Los Angeles', ['San Francisco', 'Mexico DF', 'Chicago', 'Sidney'],false, [], 275, 355, 0, 0, 0, 0),
    new Ciudad ('Miami', ['Washington', 'Atlanta', 'Mexico DF', 'Bogota'],false, [], 380, 360, 0, 0, 0, 0),
    new Ciudad ('Mexico DF', ['Los Angeles', 'Miami', 'Chicago', 'Bogota', 'Lima'],false, [], 300, 385, 0, 0, 0, 0),
    new Ciudad ('Bogota', ['Miami', 'Mexico DF', 'Lima', 'Sao Paulo', 'Buenos Aires'],false, [], 400, 460, 0, 0, 0, 0),
    new Ciudad ('Lima', ['Mexico DF', 'Bogota', 'Santiago de Chile'],false, [], 395, 520, 0, 0, 0, 0),
    new Ciudad ('Santiago de Chile', ['Lima'],false, [], 430, 620, 0, 0, 0, 0),
    new Ciudad ('Buenos Aires', ['Sao Paulo', 'Bogota'],false, [], 453, 670, 0, 0, 0, 0),
    new Ciudad ('Sao Paulo', ['Bogota', 'Buenos Aires', 'Lagos', 'Madrid'],false, [], 520, 570, 0, 0, 0, 0),
    new Ciudad ('Lagos', ['Sao Paulo', 'Kinsasa', 'Jartum'],false, [], 710, 450, 0, 0, 0, 0),
    new Ciudad ('Kinsasa', ['Lagos', 'Jartum', 'Johannesburgo'],false, [], 770, 540, 0, 0, 0, 0),
    new Ciudad ('Jartum', ['El Cairo', 'Lagos', 'Kinsasa', 'Johannesburgo'],false, [], 815, 450, 0, 0, 0, 0),
    new Ciudad ('Johannesburgo', ['Kinsasa', 'Jartum'],false, [], 815, 630, 0, 0, 0, 0),
    new Ciudad ('Argel', ['Madrid', 'Paris', 'Estambul', 'El Cairo'],false, [], 730, 330, 0, 0, 0, 0),
    new Ciudad ('El Cairo', ['Argel', 'Estambul', 'Bagdad'],false, [], 820, 350, 0, 0, 0, 0),
    new Ciudad ('Riad', ['El Cairo', 'Bagdad', 'Karachi'],false, [], 895, 385, 0, 0, 0, 0),
    new Ciudad ('Estambul', ['Argel', 'El Cairo', 'Bagdad', 'Moscu'],false, [], 830, 294, 0, 0, 0, 0),
    new Ciudad ('Bagdad', ['Estambul', 'Karachi', 'Riad', 'El Cairo'], false, [], 880, 320, 0, 0, 0, 0),
    new Ciudad ('Moscu', ['Teheran', 'Estambul', 'San Petersburgo'],false, [], 890, 230, 0, 0, 0, 0),
    new Ciudad ('Teheran', ['Moscu', 'Bagdad', 'Karachi', 'Nueva Delhi'],false, [], 920, 310, 0, 0, 0, 0),
    new Ciudad ('Karachi', ['Teheran', 'Bagdad', 'Nueva Delhi', 'Riad', 'Bombay'],false, [], 980, 355, 0, 0, 0, 0),
    new Ciudad ('Bombay', ['Karachi', 'Nueva Delhi', 'Madras'],false, [], 1005, 395, 0, 0, 0, 0),
    new Ciudad ('Nueva Delhi', ['Teheran', 'Karachi', 'Bombay', 'Madras', 'Calcuta'],false, [], 1025, 330, 0, 0, 0, 0),
    new Ciudad ('Calcuta', ['Nueva Delhi', 'Hong Kong', 'Madras', 'Bangkok'],false, [], 1070, 370, 0, 0, 0, 0),
    new Ciudad ('Madras', ['Bombay', 'Nueva Delhi', 'Calcula', 'Bangkok', 'Yakarta'],false, [], 1035, 410, 0, 0, 0, 0),
    new Ciudad ('Bombay', ['Karachi', 'Madras', 'Nueva Delhi'],false, [], 1005, 395, 0, 0, 0, 0),
    new Ciudad ('Yakarta', ['Madras', 'Bangkok', 'Ho Chi Minh', 'Sidney'],false, [], 1150, 525, 0, 0, 0, 0),
    new Ciudad ('Bangkok', ['Yakarta', 'Calcuta', 'Madras', 'Ho Chi Minh', 'Hong Kong'],false, [], 1120, 415, 0, 0, 0, 0),
    new Ciudad ('Hong Kong', ['Bangkok', 'Ho Chi Minh', 'Taipei', 'Manila', 'Shanghai'],false, [], 1165, 370, 0, 0, 0, 0),
    new Ciudad ('Shanghai', ['Pekin', 'Hong Kong', 'Seul', 'Tokio', 'Taipei'],false, [], 1195, 355, 0, 0, 0, 0),
    new Ciudad ('Pekin', ['Seul', 'Shanghai'],false, [], 1175, 300, 0, 0, 0, 0),
    new Ciudad ('Seul', ['Pekin', 'Tokio'],false, [], 1225, 297, 0, 0, 0, 0),
    new Ciudad ('Tokio', ['San Francisco', 'Seul', 'Osaka', 'Shanghai'],false, [], 1280, 290, 0, 0, 0, 0),
    new Ciudad ('Osaka', ['Tokio', 'Taipei'],false, [], 1255, 320, 0, 0, 0, 0),
    new Ciudad ('Taipei', ['Osaka', 'Shanghai', 'Hong Kong', 'Manila'],false, [], 1205, 375, 0, 0, 0, 0),
    new Ciudad ('Ho Chi Minh', ['Yakarta', 'Bangkok', 'Hong Kong', 'Manila'],false, [], 1148, 429, 0, 0, 0, 0),
    new Ciudad ('Manila', ['San Francisco', 'Ho Chi Minh', 'Taipei', 'Hong Kong', 'Sidney'],false, [], 1200, 420, 0, 0, 0, 0),
    new Ciudad ('Sidney', ['Los Angeles', 'Manila', 'Yakarta'],false, [], 1320, 645, 0, 0, 0, 0),
];