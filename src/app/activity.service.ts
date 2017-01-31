import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { StravaApiService } from './strava-api.service';
import { Activity } from './shared/activity.model';

@Injectable()
export class ActivityService {
  private storageKeyPrefix = 'activity_';
  _activities: Activity[];
  constructor(
    public storage: Storage,
    private stravaApiService: StravaApiService
  ) {

  }

  set activities(activities: Activity[]) {
    this._activities = activities;
    activities.forEach(a => this.storage.set(this.getActivityStorageKey(a), a))
  }

  getActivities() {
    return this.stravaApiService.getActivities()
      .map(result => <Activity[]>result)
      .do(activities => this.activities = activities);
  }

  getActivityStorageKey(activity: Activity) {
    return this.storageKeyPrefix + activity.id.toString();
  }
}
