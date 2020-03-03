// import { Component, OnInit,ViewChild,ElementRef ,Renderer2, NgZone} from '@angular/core';

import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,NgZone} from '@angular/core';





declare var google : any;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {

  //autocomplete
  autocompleteItems;
  autocomplete;


  @ViewChild("places",{static: false})
  public places: ElementRef;
  search: string;
  marker: any
  

  autocom : any
  autoCompSearch = document.getElementsByClassName('search');
  latitude: number = 0;
  longitude: number = 0;
  geo: any
  
  service = new google.maps.places.AutocompleteService();
 map: any;
  start = 'ahmedabad, in';
  end = 'vadala, in';

  address;
  @ViewChild("search" ,{static:false})
  public searchElementRef;
  public searchControl: FormControl;

  @ViewChild('autoCompleteInput', {static: false}) inputNativeElement: any;
  @ViewChild('mapElement', {static:false}) mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  currentLocation: any = {
    lat: -26.260997,
    lng: 27.950293
  };
  constructor(private fb: FormBuilder, private geolocation: Geolocation,private zone: NgZone) {
    this.createDirectionForm();

    this.address = {
      place: ''
    };



 

  }

  ngOnInit() {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  
    this.autoComplete()
  }


  autoComplete(){
    console.log('loc in');
    // this.autocom = new google.maps.places.Autocomplete(this.autoCompSearch[0], { types: ['geocode'] });
    // this.autocom.addListener('place_changed', () => {
    //   let place = this.autocom.getPlace();
    //   console.log('place',place);
      // this.tournamentObj.address.address = place.formatted_address
      // this.tournamentObj.address.placeID = place.place_id;
      // this.placeID =  place.place_id;
      // this.MyData.address = place.formatted_address;
      // this.MyData.placeId = place.place_id
      // console.log('form',place.formatted_address);
      
      // this.searchResults.push(place)
    // })  
    
    
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      destination: ['', Validators.required],
      // placeName: [''],
    });
  }


 
  ngAfterViewInit(): void {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });

    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {

     
      zoom: 14,
      center: {lat: -26.260997, lng: 27.950293}
    });
    this.directionsDisplay.setMap(map);
    console.log('directins',this.directionsDisplay.setMap(map))
    console.log('map', map)




  }

  calculateAndDisplayRoute(formValues) {
    console.log('destination', formValues)
    const that = this;
    this.directionsService.route({

      origin: this.currentLocation,
    
      destination: formValues.destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
      console.log('origin', origin)
      console.log('destination', formValues.destination)
    });
  }

  addMarker(){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });

}




  chooseItem(item: any) {
    // this.viewCtrl.dismiss(item);
    this.geo = item;
    this.geoCode(this.geo);//convert Address to lat and long
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
     this.autocompleteItems = [];
     return;
    }

    let me = this;
    this.service.getPlacePredictions({
    input: this.autocomplete.query,
    componentRestrictions: {
      country: 'de'
    }
   }, (predictions, status) => {
     me.autocompleteItems = [];

   me.zone.run(() => {
     if (predictions != null) {
        predictions.forEach((prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
       }
     });
   });
  }

//convert Address string to lat and long
geoCode(address:any) {
   // mark
  //  this.geolocation.getCurrentPosition().then((resp) => {
  //   this.currentLocation.lat = resp.coords.latitude;
  //   this.currentLocation.lng = resp.coords.longitude;
  // });

  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, (results, status) => {
  this.latitude = results[0].geometry.location.lat();
  this.longitude = results[0].geometry.location.lng();
  // alert("lat: " + this.latitude + ", long: " + this.longitude);
 });
  
}




  }
  
  
  

  
