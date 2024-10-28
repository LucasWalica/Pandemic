import { Injectable } from '@angular/core';
import { Profile, profilePic } from '../models/profile.models';

@Injectable({
  providedIn: 'root'
})
// servicio usado para cargar los datos del perfil una vez abierta la pantalla
// usar fetch o algo a la API una vez implementada por ahora fakea los datos

export class ProfileDataService{

  constructor() { }


  pics:profilePic[]= [
    new profilePic(1, "/assets/portraits-64px/portrait1-4x.png"),
    new profilePic(2, "/assets/portraits-64px/portrait2-4x.png"),
    new profilePic(3, "/assets/portraits-64px/portrait3-4x.png"),
    new profilePic(4, "/assets/portraits-64px/portrait4-4x.png"),
    new profilePic(5, "/assets/portraits-64px/portrait5-4x.png"),
    new profilePic(6, "/assets/portraits-64px/portrait6-4x.png"),
    new profilePic(7, "/assets/portraits-64px/portrait7-4x.png"),
    new profilePic(8, "/assets/portraits-64px/portrait8-4x.png"),
    new profilePic(9, "/assets/portraits-64px/portrait9-4x.png"),
    new profilePic(10, "/assets/portraits-64px/portrait10-4x.png"),
    new profilePic(11, "/assets/portraits-64px/portrait11-4x.png"),
    new profilePic(12, "/assets/portraits-64px/portrait12-4x.png"),
    new profilePic(13, "/assets/portraits-64px/portrait13-4x.png"),
    new profilePic(14, "/assets/portraits-64px/portrait14-4x.png"),
    new profilePic(15, "/assets/portraits-64px/portrait15-4x.png")
  ];
  



  profile:Profile= {} as Profile;
  // usar esta funcion para asignar al profile los datos correspondientes 
  // puede ser que asignando un ID al user 
  // y cada perfil tiene un id que comparte (ideas?)  
  chargeProfile(){}
  
  
  
  provisionalProfile:Profile = new Profile("Test", null, 1, 10, 2);


  saveProfile(p:Profile){
    this.profile=p;
  }
  getProfile(){
    return this.profile;
  }
}