import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AUTH_CONFIG } from '../auth/auth0-variables';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(public authHttp: AuthHttp) { }

  buy(clientId, productId, amount) {
    return this.authHttp.post(AUTH_CONFIG.apiUrl + '/buy', {client_id: clientId, product_id: productId, amount: amount})
      .map(res => res.json())
  }

  getOrders(clientId) {
    return this.authHttp.get(AUTH_CONFIG.apiUrl + `/ordersByClientId?id=${clientId}`)
      .map(res => res.json())
  }
}
