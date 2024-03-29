import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMainPageComponent } from './components/client/client-main-page/client-main-page.component';
import { ProductMainPageComponent } from './components/product/product-main-page/product-main-page.component';
import { QuoteMainPageComponent } from './components/quote/quote-main-page/quote-main-page.component';


const routes: Routes = [
  { path: '', component: ClientMainPageComponent },
  { path: 'clients', component: ClientMainPageComponent },
  { path: 'products', component: ProductMainPageComponent },
  { path: 'quotes', component: QuoteMainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
