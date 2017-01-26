import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-strava-auth',
  templateUrl: './strava-auth.component.html',
  styleUrls: ['./strava-auth.component.css']
})
export class StravaAuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.location.href = 'https://www.strava.com/oauth/authorize?' +
      'client_id=15701' +
      '&response_type=code' +
      '&redirect_uri=http://localhost:4200/token-exchange';
  }

}
