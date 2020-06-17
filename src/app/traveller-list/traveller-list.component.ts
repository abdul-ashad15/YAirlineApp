import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
//import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { DataTransferCheckinService } from '../services/data-transfer-checkin.service';
import { Router } from '@angular/router';
//import { format } from 'path';
import { FlightOpeationService } from '../services/flight-opeation.service';
import { SeatOperationService } from '../services/seat-operation.service';
import { TravellersOperationService } from '../services/travellers-operation.service';


@Component({
  selector: 'app-traveller-list',
  templateUrl: './traveller-list.component.html',
  styleUrls: ['./traveller-list.component.css']
})
export class TravellerListComponent implements OnInit {

  currentYear = new Date().getFullYear();
  minDate = new Date(this.currentYear - 20, 0, 1);

  TotalTravellers: number = 0;
  TravellersForm: FormGroup;
  genders: string[] = ["Male", "Female", "Third Gender"];

  today = new Date();
  dd: string = String(this.today.getDate()).padStart(2, '0');
  mm: string = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy: string = String(this.today.getFullYear());

  maxDate = this.yyyy + "-" + this.mm + "-" + this.dd;

  SelectedSeatList: string[] = [];

  constructor(private dataTransferCheckinService: DataTransferCheckinService
    , private router: Router
    , private travellersOperationService: TravellersOperationService
    , private seatOperationService: SeatOperationService
    , private flightOpeationService: FlightOpeationService) {

    if (dataTransferCheckinService.SearchDetail == null) {
      this.router.navigate(["/checkin"]);
    }

    this.TotalTravellers = dataTransferCheckinService.SearchDetail.travallers;
    this.SelectedSeatList = dataTransferCheckinService.SelectedSeatList;
  }
  ngOnInit(): void {
    this.TravellersForm = new FormGroup({ "TravellersList": new FormArray([]) });
    this.addTraveller();
  }

  addTraveller() {
    for (let i = 0; i < this.TotalTravellers; i++) {
      const traveller = new FormGroup({
        'FirstName': new FormControl(null, [Validators.required]),
        'Surname': new FormControl(null, Validators.required),
        'Email': new FormControl(null, [Validators.required, Validators.email]),
        'ContactNo': new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.minLength(10)]),
        'Gender': new FormControl('Male'),
        'BirthDate': new FormControl(null, Validators.required),
        'Seat': new FormControl(this.dataTransferCheckinService.SelectedSeatList[i]),
        'FlightCode': new FormControl(this.dataTransferCheckinService.FlightCode),
        "Address": new FormControl(null,[Validators.required,Validators.minLength(25)]),
        "Passport": new FormControl(null,[Validators.required]),
        'WhileChair': new FormControl(false),
        "SpecialMeal": new FormControl(false)
      });

      (<FormArray>this.TravellersForm.get('TravellersList')).push(traveller);
    }
  }

  onSubmit() {
    console.log("Form Details");
    console.log(this.TravellersForm.get('TravellersList').value);


    var maxId: number = 0;

    const travellerlist = this.TravellersForm.get('TravellersList').value;
    console.log("maxId " + maxId);

    this.travellersOperationService.get()
      .subscribe((traveller) => {

        maxId = Math.max(...traveller.map(o => o.id));
        console.log("maxId " + maxId);
        for (let i = 0; i < travellerlist.length; i++) {
          travellerlist[i].id = maxId + i + 1;
          console.log("maxId+i+1" + travellerlist[i].id);
        }

      });
    var Index = 1;
    travellerlist.forEach((element, maxVal = maxId + 1) => {

      this.travellersOperationService.post({
        "id": element.id,
        "FirstName": element.FirstName,
        "Surname": element.Surname,
        "Email": element.Email,
        "ContactNo": element.ContactNo,
        "Gender": element.Gender,
        "BirthDate": element.BirthDate,
        "WhileChair": element.WhileChair,
        "Seat": element.Seat,
        "FlightCode": element.FlightCode,
        "Address": element.Address,
        "Passport": element.Passport,
        "SpecialMeal": element.SpecialMeal,
      })
        .subscribe(() => {
          console.log('Record inserted.');
          
        });

      maxVal += 1;
      Index += 1;
    });

    this.dataTransferCheckinService.travellerList = travellerlist;
    console.log('Navigate to flight ticket.');
    this.router.navigate(['FlightTicket']);

  }
}
