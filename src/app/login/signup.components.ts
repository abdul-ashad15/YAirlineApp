import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from './user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.components.html'
  })


export class SignupComponent
{
    title : string = "Sign Up";
    user : User;

    constructor(private router: Router, public loginservice : LoginService)
    {

    }

    login() : void
    {
        this.router.navigate(['/login']);
    }

    signup(currentuser : User)
    {
        debugger;
        this.loginservice.registerUsers(currentuser).subscribe();
    }
}
