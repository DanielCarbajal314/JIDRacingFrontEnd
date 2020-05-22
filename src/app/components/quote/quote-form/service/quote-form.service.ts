import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RegisteredQuote } from '../../models/registered-quote.model';
import { QuoteFormComponent } from '../quote-form.component';
import { QuoteDisplayComponent } from '../../quote-display/quote-display.component';

@Injectable({
  providedIn: 'root'
})
export class QuoteFormService {

  constructor(public dialog: MatDialog) { }

  public registerNewQuote():Observable<RegisteredQuote>{
    return new Observable<RegisteredQuote>((subscriber)=>{
      const dialogRef = this.dialog.open(QuoteFormComponent, {
        width: '80%'
      });
      dialogRef.afterClosed().subscribe(result => {
        subscriber.next(result);
        subscriber.complete();
      });
    });
  }

  public showById(quoteId:number){
    const dialogRef = this.dialog.open(QuoteDisplayComponent, {
      data:quoteId,
      width: '80%'
    });
  }
}
