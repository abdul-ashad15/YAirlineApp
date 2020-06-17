import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FlightList, Airways, AirportLocation } from '../Models/flight-model.component';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { map, subscribeOn } from 'rxjs/operators';
import { FlightOpeationService } from '../services/flight-opeation.service';
//import { promise } from 'protractor';
//import { resolve } from 'dns';
//import { rejects } from 'assert';
import { Routes, RouterModule } from '@angular/router';
import { DataTransferCheckinService } from '../services/data-transfer-checkin.service';
import { TravellersOperationService } from '../services/travellers-operation.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  departureLocation: string = '';
  departureList: AirportLocation[] = [];
  arrivalLocation: string = '';
  arrivalList: AirportLocation[] = [];
  flight: FlightList[];
  SearchForm: FormGroup;
  FlightDate: string = "01-01-2020";
  //    var d = new Date();
  //  d.setMonth(d.getMonth() - 3);

  today = new Date()

  dd: string = String(this.today.getDate()).padStart(2, '0');
  mm: string = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy: string = String(this.today.getFullYear());
  minDate = this.yyyy + "-" + this.mm + "-" + this.dd;

  constructor(private httpclient: HttpClient, private router: Router, private flightOperation: FlightOpeationService, private dataTransferChecking: DataTransferCheckinService
    , private travellersOperationService: TravellersOperationService
  ) {

  }

  ngOnInit() {

    this.SearchForm = new FormGroup({
      "departure": new FormControl(null, [Validators.required]),
      "arrival": new FormControl(null, [Validators.required]),
      //"arrival": new FormControl(null, [Validators.required,this.SameLocationValidation(this.SearchForm.get('arrival').value,"")]),
      "date": new FormControl(null, Validators.required),
      "travallers": new FormControl(null, Validators.required)
    });


    this.flightOperation.get('http://localhost:3000/Locations')
      .subscribe((flights) => {
        this.departureList.push(...flights);
        //this.arrivalList.push(...flights);
      });
  }
  onDepartureChange() {
    console.log('Departure value changed.');

    const tempArrivalLocation: AirportLocation[] = [];
    tempArrivalLocation.push(...this.departureList);

    tempArrivalLocation.forEach(element => {

      console.log(element.name + " " + this.departureList.indexOf(element));
      if (element.name == this.departureLocation) {
        tempArrivalLocation.splice(tempArrivalLocation.indexOf(element), 1);
      }

    });

    // tempArrivalLocation.splice(1,1);

    this.arrivalList = [];
    this.arrivalList.push(...tempArrivalLocation);

    this.arrivalLocation = "";
    this.SearchForm.get('arrival').reset();
  }

  onSubmit() {

    this.dataTransferChecking.SearchDetail = this.SearchForm.value;
    console.log(this.SearchForm.value);
    this.router.navigate(["/FlightList"]);

  }

  btnSubmit() {
    this.flightOperation.Post();

    //this._flightOperation.Delete(2).subscribe(()=> { console.log('Record deleted');});
    this.flightOperation.Post().subscribe(() => { console.log('Post executed.'); })
    //this._flightOperation.Put().subscribe(()=>{console.log('Put executed.');})

    // this._flightOperation.get().subscribe(flights => {
    //       this.flight= flights;
    //       console.log(this.flight);
    //       return this.flight;
    //     });

    console.log('get operation executed');
  }


  btnReset() {
    console.log(this.SearchForm);
    this.SearchForm.reset();
    console.log(this.SearchForm);
    console.log('Form Reset');

    // this.httpclient.get('http://localhost:3000/FlightList')
    //   .pipe(
    //     map(responseData => {

    //       const postsArray = [];
    //       for (const key in responseData) {
    //         console.log('Testing');
    //         if (responseData.hasOwnProperty(key)) {
    //           postsArray.push({ ...responseData[key], id: key });
    //         }
    //       }
    //       return postsArray;

    //     })
    //   )
    //   .subscribe(flights => {
    //     this.flight = flights;
    //     console.log('This');
    //     console.log(this.flight);
    //   });


    // this.httpclient.get('http://localhost:3000/FlightList')
    //   .pipe(map(responseData => {

    //     return responseData;

    //   }))
    //   .subscribe(flights => {
    //     console.log(flights);


    //   });


    // this.getFlightList().subscribe(countries => {
    //   this.flight = countries as FlightList[];
    // });


  }

  getFlightList(): Observable<FlightList[]> {


    return Observable.create((observer: Subscriber<any>) => {
      observer.next(this.httpclient.get('http://localhost:3000/FlightList'));
      observer.complete();
    });

    this.httpclient.get('http://localhost:3000/FlightList').subscribe(flights => {
      console.log(flights);

    });
  }


  SameLocationValidation(control: FormControl, FirstVal: string, MatchValue: string): ValidatorFn {
    //return new Promise<any>((resolve, rejects) => {
    // if (control.value != MatchValue) {
    return null;// resolve(null);
    // }
    //return resolve(null);
    //});
  }


  LocationMatchValidator(): ValidatorFn {
    

    return (control: AbstractControl): ValidationErrors | null => {
      console.log(control.value);


      if (this.arrivalLocation !== this.departureLocation) {

        return { 'gte': true, 'requiredValue': control.value }
      }
      //console.log('Matched '+control.value+' '+control.value);

      return null;

    }

  }

}
