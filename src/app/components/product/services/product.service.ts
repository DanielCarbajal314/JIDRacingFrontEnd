import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NewProductRequest } from '../models/new-product-request.model';
import { Observable } from 'rxjs';
import { RegisteredProduct } from '../models/registered-product.model';
import { UpdateProductRequest } from '../models/update-product-request.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL:string = environment.apiEndpoint+'product/';

  constructor(private http:HttpClient) { }

  public register(request:NewProductRequest):Observable<RegisteredProduct>{
    return this.http.post<RegisteredProduct>(this.baseURL+'register',request);
  }
  
  public update(request:UpdateProductRequest):Observable<RegisteredProduct>{
    return this.http.put<RegisteredProduct>(this.baseURL+'update',request);
  }

  public getAll():Observable<RegisteredProduct[]>{
    return this.http.get<RegisteredProduct[]>(this.baseURL+'all');
  }
}
