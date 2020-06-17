//import { FlightDetailComponent } from 'src/app/flight-detail/flight-detail.component';

export interface IOriginDestination
{
   Origin: string;
    Destination: string;
    DeptDate: Date;
    ArrDate: Date 
}


export interface IFlightList  {
  id: number;
  FlightCode: string;
  Flight:string;
  SeatsAvailable: number;
  OriginDestination: IOriginDestination;
  FareDetails: number;
}


export class FlightList implements IFlightList  {
  id: number;
  FlightCode: string;
  Flight:string;
  SeatsAvailable: number;
  OriginDestination: IOriginDestination;
  FareDetails: number;
  SelectedSeat:string;
}



export class OriginDestination implements IOriginDestination
{
   Origin: string;
    Destination: string;
    DeptDate: Date;
    ArrDate: Date; 
}

export class AirportLocation 
{
   id:number;
   code:string;
   name:string;
}

export class Airways 
{
   id:number;
   name:string;
}

export class SeatAllocation 
{
   constructor(private id:number,private seat:string,private flightcode:string,private psgId:number){

this.Id=id;
this.Seat=seat;
this.FlightCode=flightcode;
this.PsgId=psgId;
   }
   
   Id:number;
   Seat:string;
   FlightCode:string;
   PsgId:number;
}

export class Passenger 
{
   id:number;
   PassengerName:string;
   Email:string;
   ContactNo:string;
}







