import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StravaAthlete } from '@redpoint-strava-exporter/lib';
import { Observable } from 'rxjs';
import { OAuthService } from '../../../auth/services/oauth.service';
import { AthleteService } from '../../../strava/services/athlete.service';

@Component({
  selector: 'rse-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class FooterComponent implements OnInit {

  athlete$?: Observable<StravaAthlete>;

  constructor(
    public readonly oauth: OAuthService,
    public readonly athleteService: AthleteService
  ) { }

  ngOnInit(): void {
    this.athlete$ = this.athleteService.getAthlete();
  }

}
