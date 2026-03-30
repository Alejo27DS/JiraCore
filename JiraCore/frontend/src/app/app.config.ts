import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. Importa estas dos cosas
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // 2. Configura el HttpClient con soporte para fetch
    provideHttpClient(withFetch())
  ]
};