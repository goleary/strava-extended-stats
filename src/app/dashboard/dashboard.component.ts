import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { Activity } from '../shared/activity.model';
import { ActivityService } from '../activity.service';

import _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private _activities: Activity[];

  activityOptions: Object;

  constructor(
    private activityService: ActivityService,
    iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    //necessary for material design icons
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }
  ngOnInit() {
    this.getActivities();
  }

  set activities(value) {
    this._activities = value;
    this.setActivityOptions();
  }

  getActivities() {
    this.activityService.getActivities().subscribe(result => this.activities = result);
  }

  setActivityOptions() {
    this.activityOptions = {
      title: { text: 'Activities' },
      // xAxis: {
      //   categories: ['Apples', 'Bananas', 'Oranges']
      // },
      yAxis: {
        title: {
          text: 'Elevation gain (m)'
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
        data: this.activityService.getElevationByMonth()
      }]
    }
    console.log('activityOptions: ', this.activityOptions);
  }
}
