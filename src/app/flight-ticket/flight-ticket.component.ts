import { Component, OnInit } from '@angular/core';
import { DataTransferCheckinService } from '../services/data-transfer-checkin.service';
import { Router } from '@angular/router';
import { FlightList } from '../Models/flight-model.component';
import { FlightOpeationService } from '../services/flight-opeation.service';

@Component({
  selector: 'app-flight-ticket',
  templateUrl: './flight-ticket.component.html',
  styleUrls: ['./flight-ticket.component.css']
})
export class FlightTicketComponent implements OnInit {

  flightDetails:DataTransferCheckinService;
  flight: FlightList;

  constructor(private flightOperation: FlightOpeationService,private router:Router,private dataTransferCheckinService:DataTransferCheckinService) { 
    this.flightDetails=dataTransferCheckinService;

    this.flightOperation.get('http://localhost:3000/FlightList')
    .subscribe((flights) => {

      flights.forEach(element => {

        if (element.FlightCode == this.dataTransferCheckinService.FlightCode) {
          this.flight = element;
          Window["FlightDetailComponent"] = this;
          
        }
      });

    });

  }

  ngOnInit(): void {

  }

  backToSearchFlight(){
    this.router.navigate(['checkin']);
  }
}
