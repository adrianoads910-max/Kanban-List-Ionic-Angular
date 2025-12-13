import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

import { defineCustomElements } from '@ionic/core/loader';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

// 🔥 REGISTRA OS WEB COMPONENTS DO IONIC (OBRIGATÓRIO EM PRODUÇÃO)
defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [
    // Estratégia de rota do Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // Ionic + Angular Router
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),

    // ✅ PWA / SERVICE WORKER (ESSENCIAL)
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
});
