import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../services/event.service';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'event-create',
    templateUrl: './create-event.html',
    styleUrls: ['./create-event.scss']
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  titleController;
  locationController;
  descriptionController;
  organizerController;
  numberOfPlacesController;
  startDateController;
  endDateController;
  cityController;
  NUMBER_PATTERN = /^[0-9]*$/;
  img;

  ngOnInit(): void {
  }
  constructor(private formBuilder: FormBuilder, private eventService: EventService, private userService: UserService) {
    this.buildForm();
  }
  private buildForm() {
    this.eventForm = this.formBuilder.group( {
      title: this.formBuilder.control(null, [Validators.required, Validators.minLength(5)]),
      location: this.formBuilder.control(null, [Validators.required, Validators.minLength(5), Validators.maxLength(400)]),
      description: this.formBuilder.control(null, [Validators.required, Validators.minLength(20)]),
      organizer: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)]),
      city: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)]),
      numberOfPlaces: this.formBuilder.control(null, [Validators.required, Validators.pattern(this.NUMBER_PATTERN)]),
      startDate: this.formBuilder.control(null, [Validators.required]),
      endDate: this.formBuilder.control(null, [Validators.required])

    });
    this.titleController = this.eventForm.get('title');
    this.locationController = this.eventForm.get('location');
    this.descriptionController = this.eventForm.get('description');
    this.organizerController = this.eventForm.get('organizer');
    this.numberOfPlacesController = this.eventForm.get('numberOfPlaces');
    this.startDateController = this.eventForm.get('startDate');
    this.endDateController = this.eventForm.get('endDate');
    this.cityController = this.eventForm.get('city');

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
  public createEvent() {
    const event = {
      title: this.titleController.value,
      address: this.locationController.value,
      online_event: false,
      start_date: this.startDateController.value.toString(),
      end_date: this.endDateController.value.toString(),
      description: this.descriptionController.value,
      number_of_places: this.numberOfPlacesController.value,
      organizer_name: this.organizerController.value,
      city: this.cityController.value
    };
    const  token = this.userService.getLocalUser().token;
    this.eventService.createEvent(token, event).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  public onRemoved() {
    this.img = null;
  }
}
