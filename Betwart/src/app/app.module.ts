import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProfileComponent } from './components/navbar/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    TicketsComponent,
    PublicationsComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
