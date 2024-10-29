import { Injectable } from '@angular/core';
import { Profile } from '../profileModule/models/profile.models';
@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor() { }
  
  profiles:Profile[] = [] as Profile[];
  // cargar todos los perfiles que haya en la base de datos
  chargeRanking(){}

  orderProfiles(profiles:Profile[]):Profile[]{
    return profiles.sort((a,b)=>{
      const ratioA = a.loses > 0 ? a.wins / a.loses : a.wins;
      const ratioB = b.loses > 0 ? b.wins / b.loses : b.wins;
      return ratioB - ratioA;
    });
  }


  // datos falsos => 
  fakeProfiles:Profile[] = [
    new Profile("Test", "/assets/portraits-64px/portrait2-4x.png", 22, 7),
    new Profile("Jaimito", "/assets/portraits-64px/portrait1-4x.png", 21, 11),
    new Profile("pepito", "/assets/portraits-64px/portrait7-4x.png", 12, 12),
    new Profile("Lucrecia", "/assets/portraits-64px/portrait8-4x.png", 4, 6),
    new Profile("Jasmin", "/assets/portraits-64px/portrait10-4x.png", 12, 2),
    new Profile("Eustaquia", "/assets/portraits-64px/portrait11-4x.png", 11, 3),
    new Profile("Manola", "/assets/portraits-64px/portrait12-4x.png", 41, 5),
    new Profile("Pepe", "/assets/portraits-64px/portrait2-4x.png", 51, 9),
    new Profile("Jorge", "/assets/portraits-64px/portrait4-4x.png", 101, 5),
    new Profile("Aimirrio", "/assets/portraits-64px/portrait5-4x.png", 12, 12),
    new Profile("Emilio", "/assets/portraits-64px/portrait6-4x.png", 13, 50),
    new Profile("Jasminto", "/assets/portraits-64px/portrait14-4x.png", 15, 4),
    new Profile("Pepesito", "/assets/portraits-64px/portrait15-4x.png", 16, 2),
    new Profile("Jaime", "/assets/portraits-64px/portrait1-4x.png", 9, 20),
    new Profile("Juan", "/assets/portraits-64px/portrait2-4x.png", 11, 10),
  ]


}
