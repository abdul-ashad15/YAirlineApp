
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { Passangerdetails } from './passenger-details/passangerdetails.component';
import { PassangerCreate } from './passenger-create/passengercreate.component';
import { PassengerService } from './passenger-details/passenger.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { navComponent } from './admin/nav.component';
import { LoginService } from './login/login.service';
import { navAdminComponent } from './admin/navadmin.component';
import { NavbarService } from './admin/navbar.service';
import { HomeComponent } from './home/home.component';
import { Ancillaryservices } from './ancillary-services/ancillaryservices.component';
import { AncillaryService } from './ancillary-services/ancillary.service';
import { Ancillarlistservices } from './ancillary-services/ancillary-listservices.component';
import { FilterPipe } from './passenger-details/filterPipe';
import { SignupComponent } from './login/signup.components';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { InFlightCreate } from './Inflight/inflightcreate.component';
import { InFlightList } from './Inflight/inflightlist.component';
import { InFlightService } from './Inflight/inflight.service';
import { EditUsers } from './login/edit-profile.component';
import { MatSelectModule } from '@angular/material/select';
import { CheckinComponent } from './checkin/checkin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { TravellerListComponent } from './traveller-list/traveller-list.component';
import { FlightTicketComponent } from './flight-ticket/flight-ticket.component';
import { DashboardPassengerComponent } from './dashboard-passenger/dashboard-passenger.component';
import { TravellersFilterPipe } from './travellers-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,Passangerdetails,PassangerCreate, AdminComponent, LoginComponent,routingComponents,
    navComponent,navAdminComponent,HomeComponent, Ancillaryservices,Ancillarlistservices,FilterPipe,
    SignupComponent,InFlightCreate,InFlightList,EditUsers,CheckinComponent,
    PageNotFoundComponent,
    FlightListComponent,
    FlightDetailComponent,
    SafeHtmlPipe,
    TravellerListComponent,
    FlightTicketComponent,
    DashboardPassengerComponent,
    TravellersFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [PassengerService,LoginService,NavbarService,AncillaryService,MatDatepickerModule,InFlightService],
  //bootstrap: [AppComponent]
  bootstrap:[AppComponent]
})
export class AppModule { }
