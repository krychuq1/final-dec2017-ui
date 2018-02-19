import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {EventService} from '../../services/event.service';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete.html',
  styleUrls: ['./delete.scss']

})

export class DeleteDialog  {

  constructor(public dialogRef: MatDialogRef<DeleteDialog>,
              private eventService: EventService,
              @Inject(MAT_DIALOG_DATA) public data: any){
  }

  close(){
    this.dialogRef.close();
  }
  delete(){
    this.eventService.deleteEvent(this.data.token, this.data.event.id).subscribe(res => {
      console.log("event was delete form pop-up");
      this.dialogRef.close();
    });
  }
}
