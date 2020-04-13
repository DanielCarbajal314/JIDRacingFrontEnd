import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RegisteredClient } from '../../models/registered-client.model';
import { ClientService } from '../../services/client.service';
import { ClientFormComponent } from '../client-form.component';
import { UpdateClientRequest } from '../../models/update-client-request.model';

@Injectable({
  providedIn: 'root'
})
export class ClientFormService {

  constructor(public dialog: MatDialog, private clientService:ClientService) {}


  public registerNewClient():Observable<RegisteredClient>{
    return new Observable<RegisteredClient>((subscriber)=>{
      const dialogRef = this.dialog.open(ClientFormComponent, {
        width: '50%'
      });
      dialogRef.afterClosed().subscribe(result => {
        subscriber.next(result);
        subscriber.complete();
      });
    });
  }

  
  public updateClient(updateClientRequest:UpdateClientRequest):Observable<RegisteredClient>{
    return new Observable<RegisteredClient>((subscriber)=>{
      const dialogRef = this.dialog.open(ClientFormComponent, {
        width: '80%',
        data: updateClientRequest
      });
      dialogRef.afterClosed().subscribe(result => {
        subscriber.next(result);
        subscriber.complete();
      });
    });
  }



}
