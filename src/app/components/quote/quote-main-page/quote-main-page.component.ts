import { Component, OnInit, ViewChild } from '@angular/core';
import { QuoteTableComponent } from '../quote-table/quote-table.component';
import { QuoteFormService } from '../quote-form/service/quote-form.service';

@Component({
  selector: 'app-quote-main-page',
  templateUrl: './quote-main-page.component.html',
  styleUrls: ['./quote-main-page.component.scss']
})
export class QuoteMainPageComponent implements OnInit {
  @ViewChild(QuoteTableComponent, {static: true}) productTableComponent: QuoteTableComponent;
  

  constructor( private quoteFormService:QuoteFormService) { }

  ngOnInit(): void {
  }

  addQuote(){

  }

}
