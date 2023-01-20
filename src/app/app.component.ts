import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BonjourPolice_Application';
  profile: any;
  name: any;

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.profile = localStorage.getItem('prof_id');
    this.name = localStorage.getItem('user_heb_designation');
    console.log(this.profile);
    
  }

  onLogout() {
    this.authService.logout();
  }
  
  
}
 

