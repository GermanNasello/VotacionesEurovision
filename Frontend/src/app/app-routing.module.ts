import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorNombreComponent } from './components/selector-nombre/selector-nombre.component';
import { VotacionesComponent } from './components/votaciones/votaciones.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { EstadisticasPersonaComponent } from './components/estadisticas-persona/estadisticas-persona.component';

const routes: Routes = [
  { path: '', component: SelectorNombreComponent },
  { path: 'votaciones', component: VotacionesComponent },
  { path: 'estadisticas/global', component: EstadisticasComponent },
  { path: 'estadisticas/pais', component: EstadisticasPersonaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // IMPORTANTE: forRoot(routes)
  exports: [RouterModule]
})
export class AppRoutingModule { }
