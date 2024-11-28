import { Component, OnInit } from '@angular/core';
import { RankingService } from '../ranking.service';
import { Profile } from '../../profileModule/models/profile.models';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';
@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit{
  
  profiles:Profile[] = [] as Profile[];
  constructor(private router:Router, private rankingService:RankingService, private authService:AuthServiceService){}

  ngOnInit(): void {
    this.profiles = this.rankingService.fakeProfiles;
    this.profiles = this.rankingService.orderProfiles(this.profiles);
    if(!this.authService.userIsAuthenticated()){
      this.router.navigate(['']);
    }
  }


  goToProfile(){
    this.router.navigate(['profile']);
  }

  goToInicio(){
    this.router.navigate(['home'])
  }

  goLogout(){
    this.router.navigate([''])
  }

}
