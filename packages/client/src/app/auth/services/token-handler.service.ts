export class TokenHandlerService {

  private static ACCESS_TOKEN_KEY = 'redpoint-strava-exporter-access-token';
  private static ACCESS_TOKEN_EXPIRES_AT_KEY = 'redpoint-strava-exporter-access-token-expires-at';

  static saveAccessToken(token: string, expiresAt: number): void {
    sessionStorage.setItem(TokenHandlerService.ACCESS_TOKEN_KEY, token);
    sessionStorage.setItem(TokenHandlerService.ACCESS_TOKEN_EXPIRES_AT_KEY, `${expiresAt}`);
  }

  static clearAccessToken(): void {
    sessionStorage.removeItem(TokenHandlerService.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(TokenHandlerService.ACCESS_TOKEN_EXPIRES_AT_KEY);
  }

  static getAccessToken(): string | null {
    const expiresAt = sessionStorage.getItem(TokenHandlerService.ACCESS_TOKEN_EXPIRES_AT_KEY) || '0';
    const isExpired = Date.now() > (+expiresAt * 1000);
    if (isExpired) {
      TokenHandlerService.clearAccessToken();
    }

    return sessionStorage.getItem(TokenHandlerService.ACCESS_TOKEN_KEY);
  }

}
