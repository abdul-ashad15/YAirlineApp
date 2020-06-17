import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconRegistry } from "@angular/material/icon";
import { LoginService } from './login.service';
import { User } from './user';

const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login Page';
  username : string = "";
  password : string = "";
  userDetails : User[];
  currentUser: User;
    //loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

  constructor(private router: Router,matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer, public loginService : LoginService,private route: ActivatedRoute
    ) {
      debugger;
      matIconRegistry.addSvgIcon("logo",
        domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
        
        if (this.loginService.currentUserValue) { 
          this.router.navigate(['/']);
      }
     }


  ngOnInit(): void {
    this.loginService.getUsersDetails().subscribe(data =>this.userDetails = data);
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(username : string,password : string) : void
  {
    debugger;
    for (var user of this.userDetails) {
    
    if(this.username == user.username && this.password == user.password)
    {
      this.currentUser = user;
      //this.loginService.getUsersDetailsById(user.id).subscribe(x => this.currentUser = x);
      //this.loginService.currentUser.subscribe(x => this.currentUser = x);
      localStorage.setItem('currentUser', JSON.stringify(user));
      //this.loginService.currentUser.subscribe(x => this.currentUser = x);
      this.router.navigate(['/inflight']);
    }
    }
  }
  register() : void
  {
    this.router.navigate(['/signup']);
  }
}
