import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../services/event.service';
import {UserService} from '../../services/user.service';
import {AppComponent} from '../../app.component';
import {Router} from "@angular/router";
import {GoogleMap} from '@agm/core/services/google-maps-types';
import {GoogleMapComponent} from '../google-map/google-map.component';
import {WebsiteWatcherService} from '../../services/website-watcher.service';
import {EventModel} from '../../models/event.model';

@Component({
    selector: 'event-create',
    templateUrl: './create-event.html',
    styleUrls: ['./create-event.scss']
})
export class CreateEventComponent implements OnInit {
  //first step form
  eventFormStepOne: FormGroup;
  //second step form
  dateFormStepTwo: FormGroup;
  // third step from
  detailsFormStepThree: FormGroup;
  // four step form
  imageFormStepFour: FormGroup;
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
  //event object
  event;
  img;
  imgError;
  img_url;
  isLinear = false;

  ngOnInit(): void {
  }
  @ViewChild(GoogleMapComponent) maps;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private userService: UserService,
              private appComponent: AppComponent, private router: Router, private websiteWatcherService: WebsiteWatcherService) {
    this.buildForm();
    this.event = {};
  }
  private buildForm() {
    this.eventFormStepOne = this.formBuilder.group( {
      //general form
      title: this.formBuilder.control(null, [Validators.required, Validators.minLength(5)]),
      organizer: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)]),
      city: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)]),
      numberOfPlaces: this.formBuilder.control(null, [Validators.required, Validators.pattern(this.NUMBER_PATTERN)]),
      location: this.formBuilder.control(null, [Validators.required, Validators.minLength(5), Validators.maxLength(400)]),

    });
    this.dateFormStepTwo = this.formBuilder.group({
      startTime: this.formBuilder.control(null, [Validators.required, Validators.pattern(this.TIME_PATTERN)]),
      startDate: this.formBuilder.control(null, [Validators.required]),
      endDate: this.formBuilder.control(null, [Validators.required]),
      endTime: this.formBuilder.control(null, [Validators.required,  Validators.pattern(this.TIME_PATTERN)])
    });
    this.detailsFormStepThree = this.formBuilder.group({
      description: this.formBuilder.control(null, [Validators.required, Validators.minLength(20)]),
      category: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)])
    });
    this.imageFormStepFour =  this.formBuilder.group({});

    //first step form
    this.titleController = this.eventFormStepOne.get('title');
    this.cityController = this.eventFormStepOne.get('city');
    this.organizerController = this.eventFormStepOne.get('organizer');
    this.numberOfPlacesController = this.eventFormStepOne.get('numberOfPlaces');
    this.locationController = this.eventFormStepOne.get('location');
    //second step form
    this.startDateController = this.dateFormStepTwo.get('startDate');
    this.endDateController = this.dateFormStepTwo.get('endDate');
    this.startTimeController = this.dateFormStepTwo.get('startTime');
    this.endTimeController = this.dateFormStepTwo.get('endTime');
    //third step form
    this.categoryController = this.detailsFormStepThree.get('category');
    this.descriptionController = this.detailsFormStepThree.get('description');
  }
  public onUploadFinished(event) {
    console.log('img updated', event);
    this.img = event;
    this.imgError = false;
    this.eventService.saveImage(this.img).subscribe(res => {
      this.img_url = res['imgUrl'];
      console.log('This is image url after image was uploaded and saved: ', this.img_url );
    }, err => {
      this.imgError = 'Image is too big please upload img smaller than 5mb';
      console.log(err);
    });
  }
  public stepOne(){
    console.log("you are going to complete step one");
    this.event['title'] = this.titleController.value;
    this.event['city'] = this.cityController.value;
    this.event['organizer_name'] = this.organizerController.value;
    this.event['number_of_places'] = this.numberOfPlacesController.value;
    this.event['address'] = this.locationController.value;
    console.log('this is event after step one ', this.event);
  }
  public stepTwo(){
    console.log("you are going to complete step two");
    this.event['start_time'] = this.startTimeController.value;
    this.event['start_date'] = this.startDateController.value.toString();
    this.event['end_time'] = this.endTimeController.value;
    this.event['end_date'] = this.endDateController.value.toString();
    console.log('this is event after step two ', this.event);
  }
  public stepThree(){
    console.log("you are going to complete step three");
    console.log('this is event after step two ', this.event);
    this.event['category'] = this.categoryController.value;
    this.event['description'] = this.descriptionController.value;
    console.log('this is event after step three ', this.event);
  }
  public complete(){
    const  token = this.userService.getLocalUser().token;
    this.eventService.createEvent(token, this.event).subscribe(res => {
      console.log('event created ', res);
      //event to store in mongo
      let event = {
        eventId: res['id'],
       // location: this.maps.getLocation()
      };
   //   this.websiteWatcherService.addEventToMongo(event);
      this.appComponent.checkLocalStorage();
      this.router.navigateByUrl('');
    }, err => {
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
        console.log('event created ', res);
        //event to store in mongo
        // let event = {
        //   eventId: res['id'],
        //   location: this.maps.getLocation()
        // };
        //  this.websiteWatcherService.addEventToMongo(event);
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
