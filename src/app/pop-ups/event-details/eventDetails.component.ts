import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
// import {EventService} from '../../services/event.service';
import * as vars from "../../config"

@Component({
  selector: 'event-details',
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.scss']

})

export class EventDetailsDialog  {
  apiUrl;
  constructor(public dialogRef: MatDialogRef<EventDetailsDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any){
    this.apiUrl = vars.apiUrl;

  }

  close(){
    this.dialogRef.close();
  }
  delete(){
    // this.eventService.deleteEvent(this.data.token, this.data.event.id).subscribe(res => {
    //   console.log("event was delete form pop-up");
    //   this.dialogRef.close();
    // });
  }
}
