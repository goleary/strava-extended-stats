import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { StravaApiService } from './strava-api.service';
import { Activity } from './shared/activity.model';

@Injectable()
export class ActivityService {
  _activities: Activity[];
  constructor(
    public storage: Storage,
    private stravaApiService: StravaApiService
  ) {

  }

  set activities(activities: Activity[]) {
    this._activities = activities;
    activities.forEach(a => this.storage.set(a.id.toString(), a))
  }

  getActivities() {
    return this.stravaApiService.getActivities()
      .do(result => this.activities = result);
  }
}
