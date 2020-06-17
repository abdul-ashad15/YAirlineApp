import { Component, OnInit, OnChanges, AfterContentInit, AfterViewChecked, AfterContentChecked, AfterViewInit, Input } from '@angular/core';
import { FlightList, IOriginDestination, OriginDestination, SeatAllocation } from '../Models/flight-model.component';
import { FlightOpeationService } from '../services/flight-opeation.service';
import { DataTransferCheckinService } from '../services/data-transfer-checkin.service';
import { Router } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';
import { TravellersOperationService } from '../services/travellers-operation.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})

export class FlightDetailComponent implements OnInit {
  flight: FlightList;
  TotalTravellers: number = 0;
  selectedSeatList: string[] = [];

  seatAllocation: SeatAllocation[] = [];
  rowList: string = '';
  @Input() selectedSeat: string = '';
  selectedElement: any = null;


  constructor(private flightOperation: FlightOpeationService, private dataTransferCheckinService: DataTransferCheckinService, private router: Router,private travellersOperationService:TravellersOperationService) {
    
    if (dataTransferCheckinService.FlightCode == null) {
      this.router.navigate(["/checkin"]);
    }
    
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

    this.addSeatAllocation();
  }



  addSeatAllocation() {
    console.log('test1');
  
    this.travellersOperationService.get()
        .subscribe((travellerList) => {
          console.log('test');

    for (let i = 1, j = 1; i <= 30; i++) {

      var a1 = new SeatAllocation(j++, "A" + i, this.dataTransferCheckinService.FlightCode, 0);
      var b1 = new SeatAllocation(j++, "B" + i, this.dataTransferCheckinService.FlightCode, 0);
      var c1 = new SeatAllocation(j++, "C" + i, this.dataTransferCheckinService.FlightCode, 0);
      var d1 = new SeatAllocation(j++, "D" + i, this.dataTransferCheckinService.FlightCode, 0);
      var e1 = new SeatAllocation(j++, "E" + i, this.dataTransferCheckinService.FlightCode, 0);
      var f1 = new SeatAllocation(j++, "F" + i, this.dataTransferCheckinService.FlightCode, 0);

      travellerList.forEach(element => {
        
        if(element.FlightCode==this.dataTransferCheckinService.FlightCode){

        if(element.Seat=='A'+i)
        {
          a1.PsgId=element.id;
        }

        if(element.Seat=='B'+i)
        {
          b1.PsgId=element.id;
        }

        if(element.Seat=='C'+i)
        {
          c1.PsgId=element.id;
        }

        if(element.Seat=='D'+i)
        {
          d1.PsgId=element.id;
        }

        if(element.Seat=='E'+i)
        {
          e1.PsgId=element.id;
        }

        if(element.Seat=='F'+i)
        {
          f1.PsgId=element.id;
        }
      }
        
      });

      this.seatAllocation.push(a1, b1, c1, d1, e1, f1);
    }

    this.rowList = "";

    for (let i = 0; i < this.seatAllocation.length; i++) {

      let colour: string = "green";
      if (this.seatAllocation[i].PsgId > 0) {
        colour = "red";
      }

      if (i == 0) {
        this.rowList += "<tr>"
      }

      if ((i % 6 == 0 && i != this.seatAllocation.length - 1 && i != 0)) {
        this.rowList += "</tr><tr>";
      }
      if (i % 6 == 0 && i == this.seatAllocation.length - 1) {
        this.rowList += "</tr>";
      }

      if (i != 0 && i % 3 == 0 && i % 6 != 0) {
        this.rowList += "<td></td>";
      }
      this.rowList += "<td>";
      if (this.seatAllocation[i].PsgId == 0) {
        this.rowList += "<a onclick='Window.FlightDetailComponent.clickevent(this)' >";
      }
      this.rowList += "<i class='fas fa-chair ' style='color:" + colour + ";'></i>" +
        "<font style='font-size:12;color:" + colour + "'>" + this.seatAllocation[i].Seat + "</font>";
      if (i != 0 && i % 3 == 0 && i % 6 != 0) {
        this.rowList += "</a>";
      }
      this.rowList += "</td>";
    }
  });

  }

  clickevent(element){

    let lnt= 0;
    let selectedSeat: string = "";

    if (this.selectedSeatList.indexOf(element.text) !== -1) {


         element.innerHTML = 
        "<i class='fas fa-chair ' style='color:green;'></i>" +
        "<font style='font-size:12;color:green'>" + element.text + "</font>" ;

      console.log(this.selectedSeatList);
      this.selectedSeatList.splice(this.selectedSeatList.indexOf(element.text), 1);
      console.log(this.selectedSeatList);
      lnt=1;
    }
    else if (this.selectedSeatList.length >= this.dataTransferCheckinService.SearchDetail.travallers) {

alert('Selected seats can\'t be more than travellers.');
    }
    else {

      this.selectedSeatList.push(element.text);
      element.innerHTML = "<i class='fas fa-chair ' style='color:blue;'></i>" +
        "<font style='font-size:12;color:blue'>" + element.text + "</font>" ;

      
     
    }
    this.selectedSeatList.forEach(element => {
      if (selectedSeat != "") {
        selectedSeat = selectedSeat + ",";
      }
      selectedSeat = selectedSeat + element;

    });

    document.getElementById("divSeat").innerText = selectedSeat;

  }

  counter(i: number) {
    return new Array(i);
  }

  AddTraveller() {


    if (this.selectedSeatList.length< this.dataTransferCheckinService.SearchDetail.travallers) {
      alert('Please select '+this.dataTransferCheckinService.SearchDetail.travallers+' seats.');
    }
    else{
      this.dataTransferCheckinService.SelectedSeatList = this.selectedSeatList;
      this.router.navigate(["/TravellerList"]);
    }
  }




}
