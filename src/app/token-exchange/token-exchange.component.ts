import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { StravaApiService } from '../strava-api.service';

@Component({
  selector: 'app-token-exchange',
  templateUrl: './token-exchange.component.html',
  styleUrls: ['./token-exchange.component.css']
})
export class TokenExchangeComponent implements OnInit {
  code: string;
  accessToken: Observable<string>;
  activities: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private stravaApiService: StravaApiService
  ) {
  }

  ngOnInit() {
    this.getCodeFromRoute(this.route)
      .then(code => this.code = code)
      .then(() => this.accessToken = this.stravaApiService.getAccessToken(this.code));
  }
  getCodeFromRoute(route: ActivatedRoute) {
    return Promise.resolve(route.snapshot.queryParams['code']);
  }

  getActivities() {
    this.stravaApiService.getActivities().then(result => this.activities = result);
  }

}
