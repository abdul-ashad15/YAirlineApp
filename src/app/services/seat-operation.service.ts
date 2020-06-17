import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeatOperationService {

  constructor(private httpClient:HttpClient) {

   }

   get(){}
   delete(){}
   push(){};
   post(){
    var ral={
    "id":6,
    "Seat":"L1",
    "FlightCode":"6E 2977",
    "TravellerId":"6"};
    return this.httpClient.post<void>('http://localhost:3000/Seat',ral);
   };
}
