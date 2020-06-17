import { Component, OnInit } from '@angular/core';
import { TravellersOperationService } from '../services/travellers-operation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-passenger',
  templateUrl: './dashboard-passenger.component.html',
  styleUrls: ['./dashboard-passenger.component.css']
})

export class DashboardPassengerComponent implements OnInit {
  traveller: any = null;
  travellersList: any[] = [];
  passport: string = '';
  address: string = '';
  birthDate: string = '';
  TravellersForm: FormGroup;
  genders: string[] = ["Male", "Female", "Third Gender"];
  today = new Date();
  dd: string = String(this.today.getDate()).padStart(2, '0');
  mm: string = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy: string = String(this.today.getFullYear());

  maxDate = this.yyyy + "-" + this.mm + "-" + this.dd;

  chkPassport:boolean=false;
  chkAdress:boolean=false;
  chkDateOfBirth:boolean=false;

  Editid: number = 0;
  EditFirstName: string = '';
  EditSurname: string = '';
  EditAddress: string = '';
  EditPassport: string = '';
  EditEmail: string = '';
  EditContactNo: string = '';
  EditSeat: string = '';
  EditBirthDate: string = '';
  EditSpecialMeal: boolean = false;
  EditWhileChair: boolean = false;
  EditGender: string = 'Male';
  EditFlightCode: string = '';
  ShowPopup:boolean=false;

  constructor(private travellersOperationService: TravellersOperationService) { }

  ngOnInit(): void {

    this.UpdateTravellersList();

    this.TravellersForm = new FormGroup({
      'FirstName': new FormControl(null, [Validators.required]),
      'Surname': new FormControl(null, Validators.required),
      'Email': new FormControl(null, [Validators.required, Validators.email]),
      'ContactNo': new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.minLength(10)]),
      'Gender': new FormControl('Male'),
      'BirthDate': new FormControl(null, Validators.required),
      'Seat': new FormControl('F1'),
      'FlightCode': new FormControl('F1'),
      "Address": new FormControl(null, [Validators.required, Validators.minLength(25)]),
      "Passport": new FormControl(null, [Validators.required]),
      'WhileChair': new FormControl(false),
      "SpecialMeal": new FormControl(false)
    });
  }

  UpdateTravellersList() {
    this.travellersOperationService.get()
      .subscribe((traveller) => {
        this.travellersList = traveller;
      });

  }

  filterRecord() {
    console.log(this.birthDate);

  }

  onReset() {
    if (this.Editid !== 0) {
      this.onUpdateClick(this.Editid);
    }
  }

  onCancel()
  {
    this.ShowPopup=false;
  }

  onUpdateClick(id: number) {
    console.log(id);
    this.Editid = id;

    this.travellersOperationService.getById(id)
      .subscribe((Edttraveller) => {

        this.EditFirstName = Edttraveller.FirstName;
        this.EditSurname = Edttraveller.Surname;
        this.EditAddress = Edttraveller.Address;
        this.EditPassport = Edttraveller.Passport;
        this.EditEmail = Edttraveller.Email;
        this.EditContactNo = Edttraveller.ContactNo;
        this.EditSeat = Edttraveller.Seat;
        this.EditBirthDate = Edttraveller.BirthDate;
        this.EditSpecialMeal = Edttraveller.SpecialMeal;
        this.EditWhileChair = Edttraveller.WhileChair;
        this.EditGender = Edttraveller.Gender;
        this.EditFlightCode = Edttraveller.FlightCode;
        this.ShowPopup=true;
      });


  }

  ClearUpdateForm()
  {
    this.EditFirstName = '';
    this.EditSurname = '';
    this.EditAddress = '';
    this.EditPassport = '';
    this.EditEmail = '';
    this.EditContactNo ='';
    this.EditSeat = '';
    this.EditBirthDate = '';
    this.EditSpecialMeal = false;
    this.EditWhileChair = false;
    this.EditGender = 'Male';
    this.EditFlightCode = '';
  }

  onSubmit() {
    console.log(this.TravellersForm.value);
    var element = this.TravellersForm.value;

    this.travellersOperationService.push({
      "id": this.Editid,
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
        this.Editid=0;
        this.UpdateTravellersList();
this.ClearUpdateForm();
this.ShowPopup=false;
      });

    
  }
}

export class travelerdetails
{
  
}
