import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import _ from 'lodash';

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
  get activities() {
    return this._activities;
  }

  getActivities() {
    return this.stravaApiService.getActivities()
      .map(result => _.map(result, a => new Activity(a)))
      .do(activities => this.activities = activities);
  }

  getActivityStorageKey(activity: Activity) {
    return this.storageKeyPrefix + activity.id.toString();
  }

  getData(attribute: string, time_period: string, start?: Date, end?: Date) {
    let filtered = _.filter(this.activities, (a: Activity) => {
      if (_.isNil(start) === false && a.startDateLocal < start) {
        return false;
      }
      else if (_.isNil(end) === false && a.startDateLocal > end) {
        return false
      }
      else return true;
    });
    let group = _.groupBy(filtered, (a: Activity) => {
      switch (time_period) {
        case 'day':
          return a.startDateLocal.getDate();
        case 'week':
          break;
        case 'month':
          return a.startDateLocal.getMonth();
      }
    });
    let data = _.map(group, g => _.sumBy(g, attribute));
    return data;
  }

  getElevationByMonth() {
    return this.getData('total_elevation_gain', 'month');
  }
}
