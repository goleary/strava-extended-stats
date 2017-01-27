export class Activity {
  id: number; //integer;
  resource_state: number;
  external_id: string;
  upload_id: number; //integer;
  athlete: {
    id: string;
    resource_state: number;
  };
  name: string;
  description: string;
  distance: number; //meters
  moving_time: number; //seconds
  elapsed_time: number; //seconds
  total_elevation_gain: number; //meters
  elev_high: number; //meters
  elev_low: number; //meters
  type: string; //activity type, ie. ride, run, swim, etc.
  start_date: string; // string;
  start_date_local: string; // string
  timezone: string;
  start_latlng: number[]; //[latitude, longitude];
  end_latlng: number[]; //[latitude, longitude];
  achievement_count: number; //integer
  kudos_count: number; // integer
  comment_count: number; // integer
  athlete_count: number; // integer number of athletes taking part in this “group activity”. >= 1
  photo_count: number; //integer number of Instagram photos
  total_photo_count: number; //integer total number of photos (Instagram and Strava)
  photos: Object; //photos summary
  map: Object; //detailed representation of the route
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  device_name: string; //the name of the device used to record the activity.
  embed_token: string; //the token used to embed a Strava activity in the form www.strava.com / activities / [activity_id] / embed / [embed_token].
  flagged: boolean;
  workout_type: number; //for runs: 0 -> ‘default’, 1 -> ‘race’, 2 -> ‘long run’, 3 -> ‘workout’; for rides: 10 -> ‘default’, 11 -> ‘race’, 12 -> ‘workout’
  gear_id: string; //corresponds to a bike or pair of shoes included in athlete details
  gear: Object; //gear summary
  average_speed: number; //meters per second
  max_speed: number; //meters per second
  average_cadence: number; //RPM, if provided at upload
  average_temp: number; //degrees Celsius, if provided at upload
  average_watts: number; // rides only
  max_watts: number; //integer rides with power meter data only
  weighted_average_watts: number; // integer rides with power meter data only similar to xPower or Normalized Power
  kilojoules: number; // float rides only uses estimated power if necessary
  device_watts: boolean; //true if the watts are from a power meter, false if estimated
  has_heartrate: boolean;// true if recorded with heartrate 
  average_heartrate: number; // float only if recorded with heartrate average over moving portion
  max_heartrate: number; // integer only if recorded with heartrate
  calories: number; // float kilocalories, uses kilojoules for rides and speed/ pace for runs
  suffer_score: number; //	integer a measure of heartrate intensity, available on premium users’ activities only
  has_kudoed: boolean; //if the authenticated athlete has kudoed this activity
  segment_efforts: Object[]; //array of objects array of summary representations of the segment efforts, segment effort ids must be represented as 64 - bit datatypes
  splits_metric: Object[]; //array of metric split summaries running activities only
  splits_standard: Object[];//array of standard split summaries running activities only
  laps: Object[];//array of lap summaries 
  best_efforts: Object[];//array of best effort summaries running activities only
}