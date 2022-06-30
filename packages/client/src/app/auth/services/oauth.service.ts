import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StravaOauthTokenResponse } from '@redpoint-strava-exporter/lib';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AthleteService } from './athlete.service';
import { TokenHandlerService } from './token-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly athleteService: AthleteService
  ) { }

  login(): Observable<null> {
    const token = TokenHandlerService.getAccessToken();
    if (!token) {
      const regexResult = /code=([\w\d]+)/.exec(location.search);
      const code = regexResult?.[1];
      if (code) {
        const formData = new FormData();
        formData.set('grant_type', 'authorization_code');
        formData.set('client_id', environment.oauth.clientId);
        formData.set('client_secret', environment.oauth.clientSecret);
        formData.set('code', code);
        return this.http.post<StravaOauthTokenResponse>('https://www.strava.com/oauth/token', formData).pipe(
          tap(r => {
            TokenHandlerService.saveAccessToken(r.access_token, r.expires_at);
            this.athleteService.athlete = r.athlete;
          }),
          switchMap(_ => this.router.navigate([], {
            queryParams: {
              code: null,
              state: null,
              scope: null
            },
            queryParamsHandling: 'merge'
          })),
          map(_ => null)
        );
      } else {
        TokenHandlerService.clearAccessToken();
        const url = new URL('https://www.strava.com/oauth/authorize');
        url.searchParams.set('response_type', 'code');
        url.searchParams.set('client_id', environment.oauth.clientId);
        url.searchParams.set('scope', environment.oauth.scope);
        url.searchParams.set('redirect_uri', location.origin);
        window.open(url.toString(), '_self');
      }
    }

    return of(null);
  }

  logout(): void {
    TokenHandlerService.clearAccessToken();
    location.reload();
  }

}
