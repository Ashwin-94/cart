import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: LoginComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
