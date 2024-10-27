import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile, profilePic } from '../models/profile.models';
import { ProfileDataService } from '../services/profile-data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  constructor(private router:Router, private profileData:ProfileDataService){}
  profile:Profile = {} as Profile;
  profilePics:profilePic[] = {} as profilePic[];

  isVisible:boolean = false;


  ngOnInit(): void {
    this.profile=this.profileData.provisionalProfile;
    this.profilePics=this.profileData.pics;
  }

  selectPic(src:string){
    this.profile.profilePic=src;
    this.isVisible=false;
    this.profileData.saveProfile(this.profile);
  }

  setVisible(){
    this.isVisible=true;
  }

  goToInicio(){
    this.router.navigate(['home'])
  }

  goLogout(){
    this.router.navigate([''])
  }

}
