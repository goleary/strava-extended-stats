import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

declare var fetch: (...any) => Promise<any>;

@Injectable()
export class StravaApiService {

  client_id: string = '15701';
  baseUrl: string = 'https://www.strava.com/';
  localBaseUrl: string = 'http://localhost:3100/';
  localStravaBaseUrl: string = this.localBaseUrl + 'strava/';
  apiPath: Object = {
    activities: "api/v3/athlete/activities",
    auth: 'oath/authorize',
    tokenExchange: "oauth/token"
  }
  localAuthUrl: string = this.localBaseUrl + 'tokenexchange';

  //private _accessToken: string = null;
  // creates unresolved Promise
  private _accessToken: string = null;
  private accessTokenStorageKey: string = 'access_token';

  constructor(
    private http: Http,
    public storage: Storage) {

  }

  init() {
    this.storage.get(this.accessTokenStorageKey).then(result => {
      if (result) {
        this._accessToken = result;
      } else {
        this.gotoStravaAuthUrl();
      }
    });;
  }

  loggedIn() {
    return this._accessToken != null;
  }

  //initiates strava authenticatio workflow
  gotoStravaAuthUrl() {
    window.location.href = 'https://www.strava.com/oauth/authorize?' +
      'client_id=' + this.client_id +
      '&response_type=code' +
      '&redirect_uri=http://localhost:4200/token-exchange';
    return Promise.resolve('never hit');
  }

  getAaccessToken() {
    return this._accessToken;
  }

  private set accessToken(accessToken: string) {
    this._accessToken = accessToken;
    this.storage.set(this.accessTokenStorageKey, accessToken);
  }

  private getAccessToken() {
    if (this._accessToken) {
      return Promise.resolve(this._accessToken);
    }
    else {
      this.gotoStravaAuthUrl();
      return Promise.reject('not logged in');
    }
  }
  // to be called when strava authentication redirects back to app
  exchangeToken(code: string) {
    console.log('exchange code: ', code, ' for token');
    let data = new URLSearchParams();
    data.append('token', code);
    return new Promise((resolve, reject) => {
      this.http.post(this.localAuthUrl, data)
        .map(response => response.json()['access_token'])
        .subscribe(accessToken => {
          console.log('setting accesssToken : ', accessToken)
          this._accessToken = accessToken;
          resolve();
        })
    });
  }


  // below this could use continued refactoring

  getApiPath(api: string): Promise<string> {
    if (this.apiPath.hasOwnProperty(api)) {
      return Promise.resolve(this.localStravaBaseUrl + this.apiPath[api]);
    }
    else {
      return Promise.reject('Unkown Strava API path for ' + api);
    }
  }

  getActivities(before?: number, after?: number) {
    return this.getApiResponse('activities').map((response: any) => response.json());
  }

  getApiResponse(api: string) {
    return Observable.forkJoin([this.getAccessToken(), this.getApiPath(api)])
      .mergeMap(result => this.generateApiCall(result));
  }
  //Takes array with access token first and url path second
  generateApiCall(info: string[]) {
    let date = new Date('1-1-2017');
    let url = info[1] + '?access_token=' + info[0]
      //+ '&after=' + date.getTime().toString()
      + '&per_page=200';
    return this.http.get(url);
  }


}
