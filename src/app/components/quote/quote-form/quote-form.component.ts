import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegisteredClient } from '../../client/models/registered-client.model';
import { ClientService } from '../../client/services/client.service';
import { QuoteService } from '../services/quote.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NewQuoteRequestDetail } from '../models/new-quote-request.model';
import { ProductService } from '../../product/services/product.service';
import { RegisteredProduct } from '../../product/models/registered-product.model';
import { QuoteProductDetail } from './models/quote-product-detail.model';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss']
})
export class QuoteFormComponent implements OnInit {
  selectedClientFormControl = new FormControl();
  descriptionFormControl = new FormControl();
  allClients:RegisteredClient[] = [];
  allProducts:RegisteredProduct[] = [];
  selectedClientId:number;
  selectedProducts:QuoteProductDetail[] = [];
  get total(){
    return this.selectedProducts.map(x=>x.subTotal).reduce((a,b)=>a+b,0);
  }

  constructor(
    private clientService:ClientService, 
    private quoteService:QuoteService,
    public dialogRef: MatDialogRef<QuoteFormComponent>,
    private productService:ProductService) { }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(clientArray => this.allClients = clientArray);
    this.productService.getAll().subscribe(productArray => this.allProducts = productArray);
  }

  save(){
    this.quoteService.register({
      clientId: this.selectedClientId,
      description: this.descriptionFormControl.value,
      details: this.getDetails()
    }).subscribe(newRegisteredQuote=>{
      this.dialogRef.close(newRegisteredQuote);
    })
  }

  private getDetails(): NewQuoteRequestDetail[]{
    return this.selectedProducts
      .filter(x=>x.registeredProduct)
      .filter(x=>x.subTotal > 0)
      .map(x=>{
        return{
          productId : x.registeredProduct.id,
          quantity: x.quantity,
          finalPrice: x.finalPrice,
          cost: x.registeredProduct.price
        }
      });
  }

  close(){
    this.dialogRef.close();
  }

  clientName(client: RegisteredClient){
    this.selectedClientId = client.id;
    return `${client.names} ${client.lastNames}`  
  }

  productName(productId:number, product:QuoteProductDetail){
    const productData = this.allProducts.find(x=>x.id === productId);
    product.registeredProduct = productData;
    product.quantity = 1;
    product.margin = 20;
    this.updateProduct(product);
    return productData.name;
  }

  updateProduct(product:QuoteProductDetail){
    product.finalPrice = product.registeredProduct.price * ((100 + product.margin) / 100)
    product.subTotal = product.quantity * product.finalPrice
  }

  addProduct(){
    this.selectedProducts.push({
      registeredProduct : null,
      finalPrice : 0,
      subTotal : 0,
      margin: 0,
      quantity: 0
    });
  }
}
