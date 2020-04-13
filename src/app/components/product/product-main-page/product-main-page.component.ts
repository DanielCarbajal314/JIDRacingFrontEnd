import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductFormService } from '../product-form/services/product-form.service';
import { filter } from 'rxjs/operators';
import { ProductTableComponent } from '../product-table/product-table.component';

@Component({
  selector: 'app-product-main-page',
  templateUrl: './product-main-page.component.html',
  styleUrls: ['./product-main-page.component.scss']
})
export class ProductMainPageComponent implements OnInit {
  @ViewChild(ProductTableComponent, {static: true}) productTableComponent: ProductTableComponent;

  constructor(private productFormService:ProductFormService) { }

  ngOnInit(): void {
  }

  addProduct(){
    this.productFormService.registerNewProduct().pipe(filter(value=>value!=null)).subscribe(newProduct=>{
      this.productTableComponent.addProduct(newProduct)
    })
  }

}
