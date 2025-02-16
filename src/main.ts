import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

// Call the element loader before the bootstrapModule/bootstrapApplication call
defineCustomElements(window);


//bootstrapApplication(AppComponent, appConfig)
//  .catch((err) => console.error(err));

platformBrowserDynamic().bootstrapModule(AppModule)
 .catch(err => console.log(err));

 //bootstrapApplication(AppComponent, appConfig)
 // .catch((err) => console.error(err));
