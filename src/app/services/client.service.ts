import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/Client';

@Injectable()
export class ClientService {
  clientsRef: AngularFireList<any>;
  clients: Observable<any[]>;
  client: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.clientsRef = this.db.list('clients');
    this.clients = this.clientsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  // return all clients.
  getClients() {
    return this.clients;
  }

  // Add a new client.
  newClient(client: Client) {
    this.clientsRef.push(client);
  }

  // return specific client.
  getClient(id: string) {
    this.client = this.db.object(`/clients/${id}`).valueChanges();
    return this.client;
  }
}
