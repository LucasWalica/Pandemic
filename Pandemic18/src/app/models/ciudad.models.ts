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
        new Ciudad ('Montreal', ['Chicago', 'Nueva York', ' Washington'],false, [], 220, 480, 0, 0, 0, 0),
        new Ciudad ('Nueva York', ['Montreal', 'Washington', 'Londres', 'Madrid'],false, [], 220, 550, 0, 0, 0, 0),
        new Ciudad ('Washington', ['Montreal', 'Nueva York', 'Atlanta', 'Miami'],false, [], 210, 600, 0, 0, 0, 0),
        new Ciudad ('Londres', ['Nueva York', 'Madrid', 'Paris', 'Essen'],false, [], 390, 355, 0, 0, 0, 0),
        new Ciudad ('Madrid', ['Nueva York', 'Londres', 'Paris', 'Sao Paulo', 'Argel'],false, [], 387, 500, 0, 0, 0, 0),
        new Ciudad ('Paris', ['Madrid', 'Londres', 'Essen', 'Argel', 'Milan'],false, [], 400, 430, 0, 0, 0, 0),
        new Ciudad ('Essen', ['Londres', 'Paris', 'San Petersburgo', 'Milan'],false, [], 410, 375, 0, 0, 0, 0),
        new Ciudad ('Milan', ['Essen', 'Paris', 'Estambul'],false, [], 420, 430, 0, 0, 0, 0),
        new Ciudad ('San Petersburgo', ['Essen', 'Estambul', 'Moscu'],false, [], 455, 300, 0, 0, 0, 0),
        new Ciudad ('Los Angeles', ['San Francisco', 'Mexico DF', 'Chicago', 'Sidney'],false, [], 120, 555, 0, 0, 0, 0),
        new Ciudad ('Miami', ['Washington', 'Atlanta', 'Mexico DF', 'Bogota'],false, [], 210, 660, 0, 0, 0, 0),
        new Ciudad ('Mexico DF', ['Los Angeles', 'Miami', 'Chicago', 'Bogota', 'Lima'],false, [], 160, 705, 0, 0, 0, 0),
        new Ciudad ('Bogota', ['Miami', 'Mexico DF', 'Lima', 'Sao Paulo', 'Buenos Aires'],false, [], 225, 890, 0, 0, 0, 0),
        new Ciudad ('Lima', ['Mexico DF', 'Bogota', 'Santiago de Chile'],false, [], 217, 1050, 0, 0, 0, 0),
        new Ciudad ('Santiago de Chile', ['Lima'],false, [], 235, 1350, 0, 0, 0, 0),
        new Ciudad ('Buenos Aires', ['Sao Paulo', 'Bogota'],false, [], 260, 1310, 0, 0, 0, 0),
        new Ciudad ('Sao Paulo', ['Bogota', 'Buenos Aires', 'Lagos', 'Madrid'],false, [], 290, 1150, 0, 0, 0, 0),
        new Ciudad ('Lagos', ['Sao Paulo', 'Kinsasa', 'Jartum'],false, [], 370, 500, 0, 0, 0, 0),
        new Ciudad ('Kinsasa', ['Lagos', 'Jartum', 'Johannesburgo'],false, [], 430, 940, 0, 0, 0, 0),
        new Ciudad ('Jartum', ['El Cairo', 'Lagos', 'Kinsasa', 'Johannesburgo'],false, [], 470, 750, 0, 0, 0, 0),
        new Ciudad ('Johannesburgo', ['Kinsasa', 'Jartum'],false, [], 460, 1200, 0, 0, 0, 0),
        new Ciudad ('Argel', ['Madrid', 'Paris', 'Estambul', 'El Cairo'],false, [], 400, 550, 0, 0, 0, 0),
        new Ciudad ('El Cairo', ['Argel', 'Estambul', 'Bagdad'],false, [], 440, 600, 0, 0, 0, 0),
        new Ciudad ('Riad', ['El Cairo', 'Bagdad', 'Karachi'],false, [], 500, 700, 0, 0, 0, 0),
        new Ciudad ('Estambul', ['Argel', 'El Cairo', 'Bagdad', 'Moscu'],false, [], 460, 500, 0, 0, 0, 0),
        new Ciudad ('Bagdad', ['Estambul', 'Karachi', 'Riad', 'El Cairo'], false, [], 500, 620, 0, 0, 0, 0),
        new Ciudad ('Moscu', ['Teheran', 'Estambul', 'San Petersburgo'],false, [], 465, 380, 0, 0, 0, 0),
        new Ciudad ('Teheran', ['Moscu', 'Bagdad', 'Karachi', 'Nueva Delhi'],false, [], 520, 590, 0, 0, 0, 0),
        new Ciudad ('Karachi', ['Teheran', 'Bagdad', 'Nueva Delhi', 'Riad', 'Bombay'],false, [], 540, 610, 0, 0, 0, 0),
        new Ciudad ('Bombay', ['Karachi', 'Nueva Delhi', 'Madras'],false, [], 565, 710, 0, 0, 0, 0),
        new Ciudad ('Nueva Delhi', ['Teheran', 'Karachi', 'Bombay', 'Madras', 'Calcuta'],false, [], 575, 760, 0, 0, 0, 0),
        new Ciudad ('Calcuta', ['Nueva Delhi', 'Hong Kong', 'Madras', 'Bangkok'],false, [], 590, 710, 0, 0, 0, 0),
        new Ciudad ('Madras', ['Bombay', 'Nueva Delhi', 'Calcula', 'Bangkok', 'Yakarta'],false, [], 585, 800, 0, 0, 0, 0),
        new Ciudad ('Yakarta', ['Madras', 'Bangkok', 'Ho Chi Minh', 'Sidney'],false, [], 640, 1000, 0, 0, 0, 0),
        new Ciudad ('Bangkok', ['Yakarta', 'Calcuta', 'Madras', 'Ho Chi Minh', 'Hong Kong'],false, [], 630, 830, 0, 0, 0, 0),
        new Ciudad ('Hong Kong', ['Bangkok', 'Ho Chi Minh', 'Taipei', 'Manila', 'Shanghai'],false, [], 655, 700, 0, 0, 0, 0),
        new Ciudad ('Shanghai', ['Pekin', 'Hong Kong', 'Seul', 'Tokio', 'Taipei'],false, [], 670, 610, 0, 0, 0, 0),
        new Ciudad ('Pekin', ['Seul', 'Shanghai'],false, [], 650, 620, 0, 0, 0, 0),
        new Ciudad ('Seul', ['Pekin', 'Tokio'],false, [], 685, 550, 0, 0, 0, 0),
        new Ciudad ('Tokio', ['San Francisco', 'Seul', 'Osaka', 'Shanghai'],false, [], 725, 550, 0, 0, 0, 0),
        new Ciudad ('Osaka', ['Tokio', 'Taipei'],false, [], 710, 580, 0, 0, 0, 0),
        new Ciudad ('Taipei', ['Osaka', 'Shanghai', 'Hong Kong', 'Manila'],false, [], 675, 700, 0, 0, 0, 0),
        new Ciudad ('Ho Chi Minh', ['Yakarta', 'Bangkok', 'Hong Kong', 'Manila'],false, [], 640, 790, 0, 0, 0, 0),
        new Ciudad ('Manila', ['San Francisco', 'Ho Chi Minh', 'Taipei', 'Hong Kong', 'Sidney'],false, [], 680, 800, 0, 0, 0, 0),
        new Ciudad ('Sidney', ['Los Angeles', 'Manila', 'Yakarta'],false, [], 750, 1300, 0, 0, 0, 0),
    ];