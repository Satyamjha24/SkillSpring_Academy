import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  isLoggedIn = false;

  constructor(private auth: AuthService, private router : Router, private toast : NgToastService) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
      localStorage.setItem("isLoggedIn", "true");
      if(isAuthenticated){
        this.router.navigate(['/dashboard']);
        this.toast.success({detail:"SUCCESS",summary:'Logged In Successfully',duration:2000, position:'botomCenter'});
      }else{
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }
}
