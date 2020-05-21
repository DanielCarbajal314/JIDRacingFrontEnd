import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisteredProduct } from '../models/registered-product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../services/product.service';
import { ProductFormService } from '../product-form/services/product-form.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  productDataSource:MatTableDataSource<RegisteredProduct>;
  displayedColumns=["name","model","brand","technicalDescription","aditionalDescription","price"];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private productService:ProductService, private productFormService:ProductFormService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products=>{
      this.productDataSource = new MatTableDataSource<RegisteredProduct>(products);
      this.productDataSource.paginator = this.paginator;
    });
  }

  update(registeredProduct:RegisteredProduct){
    this.productFormService.updateProduct(registeredProduct).pipe(filter(value=>value!=null)).subscribe(registeredProduct=>{
      const nonEditedData = this.productDataSource.data.filter(x=>x.id!=registeredProduct.id);
      this.productDataSource.data = [registeredProduct, ...nonEditedData].sort((a, b)=>a.id-b.id);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productDataSource.filter = filterValue.trim().toLowerCase();
    if (this.productDataSource.paginator) {
      this.productDataSource.paginator.firstPage();
    }
  }

  public addProduct(product:RegisteredProduct){
    this.productDataSource.data = [ product, ...this.productDataSource.data]
  }
}
