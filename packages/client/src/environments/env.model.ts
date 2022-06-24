export interface Environment {
  production: boolean;
  oauth: {
    clientId: string;
    clientSecret: string;
    scope: string;
  }
}
