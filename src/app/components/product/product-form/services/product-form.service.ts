import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RegisteredProduct } from '../../models/registered-product.model';
import { ProductFormComponent } from '../product-form.component';
import { UpdateProductRequest } from '../../models/update-product-request.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {

  constructor(public dialog: MatDialog) {}


  public registerNewProduct():Observable<RegisteredProduct>{
    return new Observable<RegisteredProduct>((subscriber)=>{
      const dialogRef = this.dialog.open(ProductFormComponent, {
        width: '50%'
      });
      dialogRef.afterClosed().subscribe(result => {
        subscriber.next(result);
        subscriber.complete();
      });
    });
  }

  
  public updateProduct(updateProductRequest:UpdateProductRequest):Observable<RegisteredProduct>{
    return new Observable<RegisteredProduct>((subscriber)=>{
      const dialogRef = this.dialog.open(ProductFormComponent, {
        width: '80%',
        data: updateProductRequest
      });
      dialogRef.afterClosed().subscribe(result => {
        subscriber.next(result);
        subscriber.complete();
      });
    });
  }
}
