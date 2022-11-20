import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StravaAthlete } from '@redpoint-strava-exporter/lib';
import { Observable } from 'rxjs';
import { StravaApiService } from './strava-api.service';

@Injectable({
  providedIn: 'root'
})
export class AthleteService extends StravaApiService {

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  getAthlete(): Observable<StravaAthlete> {
    const url = StravaApiService.url('/athlete');
    return this.performGetRequest<StravaAthlete>(url);
  }

}
