import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Components
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { PublicationsComponent} from './components/publications/publications.component';
import { TicketsComponent} from './components/tickets/tickets.component';
import { ProfileComponent} from './components/navbar/profile/profile.component';


const appRoutes:Routes = [
    {path:"", component:LoginComponent},
    {path:"login", component:LoginComponent},
    {path:"registro", component:RegisterComponent},
    {path:"muro", component:PublicationsComponent},
    {path:"boletos", component:TicketsComponent},
    {path:"perfil", component:ProfileComponent}
];

export const appRoutingProviders: any[]=[];
export const routing:ModuleWithProviders= RouterModule.forRoot(appRoutes);

