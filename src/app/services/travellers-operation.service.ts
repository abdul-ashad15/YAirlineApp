import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TravellersOperationService {

constructor(private httpClient:HttpClient) { }
  
  get(){
    return this.httpClient.get('http://localhost:3000/Traveller')
    .pipe(
      map(responseData => {
        const postsArray:any[] = []  ;
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key] });
          }
        }
        console.log(postsArray);
        return postsArray;
      })
    );
  }
  
  getById(id:number){
    return this.httpClient.get('http://localhost:3000/Traveller/'+id)
    .pipe(
      map(responseData => {
        
        return responseData;
      })
    );
  }
  
  delete(){}
  push(travellers){
    return this.httpClient.put('http://localhost:3000/Traveller/'+travellers.id,travellers);
  };
  
  post(travellers){
   var traveller=[{
    "id": 6,
    "EmpFirstName": "Jogendra",
    "EmpSurname": "Gowda",
    "Email": "Jogi_gowda@yahoo.com",
    "ContactNo":"1234509876",
    "Gender": "Male",
    "BirthDate": "1990-06-19T18:30:00.000Z",
    "WhileChair":"true"
  },
  {
    "id": 7,
    "EmpFirstName": "Ajay",
    "EmpSurname": "Devgan",
    "Email": "Ajay_Devgan@yahoo.com",
    "ContactNo":"4567891235",
    "Gender": "Male",
    "BirthDate": "1985-06-19T18:30:00.000Z",
    "WhileChair":"false"
  }];

   return this.httpClient.post<void>('http://localhost:3000/Traveller',travellers);
  }

}
