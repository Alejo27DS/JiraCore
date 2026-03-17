import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

// OJO: Si tu archivo está en src/app/app.ts, la ruta debería ser './app/app'
// Si daba error antes, verifica la ruta exacta de tu archivo.
import { AppComponent } from './app/app/app.component';

// SOLO UNA LLAMADA A BOOTSTRAP
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
