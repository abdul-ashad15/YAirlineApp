import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import { AppComponent } from './app.component';
import { Role } from './login/role';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth.guard';
import { Ancillaryservices } from './ancillary-services/ancillaryservices.component';
import { SignupComponent } from './login/signup.components';
import { InFlightCreate } from './Inflight/inflightcreate.component';
import { EditUsers } from './login/edit-profile.component';
import { ReactiveFormsModule} from '@angular/forms';
import { CheckinComponent } from './checkin/checkin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { TravellerListComponent } from './traveller-list/traveller-list.component';
import { FlightTicketComponent } from './flight-ticket/flight-ticket.component';
import { DashboardPassengerComponent } from './dashboard-passenger/dashboard-passenger.component';

export const routes: Routes = [
  { path: '',component: PageNotFoundComponent,pathMatch: 'full'},
  //{ path: 'DashboardPassenger',component: DashboardPassengerComponent,pathMatch: 'full'},
  //{ path: '',   redirectTo: '/first-component', pathMatch: 'full' },
  /*{path:'checkin',component:CheckinComponent},
  {path:'FlightList',component:FlightListComponent},
  {path:'FlightDetail',component:FlightDetailComponent},
  {path:'TravellerList',component:TravellerListComponent},
  {path:'FlightTicket',component:FlightTicketComponent},
  //{path:'DashboardPassenger',component:DashboardPassengerComponent},
  {path:'PageNotFound',component:PageNotFoundComponent},
  {path:'**',component:PageNotFoundComponent}, */ 
  { path:'admin',component: AdminComponent,canActivate: [AuthGuard],},
  {path:'home', component: HomeComponent},
  {path:'ancilary',component: Ancillaryservices},
  {path:'signup',component: SignupComponent},
  {path:'login',component: LoginComponent},
  {path:'inflight',component: InFlightCreate},
  {path:'editprofile',component: EditUsers}
];

export const loginroutes: Routes = [
  {
    path: 'login',    
    component: LoginComponent,  
    pathMatch: 'full',
  },    
  {    
    path:'admin',
    component: AdminComponent,
    data: { roles: [Role.Admin] } 
  },
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes),RouterModule.forRoot(loginroutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [AdminComponent]
