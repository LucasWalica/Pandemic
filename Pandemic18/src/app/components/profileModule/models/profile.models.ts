
export class Profile{
    name:string;
    profilePic:string|null;
    wins:number;
    loses:number;

    constructor(name:string, profilePic:string|null, 
        wins:number, loses:number){
        this.name=name;
        this.profilePic=profilePic;
        this.wins = wins;
        this.loses= loses;
    }
}

export class profilePic{
    id:number;
    src:string;

    constructor(id:number, src:string){
        this.id=id;
        this.src=src;
    }
}