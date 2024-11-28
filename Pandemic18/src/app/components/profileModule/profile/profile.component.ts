import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile, profilePic } from '../models/profile.models';
import { ProfileDataService } from '../services/profile-data.service';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  constructor(private router:Router, private profileData:ProfileDataService, private authService:AuthServiceService){}
  profile:Profile = {} as Profile;
  profilePics:profilePic[] = {} as profilePic[];

  isVisible:boolean = false;

  ngOnInit(): void {
    if(!this.authService.userIsAuthenticated()){
      this.router.navigate(['']);
    };
    this.profilePics=this.profileData.pics;
    this.profileData.chargeProfile();
    // timeout para que la respuesta de la api llegue a tiempo para cargar el html
    setTimeout(() => {
      this.profile=this.profileData.profile;
      console.log(this.profile.name, this.profile.profilePic, this.profile.puntuacion);
    }, 500);
  }

  selectPic(src:string){
    this.profile.profilePic=src;
    this.isVisible=false;
    this.profileData.saveProfile(this.profile);
    this.profileData.changeProfilePic(src);
  }

  setVisible(){
    this.isVisible=true;
  }

  goToInicio(){
    this.router.navigate(['home'])
  }

  goLogout(){
    this.authService.logout();
    this.router.navigate([''])
  }
  goToRanking(){
    this.router.navigate(['ranking']);
  }

}