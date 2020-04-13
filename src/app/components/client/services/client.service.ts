import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment'
import { NewClientRequest } from '../models/new-client-request.model';
import { Observable } from 'rxjs';
import { RegisteredClient } from '../models/registered-client.model';
import { HttpClient } from '@angular/common/http';
import { UpdateClientRequest } from '../models/update-client-request.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseURL:string = environment.apiEndpoint+'client/';

  constructor(private http:HttpClient) { }

  public registerNewClient(newClientRequest:NewClientRequest): Observable<RegisteredClient>{
    return this.http.post<RegisteredClient>(this.baseURL+'register',newClientRequest);
  }

  public updateClient(updateClientRequest:UpdateClientRequest): Observable<RegisteredClient>{
    return this.http.put<RegisteredClient>(this.baseURL+'update',updateClientRequest);
  }

  public getAllClients(): Observable<RegisteredClient[]>{
    return this.http.get<RegisteredClient[]>(this.baseURL+'all');
  }

}
