import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ActivityService } from '../activity.service';
import { StravaApiService } from '../strava-api.service';

@Component({
  selector: 'app-token-exchange',
  templateUrl: './token-exchange.component.html',
  styleUrls: ['./token-exchange.component.css']
})
export class TokenExchangeComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stravaApiService: StravaApiService
  ) {
  }

  ngOnInit() {
    this.getCodeFromRoute(this.route)
      .then(code => this.stravaApiService.exchangeToken(code))
      .then(() =>this.gotoDashboard());
  }
  getCodeFromRoute(route: ActivatedRoute) {
    return Promise.resolve(route.snapshot.queryParams['code']);
  }

  gotoDashboard() {
    this.router.navigate(['dashboard']);
  }

}
