import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  // Import your routes configuration
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { FooterComponent } from './shared/components/footer/footer.component';
import { responseErrorInterceptor } from './core/interceptors/error/response-error.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Register the class-based interceptor
      multi: true, // Allows multiple interceptors
    }
  ],
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),  // Initialize IonicModule with forRoot
    RouterModule.forRoot(routes),  // Set up routing for the app
    FooterComponent
  ],
  bootstrap: [AppComponent],  // Bootstraps the root component
})
export class AppModule {}
