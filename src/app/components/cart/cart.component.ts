import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItem: any;
  total: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItem = JSON.parse(sessionStorage.getItem('cartItem'));
    this.calculateTotal(this.cartItem);
  }
  calculateTotal(cartItem: any) {
    let total = 0;
    cartItem.forEach(element => {
      const price = element.priceValue.replace(',', '');
      total += +(price) * element.quantity
    });
    this.total = total;
  }
  addItem(item) {
    this.cartItem.map(data => {
      if (data.partId === item.partId) {
        data.quantity += 1;
      }
    });
    this.calculateTotal(this.cartItem);
    sessionStorage.setItem('cartItem', JSON.stringify(this.cartItem));
  }
  removeItem(item) {
    this.cartItem.map(data => {
      if (data.partId === item.partId) {
        data.quantity -= 1;
      }
    });
    this.calculateTotal(this.cartItem);
    sessionStorage.setItem('cartItem', JSON.stringify(this.cartItem));
  }
  shipingChange(event) {
    if (event.target.checked) {
      this.total += 50;
    } else {
      this.total -= 50;
    }
  }
}
