import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { Activity } from '../shared/activity.model';
import { ActivityService } from '../activity.service';
import { UtilService } from '../util.service';

import _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private activities: Activity[];

  private units: string[] = [
    'imperial',
    'metric'
  ];
  private metrics: string[] = [
    'distance',
    'moving_time',
    'elapsed_time',
    'total_elevation_gain',
    'calories',
  ]
  private _units: string = this.units[0];
  private _metric: string = this.metrics[0];
  private _year: number = 2017;
  private selectedActivityTypes: string[] = [];

  activityOptions: Object;
  activityOptions2016: Object;
  activityOptions2017: Object;

  constructor(
    private activityService: ActivityService,
    iconRegistry: MdIconRegistry, sanitizer: DomSanitizer,
    private utilService: UtilService) {
    //necessary for material design icons
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }
  ngOnInit() {
    this.getActivities()
  }
  getActivities() {
    this.activityService.getActivities()
      .then(result => {
        this.activities = result;
        this.selectedActivityTypes = this.activityTypes;
        this.getActivityOptions()
      });
  }

  get year() {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
    this.getActivityOptions();
  }

  get metric() {
    return this._metric;
  }
  set metric(value: string) {
    this._metric = value;
    this.getActivityOptions();
  }

  get years() {
    return _.uniq(_.map(this.activities, activity => activity.startDateLocal.getFullYear()));
  }

  get activityTypes() {
    return _.uniq(_.map(this.activities, activity => activity.type));
  }

  set allActivityTypesSelected(value: boolean) {
    if (value) {
      this.selectedActivityTypes = this.activityTypes;
    }
    else {
      this.selectedActivityTypes = [];
    }
    this.getActivityOptions();
  }

  get allActivityTypesSelected() {
    return this.activityTypes.length === this.selectedActivityTypes.length;
  }
  isActivityTypeSelected(activityType: string) {
    return _.includes(this.selectedActivityTypes, activityType);
  }

  selectActivityType(activityType: string) {
    if (this.isActivityTypeSelected(activityType)) {
      _.pull(this.selectedActivityTypes, activityType);
    }
    else {
      this.selectedActivityTypes.push(activityType);
    }
    this.getActivityOptions();
  }

  /*
    getAllActivityOptions() {
      this.activityOptions2015 = this.getActivityOptions(2015);
      this.activityOptions2016 = this.getActivityOptions(2016);
      this.activityOptions2017 = this.getActivityOptions(2017);
    }
  */
  getActivityOptions() {
    this.activityOptions = {
      title: { text: 'Activities' },
      // xAxis: {
      //   categories: ['Apples', 'Bananas', 'Oranges']
      // },
      yAxis: {
        title: {
          text: 'Elevation gain (f)'
        }
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'April',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      },
      series: [{
        data: this.activityService.getMetricByMonthForYear(this._metric, this._year, this.selectedActivityTypes)
      }]
    };
  }
}
