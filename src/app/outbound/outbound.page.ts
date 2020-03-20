// import { Component, OnInit, ElementRef, Renderer2, ViewChild,AfterViewInit, } from '@angular/core';
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
import { Chart} from 'chart.js';


import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-outbound',
  templateUrl: './outbound.page.html',
  styleUrls: ['./outbound.page.scss'],
})
export class OutboundPage implements OnInit{

  @ViewChild('barChart', {static: false}) barChart;   
  colorArray: any;
  bars: any;
 //autocomplete
 yourBoolean = false; /*viewable by default*/
 autocompleteItems;
 autocomplete;
 that
 placez=[]

 distance = ''
 duration =''

@ViewChild('map', {static: true}) mapNativeElement: ElementRef;
mapNative: HTMLCollectionOf<Element>  = document.getElementsByClassName('map')
@ViewChild('autoCompleteInput', {static: false}) inputNativeElement: any;

@ViewChild('sliderRef', { static: true }) protected slide: ElementRef<IonSlides>;

directionForm: FormGroup;

// mark
directionsService = new google.maps.DirectionsService;
directionsDisplay = new google.maps.DirectionsRenderer;
currentLocation: any = {
  lat: -26.2620432,
  lng: 27.9481053
};


  ///////////////////////////////////////

  ishidden = false;
  myControl = new FormControl();
  
  letterObj = {
    to: '',
    from: '',
    text: ''
  };

  transtioning: boolean = false;

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
  paperTotal = 0;
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
  ViewOutboundMasses = [];
  storage = firebase.storage().ref();

  @ViewChild('slides', {static: false}) slides: IonSlides;

  destination;

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
  isEnd: boolean = false;
  nextText = 'Next';
  Outbound: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

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
      
      }, 500);
      // console.log(this.selectedCat);
      setTimeout(() => {
        this.loadmap()
      }, 1000);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////

  constructor(
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    public route: Router,
    public formGroup: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    private fb: FormBuilder,
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

    this.getMasses();
    this.pdfmakerFirebase();

    this.db.collection('outbound').orderBy('DriverName', "desc").onSnapshot(snapshot => {
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
    
   }
  
   //charts
   createLineChart() {
    Chart.defaults.global.defaultFontSize = 13;
    Chart.defaults.global.defaultFontFamily = 'Roboto';

    this.bars= new Chart(this.barChart.nativeElement, {
   
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Material Delivered',
          data: [this.jan, this.feb, this.mar, this.apr, this.may, 
                this.jun, this.jul, this.aug, this.sep, this.oct,
                this.nov, this.dec],
          backgroundColor: '#ffd7e9', // array should have same number of elements as number of dataset
          borderColor: '#ffd7e9',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

   slideChanged() {
    this.slides.getActiveIndex().then(index => {
      // console.log(index);
      if(index == 0) {
        this.isBeginning = false;
      }else {
        this.isBeginning = true;
      }
      if(index == 2) {
        this.isEnd = true;
      }else {
        this.isEnd = false;
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

    //auth gurd
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.route.navigateByUrl('/home');
    //   }else {
    //     this.route.navigateByUrl('/login');
    //   }
    //   });
   

    this.autocompleteItems = [];
    this.autocomplete = {
      places: ''
    };
    
    this.sortTable();
    setTimeout(() => {
      console.log('map load');
      
      
    }, 2000);
    
  }

  ionViewDidEnter() {
    this.createLineChart();
  }
  createDirectionForm() {
    this.directionForm = this.fb.group({
      // mark
      destination: ['', Validators.required],
      // placeName: [''],
    });
  }

loadmap() {
  console.log(this.mapNative[0]);
  
    // // this.geolocation.getCurrentPosition().then((resp) => {
    // //   this.currentLocation.lat = resp.coords.latitude;
    // //   this.currentLocation.lng = resp.coords.longitude;
    // // });

    // // mark
  
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });
    const map = new google.maps.Map(this.mapNative[0], {
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
      this.destination = place. formatted_address;
      console.log(place. formatted_address);
      console.log(this.destination);
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
        
        console.log( 'distance', this.distance)
        console.log( 'duration', this.duration)
        console.log( 'destination', this.duration)
        this.placez.push(response)
        // console.log( this.placez )
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    this.in_your_method()
  }

in_your_method() {
  this.yourBoolean = true;
}


  

  sortTable() {
    this.db.collection('outbound').orderBy('DriverName', "asc").onSnapshot(element => {
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

        // this.recordoutbounddisplayshome.sort((a,b) => {
        //   return (b.DriverName) - (a.DriverName)
        // });
      })
      // console.log(this.recordoutbounddisplayshome);
    })
  }
  switchView(id) {
    this.pullDrive(id);
    this.pullMassz(id);
    this.pullHistoryData(id);
    document.getElementById('driverDetailz').style.display = 'flex';
    document.getElementById('outbound-123').style.display = 'none';
  }
  switchBack() {
    document.getElementById('driverDetailz').style.display = 'none';
    document.getElementById('outbound-123').style.display = 'flex';
  }
  pullDrive(id) {
    this.Outbound = this.db.collection('outbound').doc(id);
    this.Outbound.get().then((element) => {
      this.ViewOutbound = [];
      // console.log(documentSnapshot.data());
      this.ViewOutbound.push(element.data());
      // console.log(this.ViewOutbound);

      // console.log(element.data);
      let DriverName = {};
      let RegistarionNumberPlates = {};
      let overallStorage = {};
      let TruckSourcess = {};
      let Destination = {};
      let time = {};

      DriverName = this.DriverName = element.data().DriverName;
      RegistarionNumberPlates = this.RegistarionNumberPlates = element.data().RegistarionNumberPlates;
      TruckSourcess = this.TruckSourcess = element.data().TruckSourcess;
      this.companyaddress = element.data().companyaddress;
      this.numbers = element.data().numbers;
      // console.log(this.DriverName);
      // console.log(this.RegistarionNumberPlates);
      // // console.log(this.overallStorage);
      // console.log(this.TruckSourcess);
      // // console.log(this.Destination);
      // // console.log(this.overallStoragez);
    });
  }

  febuserArray:any =[]
  januserArray:any =[]
  maruserArray:any=[]
  apruserArray:any =[]
  mayuserArray:any=[]
  junuserArray:any=[]
  juluserArray:any=[]
  auguserArray:any=[]
  sepuserArray:any=[]
  octuserArray:any=[]
  novuserArray:any=[]
  decuserArray:any=[]
  jan:any
  feb:any
  mar:any
  apr:any
  may:any
  jun:any
  jul:any
  aug:any
  sep:any
  oct:any
  nov:any
  dec:any
  plasticTotal:any
  alumTotal:any
  glassTotal:any

  pullMassz(id) {
    this.db.collection('outboundMass').where('driverID', '==', id).onSnapshot(snapshot => {
      this.ViewOutboundMasses = [];
      snapshot.forEach(element => {
        // console.log(element.data());
        this.ViewOutboundMasses.push(element.data());
        console.log(this.ViewOutboundMasses);

        this.GH001storagemass = element.data().GH001;
        this.GH001storagemassz = (String(this.GH001storagemass).substring(0, 6));
        this.NFAL01storagemass = element.data().NFAL01;
        this.NFAL01storagemassz = (String(this.NFAL01storagemass).substring(0, 6));
        this.PAP005storagemass = element.data().PAP005;
        this.PAP005storagemassz = (String(this.PAP005storagemass).substring(0, 6));
        this.PAP007storagemass = element.data().PAP007;
        this.PAP007storagemassz = (String(this.PAP007storagemass).substring(0, 6));
        this.PAP001storagemass = element.data().PAP001;
        this.PAP001storagemassz = (String(this.PAP001storagemass).substring(0, 6));
        this.PAP003storagemass = element.data().PAP003;
        this.PAP003storagemassz = (String(this.PAP003storagemass).substring(0, 6));
        this.HD001storagemass = element.data().HD001;
        this.HD001storagemassz = (String(this.HD001storagemass).substring(0, 6));
        this.LD001storagemass = element.data().LD001;
        this.LD001storagemassz = (String(this.LD001storagemass).substring(0, 6));
        this.LD003storagemass = element.data().LD003;
        this.LD003storagemassz = (String(this.LD003storagemass).substring(0, 6));
        this.PET001storagemass = element.data().PET00;
        this.PET001storagemassz = (String(this.PET001storagemass).substring(0, 6));
        this.PET003storagemass = element.data().PET003;
        this.PET003storagemassz = (String(this.PET003storagemass).substring(0, 6));
        this.PET005storagemass = element.data().PET005;
        this.PET005storagemassz = (String(this.PET005storagemass).substring(0, 6));

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

        this.paperTotal = this.paperTotal 
          +parseFloat(element.data().PAP001) +
          +parseFloat(element.data().PAP003) +
          +parseFloat(element.data().PAP005) +
          +parseFloat(element.data().PAP007);
        
          this.plasticTotal = this.paperTotal 
          +parseFloat(element.data().HD001) +
          +parseFloat(element.data().LD001) +
          +parseFloat(element.data().LD003) +
          +parseFloat(element.data().PET00) +
          +parseFloat(element.data().PET003) +
          +parseFloat(element.data().PET005);

        this.alumTotal = this.alumTotal +parseFloat(element.data().NFAL01);

        this.glassTotal = this.glassTotal +parseFloat(element.data().GH001);

      });
    })

   }
   pullHistoryData(id) {
    // January
    this.db.collection('outboundMass').where("driverID", "==", id).onSnapshot(snap => {
      // console.log(snap);
      snap.forEach(snap => {
        // console.log(snap.data());
        this.januserArray.push(snap.data());
        // console.log(this.januserArray);
        for (let keyjan in this.januserArray) {
          // console.log(this.januserArray[key].date);
          // console.log(this.januserArray[key].ovarallMass);
          if (this.januserArray[keyjan].date >= 'January 01 2020' && this.januserArray[keyjan].date <= 'January 31 2020') {
            // this.jantimeArray.push(this.januserArray[key])
            // console.log(this.jantimeArray);

            let janMass = 0;
            janMass = +janMass + +parseFloat(this.januserArray[keyjan].ovarallMass);
            this.jan = +this.jan + +janMass;
            console.log(this.jan);
          }
        }
      })
    })

    // February
    this.db.collection('outboundMass').where("driverID", "==", this.id).onSnapshot(snap => {
      // console.log(snap);
      snap.forEach(snap => {
        // console.log(snap.data());
        this.febuserArray.push(snap.data());
        // console.log(this.febuserArray);
        for (let keyfeb in this.febuserArray) {
          // console.log(this.febuserArray[key].date);
          // console.log(this.febuserArray[key].ovarallMass);
          if (this.febuserArray[keyfeb].date >= 'February 01 2020' && this.febuserArray[keyfeb].date <= 'February 28 2020') {
            // this.febtimeArray.push(this.febuserArray[key])
            // console.log(this.febtimeArray);

            let febMass = 0;
            febMass = +febMass + +parseFloat(this.febuserArray[keyfeb].ovarallMass);
            this.feb = +this.feb + +febMass
            console.log(this.feb);
          }
        }
      })
    })

    // March
    this.db.collection('outboundMass').where("driverID", "==", this.id).onSnapshot(snap => {
      // console.log(snap);

      let marMass = 0;

      snap.forEach(snap => {
        // console.log(snap.data());
        this.maruserArray.push(snap.data());
        // console.log(this.maruserArray);
        for (let keymar in this.maruserArray) {
          // console.log(this.maruserArray[key].date);
          // console.log(this.maruserArray[key].ovarallMass);
          if (this.maruserArray[keymar].date >= 'March 01 2020' && this.maruserArray[keymar].date <= 'March 31 2020') {
            marMass = +marMass + +parseFloat(this.maruserArray[keymar].ovarallMass);
          }
        }
        this.mar = +marMass;
        console.log(marMass);
        console.log(this.mar);
      })
    })

    // April
    this.db.collection('outboundMass').where("driverID", "==", this.id).onSnapshot(snap => {
      // console.log(snap);
      snap.forEach(snap => {
        // console.log(snap.data());
        this.apruserArray.push(snap.data());
        // console.log(this.apruserArray);
        for (let keyapr in this.apruserArray) {
          // console.log(this.apruserArray[key].date);
          // console.log(this.apruserArray[key].ovarallMass);
          if (this.apruserArray[keyapr].date >= 'April 01 2020' && this.apruserArray[keyapr].date <= 'April 30 2020') {
            // this.aprtimeArray.push(this.apruserArray[key])
            // console.log(this.aprtimeArray);

            let aprMass = 0;
            aprMass = +aprMass + +parseFloat(this.apruserArray[keyapr].ovarallMass);
            this.apr = +this.apr + +aprMass;
            console.log(this.apr);
          }
        }
      })
    })

    // May
    this.db.collection('outboundMass').where("driverID", "==", this.id).onSnapshot(snap => {
      // console.log(snap);
      snap.forEach(snap => {
        // console.log(snap.data());
        this.mayuserArray.push(snap.data());
        // console.log(this.mayuserArray);
        for (let keymay in this.mayuserArray) {
          // console.log(this.mayuserArray[key].date);
          // console.log(this.mayuserArray[key].ovarallMass);
          if (this.mayuserArray[keymay].date >= 'May 01 2020' && this.mayuserArray[keymay].date <= 'May 31 2020') {
            // this.maytimeArray.push(this.mayuserArray[key])
            // console.log(this.maytimeArray);

            let mayMass = 0;
            mayMass = +mayMass + +parseFloat(this.mayuserArray[keymay].ovarallMass);
            this.may = +this.may + +mayMass;
            console.log(this.may);
          }
        }
      })
    })

    // June
    this.db.collection('outboundMass').where("driverID", "==", this.id).onSnapshot(snap => {
      // console.log(snap);
      snap.forEach(snap => {
        // console.log(snap.data());
        this.junuserArray.push(snap.data());
        // console.log(this.junuserArray);
        for (let keyjun in this.junuserArray) {
          // console.log(this.junuserArray[key].date);
          // console.log(this.junuserArray[key].ovarallMass);
          if (this.junuserArray[keyjun].date >= 'June 01 2020' && this.junuserArray[keyjun].date <= 'June 30 2020') {
            // this.juntimeArray.push(this.junuserArray[key])
            // console.log(this.juntimeArray);

            let junMass = 0;
            junMass = +junMass + +parseFloat(this.junuserArray[keyjun].ovarallMass);
            this.jun = +this.jun + +junMass;
            console.log(this.jun);
          }
        }
      })
    })

    // July
    this.db.collection('outboundMass').where("driverID", "==", this.id).onSnapshot(snap => {
      // console.log(snap);
      snap.forEach(snap => {
        // console.log(snap.data());
        this.juluserArray.push(snap.data());
        // console.log(this.juluserArray);
        for (let keyjul in this.juluserArray) {
          // console.log(this.juluserArray[key].date);
          // console.log(this.juluserArray[key].ovarallMass);
          if (this.juluserArray[keyjul].date >= 'July 01 2020' && this.juluserArray[keyjul].date <= 'July 31 2020') {
            // this.jultimeArray.push(this.juluserArray[key])
            // console.log(this.jultimeArray);

            let julMass = 0;
            julMass = +julMass + +parseFloat(this.juluserArray[keyjul].ovarallMass);
            this.jul = +this.jul + +julMass;
            console.log(this.jul);
          }
        }
      })
    })

    // August
    this.db.collection('outboundMass').where("driverID", "==", this.id).onSnapshot(snap => {
      // console.log(snap);
      snap.forEach(snap => {
        // console.log(snap.data());
        this.auguserArray.push(snap.data());
        // console.log(this.auguserArray);
        for (let keyaug in this.auguserArray) {
          // console.log(this.auguserArray[key].date);
          // console.log(this.auguserArray[key].ovarallMass);
          if (this.auguserArray[keyaug].date >= 'August 01 2020' && this.auguserArray[keyaug].date <= 'August 30 2020') {
            // this.augtimeArray.push(this.auguserArray[key])
            // console.log(this.augtimeArray);

            let augMass = 0;
            augMass = +augMass + +parseFloat(this.auguserArray[keyaug].ovarallMass);
            this.aug = +this.aug + +augMass; 
            console.log(this.aug);
          }
        }
      })
    })

    // September
    this.db.collection('outboundMass').where("driverID", "==", this.id).onSnapshot(snap => {
      // console.log(snap);
      snap.forEach(snap => {
        // console.log(snap.data());
        this.sepuserArray.push(snap.data());
        // console.log(this.sepuserArray);
        for (let keysep in this.sepuserArray) {
          // console.log(this.sepuserArray[key].date);
          // console.log(this.sepuserArray[key].ovarallMass);
          if (this.sepuserArray[keysep].date >= 'September 01 2020' && this.sepuserArray[keysep].date <= 'September 31 2020') {
            // this.septimeArray.push(this.sepuserArray[key])
            // console.log(this.septimeArray);

            let sepMass = 0;
            sepMass = +sepMass + +parseFloat(this.sepuserArray[keysep].ovarallMass);
            this.sep = +this.sep + +sepMass;
            console.log(this.sep);
          }
        }
      })
    })

    // October
    this.db.collection('outboundMass').where("driverID", "==", this.id).onSnapshot(snap => {
      // console.log(snap);
      snap.forEach(snap => {
        // console.log(snap.data());
        this.octuserArray.push(snap.data());
        // console.log(this.octuserArray);
        for (let keyoct in this.octuserArray) {
          // console.log(this.octuserArray[key].date);
          // console.log(this.octuserArray[key].ovarallMass);
          if (this.octuserArray[keyoct].date >= 'October 01 2020' && this.octuserArray[keyoct].date <= 'October 30 2020') {
            // this.octtimeArray.push(this.octuserArray[key])
            // console.log(this.octtimeArray);

            let octMass = 0;
            octMass = +octMass + +parseFloat(this.octuserArray[keyoct].ovarallMass);
            this.oct = +this.oct + +octMass;
            console.log(this.oct);
          }
        }
      })
    })

    // November
    this.db.collection('outboundMass').where("driverID", "==", this.id).onSnapshot(snap => {
      // console.log(snap);
      snap.forEach(snap => {
        // console.log(snap.data());
        this.novuserArray.push(snap.data());
        // console.log(this.novuserArray);
        for (let keynov in this.novuserArray) {
          // console.log(this.novuserArray[key].date);
          // console.log(this.novuserArray[key].ovarallMass);
          if (this.novuserArray[keynov].date >= 'November 01 2020' && this.novuserArray[keynov].date <= 'November 30 2020') {
            // this.novtimeArray.push(this.novuserArray[key])
            // console.log(this.novtimeArray);

            let novMass = 0;
            novMass = +novMass + +parseFloat(this.novuserArray[keynov].ovarallMass);
            this.nov = +this.nov + +novMass;
            console.log(this.nov);
          }
        }
      })
    })

    // December
    this.db.collection('outboundMass').where("driverID", "==", this.id).onSnapshot(snap => {
      // console.log(snap);
      snap.forEach(snap => {
        // console.log(snap.data());
        this.decuserArray.push(snap.data());
        // console.log(this.decuserArray);
        for (let keydec in this.decuserArray) {
          // console.log(this.decuserArray[key].date);
          // console.log(this.decuserArray[key].ovarallMass);
          if (this.decuserArray[keydec].date >= 'December 01 2020' && this.decuserArray[keydec].date <= 'December 31 2020') {
            // this.dectimeArray.push(this.decuserArray[key])
            // console.log(this.dectimeArray);

            let decMass = 0;
            decMass = +decMass + +parseFloat(this.decuserArray[keydec].ovarallMass);
            this.dec = +this.dec + +decMass; 
            console.log(this.dec);
          }
        }
      })
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
            // this.doneBtn();
            this.nextislide();
            // console.log("next slide selected");
            this.animateJs();
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

  // this.nextClick()

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
    if (this.image == '') {
      this.image = 'data:image/png;base64,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'
    } else if (this.image == null) {
      this.image = 'data:image/png;base64,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'
    } else if (this.image == undefined) {
      this.image = 'data:image/png;base64,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'
    } 

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
        driverID: this.resultID,
        destination: this.destination,
        distance:  this.distance,
        duration: this.duration
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
      destination: this.destination,
      distance:  this.distance,
      duration: this.duration
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

   async presentAlertUpdateDriver() {
  const alert = await this.alertController.create({
    header: 'Warning!',
    message: '<strong>Are you sure you want to update Driver Information?.</strong>!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      },
      {
        text: 'Okay',
        handler: () => {
          this.SaveUpdates()
          this.route.navigateByUrl('/outbound-driver-info');
        }
      }
    ]
  });
  await alert.present();
} 

SaveUpdates() {
  this.db.collection('outbound').doc(this.id).update({
    DriverName: this.DriverName,
    RegistarionNumberPlates: this.RegistarionNumberPlates,
    numbers: this.numbers,
    TruckSourcess: this.TruckSourcess,
    companyaddress: this.companyaddress
  })
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
            // this.nextislide();
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
      const num = Number(val)
      // if the value is an empty string don't filter the items
      console.log(val);
      console.log(num);
      
      if (val && val.trim() != "" && !(num == 0)) {
        console.log(num);
        console.log(!(num == 0));
        
        
        let arr = this.recordoutbounddisplays.filter(item => String(item.truckcode).indexOf(val) >= 0)
        console.log(arr);

        this.searchResults = arr;
        
        // this.recordinbounddisplaysz = this.usersz.filter(item => {
        //   return item.toString().indexOf(val.toString().toLowerCase()) > -1;
        // });
        
        console.log('Results = ',this.searchResults);
      // } else if (val != " ") {
      //   this.recordinbounddisplaysz = this.usersz.filter(item => {
      //     return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      //   });
      // }
      } else if (val == "") {
        // this. sortTable();
        this.searchResults = [];
      }

      console.log(this.usersz);
      console.log(this.recordoutbounddisplays);
      console.log(this.searchResults);
      
    }

    selectLocation(location) {
      this.userLocation = location;
      // this.recordinbounddisplaysz = [];
      console.log(this.userLocation);
      console.log(location);

      this.db.collection('outbound').where("truckcode","==",location).onSnapshot(element => {
        element.forEach(element => {
        this.id = element.id;
        this.truckcode = element.data().truckcode;
        this.DriverName = element.data().DriverName;
        this.RegistarionNumberPlates = element.data().RegistarionNumberPlates;
        // this.overallStorage = element.data().ovarallMass;
        this.TruckSourcess = element.data().TruckSourcess;
        this.Destination = element.data().Destination;
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
          this.DestinationInput = this.Destination;
          this.truckcode2222 = this.truckcode;
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
