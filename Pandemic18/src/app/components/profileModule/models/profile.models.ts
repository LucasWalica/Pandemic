
export class Profile{
    name:string;
    profilePic:string|null;
    puntuacion:number;
    constructor(name:string, profilePic:string|null, puntuacion:number){
        this.name=name;
        this.profilePic=profilePic;
        this.puntuacion = puntuacion;
    }
}

export class profilePic{
    src:string;

    constructor(src:string){
        this.src=src;
    }
}