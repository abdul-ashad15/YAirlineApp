import { Injectable } from '@angular/core';
import { FlightList, IFlightList,IOriginDestination, OriginDestination } from '../Models/flight-model.component';
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightOpeationService {

flight: FlightList[]=[];

constructor(private httpClient: HttpClient) { }

getFlight(){

  return this.httpClient.get('http://localhost:3000/FlightList');

 }

 getFlightDetail(){

  return this.httpClient.get('http://localhost:3000/FlightList/1')

 }

  get(url:string){
    return this.httpClient.get(url)
    .pipe(
      map(responseData => {
        const postsArray:any[] = []  ;
        for (const key in responseData) {
          
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key] });
          }
        }
        return postsArray;
      })
    );

   }
 
 

Delete(id:number)
{

return this.httpClient.delete<void>('http://localhost:3000/FlightList/'+id);
   
}


Post()
{

  const destination:IOriginDestination=new OriginDestination()
  destination.Origin='BOM';
  destination.Destination= 'SRT';
  destination.DeptDate= new Date('20/MARCH/2020');
  destination.ArrDate= new Date('20/MARCH/2020');
   


  const objFlight:IFlightList=new FlightList();
  objFlight.id=5;
  objFlight.FlightCode='AI 306';
  objFlight.Flight='Air India';
  objFlight.SeatsAvailable=300;
  objFlight.FareDetails=30000;
  objFlight.OriginDestination=destination;

  return this.httpClient.post<void>('http://localhost:3000/FlightList',objFlight);
   
}


Put()
{

  const destination:IOriginDestination=new OriginDestination()
  destination.Origin='NAV';
  destination.Destination= 'SON';
  destination.DeptDate= new Date('26/MAY/2020');
  destination.ArrDate= new Date('27/MAY/2020');

  const objFlight:IFlightList=new FlightList();
  objFlight.id=1;
  objFlight.FlightCode='AI 306';
  objFlight.SeatsAvailable=300;
  objFlight.FareDetails=30000;
  objFlight.OriginDestination=destination;

return  this.httpClient.put('http://localhost:3000/FlightList/1',objFlight)
  
   
}


}
