import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { AgmMap } from  '@agm/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  zoom: number = 16;
  // initial center position for the map
  lat: number;
  lng: number;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
    this.lat = m.lat;
    this.lng = m.lng;
  }

  markers: marker[] = [];
  constructor() {
    // this.agmMap.triggerResize();
  }

  ngOnInit() {
    this.getUserLocation()
  }
  public getUserLocation() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var marker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: 'A',
          draggable: true
        };
        this.markers.push(marker);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
  getLocation(){
    let location = [this.lat, this.lng]
    return location;
  }
}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
