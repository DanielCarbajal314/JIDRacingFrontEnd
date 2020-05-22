import { Component, OnInit, Inject } from '@angular/core';
import { RegisteredQuoteWithDetails } from '../models/registered-quote-with-details.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateClientRequest } from '../../client/models/update-client-request.model';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-quote-display',
  templateUrl: './quote-display.component.html',
  styleUrls: ['./quote-display.component.scss']
})
export class QuoteDisplayComponent implements OnInit {
  quote:RegisteredQuoteWithDetails;

  constructor( 
    public dialogRef: MatDialogRef<QuoteDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private quoteService:QuoteService) { }

  ngOnInit(): void {
    this.quoteService.getDetailsById(this.data).subscribe(quoteData => this.quote = quoteData );
  }

  close(){
    this.dialogRef.close();
  }

}
