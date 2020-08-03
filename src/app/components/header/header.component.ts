import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent implements OnInit {
  quantity: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.quantity.subscribe(quantity => this.quantity = quantity);
    const quantity = (JSON.parse(localStorage.getItem('cartItem')));
    this.quantity = quantity === null ? 0 : quantity.length;
  }

}
