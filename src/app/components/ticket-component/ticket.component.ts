import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'ticket',
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss']
})
export class TicketComponent implements OnInit {
  constructor(private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    const eventId = this.router.snapshot.params.id;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {

    }
  }

  private getTickets(){

  }


}
