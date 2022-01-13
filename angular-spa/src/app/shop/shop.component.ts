import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service'
import { OrderService } from '../services/order.service'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Array<any>;
  amount: number;
  error: string;

  constructor(public auth: AuthService, public productService: ProductService, public orderService: OrderService) { }

  ngOnInit() {
    this.productService.getAllProducts()
      .subscribe(
      data => this.products = data,
      error => this.error = error.statusText
    );
  }

  buy(productId : string, amount: number){
    this.orderService.buy(this.auth.auth0.baseOptions.clientID, productId, amount)
      .subscribe(
      data => {
        if(data.status === 200){
          alert('Pedido efetuado com sucesso!');
        }else{
          alert('Algo deu errado, tente novamente mais tarde! :/');
        }
      },
      error => this.error = error.statusText
    );
  }
}
