

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
   //autocomplete
   yourBoolean = false; /*viewable by default*/
   autocompleteItems;
   autocomplete;
   that
   placez=[]

   distance = ''
   duration =''

  @ViewChild('mapElement', {static: false}) mapNativeElement: ElementRef;
  @ViewChild('autoCompleteInput', {static: false}) inputNativeElement: any;

  directionForm: FormGroup;

  // mark
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  currentLocation: any = {
    lat: -26.2620432,
    lng: 27.9481053
  };
  
  constructor(private fb: FormBuilder,
    private geolocation: Geolocation
    
    ) { 
     
      
    this.createDirectionForm();
  }

  ngOnInit() {
    this.autocompleteItems = [];
    this.autocomplete = {
      places: ''
    };
  
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      // mark
      destination: ['', Validators.required],
      // placeName: [''],
    });
  }


  // ngAfterViewInit(): void {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     this.currentLocation.lat = resp.coords.latitude;
  //     this.currentLocation.lng = resp.coords.longitude;
  //   });
  //   const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
  //     zoom: 7,
  //     center: {lat: 41.85, lng: -87.65}
  //   });
  //   this.directionsDisplay.setMap(map);
  // }

  ngAfterViewInit(): void {
   
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   this.currentLocation.lat = resp.coords.latitude;
    //   this.currentLocation.lng = resp.coords.longitude;
    // });


    // mark
  
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });

    
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: {lat: -26.2620432, lng: 27.9481053},
      zoom: 15
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
      console.log('thato',place. formatted_address);
      this.calculateAndDisplayRoute(place. formatted_address)
      
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
      marker.setVisible(false);
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
    this.directionsDisplay.setMap(map);
      console.log(autocomplete);
      // this.directionsDisplay.setMap(map);
  }

  // mark
  calculateAndDisplayRoute(address) {
    // console.log('address', address)
    const that = this;
    this.directionsService.route({
  
      origin: this.currentLocation,
      destination: address,
      travelMode: 'DRIVING',
    }, (response, status) => {
      // console.log('status', status)
      if (status === 'OK') {
        this.distance= response.routes[0].legs[0].distance.text,
        this.duration= response.routes[0].legs[0].duration.text,

        that.directionsDisplay.setDirections(response);

        console.log( 'response', response )
      
        
        console.log( 'distance', response.routes[0].legs[0].distance.text)
        console.log( 'duration', response.routes[0].legs[0].duration.text)
        this.placez.push(response)
        console.log( this.placez )
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    this.in_your_method()
  }

callback(response, status) {
    if (status == 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
  
      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
       
          var distance = element.distance.text;
          var duration = element.duration.text;
          var from = origins[i];
          var to = destinations[j];
        }
      }
    }
  }
  in_your_method() {
    this.yourBoolean = true;
}
}
