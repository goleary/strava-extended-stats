export class Activity {
  id: integer;
  resource_state: number;
  external_id: string;
  upload_id: integer;
  athlete: {
    id: string;
    resource_state: number;
  };
  name: string;
  description: string;
  distance: float; //meters
  moving_time: integer; //seconds
  elapsed_time: integer; //seconds
  total_elevation_gain: float; //meters
  elev_high: float; //meters
  elev_low: float; //meters
  type: string; //activity type, ie. ride, run, swim, etc.
  start_date: time; // string;
  start_date_local: time; // string
  timezone: string;
  start_latlng: [latitude, longitude]
  end_latlng: [latitude, longitude]
  location_city: string
  DEPRECATED
  location_state: string
  DEPRECATED
  location_country: string
  DEPRECATED
  achievement_count: integer
  kudos_count: integer
  comment_count: integer
  athlete_count: integer 
number of athletes taking part in this “group activity”. >= 1
photo_count: integer
number of Instagram photos
total_photo_count: integer
total number of photos (Instagram and Strava)
photos: object
photos summary
map: object
detailed representation of the route
trainer: boolean
commute: boolean
manual: boolean
private: boolean
device_name: string
the name of the device used to record the activity.
  embed_token:	string
the token used to embed a Strava activity in the form 
www.strava.com / activities / [activity_id] / embed / [embed_token].
  flagged:	boolean
workout_type: integer
for runs: 0 -> ‘default’, 1 -> ‘race’, 2 -> ‘long run’, 3 -> ‘workout’; for rides: 10 -> ‘default’, 11 -> ‘race’, 12 -> ‘workout’
gear_id: string
corresponds to a bike or pair of shoes included in athlete details
gear: object
gear summary
average_speed: float
meters per second
max_speed: float
meters per second
average_cadence: float
RPM, if provided at upload
average_temp: float
degrees Celsius, if provided at upload
average_watts: float rides only
max_watts: integer rides with power meter data only
weighted_average_watts: integer rides with power meter data only 
similar to xPower or Normalized Power
kilojoules: float rides only 
uses estimated power if necessary
device_watts: boolean
true if the watts are from a power meter, false if estimated
has_heartrate: boolean true if recorded with heartrate 
average_heartrate: float only if recorded with heartrate 
average over moving portion
max_heartrate: integer only if recorded with heartrate
calories: float
kilocalories, uses kilojoules for rides and speed/ pace for runs
suffer_score:	integer
a measure of heartrate intensity, available on premium users’ activities only
has_kudoed: boolean
if the authenticated athlete has kudoed this activity
segment_efforts: array of objects 
array of summary representations of the segment efforts, segment effort ids must be represented as 64 - bit datatypes
splits_metric: array of metric split summaries 
running activities only
splits_standard: array of standard split summaries 
running activities only
laps: array of lap summaries 
best_efforts: array of best effort summaries 
running activities only
}