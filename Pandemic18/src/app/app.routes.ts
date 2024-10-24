import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { GamePandemicComponent } from './components/game-pandemic/game-pandemic.component';
import { LogInPandemicComponent } from './components/auth/log-in-pandemic/log-in-pandemic.component';
import { RegisterInPandemicComponent } from './components/auth/register-in-pandemic/register-in-pandemic.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {path:'', component:LogInPandemicComponent},
    {path:'register', component:RegisterInPandemicComponent},
    {path:'home', component:InicioComponent},
    {path:'game', component:GamePandemicComponent},
    {path:'profile', component:ProfileComponent},
];
