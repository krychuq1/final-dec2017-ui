import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Injectable} from "@angular/core";

@Injectable()
export class TicketService {
  url = 'http://localhost:7777/tickets/';
  constructor(private http: HttpClient) {}

  getTicketsForEvent(token: string, eventId: number) {
    const header = new HttpHeaders().set('x-access-token', token);
    const url = this.url + eventId;
    return this.http.get(url, {headers: header})
  }
  createTicket(token: string, ticket) {
    const header = new HttpHeaders().set('x-access-token', token);
    return this.http.post(this.url, ticket, {headers: header})

  }

}
