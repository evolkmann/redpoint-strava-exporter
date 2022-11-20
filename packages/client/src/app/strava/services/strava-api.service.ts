import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenHandlerService } from '../../auth/services/token-handler.service';

export abstract class StravaApiService {

  protected static url(path: string): string {
    return new URL(`/api/v3${path}`, `https://www.strava.com`).toString();
  }

  protected constructor(
    protected readonly http: HttpClient
  ) {
  }

  protected performGetRequest<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {
      headers: {
        Authorization: `Bearer ${TokenHandlerService.getAccessToken() || ''}`
      }
    })
  }

}
