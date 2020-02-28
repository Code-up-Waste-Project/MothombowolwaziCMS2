
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-auto',
  templateUrl: './auto.page.html',
  styleUrls: ['./auto.page.scss'],
})
export class AutoPage implements OnInit {
  
  @ViewChild('mapElement', {static: false}) mapNativeElement: ElementRef;


  @ViewChild('autoCompleteInput', {static: false}) inputNativeElement: any;

  directionForm: FormGroup;

  // mark
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  
  constructor(private fb: FormBuilder,
    private geolocation: Geolocation
    
    ) { 
    this.createDirectionForm();
  }

  ngOnInit() {
  }
  createDirectionForm() {
    this.directionForm = this.fb.group({
      // mark
      destination: ['', Validators.required],
      placeName: [''],
    });
  }
  ngAfterViewInit(): void {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });


    // mark
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    const autocomplete = new google.maps.places.Autocomplete(this.inputNativeElement.nativeElement as HTMLInputElement);
    autocomplete.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No details available for input: ' + place.name );
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      let address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    });
      console.log(autocomplete);
      
  }
  
  // mark
  calculateAndDisplayRoute(formValues) {
    console.log('placeName', formValues)
    const that = this;
    this.directionsService.route({

      origin: this.currentLocation,
    
      placeName: formValues.placeName,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
      console.log('origin', origin)
      console.log('placeName', formValues.placeName)
    });
  }
  
}
