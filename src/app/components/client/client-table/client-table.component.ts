import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisteredClient } from '../models/registered-client.model';
import { ClientService } from '../services/client.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientFormService } from '../client-form/services/client-form.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {
  clientDataSource:MatTableDataSource<RegisteredClient>;
  displayedColumns=["dni","names","lastNames","email","phone","address"];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private clientService:ClientService, private clientFormService:ClientFormService) { }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(clients=>{
      this.clientDataSource = new MatTableDataSource<RegisteredClient>(clients);
      this.clientDataSource.paginator = this.paginator;
    });
  }

  update(registeredClient:RegisteredClient){
    this.clientFormService.updateClient(registeredClient).pipe(filter(value=>value!=null)).subscribe(registeredClient=>{
      const nonEditedData = this.clientDataSource.data.filter(x=>x.id!=registeredClient.id);
      this.clientDataSource.data = [registeredClient, ...nonEditedData].sort((a, b)=>a.id-b.id);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientDataSource.filter = filterValue.trim().toLowerCase();
    if (this.clientDataSource.paginator) {
      this.clientDataSource.paginator.firstPage();
    }
  }

  public addClient(client:RegisteredClient){
    this.clientDataSource.data = [ client, ...this.clientDataSource.data]
  }

}
