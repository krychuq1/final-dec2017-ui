import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../services/ticket.service';
import {MatDialog} from '@angular/material';
import {DeleteTicketDialog} from '../../pop-ups/delete-ticket/delete-ticket.component';


@Component({
  selector: 'ticket',
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss']
})
export class TicketComponent implements OnInit {
  tickets;
  eventId;
  constructor(private router: ActivatedRoute,
              private ticketService: TicketService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
     this.eventId = this.router.snapshot.params.id;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        this.getTickets(user.token, this.eventId);
    }
  }
  public deleteTicket(ticket){
    console.log("You are going to delete ticket " ,ticket);
    let dialogRef = this.dialog.open(DeleteTicketDialog, {
      width: 'auto',
      minWidth: '300px',
      data: {ticket: ticket}
    });

  }

  public getTickets(token, eventId) {
    this.ticketService.getTicketsForEvent(token, eventId).subscribe(res => {
      this.tickets = res;
      console.log(this.tickets);
    })
  }


}
