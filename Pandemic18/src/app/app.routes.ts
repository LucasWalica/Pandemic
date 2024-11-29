import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LogInPandemicComponent } from './components/auth/log-in-pandemic/log-in-pandemic.component';
import { RegisterInPandemicComponent } from './components/auth/register-in-pandemic/register-in-pandemic.component';
import { ProfileComponent } from './components/profileModule/profile/profile.component';
import { RankingComponent } from './components/rankingModule/ranking/ranking.component';
import { PartidaComponent } from './components/partida/partida.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { PartidaListComponent } from './components/partida-list/partida-list.component';

export const routes: Routes = [
    {path:'', component:LogInPandemicComponent},
    {path:'register', component:RegisterInPandemicComponent},
    {path:'home', component:InicioComponent},
    {path:'profile', component:ProfileComponent},
    {path:'ranking', component:RankingComponent},
    {path: 'info', component:InformacionComponent},
    {path:'newGame', component:PartidaComponent},
    {path: 'partidaList', component:PartidaListComponent}
];
