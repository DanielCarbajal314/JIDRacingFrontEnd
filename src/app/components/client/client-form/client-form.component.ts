import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateClientRequest } from '../models/update-client-request.model';
import { RegisteredClient } from '../models/registered-client.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientFormGroup:FormGroup = new FormGroup({
    names: new FormControl(''),
    lastNames: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    dni: new FormControl('')
  });

  get title():string{
    return this.data?'Actualizar Cliente':'Registrar Cliente';
  }

  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateClientRequest, private clientService:ClientService) {}

  ngOnInit(): void {
    if(this.data){
      this.clientFormGroup.get('names').setValue(this.data.names)
      this.clientFormGroup.get('lastNames').setValue(this.data.lastNames)
      this.clientFormGroup.get('email').setValue(this.data.email)
      this.clientFormGroup.get('phone').setValue(this.data.phone)
      this.clientFormGroup.get('address').setValue(this.data.address)
      this.clientFormGroup.get('dni').setValue(this.data.dni)
    }
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    if(this.data){
      this.updateClient();
    }
    else{
      this.createClient();
    }
  }
  createClient() {
    this.clientService.registerNewClient(this.clientFormGroup.value).subscribe(newRegisteredClient=>{
      this.dialogRef.close(newRegisteredClient);
    })
  }
  updateClient() {
    this.clientService.updateClient({...this.clientFormGroup.value, id:this.data.id}).subscribe(updatedClient=>{
      this.dialogRef.close(updatedClient);
    })
  }



}
