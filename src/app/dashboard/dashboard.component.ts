import { Component, OnInit } from '@angular/core';

import { Activity } from '../shared/activity.model';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  activities: Activity[];

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    this.activityService.getActivities().subscribe(result => this.activities = result);
  }
}
