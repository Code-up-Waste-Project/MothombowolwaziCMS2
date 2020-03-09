import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { element } from 'protractor';
import * as moment from 'moment';

import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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



   ishidden = false;
   myControl = new FormControl();
   
   letterObj = {
     to: '',
     from: '',
     text: ''
   };
 
   transtioning: boolean = false;

   distance = ''
   duration =''

  @ViewChild('mapElement', {static: false}) mapNativeElement: ElementRef;
  @ViewChild('autoCompleteInput', {static: false}) inputNativeElement: any;

  directionForm: FormGroup;

  // user infor
  admin = [];
  Newadmin = [];
  recordoutbounddisplays = [];
  recordoutbounddisplaysz = [];
  recordoutbounddisplayshome = [];

  // outbound
  outbound = [];
  id;
  UpdateID;
  outdate;
  outDriverName;
  outRegistarionNumberPlates;
  outovarallMass;
  ids;

  db = firebase.firestore(); 
  // mark
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  currentLocation: any = {
    lat: -26.2620432,
    lng: 27.9481053
  };
  
// code for dpf
ViewOutbound = [];
testArray = [];
PDFArray = {};
PDFArrayPrint = [];
Outboundz;
time;

UserArray = {};

prices;
getprice;

isLabelActive;

GH001mass;
NFAL01mass;
PAP005mass;
PAP007mass;
PAP001mass;
PAP003mass;
HD001mass;
LD001mass;
LD003mass;
PET001mass;
PET003mass;
PET005mass;

GH001mass2;
NFAL01mass2;
PAP005mass2;
PAP007mass2;
PAP001mass2;
PAP003mass2;
HD001mass2;
LD001mass2;
LD003mass2;
PET001mass2;
PET003mass2;
PET005mass2;

GH001storagemass;
NFAL01storagemass;
PAP005storagemass;
PAP007storagemass;
PAP001storagemass;
PAP003storagemass;
HD001storagemass;
LD001storagemass;
LD003storagemass;
PET001storagemass;
PET003storagemass;
PET005storagemass;
// substrings
GH001storagemassz;
NFAL01storagemassz;
PAP005storagemassz;
PAP007storagemassz;
PAP001storagemassz;
PAP003storagemassz;
HD001storagemassz;
LD001storagemassz;
LD003storagemassz;
PET001storagemassz;
PET003storagemassz;
PET005storagemassz;

storageGH001;
storageNFAL01;
storagePAP005;
storagePAP007;
storagePAP001;
storagePAP003;
storageHD001;
storageLD001;
storageLD003;
storagePET001;
storagePET003;
storagePET005;

GH001 = 'GH001';
NFAL01 = 'NFAL01';
PAP005 = 'PAP005';
PAP007 = 'PAP007';
PAP001 = 'PAP001';
PAP003 = 'PAP003';
HD001 = 'HD001';
LD001 = 'LD001';
LD003 = 'LD003';
PET001 = 'PET001';
PET003 = 'PET003';
PET005 = 'PET005';
Mass = 'MASS';

pdfObj = null;

RegisterForm: FormGroup;

options: string[] = ['One', 'Two', 'Three'];

userLocation = "";
searchQuery: string = "";
searchResults = [];
myLocation = "Search for Name";
usersz = [];
users = [];

resultID;
loadresultID;
outboundID;
outboundArray = [];

// 27feb add ons
image;
truckcode;
truckcode2222;
truckcodefirebase;
DriverName;
RegistarionNumberPlates;
overallStorage;
overallStorage2;
overallStoragez;
TruckSourcess;
Destination;
numbers;
companyaddress;

DriverNameInput;
RegistarionNumberPlatesInput;
TruckSourcessInput;
DestinationInput;
PhoneNumbersInput;
CompanyAddressInput;

storage = firebase.storage().ref();

  @ViewChild('slides', {static: false}) slides: IonSlides;

  /////////////////////////////////////////////////////////////////////////////////////

  slideOpts =  {
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    color: 'red !important',
    }
  }
  isBeginning: boolean = false;
  nextText = 'Next';
  goAway() {

    // alert("clicked")
    // this.selectedCat = "";
    // this.driverInformation = false;
    // this.driverInfo = false;
    this.popOpOpen = false;
    this.slideOne = true;
    this.slideTwo = false;
    this.driverInfo = false;


    
  }
  coemBack() {
  }

  otherPopup: boolean = false;

  showOtherPopup() {
    // alert("clicked")
    this.otherPopup = true;
  }

  animateJs() {
    this.transtioning = !this.transtioning;
  }
  showInputs() {
    this.otherPopup = false;

  }
  driverInformation: boolean = false;
  wasteInformation: boolean = false;

  showDriverInfo() {
    this.driverInformation = true;
    this.wasteInformation = false;
  }
  showWasteInfo() {
    this.wasteInformation = true;
    this.driverInformation = false;
    this.coemBack();
  }

  popOpOpen: boolean = false;
  selectedCat = "";

  showPopUp(userCat) {
    this.popOpOpen = true;
    this.selectedCat = userCat;
    this.showDriverInfo();
    // alert(this.selectedCat);
    setTimeout(() => {
    if (this.selectedCat === 'paper') {
      this.togglePaper();
    } else if (this.selectedCat === 'plastic') {
      this.togglePlastic();
    } else if (this.selectedCat === 'aluminium') {
      this.toggleAluminium();
    } else if (this.selectedCat === 'glass') {
      this.toggleGlass();
    }
    }, 10);
    // console.log(this.selectedCat);
  }

  constructor(private fb: FormBuilder,
    
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    public route: Router,
    public formGroup: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
   
    private geolocation: Geolocation
    ) { 
      this.createDirectionForm();
      // pulling for admin
      this.db.collection('admin').onSnapshot(snapshot => {
        this.Newadmin = [];
        snapshot.forEach(Element => {
          this.admin.push(Element.data());
        });
        this.admin.forEach(item => {
          
          if (item.userid === firebase.auth().currentUser.uid) {
            this.Newadmin = [];
            this.Newadmin.push(item);
          }
        });
        // console.log('Newadmins', this.Newadmin);
      });
  
  
  
      // this.RegisterForm = formGroup.group({
      //     DriverName : ['', [Validators.required, Validators.maxLength(15)]],
      //     RegistarionNumberPlates : ['', [Validators.required, Validators.maxLength(10)]],
      //     Destination : ['', [Validators.required, Validators.maxLength(25)]],
      //   });
  
      this.getMasses();
      this.pdfmakerFirebase();
  
      this.db.collection('outbound').onSnapshot(snapshot => {
        this.outbound = [];
        snapshot.forEach(element => {
          let id = {};
          let outdate = {};
          let outDriverName = {};
          let outRegistarionNumberPlates = {};
          let outovarallMass = {};
          let Destination = {};
          let TruckSourcess = {};
          let truckcode = {};
  
          id = this.id = element.id;
          outdate = this.outdate = element.data().date;
          truckcode = this.truckcode = element.data().truckcode;
          outDriverName = this.outDriverName = element.data().DriverName;
          outRegistarionNumberPlates = this.outRegistarionNumberPlates = element.data().RegistarionNumberPlates;
          outovarallMass = this.outovarallMass = element.data().ovarallMass;
          // Destination = this.Destination = element.data().Destination;
          TruckSourcess = this.TruckSourcess = element.data().TruckSourcess;
  
          // this.outbound = [];
          this.outbound.push({
            id: id,
            outDate: outdate,
            outdriverName: outDriverName,
            outRegistarionNo: outRegistarionNumberPlates,
            outovarallmass: outovarallMass,
            outTrucksource: TruckSourcess,
            truckcode: this.truckcode
          });
          // this.outbound.push(element.data());
          // console.log(this.outbound);
  
          
          this.UserArray = {
            DriverName: outDriverName,
            RegistarionNumberPlates: outRegistarionNumberPlates,
            overallStorage: outovarallMass,
            TruckSourcess: TruckSourcess,
            // Destination: Destination,
          }
          // console.log(this.UserArray);
  
          this.usersz.push(truckcode)
          // console.log(this.usersz);
  
        });
      });
  
      this.RegisterForm = formGroup.group({
        DriverNameInput : ['', [Validators.required, Validators.maxLength(15)]],
        RegistarionNumberPlatesInput : ['', [Validators.required, Validators.maxLength(15)]],
        // DestinationInput : ['', [Validators.required, Validators.maxLength(50)]],
        TruckSourcessInput : ['', [Validators.required, , Validators.maxLength(50)]],
        PhoneNumbersInput : ['', [Validators.required, , Validators.maxLength(10)]],
        CompanyAddressInput : ['', [Validators.required, , Validators.maxLength(50)]],
      });
  
      // console.log(this.usersz);
  
      this.LoopNames();
      
    this.createDirectionForm();
  }
  

  
   slideChanged($ev) {
    this.slides.getActiveIndex().then(index => {
      // console.log(index);
      if(index == 0) {
        this.isBeginning = false;
      }else {
        this.isBeginning = true;
      }
      if(index == 2) {
        this.nextText = 'Done';
      }else {
        this.nextText = 'Next';
      }
   });
   }

   //slides
   nextislide(){
     this.slides.slideNext();
   }

   previslide() {
    this.slides.slidePrev();
   }

  ngOnInit() {
   
  
    this.autocompleteItems = [];
    this.autocomplete = {
      places: ''
    };
    
    this.sortTable();
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
      zoom: 10
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

      console.log('hi');
      
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
sortTable() {
  this.db.collection('outbound').onSnapshot(element => {
    this.recordoutbounddisplayshome = [];
    // console.log(element)
    let loads = {};

    element.forEach(snap => {
      // this.recordoutbounddisplayshome = [];
      // console.log(snap.data())
      this.DriverName = snap.data().DriverName;
      this.RegistarionNumberPlates = snap.data().RegistarionNumberPlates;
      this.TruckSourcess = snap.data().TruckSourcess;
      this.truckcode = snap.data().truckcode;
      this.recordoutbounddisplayshome.push(snap.data());
    })
    // console.log(this.recordoutbounddisplayshome);
  })
}

LoopNames() {
  // auto complete
    // tslint:disable-next-line: forin
    for (let key in this.UserArray) {
      // for (let item in this.usersz) {
      //   this.users.push(item[key])
      // }

      // this.usersz.push(this.UserArray[key].DriverName);
  }
  // console.log(this.usersz);
  // console.log(this.users);
}

pdfmakerFirebase() {
  this.db.collection('outbound').onSnapshot(element => {
    this.recordoutbounddisplays = [];
    element.forEach(element => {
      let DriverName = {};
      let RegistarionNumberPlates = {};
      let overallStorage = {};
      let TruckSourcess = {};
      let Destination = {};
      let time = {};
      let truckcode = {};

      let GH001storagemass = {};
      let NFAL01storagemass = {};
      let PAP005storagemass = {};
      let PAP007storagemass = {};
      let PAP001storagemass = {};
      let PAP003storagemass = {};
      let HD001storagemass = {};
      let LD001storagemass = {};
      let LD003storagemass = {};
      let PET001storagemass = {};
      let PET003storagemass = {};
      let PET005storagemass = {};

      DriverName = this.DriverName = element.data().DriverName;
      RegistarionNumberPlates = this.RegistarionNumberPlates = element.data().RegistarionNumberPlates;
      overallStorage = this.overallStorage = element.data().ovarallMass;
      this.overallStoragez = (String(overallStorage).substring(0, 6));
      TruckSourcess = this.TruckSourcess = element.data().TruckSourcess;
      // Destination = this.Destination = element.data().Destination;
      truckcode = this.truckcode = element.data().truckcode;
      // console.log(this.DriverName);
      // console.log(this.RegistarionNumberPlates);
      // console.log(this.overallStorage);
      // console.log(this.TruckSourcess);
      // console.log(this.Destination);
      // console.log(this.overallStoragez);
      // console.log(this.truckcode);

      this.ids = element.id;
      // console.log(element.data());

      time = this.time = element.data().date;
      GH001storagemass = this.GH001storagemass = element.data().GH001;
      this.GH001storagemassz = (String(GH001storagemass).substring(0, 6));
      NFAL01storagemass = this.NFAL01storagemass = element.data().NFAL01;
      this.NFAL01storagemassz = (String(NFAL01storagemass).substring(0, 6));
      PAP005storagemass = this.PAP005storagemass = element.data().PAP005;
      this.PAP005storagemassz = (String(PAP005storagemass).substring(0, 6));
      PAP007storagemass = this.PAP007storagemass = element.data().PAP007;
      this.PAP007storagemassz = (String(PAP007storagemass).substring(0, 6));
      PAP001storagemass = this.PAP001storagemass = element.data().PAP001;
      this.PAP001storagemassz = (String(PAP001storagemass).substring(0, 6));
      PAP003storagemass = this.PAP003storagemass = element.data().PAP003;
      this.PAP003storagemassz = (String(PAP003storagemass).substring(0, 6));
      HD001storagemass = this.HD001storagemass = element.data().HD001;
      this.HD001storagemassz = (String(HD001storagemass).substring(0, 6));
      LD001storagemass = this.LD001storagemass = element.data().LD001;
      this.LD001storagemassz = (String(LD001storagemass).substring(0, 6));
      LD003storagemass = this.LD003storagemass = element.data().LD003;
      this.LD003storagemassz = (String(LD003storagemass).substring(0, 6));
      PET001storagemass = this.PET001storagemass = element.data().PET00;
      this.PET001storagemassz = (String(PET001storagemass).substring(0, 6));
      PET003storagemass = this.PET003storagemass = element.data().PET003;
      this.PET003storagemassz = (String(PET003storagemass).substring(0, 6));
      PET005storagemass = this.PET005storagemass = element.data().PET005;
      this.PET005storagemassz = (String(PET005storagemass).substring(0, 6));
      // console.log(this.GH001storagemass);
      // console.log(this.NFAL01storagemass);
      // console.log(this.PAP005storagemass);
      // console.log(this.PAP007storagemass);
      // console.log(this.PAP001storagemass);
      // console.log(this.PAP003storagemass);
      // console.log(this.HD001storagemass);
      // console.log(this.LD001storagemass);
      // console.log(this.LD003storagemass);
      // console.log(this.PET001storagemass);
      // console.log(this.PET003storagemass);
      // console.log(this.PET005storagemass);
      // console.log(this.GH001storagemassz);
      // console.log(this.NFAL01storagemassz);
      // console.log(this.PAP005storagemassz);
      // console.log(this.PAP007storagemassz);
      // console.log(this.PAP001storagemassz);
      // console.log(this.PAP003storagemassz);
      // console.log(this.HD001storagemassz);
      // console.log(this.LD001storagemassz);
      // console.log(this.LD003storagemassz);
      // console.log(this.PET001storagemassz);
      // console.log(this.PET003storagemassz);
      // console.log(this.PET005storagemassz);

      this.testArray.push({
        DriverName: this.DriverName,
        RegistarionNumberPlates: this.RegistarionNumberPlates,
        overallStorage: this.overallStorage,
        TruckSourcess: this.TruckSourcess,
        // Destination: this.Destination,
        GH001storagemass: this.GH001storagemassz,
        NFAL01storagemass: this.NFAL01storagemassz,
        PAP005storagemass: this.PAP005storagemassz,
        PAP007storagemass: this.PAP007storagemassz,
        PAP001storagemass: this.PAP001storagemassz,
        PAP003storagemass: this.PAP003storagemassz,
        HD001storagemass: this.HD001storagemassz,
        LD001storagemass: this.LD001storagemassz,
        LD003storagemass: this.LD003storagemassz,
        PET001storagemass: this.PET001storagemassz,
        PET003storagemass: this.PET003storagemassz,
        PET005storagemass: this.PET005storagemassz,
      });
      // console.log(this.PET005storagemassz);

      this.PDFArray = {
        GH001: this.GH001storagemassz,
        NFAL01: this.NFAL01storagemassz,
        PAP005: this.PAP005storagemassz,
        PAP007: this.PAP007storagemassz,
        PAP001: this.PAP001storagemassz,
        PAP003: this.PAP003storagemassz,
        HD001: this.HD001storagemassz,
        LD001: this.LD001storagemassz,
        LD003: this.LD003storagemassz,
        PET001: this.PET001storagemassz,
        PET003: this.PET003storagemassz,
        PET005: this.PET005storagemassz,
      };

      // this.db.collection('outbound').onSnapshot(snap => {
      //   this.recordoutbounddisplays = [];
      //   console.log(snap)
      //   let loads = {};

      //   snap.forEach(snap => {
      //     // console.log(snap.data())
      //     DriverName = this.DriverName = snap.data().DriverName;
      //     RegistarionNumberPlates = this.RegistarionNumberPlates = snap.data().RegistarionNumberPlates;
      //     overallStorage = this.overallStorage = snap.data().ovarallMass;
      //     this.overallStoragez = (String(overallStorage).substring(0, 6));
      //     TruckSourcess = this.TruckSourcess = snap.data().TruckSourcess;
      //     Destination = this.Destination = snap.data().Destination;
      //     truckcode = this.truckcode = snap.data().truckcode;
      //   })
      // })

      this.recordoutbounddisplays.push({
        DriverName: this.DriverName,
        RegistarionNumberPlates: this.RegistarionNumberPlates,
        overallStorage: this.overallStorage,
        TruckSourcess: this.TruckSourcess,
        // Destination: this.Destination,
        // GH001: this.GH001storagemassz,
        // NFAL01: this.NFAL01storagemassz,
        // PAP005: this.PAP005storagemassz,
        // PAP007: this.PAP007storagemassz,
        // PAP001: this.PAP001storagemassz,
        // PAP003: this.PAP003storagemassz,
        // HD001: this.HD001storagemassz,
        // LD001: this.LD001storagemassz,
        // LD003: this.LD003storagemassz,
        // PET001: this.PET001storagemassz,
        // PET003: this.PET003storagemassz,
        // PET005: this.PET005storagemassz,
        id: this.ids,
        time: this.time,
        truckcode: this.truckcode
      });
      // console.log(this.recordoutbounddisplays);

    // create PDF
      this.ForLoop();

  });
});

  let UserName = [];

  this.testArray.forEach((item) => {
    UserName.push(item.number);
  });

}

ForLoop() {
    // console.log(this.PDFArray);

    // tslint:disable-next-line: forin
    for (let key in this.PDFArray) {
      // console.log(key);
      if (this.PDFArray[key] === '0') {
        // console.log('Skipped because its 0');
      } else if (this.PDFArray[key] !== '0') {
        this.PDFArrayPrint.push({name : key, number : this.PDFArray[key]});
      }
    }
    // console.log(this.PDFArrayPrint);

  }

getMasses() {
  this.getprice = this.db.collection('storage').onSnapshot(snapshot => {
    snapshot.forEach(element => {
      this.GH001storagemass = element.data().GL001;
      this.NFAL01storagemass = element.data().NFAL01;
      this.PAP005storagemass = element.data().PAP005;
      this.PAP007storagemass = element.data().PAP007;
      this.PAP001storagemass = element.data().PAP001;
      this.PAP003storagemass = element.data().PAP003;
      this.HD001storagemass = element.data().HD001;
      this.LD001storagemass = element.data().LD001;
      this.LD003storagemass = element.data().LD003;
      this.PET001storagemass = element.data().PET001;
      this.PET003storagemass = element.data().PET003;
      this.PET005storagemass = element.data().PEP005;
      // console.log(element);
    });
    // console.log(this.GH001storagemass);
    // console.log(this.NFAL01storagemass);
    // console.log(this.PAP005storagemass);
    // console.log(this.PAP007storagemass);
    // console.log(this.PAP001storagemass);
    // console.log(this.PAP003storagemass);
    // console.log(this.HD001storagemass);
    // console.log(this.LD001storagemass);
    // console.log(this.LD003storagemass);
    // console.log(this.PET001storagemass);
    // console.log(this.PET003storagemass);
    // console.log(this.PET005storagemass);
  });
}

CheckInputsEmptyString() {
  if (
      this.GH001mass2 === undefined &&
      this.NFAL01mass2 === undefined &&
      this.PAP005mass2 === undefined &&
      this.PAP007mass2 === undefined &&
      this.PAP001mass2 === undefined &&
      this.PAP003mass2 === undefined &&
      this.HD001mass2 === undefined &&
      this.LD001mass2 === undefined &&
      this.LD003mass2 === undefined &&
      this.PET001mass2 === undefined &&
      this.PET003mass2 === undefined &&
      this.PET005mass2 === undefined
    ) {
      this.presentAlertcheckInputs();
    } else {
      this.presentAlertupdate();
    }
}

async presentAlertcheckInputs() {
  const alert = await this.alertController.create({
    header: 'Warning!',
    message: '<strong>Please fill in the blank spaces.</strong>!!!',
    buttons: [
      {
        text: 'Okay',
        handler: () => {
          this.route.navigateByUrl('/outbound');
        }
      }
    ]
  });
  await alert.present();
}

// presentAlertAddUser
async presentAlertAddUser(id) {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to use this user details?</strong>!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.AddUserToForm(id);
          this.doneBtn();
          // this.route.navigateByUrl('/reclaimer');
        }
      }
    ]
  });
  await alert.present();
}

AddUserToForm(id) {
  this.db.collection('outbound').where('id', '==', id).onSnapshot(element => {
    element.forEach(element => {
    this.id = element.id;
    this.DriverName = element.data().DriverName;
    this.RegistarionNumberPlates = element.data().RegistarionNumberPlates;
    // this.overallStorage = element.data().ovarallMass;
    this.TruckSourcess = element.data().TruckSourcess;
    // this.Destination = element.data().Destination;
    this.truckcode = element.data().truckcode;
    this.numbers = element.data().numbers;
    this.companyaddress = element.data().companyaddress;
    this.image = element.data().image;
    // console.log(element.data().DriverName);
    // console.log(element.data().RegistarionNumberPlates);
    // console.log(element.data().overallStorage);
    // console.log(element.data().TruckSourcess);
    // console.log(element.data().Destination);
    // console.log(element.data().truckcode);
    // console.log(element.data());
      })

      // adding data to textboxes
      this.DriverNameInput = this.DriverName;
      this.RegistarionNumberPlatesInput = this.RegistarionNumberPlates;
      this.TruckSourcessInput = this.TruckSourcess;
      // this.DestinationInput = this.Destination;
      this.truckcode2222 = this.truckcode;
      this.PhoneNumbersInput = this.numbers;
      this.CompanyAddressInput = this.companyaddress;
      this.UpdateID = id;

      console.log(this.truckcode2222);
    })

this.nextClick()

}

calculateOverall() {
  this.overallStorage2 = +this.GH001mass2 + +this.HD001mass2 + +this.LD001mass2 + +this.LD003mass2 + +this.NFAL01mass2
   + +this.PAP001mass2 + +this.PAP003mass2 + +this.PAP005mass2 + +this.PAP007mass2 + +this.PET001mass2 +
   +this.PET003mass2 + +this.PET005mass2;
  console.log(this.overallStorage2);

  this.createDriver();

}

createDriver() {
  console.log(this.truckcode2222)

  if(this.truckcode2222 === undefined) {
    this.saveUserToFirebase();
    console.log('no user registerd');
  }else if(this.truckcode2222 === null) {
    this.saveUserToFirebase()
    console.log('no user registerd');
  } else if(this.truckcode2222 !== undefined) {
    this.SaveOutbound2(this.UpdateID)
    console.log('user already exits');
  }

}

saveUserToFirebase() {
  this.db.collection('outbound').add({
    DriverName: this.DriverNameInput,
    RegistarionNumberPlates: this.RegistarionNumberPlatesInput,
    TruckSourcess: this.TruckSourcessInput,
    // Destination: this.DestinationInput,
    truckcode: Math.floor(Math.random()*899999+100000),
    numbers: this.PhoneNumbersInput,
    companyaddress: this.CompanyAddressInput,
    image: this.image,
  }).then(result => {
    // console.log(result);
    console.log(result.id);
    this.resultID = result.id
    // console.log(resultID);
    this.db.collection('outbound').doc(this.resultID).update({
      id: this.resultID
    })
    this.db.collection('outboundMass').add({
      date: moment(new Date()).format('MMMM DD YYYY'),
      GH001: this.GH001mass2,
      NFAL01: this.NFAL01mass2,
      PAP005: this.PAP005mass2,
      PAP007: this.PAP007mass2,
      PAP001: this.PAP001mass2,
      PAP003: this.PAP003mass2,
      HD001: this.HD001mass2,
      LD001: this.LD001mass2,
      LD003: this.LD003mass2,
      PET00: this.PET001mass2,
      PET003: this.PET003mass2,
      PET005: this.PET005mass2,
      ovarallMass: this.overallStorage2,
      driverID: this.resultID
    }).then(result => {
      // console.log(result);
      console.log(result.id);
      this.resultID = result.id
      // console.log(resultID);
      this.db.collection('outboundMass').doc(this.resultID).update({
        truckcode: this.resultID
      })
    })
  })

}

SaveOutbound2(id) {
  this.db.collection('outboundMass').add({
    date: moment(new Date()).format('MMMM DD YYYY'),
    GH001: this.GH001mass2,
    NFAL01: this.NFAL01mass2,
    PAP005: this.PAP005mass2,
    PAP007: this.PAP007mass2,
    PAP001: this.PAP001mass2,
    PAP003: this.PAP003mass2,
    HD001: this.HD001mass2,
    LD001: this.LD001mass2,
    LD003: this.LD003mass2,
    PET00: this.PET001mass2,
    PET003: this.PET003mass2,
    PET005: this.PET005mass2,
    driverID: id,
    ovarallMass: this.overallStorage2,
  }).then(result => {
    // console.log(result);
    console.log(result.id);
    this.resultID = result.id
    // console.log(resultID);
    this.db.collection('outboundMass').doc(this.resultID).update({
      truckcode: this.resultID
    })
  })
}

changeListener(admin): void {
  const i = admin.target.files[0];
  console.log(i);
  const upload = this.storage.child(i.name).put(i);
  upload.on('state_changed', snapshot => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('upload is: ', progress , '% done.');
  }, err => {
  }, () => {
    upload.snapshot.ref.getDownloadURL().then(dwnURL => {
      console.log('File avail at: ', dwnURL);
      this.image = dwnURL;
    });
  });
}

checkinputfields() {
  // GH001mass
  if (this.GH001mass2 === null) {
    this.GH001mass2 = 0;
  } else if (this.GH001mass2 === undefined) {
    this.GH001mass2 = 0;
  } else if (this.GH001mass2 === '') {
    this.GH001mass2 = 0;
  }
  // console.log(this.GH001mass);

  // NFAL01mass
  if (this.NFAL01mass2 === null) {
    this.NFAL01mass2 = 0;
  }
  if (this.NFAL01mass2 === undefined) {
    this.NFAL01mass2 = 0;
  }
  if (this.NFAL01mass2 === '') {
    this.NFAL01mass2 = 0;
  }
  // console.log(this.NFAL01mass);

  // PAP005mass
  if (this.PAP005mass2 === null) {
    this.PAP005mass2 = 0;
  }
  if (this.PAP005mass2 === undefined) {
    this.PAP005mass2 = 0;
  }
  if (this.PAP005mass2 === '') {
    this.PAP005mass2 = 0;
  }
  // console.log(this.PAP005mass);

  // PAP007mass
  if (this.PAP007mass2 === null) {
    this.PAP007mass2 = 0;
  }
  if (this.PAP007mass2 === undefined) {
    this.PAP007mass2 = 0;
  }
  if (this.PAP007mass2 === '') {
    this.PAP007mass2 = 0;
  }
  // console.log(this.PAP007mass);

  // PAP001mass
  if (this.PAP001mass2 === null) {
    this.PAP001mass2 = 0;
  }
  if (this.PAP001mass2 === undefined) {
    this.PAP001mass2 = 0;
  }
  if (this.PAP001mass2 === '') {
    this.PAP001mass2 = 0;
  }
  // console.log(this.PAP001mass);

  // PAP003mass
  if (this.PAP003mass2 === null) {
    this.PAP003mass2 = 0;
  }
  if (this.PAP003mass2 === undefined) {
    this.PAP003mass2 = 0;
  }
  if (this.PAP003mass2 === '') {
    this.PAP003mass2 = 0;
  }
  // console.log(this.PAP003mass);

  // HD001mass
  if (this.HD001mass2 === null) {
    this.HD001mass2 = 0;
  }
  if (this.HD001mass2 === undefined) {
    this.HD001mass2 = 0;
  }
  if (this.HD001mass2 === '') {
    this.HD001mass2 = 0;
  }
  // console.log(this.HD001mass);

  // LD001mass
  if (this.LD001mass2 === null) {
    this.LD001mass2 = 0;
  }
  if (this.LD001mass2 === undefined) {
    this.LD001mass2 = 0;
  }
  if (this.LD001mass2 === '') {
    this.LD001mass2 = 0;
  }
  // console.log(this.LD001mass);

  // LD003mass
  if (this.LD003mass2 === null) {
    this.LD003mass2 = 0;
  }
  if (this.LD003mass2 === undefined) {
    this.LD003mass2 = 0;
  }
  if (this.LD003mass2 === '') {
    this.LD003mass2 = 0;
  }
  // console.log(this.LD003mass);

  // PET001mass
  if (this.PET001mass2 === null) {
    this.PET001mass2 = 0;
  }
  if (this.PET001mass2 === undefined) {
    this.PET001mass2 = 0;
  }
  if (this.PET001mass2 === '') {
    this.PET001mass2 = 0;
  }
  // console.log(this.PET001mass);

  // PET003mass
  if (this.PET003mass2 === null) {
    this.PET003mass2 = 0;
  }
  if (this.PET003mass2 === undefined) {
    this.PET003mass2 = 0;
  }
  if (this.PET003mass2 === '') {
    this.PET003mass2 = 0;
  }
  // console.log(this.PET003mass);

  // PET005mass
  if (this.PET005mass2 === null) {
    this.PET005mass2 = 0;
  }
  if (this.PET005mass2 === undefined) {
    this.PET005mass2 = 0;
  }
  if (this.PET005mass2 === '') {
    this.PET005mass2 = 0;
  }
  // console.log(this.PET005mass);

  this.updateStorage();
  this.calculateOverall();

}

updateStorage() {
  // storageGH001
  this.storageGH001 = this.GH001storagemass - this.GH001mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({GL001: this.storageGH001});
  // console.log('stored to fire', this.storageGH001);
  // console.log('entered mass', this.GH001storagemass);
  // console.log('mass of database', this.GH001mass);

  // storage NFAL01;
  this.storageNFAL01 = this.NFAL01storagemass - this.NFAL01mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({NFAL01: this.storageNFAL01});
  // console.log('stored to fire', this.storageNFAL01);
  // console.log('entered mass', this.NFAL01storagemass);
  // console.log('mass of database', this.NFAL01mass);

  // storage PAP005;
  this.storagePAP005 = this.PAP005storagemass - this.PAP005mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP005: this.storagePAP005});
  // console.log('stored to fire', this.storagePAP005);
  // console.log('entered mass', this.PAP005storagemass);
  // console.log('mass of database', this.PAP005mass);

  // storage PAP007;
  this.storagePAP007 = this.PAP007storagemass - this.PAP007mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP007: this.storagePAP007});
  // console.log('stored to fire', this.storagePAP007);
  // console.log('entered mass', this.PAP007storagemass);
  // console.log('mass of database', this.PAP007mass);

  // storage PAP001;
  this.storagePAP001 = this.PAP001storagemass - this.PAP001mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP001: this.storagePAP001});
  // console.log('stored to fire', this.storagePAP001);
  // console.log('entered mass', this.PAP001storagemass);
  // console.log('mass of database', this.PAP001mass);

  // storage PAP003;
  this.storagePAP003 = this.PAP003storagemass - this.PAP003mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP003: this.storagePAP003});
  // console.log('stored to fire', this.storagePAP003);
  // console.log('entered mass', this.PAP003storagemass);
  // console.log('mass of database', this.PAP003mass);

  // storage HD001;
  this.storageHD001 = this.HD001storagemass - this.HD001mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({HD001: this.storageHD001});
  // console.log('stored to fire', this.storageHD001);
  // console.log('entered mass', this.HD001storagemass);
  // console.log('mass of database', this.HD001mass);

  // storage LD001;
  this.storageLD001 = this.LD001storagemass - this.LD001mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD001: this.storageLD001});
  // console.log('stored to fire', this.storageLD001);
  // console.log('entered mass', this.LD001storagemass);
  // console.log('mass of database', this.LD001mass);

  // storage LD003;
  this.storageLD003 = this.LD003storagemass - this.LD003mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD003: this.storageLD003});
  // console.log('stored to fire', this.storageLD003);
  // console.log('entered mass', this.LD003storagemass);
  // console.log('mass of database', this.LD003mass);

  // storage PET001;
  this.storagePET001 = this.PET001storagemass - this.PET001mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET001: this.storagePET001});
  // console.log('stored to fire', this.storagePET001);
  // console.log('entered mass', this.PET001storagemass);
  // console.log('mass of database', this.PET001mass);

  // storage PET003;
  this.storagePET003 = this.PET003storagemass - this.PET003mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET003: this.storagePET003});
  // console.log('stored to fire', this.storagePET003);
  // console.log('entered mass', this.PET003storagemass);
  // console.log('mass of database', this.PET003mass);

  // storage PET005;
  this.storagePET005 = this.PET005storagemass - this.PET005mass;
  this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PEP005: this.storagePET005});
  // console.log('stored to fire', this.storagePET005);
  // console.log('entered mass', this.PET005storagemass);
  // console.log('mass of database', this.PET005mass);

  this.popOpOpen = false;

}

async presentAlertupdate() {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to save this mass?</strong>!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.checkinputfields();
          this.clearInputs();
          this.route.navigateByUrl('/outbound');
          console.log('Confirm Okay');
        }
      }
    ]
  });
  await alert.present();
}

Logout() {
  firebase.auth().signOut().then((res) => {
    console.log(res);
    this.route.navigateByUrl('/login');
   });
  }

  async presentAlertDelete(id) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this record, your information will not be saved.</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteOutbound(id);
            this.route.navigateByUrl('/outbound');
          }
        }
      ]
    });
    await alert.present();
  }

  deleteOutbound(id) {
    this.db.collection('outbound').doc(id).delete();
    console.log('Record deleted');
  }

  clearInputs() {
    this.DriverName = '';
    this.RegistarionNumberPlates = '';
    // this.overallStorage = '';
    this.TruckSourcess = '';
    // this.Destination = '';
    this.GH001mass = '';
    this.NFAL01mass = '';
    this.PAP005mass = '';
    this.PAP007mass = '';
    this.PAP001mass = '';
    this.PAP003mass = '';
    this.HD001mass = '';
    this.LD001mass = '';
    this.LD003mass = '';
    this.PET001mass = '';
    this.PET003mass = '';
    this.PET005mass = '';
    console.log('inputs cleared');
  }

  async presentAlertCancel() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete this record? Your information will not be saved.</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.clearInputs();
            this.route.navigateByUrl('/outbound');
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
    });
    await loading.present();
    loading.dismiss();
  }

  // togglePlastic() {
  //   // Changes the header tab
  //   document.getElementById("toPaper").style.display = "none";
  //   document.getElementById("toPlastic").style.display = "flex";
  //   document.getElementById("toAluminium").style.display = "none";
  //   document.getElementById("toGlass").style.display = "none";

  //   // Changes the color of the Paper tab
  //   document.getElementById("Paper").style.background = "white";
  //   document.getElementById("Paper").style.color = "black";

  //   // Changes the color of the Cans tab
  //   document.getElementById("Aluminium").style.background = "white";
  //   document.getElementById("Aluminium").style.color = "black";

  //   // Changes the color of the Glass tab
  //   document.getElementById("Glass").style.background = "white";
  //   document.getElementById("Glass").style.color = "black";

  //   // Changes the color of the Plastic tab
  //   document.getElementById("Plastic").style.background = "#568C0B";
  //   document.getElementById("Plastic").style.color = "white";
  // }
  // togglePaper() {
  //   // Changes the header tab
  //   document.getElementById("toPaper").style.display = "flex";
  //   document.getElementById("toPlastic").style.display = "none";
  //   document.getElementById("toAluminium").style.display = "none";
  //   document.getElementById("toGlass").style.display = "none";

  //   // Changes the color of the Paper tab
  //   document.getElementById("Paper").style.background = "#568C0B";
  //   document.getElementById("Paper").style.color = "white";

  //   // Changes the color of the Cans tab
  //   document.getElementById("Aluminium").style.background = "white";
  //   document.getElementById("Aluminium").style.color = "black";

  //   // Changes the color of the Glass tab
  //   document.getElementById("Glass").style.background = "white";
  //   document.getElementById("Glass").style.color = "black";

  //   // Changes the color of the Plastic tab
  //   document.getElementById("Plastic").style.background = "white";
  //   document.getElementById("Plastic").style.color = "black";
  // }
  // toggleAluminium() {
  //   // Changes the header tab
  //   document.getElementById("toPaper").style.display = "none";
  //   document.getElementById("toPlastic").style.display = "none";
  //   document.getElementById("toAluminium").style.display = "flex";
  //   document.getElementById("toGlass").style.display = "none";

  //   // Changes the color of the Paper tab
  //   document.getElementById("Paper").style.background = "white";
  //   document.getElementById("Paper").style.color = "black";

  //   // Changes the color of the Cans tab
  //   document.getElementById("Aluminium").style.background = "#568C0B";
  //   document.getElementById("Aluminium").style.color = "white";

  //   // Changes the color of the Glass tab
  //   document.getElementById("Glass").style.background = "white";
  //   document.getElementById("Glass").style.color = "black";

  //   // Changes the color of the Plastic tab
  //   document.getElementById("Plastic").style.background = "white";
  //   document.getElementById("Plastic").style.color = "black";
  // }
  // toggleGlass() {

  //   // Changes the header tab
  //   document.getElementById("toPaper").style.display = "none";
  //   document.getElementById("toPlastic").style.display = "none";
  //   document.getElementById("toAluminium").style.display = "none";
  //   document.getElementById("toGlass").style.display = "flex";

  //   // Changes the color of the Paper tab
  //   document.getElementById("Paper").style.background = "white";
  //   document.getElementById("Paper").style.color = "black";

  //   // Changes the color of the Cans tab
  //   document.getElementById("Aluminium").style.background = "white";
  //   document.getElementById("Aluminium").style.color = "black";

  //   // Changes the color of the Glass tab
  //   document.getElementById("Glass").style.background = "#568C0B";
  //   document.getElementById("Glass").style.color = "white";

  //   // Changes the color of the Plastic tab
  //   document.getElementById("Plastic").style.background = "white";
  //   document.getElementById("Plastic").style.color = "black";
  // }

  
  isPaper : boolean = false;
  isPlastic : boolean = false;
  isAluminium : boolean = false;
  isGlass : boolean = false;
  slideOne: boolean = true;
  slideTwo: boolean = false;
  togglePlastic() {
    console.log("calling plastic");
    
  this.isPaper = false;
  this.isPlastic = true;
  this.isAluminium  = false;
  this.isGlass  = false;
  
  document.getElementById("isPaper").style.background = "transparent"
  document.getElementById("isPlastic").style.background = "#5C8A1B"
  document.getElementById("isAluminium").style.background = "transparent"
  document.getElementById("isGlass").style.background = "transparent"

  
  document.getElementById("isPaper").style.color = "black"
  document.getElementById("isPlastic").style.color = "white"
  document.getElementById("isAluminium").style.color = "black"
  document.getElementById("isGlass").style.color = "black"
  }
  togglePaper() {    
    console.log("calling paper");
    
  this.isPaper = true;
  this.isPlastic = false;
  this.isAluminium  = false;
  this.isGlass  = false;
  
  document.getElementById("isPaper").style.background = "#5C8A1B"
  document.getElementById("isPlastic").style.background = "transparent"
  document.getElementById("isAluminium").style.background = "transparent"
  document.getElementById("isGlass").style.background = "transparent"

  
  document.getElementById("isPaper").style.color = "white"
  document.getElementById("isPlastic").style.color = "black"
  document.getElementById("isAluminium").style.color = "black"
  document.getElementById("isGlass").style.color = "black"
  }
  toggleAluminium() {
    console.log("calling Aluminium");
    
  this.isPaper = false;
  this.isPlastic = false;
  this.isAluminium  = true;
  this.isGlass  = false;
  
  document.getElementById("isPaper").style.background = "transparent"
  document.getElementById("isPlastic").style.background = "transparent"
  document.getElementById("isAluminium").style.background = "#5C8A1B"
  document.getElementById("isGlass").style.background = "transparent"

  
  document.getElementById("isPaper").style.color = "black"
  document.getElementById("isPlastic").style.color = "black"
  document.getElementById("isAluminium").style.color = "white"
  document.getElementById("isGlass").style.color = "black"
  }
  toggleGlass() {
    console.log("calling glass");
    
  this.isPaper = false;
  this.isPlastic = false;
  this.isAluminium  = false;
  this.isGlass  = true;
  
  document.getElementById("isPaper").style.background = "transparent"
  document.getElementById("isPlastic").style.background = "transparent"
  document.getElementById("isAluminium").style.background = "transparent"
  document.getElementById("isGlass").style.background = "#5C8A1B"

  
  document.getElementById("isPaper").style.color = "black"
  document.getElementById("isPlastic").style.color = "black"
  document.getElementById("isAluminium").style.color = "black"
  document.getElementById("isGlass").style.color = "white"
  }
  driverDetails: boolean = false;

  doneBtn() {
    console.log("done");
    
    this.showPopUp(this.selectedCat)
    
    this.driverDetails = true;
    this.slideOne = false;
    this.slideTwo = true;
  }


  driverInfo: boolean = false;
  group1 = document.getElementsByClassName("flyer-inputs") as HTMLCollectionOf <HTMLElement>
  nextClick() {
    // this will slide the elements to their original place
    this.driverInfo = true;
    this.group1[0].style.right = "0";
    this.group1[0].style.width = "90%"
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    console.log(val);
    if (val && val.trim() != "") {
      this.recordoutbounddisplays = this.usersz.filter(item => {
        return item.toString().indexOf(val.toString().toLowerCase()) > -1;
      });
      console.log('Results = ',this.searchResults);
    } else if (val != " ") {
      this.recordoutbounddisplays = this.usersz.filter(item => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else if (val == "") {
      this.recordoutbounddisplays = this.recordoutbounddisplays;
    }

    // console.log(this.usersz);
    // console.log(this.recordoutbounddisplays);
    // console.log(this.searchResults);
    
  }

  selectLocation(location) {
    this.userLocation = location;
    // this.recordoutbounddisplays = [];
    console.log(this.userLocation);
    console.log(location);

    this.db.collection('outbound').where("truckcode","==",location).onSnapshot(element => {
      element.forEach(element => {
      this.id = element.id;
      this.truckcode = element.data().truckcode;
      this.DriverName = element.data().DriverName;
      this.RegistarionNumberPlates = element.data().RegistarionNumberPlates;
      this.overallStorage = element.data().ovarallMass;
      this.TruckSourcess = element.data().TruckSourcess;
      // this.Destination = element.data().Destination;
      this.numbers = element.data().numbers;
      this.companyaddress = element.data().companyaddress;
      this.image = element.data().image;
      console.log(element.data().DriverName);
      console.log(element.data().RegistarionNumberPlates);
      // console.log(element.data().overallStorage);
      console.log(element.data().TruckSourcess);
      // console.log(element.data().Destination);
      console.log(element.data());
        })

        // adding data to textboxes
        this.DriverNameInput = this.DriverName;
        this.RegistarionNumberPlatesInput = this.RegistarionNumberPlates;
        this.TruckSourcessInput = this.TruckSourcess;
        // this.DestinationInput = this.Destination;
        this.truckcode2222 = this.truckcode;
        this.PhoneNumbersInput = this.numbers;
        this.CompanyAddressInput = this.companyaddress;
      })
      console.log(this.truckcode2222);
  }

  getPhoneInput(ev: any) {
    this.PhoneNumbersInput = ev.target.value;

    // calling firebase
    // this.contact[0] == '0'
    if (this.PhoneNumbersInput[0] !== '0') {
      this.presentAlertPhoneValidation();
    } else {
      // this.showInputs()
      console.log('im working');
      this.PhoneNumbersInput = this.PhoneNumbersInput;
    }
      // console.log(this.phoneVal);
      console.log(this.PhoneNumbersInput);
  }

  async presentAlertPhoneValidation() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Phone Numbers must start with a number: 0.</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.erasedToContact();
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  erasedToContact() {
    this.PhoneNumbersInput = '';
  }

  ViewDriver() {
    this.route.navigate(['outbound-driver-info']);
  }

  // hide() {
  //   console.log('clloseee',this.hideMe);
    
  //   this.hideMe = true;
  // }
}
