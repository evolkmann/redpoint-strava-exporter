import { Component, OnInit } from '@angular/core';
import { OAuthService } from './auth/services/oauth.service';

@Component({
  selector: 'rse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly oauth: OAuthService
  ) {
  }

  ngOnInit(): void {
    this.oauth.login().subscribe();
  }

}
