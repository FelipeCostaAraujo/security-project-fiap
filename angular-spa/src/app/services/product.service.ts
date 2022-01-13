import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AUTH_CONFIG } from '../auth/auth0-variables';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(public authHttp: AuthHttp) { }

  getAllProducts() {
    return this.authHttp.get(AUTH_CONFIG.apiUrl + '/products')
      .map(res => res.json())
  }

}
