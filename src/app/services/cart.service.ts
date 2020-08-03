import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private quantitySource = new BehaviorSubject(0);
  quantity = this.quantitySource.asObservable();

  constructor(private http: HttpClient,) { }

  getCartData() {
    return this.http.get('https://shopping-cart-demo-api.herokuapp.com/products');
  }
  changeQuantity(quantity: number) {
    this.quantitySource.next(quantity)
  }
}
