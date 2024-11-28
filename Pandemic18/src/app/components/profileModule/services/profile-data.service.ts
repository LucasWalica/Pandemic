import { Injectable } from '@angular/core';
import { Profile, profilePic } from '../models/profile.models';
import { AuthServiceService } from '../../../services/auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
// servicio usado para cargar los datos del perfil una vez abierta la pantalla
// usar fetch o algo a la API una vez implementada por ahora fakea los datos

export class ProfileDataService{

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
  
  


  chargeProfile() {
    const token = this.authService.getToken();
  
    // Verificar si el token está presente antes de continuar
    if (!token) {
      console.error('Token no encontrado');
      return;
    }
  
    // Configurar los encabezados con el token de autorización
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Hacer la solicitud GET al backend
    return this.http.get<ProfileData>('http://127.0.0.1:8000/api/auth/profileData/', { headers }).subscribe(
      (response) => {

        this.profile = new Profile(response.name, response?.profilePic, response?.puntuacion);
        console.log('Datos del perfil:', JSON.stringify(response));
      },
      (error) => {
        console.error('Error al obtener los datos del perfil:', error);
      }
    );
  }
  


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

  saveProfile(p:Profile){
    this.profile=p;
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