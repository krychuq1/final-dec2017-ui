import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../services/event.service';

@Component({
    selector: 'event-create',
    templateUrl: './create-event.html',
    styleUrls: ['./create-event.scss']
})
export class CreateEventComponent {
  eventForm: FormGroup;
  titleController;
  locationController;
  img;
  constructor(private formBuilder: FormBuilder, private eventService: EventService) {
    this.buildForm();
  }
  private buildForm() {
    this.eventForm = this.formBuilder.group( {
      title: this.formBuilder.control(null, [Validators.required, Validators.minLength(5)]),
      location: this.formBuilder.control(null, [Validators.required, Validators.minLength(5)]),
    });
    this.titleController = this.eventForm.get('title');
    this.locationController = this.eventForm.get('location');
  }
  public onUploadFinished(event) {
    console.log('img updated', event);
    this.img = event;
    // this.eventService.saveImage(event).subscribe(res => {
    //   console.log(res);
    // }, err => {
    //   console.log(err);
    // });
  }
  public onRemoved(){
    this.img = null;
  }
}
