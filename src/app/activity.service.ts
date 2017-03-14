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

  getActivities(): Promise<Activity[]> {
    // need to add error handling
    return new Promise((resolve, reject) => this.stravaApiService.getActivities()
      .map(result => _.map(result, a => new Activity(a)))
      .do(activities => this.activities = activities)
      .subscribe(activities => resolve(activities)));
  }

  getActivityStorageKey(activity: Activity) {
    return this.storageKeyPrefix + activity.id.toString();
  }

  getData(attribute: string, time_period: string, start?: Date, end?: Date, activityTypes?: string[]) {
    let filtered = _.filter(this.activities, (a: Activity) => {
      if (!_.isNil(start) && a.startDateLocal < start) {
        return false;
      }
      else if (!_.isNil(end) && a.startDateLocal > end) {
        return false
      }
      if (!_.isNil(activityTypes) && !_.includes(activityTypes, a.type)) {
        return false;
      }
      else return true;
    });
    let group = _.groupBy(filtered, (a: Activity) => {
      switch (time_period) {
        case 'day':
          return a.startDateLocal.getDate();
        case 'week':
          // todo
          break;
        case 'month':
          return a.startDateLocal.getMonth();
      }
    });
    let data = _.map(group, g => _.sumBy(g, attribute));
    return data;
  }

  getMetricByMonthForYear(metric: string, year: number, activityTypes?: string[]) {
    let from = year ? new Date(year, 0, 1) : undefined;
    let to = year ? new Date(year + 1, 0, 1) : undefined;
    return this.getData(metric, 'month', from, to, activityTypes);
  }

  getElevationByMonthForYear(year?: number) {
    let from = year ? new Date(year, 0, 1) : undefined;
    let to = year ? new Date(year + 1, 0, 1) : undefined;
    return this.getData('total_elevation_gain', 'month', from, to);
  }
}
