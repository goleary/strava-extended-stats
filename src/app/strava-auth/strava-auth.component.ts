import { Component, OnInit } from '@angular/core';

import { StravaApiService } from '../strava-api.service';

@Component({
  selector: 'app-strava-auth',
  templateUrl: './strava-auth.component.html',
  styleUrls: ['./strava-auth.component.css']
})
export class StravaAuthComponent implements OnInit {

  constructor(private stravaApiService: StravaApiService) { }

  ngOnInit() {
    this.stravaApiService.gotoStravaAuthUrl();
  }

}
