import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

import { SelectorNombreComponent } from './components/selector-nombre/selector-nombre.component';
import { VotacionesComponent } from './components/votaciones/votaciones.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { EstadisticasPersonaComponent } from './components/estadisticas-persona/estadisticas-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectorNombreComponent,  
    EstadisticasComponent, 
    EstadisticasPersonaComponent,  // Declara el componente
    VotacionesComponent,       // Declara el componente
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule               // Asegúrate de que está aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
