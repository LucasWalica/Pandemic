import { Injectable, OnInit } from '@angular/core';
import { Profile, profilePic } from '../models/profile.models';
import { AuthServiceService } from '../../../services/auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
// servicio usado para cargar los datos del perfil una vez abierta la pantalla
// usar fetch o algo a la API una vez implementada por ahora fakea los datos

export class ProfileDataService implements OnInit{

  constructor(private authService:AuthServiceService, private http:HttpClient) { }

  pics:profilePic[]= [
    new profilePic("/assets/portraits-64px/portrait1-4x.png"),
    new profilePic("/assets/portraits-64px/portrait2-4x.png"),
    new profilePic("/assets/portraits-64px/portrait3-4x.png"),
    new profilePic("/assets/portraits-64px/portrait4-4x.png"),
    new profilePic("/assets/portraits-64px/portrait5-4x.png"),
    new profilePic("/assets/portraits-64px/portrait6-4x.png"),
    new profilePic("/assets/portraits-64px/portrait7-4x.png"),
    new profilePic("/assets/portraits-64px/portrait8-4x.png"),
    new profilePic("/assets/portraits-64px/portrait9-4x.png"),
    new profilePic("/assets/portraits-64px/portrait10-4x.png"),
    new profilePic("/assets/portraits-64px/portrait11-4x.png"),
    new profilePic("/assets/portraits-64px/portrait12-4x.png"),
    new profilePic("/assets/portraits-64px/portrait13-4x.png"),
    new profilePic("/assets/portraits-64px/portrait14-4x.png"),
    new profilePic("/assets/portraits-64px/portrait15-4x.png")
  ];


  profile:Profile= {} as Profile;
  
  ngOnInit(): void {
    this.loadProfileFromStorage();
  }


  chargeProfile() {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Token no encontrado');
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProfileData>('http://127.0.0.1:8000/api/auth/profileData/', { headers }).subscribe(
      (response) => {

        this.profile = new Profile(response.name, response?.profilePic, response?.puntuacion);
        // guardar datos en local storage
        this.saveProfileToStorage();
        console.log('Datos del perfil:', JSON.stringify(response));
      },
      (error) => {
        console.error('Error al obtener los datos del perfil:', error);
      }
    );
  }
  



  // maneja la solicitud post al backnd
  changeProfilePic(profilePic_src:string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {"profilePic": profilePic_src};

    return this.http.post('http://127.0.0.1:8000/api/auth/profilePic/', body, {headers}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }  


  // maneja el local storage del perfil
  saveProfileToStorage(){
    localStorage.setItem("profile", JSON.stringify({
      name:this.profile.name,
      profilePic:this.profile.profilePic,
      puntuacion:this.profile.puntuacion
    }));
  }
  loadProfileFromStorage(){
    const profileString = localStorage.getItem("profile");
     if(profileString){
      const profileObject = JSON.parse(profileString);
      this.profile = new Profile(profileObject.name, profileObject.profilePic, profileObject.puntuacion);
     }
  }


  // maneja el local storage del perfil 
  saveProfile(p:Profile){
    this.profile=p;
    this.saveProfileToStorage();
  }

  getProfile(){
    return this.profile;
  }
}

interface ProfileData{
  name:string;
  profilePic:string;
  puntuacion:number;
}