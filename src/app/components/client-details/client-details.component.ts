import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from URL.
    this.id = this.route.snapshot.params['id'];

    // Get client from service.
    this.clientService.getClient(this.id).subscribe(client => {
      if (client.balance > 0 ) {
        this.hasBalance = true;
      }
      this.client = client;
      // console.log(this.client);
    });
  }

  // Update balance.
  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Client updated', { cssClass: 'alert-success', timeout: 5000 });
    this.showBalanceUpdateInput = false;
    this.router.navigateByUrl('/client/' + this.id);
  }

  // Delete Client.
  onDeleteClick() {
    if (confirm('Are you sure ?')) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client Deleted', { cssClass: 'alert-success', timeout: 5000 });
      this.router.navigateByUrl('/');
    }
  }
}
