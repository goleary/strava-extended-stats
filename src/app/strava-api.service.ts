import { Injectable } from '@angular/core';

import { Jsonp, Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

declare var fetch: (...any) => Promise<any>;

@Injectable()
export class StravaApiService {

  client_id: string = '15701';
  baseUrl: string = 'https://www.strava.com/';
  localBaseUrl: string = 'http://localhost:3100/';
  apiPath: Object = {
    activities: "api/v3/athlete/activities",
    auth: 'oath/authorize',
    tokenExchange: "oauth/token"
  }
  localAuthUrl: string = this.localBaseUrl + 'tokenexchange';

  accessToken: Promise<string>;

  constructor(private jsonp: Jsonp, private http: Http) { }

  gotoStravaAuthUrl() {
    window.location.href = 'https://www.strava.com/oauth/authorize?' +
      'client_id=' + this.client_id +
      '&response_type=code' +
      '&redirect_uri=http://localhost:4200/token-exchange';
  }

  getAccessToken(code: string) {
    let data = new URLSearchParams();
    data.append('token', code);
    return this.http.post(this.localAuthUrl, data)
      .map(response => response.json()['access_token'])
      .do(accessToken => this.accessToken = accessToken);
  }

  getApiPath(api: string): Promise<string> {
    if (this.apiPath.hasOwnProperty(api)) {
      return Promise.resolve(this.localBaseUrl + this.apiPath[api]);
    }
    else {
      return Promise.reject('Unkown Strava API path for ' + api);
    }
  }

  getActivities() {
    return this.getApiResponse('activities');
  }

  getApiResponse(api: string) {
    return Promise.all([this.accessToken, this.getApiPath(api)])
      .then(result => this.generateApiCall(result));
  }
  //Takes array with access token first and url path second
  generateApiCall(info: string[]) {
    let url = info[1];
    let data = new URLSearchParams();
    data.append('access_token', info[0]);
    return this.jsonp.get(url, data);
  }


}
