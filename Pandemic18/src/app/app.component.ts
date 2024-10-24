import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from "./components/profile/profile.component";
import { LogInPandemicComponent } from "./components/auth/log-in-pandemic/log-in-pandemic.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { RegisterInPandemicComponent } from './components/auth/register-in-pandemic/register-in-pandemic.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileComponent, LogInPandemicComponent, InicioComponent, RegisterInPandemicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pandemic18';
}
