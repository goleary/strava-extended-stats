import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-token-exchange',
  templateUrl: './token-exchange.component.html',
  styleUrls: ['./token-exchange.component.css']
})
export class TokenExchangeComponent implements OnInit {
  code: string;
  constructor(route: ActivatedRoute) {
    this.getCodeFromRoute(route)
      .then(code => this.code = code);
  }

  getCodeFromRoute(route: ActivatedRoute) {
    return Promise.resolve(route.snapshot.queryParams['code']);
  }

  ngOnInit() {
  }

}
