import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[];
  totalOwed: number;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      // console.log(clients);
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  // Calculate total owed money.
  getTotalOwed() {
    let total = 0;
    for (const client of this.clients) {
      total += parseFloat(client.balance);
    }
    this.totalOwed = total;
  }
}
