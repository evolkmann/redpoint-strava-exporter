import { Injectable } from '@angular/core';
import { StravaAthlete } from '@redpoint-strava-exporter/lib';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  athlete?: StravaAthlete;

}
