import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit = true;

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
      this.client = client;
    });
  }

  // Handle add client submission.
  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (valid) {
      // Update client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('client updated', { cssClass: 'alert-success', timeout: 5000 });
      this.router.navigateByUrl('/client/' + this.id);
    } else {
      // Redirect back with error message.
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 5000 });
      this.router.navigateByUrl('/edit-client' + this.id);
    }
  }
}
