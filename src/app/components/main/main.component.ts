import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  cartData: any;
  cartItem: any;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItem = [];
    this.loadCartData();
  }
  loadCartData() {
    const cartItem = JSON.parse(localStorage.getItem('cartItem'));
    this.cartItem = cartItem === null ? [] : cartItem;
    this.cartService.getCartData().subscribe((response) => {
      this.cartData = JSON.parse(JSON.stringify(response));
      this.cartData.map(data => {
        const item = _.findWhere(this.cartItem, { partId: data.partId })
        data['quantity'] = item === undefined ? 0 : item.quantity;
      })
    });
  }
  addItemToCart(itemSelected) {
    if (this.cartItem.length > 0) {
      const existing = (_.findWhere(this.cartItem, { partId: itemSelected.partId }) !== undefined);
      if (existing) {
        this.cartItem.map(element => {
          if (element.partId === itemSelected.partId) {
            element.quantity += 1
          }
        });
      } else {
        itemSelected.quantity = 1;
        this.cartItem.push(itemSelected);
      }
    } else {
      itemSelected.quantity = 1;
      this.cartItem.push(itemSelected);
    }
    this.cartService.changeQuantity(this.cartItem.length);
    localStorage.setItem('cartItem', JSON.stringify(this.cartItem));
  }
}
