import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../services/ticket.service';


@Component({
  selector: 'ticket',
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss']
})
export class TicketComponent implements OnInit {
  tickets;
  eventId;
  constructor(private router: ActivatedRoute, private ticketService: TicketService) {

  }

  ngOnInit(): void {
     this.eventId = this.router.snapshot.params.id;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        this.getTickets(user.token, this.eventId);
    }
  }

  public getTickets(token, eventId) {
    this.ticketService.getTicketsForEvent(token, eventId).subscribe(res => {
      this.tickets = res;
      console.log(this.tickets);
    })
  }


}
