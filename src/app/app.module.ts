import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePandemicComponent } from './components/game-pandemic/game-pandemic.component';
import { LogInPandemicComponent } from './components/log-in-pandemic/log-in-pandemic.component';
import { InicioComponent } from './componets/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    GamePandemicComponent,
    LogInPandemicComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
