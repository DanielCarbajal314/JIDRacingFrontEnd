import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RegisteredQuote } from '../models/registered-quote.model';
import { QuoteService } from '../services/quote.service';
import { MatPaginator } from '@angular/material/paginator';
import { QuoteFormService } from '../quote-form/service/quote-form.service';

@Component({
  selector: 'app-quote-table',
  templateUrl: './quote-table.component.html',
  styleUrls: ['./quote-table.component.scss']
})
export class QuoteTableComponent implements OnInit {
  quoteDataSource: MatTableDataSource<RegisteredQuote>;
  displayedColumns = ["clientName","date","description","total"];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( private quoteService: QuoteService,private quoteFormService: QuoteFormService) { }

  ngOnInit(): void {
    this.quoteService.getAll().subscribe(quoteArray=>{
      this.quoteDataSource = new MatTableDataSource<RegisteredQuote>(quoteArray);
      this.quoteDataSource.paginator = this.paginator;
    });
  }

  public addQuote(quote:RegisteredQuote){
    this.quoteDataSource.data = [ quote, ...this.quoteDataSource.data]
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.quoteDataSource.filter = filterValue.trim().toLowerCase();
    if (this.quoteDataSource.paginator) {
      this.quoteDataSource.paginator.firstPage();
    }
  }

  showById(quoteId:number){
    this.quoteFormService.showById(quoteId);
  }

}
