import { Component, OnInit } from '@angular/core';
import { FlightOpeationService } from '../services/flight-opeation.service';
import { FlightList, AirportLocation, Airways } from '../Models/flight-model.component';
import { map, catchError } from 'rxjs/operators';
import { DataTransferCheckinService } from '../services/data-transfer-checkin.service';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css'],
  providers: [DatePipe]
})
export class FlightListComponent implements OnInit {

  fareFilterValue: string = "ALL";
  fareList: string[] = ["ALL", '<= 5000', '>5000 and <=10000', '>10000'];

  airways: string = 'ALL';
  airwaysList: Airways[] = [];
  flightFilteredList: FlightList[] = [];
  flightList: FlightList[] = [];

  constructor(private flightOperation: FlightOpeationService, private dataTransferCheckinService: DataTransferCheckinService,private router:Router,private datePipe:DatePipe) {
console.log("Received Search Details");
console.log(dataTransferCheckinService.SearchDetail);
if(dataTransferCheckinService.SearchDetail==null)
{
  this.router.navigate(["/checkin"]);
}

  
}

  ngOnInit(): void {
    this.flightOperation.get('http://localhost:3000/FlightList')
      .subscribe((flights) => {
        this.flightList = flights;
        //this.flightFilteredList = flights;
        this.AirwaysChange();
      });

    this.flightOperation.get('http://localhost:3000/Airlines')
      .subscribe((flights) => {
        this.airwaysList = [{ id: 0, name: 'ALL' }];
        this.airwaysList.push(...flights);
      });

      
  }

  bookNow(FlightCode:string){
this.dataTransferCheckinService.FlightCode=FlightCode;
this.router.navigate(["/FlightDetail"]);

  }

  AirwaysChange() {
    this.flightFilteredList = this.flightList.filter(flt => //{
      
      (flt.Flight.indexOf(this.airways) !== -1
      || this.airways == "ALL")
      &&
      ((this.fareFilterValue === "ALL")
        || (this.fareFilterValue === '<= 5000' && (flt.FareDetails <= 5000))
        || (this.fareFilterValue === '>5000 and <=10000' && (flt.FareDetails > 5000 && flt.FareDetails <= 10000))
        || (this.fareFilterValue === ">10000" && flt.FareDetails > 10000))
      &&
      (this.datePipe.transform(this.dataTransferCheckinService.SearchDetail.date,"yyyy/MM/dd")===this.datePipe.transform(flt.OriginDestination.DeptDate,"yyyy/MM/dd") &&
      (this.dataTransferCheckinService.SearchDetail.departure===flt.OriginDestination.Origin) &&
      (this.dataTransferCheckinService.SearchDetail.arrival===flt.OriginDestination.Destination) 
      )

    );
    
    
  }

  bookFlight(flightCode) {
    console.log(flightCode);
  }

}
