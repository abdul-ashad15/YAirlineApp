import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'travellersFilter'
})
export class TravellersFilterPipe implements PipeTransform {

  //transform(travellers: any[], passport: string, address: string, birthDate: Date): any[] {
    transform(travellers: any[], passport: string, address: string, birthDate: string
      ,chkPassport:boolean ,chkAdress:boolean,chkDateOfBirth:boolean): any[] {


      return travellers.filter((traveller) => {

      return (chkPassport===false || ((traveller.Passport === null ||traveller.Passport === undefined || traveller.Passport=='' ) && chkPassport))
       && (chkAdress===false || ((traveller.Address === null || traveller.Address === undefined || traveller.Address==='' ) && chkAdress))
       && (chkDateOfBirth===false || ((traveller.BirthDate === null || traveller.BirthDate === undefined || traveller.BirthDate==='' ) && chkDateOfBirth))
      
       && (passport==='' ||  (traveller.Passport!=undefined && traveller.Passport.toLowerCase().indexOf(passport.toLowerCase()) !== -1 ))
      && (address == '' || (traveller.Address!=undefined && traveller.Address.toLowerCase().indexOf(address.toLowerCase()) !== -1 ))
       && (birthDate=='' || traveller.BirthDate==birthDate ) 
       
    });
  }
}
