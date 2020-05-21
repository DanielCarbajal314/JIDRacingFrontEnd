import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RegisteredQuote } from '../models/registered-quote.model';
import { NewQuoteRequest } from '../models/new-quote-request.model';
import { RegisteredQuoteWithDetails } from '../models/registered-quote-with-details.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private url:string = environment.apiEndpoint+'quote';

  constructor(private http:HttpClient) { }

  public getAll():Observable<RegisteredQuote[]>{
    return this.http.get<RegisteredQuote[]>(this.url);
  }

  public register(request:NewQuoteRequest):Observable<RegisteredQuote>{
    return this.http.post<RegisteredQuote>(this.url,request);
  }

  public getDetailsById(quoteId:number):Observable<RegisteredQuoteWithDetails>{
    return this.http.get<RegisteredQuoteWithDetails>(`${this.url}/${quoteId}`);
  }

}
