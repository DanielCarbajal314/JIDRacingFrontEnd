import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientFormService } from '../client-form/services/client-form.service';
import { filter} from 'rxjs/operators'
import { ClientTableComponent } from '../client-table/client-table.component';

@Component({
  selector: 'app-client-main-page',
  templateUrl: './client-main-page.component.html',
  styleUrls: ['./client-main-page.component.scss']
})
export class ClientMainPageComponent implements OnInit {
  @ViewChild(ClientTableComponent, {static: true}) productTableComponent: ClientTableComponent;

  constructor(private clienteForm:ClientFormService) { }

  ngOnInit(): void {
  }

  addClient(){
    this.clienteForm.registerNewClient().pipe(filter(value=>value!=null)).subscribe(result=>{
      this.productTableComponent.addClient(result);
    })
  }

}
