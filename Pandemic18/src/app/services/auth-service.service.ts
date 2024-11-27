import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  private token: string | null = {} as string;

  constructor(private router:Router) { }

  registrar(nickName:string, email:string, password:string){

    const datosUsuario = JSON.stringify({
      name: nickName,
      email: email,
      password: password,
      password_confirmation: password
    });

    
    fetch('http://127.0.0.1:8000/api/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: datosUsuario
    })
    .then(response => {
      console.log(response);  
      if(response.ok){
        this.router.navigate(['']);
      }  
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

  logear(email: string, password: string) {
    const datosUsuario = JSON.stringify({
      email: email,
      password: password
    });
    console.log('Datos a enviar:', datosUsuario);
  
    fetch('http://127.0.0.1:8000/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: datosUsuario
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en el login');
        }
        return response.json();  
      })
      .then(data => { 
        console.log(data);  
        if (data.token) {
          this.setToken(data.token);  
          this.router.navigate(['profile']);  
        }
      })
      .catch(error => console.error('Error:', error));
  }
  


  // guardar token en local storage
  private setToken(token:string){
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getToken():string | null{
    return this.token || localStorage.getItem('authToken')
  }

  logout(){
    this.token=null;
    localStorage.removeItem('authToken');
    this.router.navigate(['navigate']);
  }


}
