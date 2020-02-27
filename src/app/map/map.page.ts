import { Component, OnInit,ViewChild,ElementRef ,Renderer2, NgZone} from '@angular/core';


// import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {


  latitude: number;
  longitude: number;

  SOUTH_AFRICAN_BOUNDS = {
    north: -21.914461,
    south: -35.800139,
    west: 15.905430,
    east: 34.899504
  }

  
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  // @ViewChild('map') mapElement: ElementRef;
  map: any;
  address:string;

  constructor(public zone: NgZone) { 

  }

  ngOnInit() {
    // this.loadMap();
    this.getUserPosition()
  }
  addMap(lat,lng) {
    this.zone.run(()=>{
    //       console.log('Map Loader');
  
    var directionsRenderer = new google.maps.DirectionsRenderer();
    let latLng = new google.maps.LatLng(lat, lng);

    var grayStyles = [
      {
        featureType: "all",
        stylers: [
          { saturation: -5 },
          { lightness: 0 }
        ]
      },
    ];

    let mapOptions = {
      center: latLng,
      zoom: 10,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      restriction: {
        latLngBounds: this.SOUTH_AFRICAN_BOUNDS,
        strictBounds: true
      },

    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //  this.loaderAnimate = false;
    directionsRenderer.setMap(this.map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));
    })
    }
   
    async getUserPosition() {
      let count  = 0
      let options = {
        enableHighAccuracy: false
      };
      navigator.geolocation.getCurrentPosition((pos) => {
        this.addMap(pos.coords.latitude, pos.coords.longitude);
        this.addMarkersOnTheCustomersCurrentLocation(-26.262025, 27.9481);
        this.geocodeLatLng(this.map)
      }, (err) => {
        this.addMap(-29.465306,-24.741967);
        console.log("error : " + err.message);
        this.addMap(-29.465306,-24.741967);
      },{ enableHighAccuracy: true} ) 
    }
  
  loadMap(lat, lng) {
    // this.geolocation.getCurrentPosition().then((resp) => {
  /*      let latLng = new google.maps.LatLng(lat, lng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } */
      let latLng = new google.maps.LatLng(lat, lng);
      // The map, centered at Uluru
      var map = new google.maps.Map(
          document.getElementById('map'), {zoom: 12, center: latLng});
      // The marker, positioned at Uluru
      var marker = new google.maps.Marker({position: latLng, map: map});
      // this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
      this.geocodeLatLng(map);
      // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      // this.map.addListener('tilesloaded', () => {
      //   console.log('accuracy',this.map);
      //   this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      // });
 
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
  }
  currentLocation() {
    navigator.geolocation.getCurrentPosition((res)=>{
      console.log("Results ",res);
       this.loadMap(res.coords.latitude, res.coords.longitude)
    })
  }
  geocodeLatLng(map) {
    // var input = document.getElementById('latlng').value;
    // var latlngStr = input.split(',', 2);
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    let geocoder = new google.maps.Geocoder;
    navigator.geolocation.getCurrentPosition((res)=>{
      var latlng = {lat: res.coords.latitude, lng: res.coords.longitude};
      geocoder.geocode({'location': latlng}, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            map.setZoom(11);
            var marker = new google.maps.Marker({
              position: latlng,
              map: map
            });

            this.address = results[0].formatted_address;
            /* infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker); */
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    })
    var start = this.address;
    var end = 'Soweto Empowerment Zone';
    var request = {
      origin:start,
      destination:end,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(response);
      }
    });
  }
  // getAddressFromCoords(lattitude, longitude) {
  //   console.log("getAddressFromCoords "+lattitude+" "+longitude);
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  //   };
 
  //   this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
  //     .then((result: NativeGeocoderResult[]) => {
  //       this.address = "";
  //       let responseAddress = [];
  //       for (let [key, value] of Object.entries(result[0])) {
  //         if(value.length>0)
  //         responseAddress.push(value);
 
  //       }
  //       responseAddress.reverse();
  //       for (let value of responseAddress) {
  //         this.address += value+", ";
  //       }
  //       this.address = this.address.slice(0, -2);
  //     })
  //     .catch((error: any) =>{ 
  //       this.address = "Address Not Available!";
  //     });
 
  // }
 //addMarkers method adds the customer's location 
 addMarkersOnTheCustomersCurrentLocation(lat, lng) {
  // const icon = {
  //   scaledSize: new google.maps.Size(50, 50), // scaled size
  //   origin: new google.maps.Point(0, 0), // origin
  //   anchor: new google.maps.Point(0, 0) // anchor
  // };

  let marker = new google.maps.Marker({
    map: this.map,
    position: new google.maps.LatLng(lat, lng),
  });
    // marker.addListener('click', () => {
    
    // })
}

}
