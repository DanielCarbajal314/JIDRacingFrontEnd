import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateProductRequest } from '../models/update-product-request.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productFormGroup:FormGroup = new FormGroup({
    name: new FormControl(''),
    model: new FormControl(''),
    brand: new FormControl(''),
    technicalDescription: new FormControl(''),
    aditionalDescription: new FormControl(''),
    price: new FormControl('')
  });

  get title():string{
    return this.data?'Actualizar Producto':'Registrar Producto';
  }

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateProductRequest, private productService:ProductService) {}

  ngOnInit(): void {
    if(this.data){
      this.productFormGroup.get('name').setValue(this.data.name)
      this.productFormGroup.get('model').setValue(this.data.model)
      this.productFormGroup.get('brand').setValue(this.data.brand)
      this.productFormGroup.get('price').setValue(this.data.price)
      this.productFormGroup.get('technicalDescription').setValue(this.data.technicalDescription)
      this.productFormGroup.get('aditionalDescription').setValue(this.data.aditionalDescription)
    }
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    if(this.data){
      this.updateProduct();
    }
    else{
      this.createProduct();
    }
  }
  updateProduct() {
    this.productService.update({...this.productFormGroup.value , id:this.data.id}).subscribe(registeredNewProduct=>{
      this.dialogRef.close(registeredNewProduct);
    })
  }
  createProduct() {
    this.productService.register(this.productFormGroup.value).subscribe(updatedProduct=>{
      this.dialogRef.close(updatedProduct);
    })
  }
}
