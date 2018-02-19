import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../services/ticket.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventDetailComponent} from '../event-detail/eventDetail.component';
import {TicketComponent} from '../ticket-component/ticket.component';


@Component({
  selector: 'add-ticket',
  templateUrl: './add-ticket.html',
  styleUrls: ['./add-ticket.scss']
})
export class AddTicketComponent {
  ticketForm: FormGroup;
  priceController;
  typeController;
  currencyController;
  user;
  eventId;
  NUMBER_PATTERN = /^[0-9]*$/;

  constructor(private ticketService: TicketService, private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute, private router: Router,
              ) {
    this.buildForm();
    this.eventId = this.activatedRoute.snapshot.params.id;
    this.user = JSON.parse(localStorage.getItem('user'));

  }
  // private ticketComponent: TicketComponent
  private buildForm() {
    this.ticketForm = this.formBuilder.group( {
      type: this.formBuilder.control(null, [Validators.required, Validators.minLength(3)]),
      currency: this.formBuilder.control(null, [Validators.required, Validators.minLength(3)]),
      price: this.formBuilder.control(null, [Validators.required, Validators.pattern(this.NUMBER_PATTERN)])
    });
    this.priceController = this.ticketForm.get('price');
    this.currencyController = this.ticketForm.get('currency');
    this.typeController = this.ticketForm.get('type');
  }
  public createTicket() {
    const ticket = {
      price : this.priceController.value,
      currency: this.currencyController.value,
      type: this.typeController.value,
      eventId: this.eventId
    };
    this.ticketService.createTicket(this.user.token, ticket).subscribe(res => {
      const url = 'event/tickets/' + this.eventId;
      this.router.navigateByUrl(url);
      console.log(res);

      // this.ticketComponent.getTickets(this.user.token, this.eventId)
    });
  }

}
