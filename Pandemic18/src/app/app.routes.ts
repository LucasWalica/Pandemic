import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { GamePandemicComponent } from './components/game-pandemic/game-pandemic.component';
import { LogInPandemicComponent } from './components/log-in-pandemic/log-in-pandemic.component';

export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'login/', component:LogInPandemicComponent},
    {path:'game/', component:GamePandemicComponent},
];
