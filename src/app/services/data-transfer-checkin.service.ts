import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferCheckinService {
SearchDetail:any=null;
FlightCode:string=null;
SelectedSeatList:string[]=null;
travellerList:any=null;
  constructor() { }
}
