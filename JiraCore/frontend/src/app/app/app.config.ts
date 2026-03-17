import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes'; // Asegúrate que app.routes.ts esté en esa carpeta

export const appConfig: ApplicationConfig = {
  providers: [
    // Esta línea es la que le da vida al Router y soluciona tu error
    provideRouter(routes)
  ]
};
