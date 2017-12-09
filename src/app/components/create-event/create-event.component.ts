import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../services/event.service';
import {UserService} from '../../services/user.service';
import {AppComponent} from '../../app.component';
import {Router} from "@angular/router";

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
  TIME_PATTERN = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  startTimeController;
  endTimeController;
  categoryController;
  img;
  imgError;
  img_url;

  ngOnInit(): void {
  }
  constructor(private formBuilder: FormBuilder, private eventService: EventService, private userService: UserService,
              private appComponent: AppComponent, private router: Router) {
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
      endDate: this.formBuilder.control(null, [Validators.required]),
      startTime: this.formBuilder.control(null, [Validators.required, Validators.pattern(this.TIME_PATTERN)]),
      category: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)]),
      endTime: this.formBuilder.control(null, [Validators.required,  Validators.pattern(this.TIME_PATTERN)])

    });
    this.titleController = this.eventForm.get('title');
    this.locationController = this.eventForm.get('location');
    this.descriptionController = this.eventForm.get('description');
    this.organizerController = this.eventForm.get('organizer');
    this.numberOfPlacesController = this.eventForm.get('numberOfPlaces');
    this.startDateController = this.eventForm.get('startDate');
    this.endDateController = this.eventForm.get('endDate');
    this.cityController = this.eventForm.get('city');
    this.startTimeController = this.eventForm.get('startTime');
    this.endTimeController = this.eventForm.get('endTime');
    this.categoryController = this.eventForm.get('category');

  }
  public onUploadFinished(event) {
    console.log('img updated', event);
    this.img = event;
    this.imgError = false;
    this.eventService.saveImage(this.img).subscribe(res => {
      this.img_url = res['imgUrl'];
      console.log(this.img_url );
    }, err => {
      this.imgError = 'Image is too big please upload img smaller than 5mb';
      console.log(err);
    });
  }
  public createEvent() {
    if (this.img) {
      const event = {
        title: this.titleController.value,
        address: this.locationController.value,
        online_event: false,
        start_date: this.startDateController.value.toString(),
        end_date: this.endDateController.value.toString(),
        description: this.descriptionController.value,
        number_of_places: this.numberOfPlacesController.value,
        organizer_name: this.organizerController.value,
        city: this.cityController.value,
        start_time: this.startTimeController.value,
        end_time: this.endTimeController.value,
        category: this.categoryController.value,
        image: this.img_url

      };
      const  token = this.userService.getLocalUser().token;
      this.eventService.createEvent(token, event).subscribe(res => {
        console.log(res);
        this.appComponent.checkLocalStorage();
        this.router.navigateByUrl('');
      }, err => {
        console.log(err);
      });
    }else {
        this.imgError = 'Please upload image';
    }

  }
  public onRemoved() {
    this.img = null;
    this.imgError = ''
  }
}
