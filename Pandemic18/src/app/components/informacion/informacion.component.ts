import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../profileModule/models/profile.models';
import { ProfileDataService } from '../profileModule/services/profile-data.service';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent {

  profile: Profile = {} as Profile;
  notSelectedProfileImage: string = "../../../../public/assets/default\ avatar.jpg";

  ngOnInit(): void {
    this.profile = this.profileService.getProfile();  
  }

  constructor(private router: Router, private profileService: ProfileDataService) { }

  IrAPerfil() {this.router.navigate(['profile']);}

  goToRanking(){
    this.router.navigate(['ranking']);
  }
}
