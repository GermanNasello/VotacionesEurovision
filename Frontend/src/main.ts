import { enableProdMode } from '@angular/core';  // Importa el modo de producción
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';  // Plataforma para arranque
import { AppModule } from './app/app.module';  // Importa el módulo principal de la aplicación

// Arranca la aplicación
platformBrowserDynamic()
  .bootstrapModule(AppModule)  // Arranca el módulo principal
  .catch(err => console.error(err));  // Captura errores en el arranque
