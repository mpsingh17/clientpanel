import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd = true;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private  router: Router,
    private clientService: ClientService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  // Handle add client submission.
  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (valid) {
      // Add new client
      this.clientService.newClient(value);
      this.flashMessagesService.show('New client added', { cssClass: 'alert-success', timeout: 5000 });
      this.router.navigateByUrl('/');
    } else {
      // Redirect back with error message.
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 5000 });
      this.router.navigateByUrl('/add-client');
    }
  }
}
