
export class Profile{
    name:string;
    profilePic:string;
    rankingGlobal:number;
    wins:number;
    loses:number;

    constructor(name:string, profilePic:string, 
        rankingGlobal:number,wins:number, loses:number){
        this.name=name;
        this.profilePic=profilePic;
        this.rankingGlobal=rankingGlobal;
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