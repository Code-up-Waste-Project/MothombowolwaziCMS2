import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {ModalController} from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform, IonSlides } from '@ionic/angular';
import { analyzeFileForInjectables } from '@angular/compiler';
import * as moment from 'moment'
import { Location } from "@angular/common";
import { Chart} from 'chart.js';

@Component({
  selector: 'app-reclaimer',
  templateUrl: './reclaimer.page.html',
  styleUrls: ['./reclaimer.page.scss'],
})
export class ReclaimerPage implements OnInit {
  @ViewChild('barChart', {static: false}) barChart;   
  colorArray: any;
  bars: any;
  transtioning: boolean = false;
  animateJs() {
    this.transtioning = !this.transtioning;
  }

  @ViewChild('slides', {static: false}) slides: IonSlides;

  slideOpts =  {
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    height: '4px'
    }
  }
  isBeginning: boolean = false;
  nextText = 'Next'
  db = firebase.firestore();

  IDno;
  name;
  surname;
  contact;
  address;
  time;
  id;
  image;
  streetname;
  town;
  city;

  names;
  surnames;
  contacts;
  addresss;

  phoneVal;

  prices;
  getprice;

  overallMass;
  OverallSubTotal;
  OverallVat;
  OverallGrandTotal;
  OverallGrandTotal2;
  // substrings
  overallMassz;
  OverallSubTotalz;
  OverallVatz;
  OverallGrandTotalz;

  // PDF Printing code
  Reclaimer;
  ViewReclaimer = [];
  testArray = [];
  testArrays = [];
  PDFArray = {};
  PDFOverallMass = {};
  PDFOverallSubTotal = {};
  PDFOverallVat = {};
  PDFOverallGrandTotal = {};
  PDFPrices = {};
  PDFCodes = {};
  PDFSubTotals = {};
  PDFVats = {};
  PDFGrandTotal = {};
  PDFMass = {};
  PDFArrayPrint = [];
  PDFOverallMassPrint = [];
  PDFOverallSubTotalPrint = [];
  PDFOverallVatPrint = [];
  PDFOverallGrandTotalPrint = [];
  PDFPricesPrint = [];
  PDFCodesPrint = [];
  PDFSubTotalsPrint = [];
  PDFVatsPrint = [];
  PDFGrandTotalPrint = [];
  PDFMassPrint = [];

  // converted Numbers
  printOverallMassz;
  printOverallSubTotalz;
  printOverallVatz;
  printOverallGrandTotalz;

  isLabelActive;

  GH001;
  GH001sss;
  NFAL01;
  PAP005;
  PAP007;
  PAP001;
  PAP001z;
  PAP003;
  HD001;
  LD001;
  LD003;
  PET001;
  PET003;
  PET005;

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

  GH001massz;
  NFAL01massz;
  PAP005massz;
  PAP007massz;
  PAP001massz;
  PAP003massz;
  HD001massz;
  LD001massz;
  LD003massz;
  PET001massz;
  PET003massz;
  PET005massz;

  // Inputs
  GH001price;
  NFAL01price;
  PAP005price;
  PAP007price;
  PAP001price;
  PAP003price;
  HD001price;
  LD001price;
  LD003price;
  PET001price;
  PET003price;
  PET005price;
  // converts
  GH001pricez;
  NFAL01pricez;
  PAP005pricez;
  PAP007pricez;
  PAP001pricez;
  PAP003pricez;
  HD001pricez;
  LD001pricez;
  LD003pricez;
  PET001pricez;
  PET003pricez;
  PET005pricez;

  // GH001
  GH001SubTotal;
  GH001Vat;
  GH001GrandTotal;
  // substrings
  GH001SubTotalz;
  GH001Vatz;
  GH001GrandTotalz;

  // NFAL01;
  NFAL01SubTotal;
  NFAL01Vat;
  NFAL01GrandTotal;
  // substrings
  NFAL01SubTotalz;
  NFAL01Vatz;
  NFAL01GrandTotalz;

  // PAP005;
  PAP005SubTotal;
  PAP005Vat;
  PAP005GrandTotal;
  // substrings
  PAP005SubTotalz;
  PAP005Vatz;
  PAP005GrandTotalz;

  // PAP007;
  PAP007SubTotal;
  PAP007Vat;
  PAP007GrandTotal;
  // substrings
  PAP007SubTotalz;
  PAP007Vatz;
  PAP007GrandTotalz;

  // PAP001;
  PAP001SubTotal;
  PAP001Vat;
  PAP001GrandTotal;
  // substrings
  PAP001SubTotalz;
  PAP001Vatz;
  PAP001GrandTotalz;

  // PAP003;
  PAP003SubTotal;
  PAP003Vat;
  PAP003GrandTotal;
  // substrings
  PAP003SubTotalz;
  PAP003Vatz;
  PAP003GrandTotalz;

  // HD001;
  HD001SubTotal;
  HD001Vat;
  HD001GrandTotal;
  // substrings
  HD001SubTotalz;
  HD001Vatz;
  HD001GrandTotalz;

  // LD001;
  LD001SubTotal;
  LD001Vat;
  LD001GrandTotal;
  // substrings
  LD001SubTotalz;
  LD001Vatz;
  LD001GrandTotalz;

  // LD003;
  LD003SubTotal;
  LD003Vat;
  LD003GrandTotal;
  // substrings
  LD003SubTotalz;
  LD003Vatz;
  LD003GrandTotalz;

  // PET001;
  PET001SubTotal;
  PET001Vat;
  PET001GrandTotal;
  // substrings
  PET001SubTotalz;
  PET001Vatz;
  PET001GrandTotalz;

  // PET003;
  PET003SubTotal;
  PET003Vat;
  PET003GrandTotal;
  // substrings
  PET003SubTotalz;
  PET003Vatz;
  PET003GrandTotalz;

  // PET005;
  PET005SubTotal;
  PET005Vat;
  PET005GrandTotal;
  // substrings
  PET005SubTotalz;
  PET005Vatz;
  PET005GrandTotalz;

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

  // Totals
  GH001Total;
  NFAL01Total;
  PaperTotal;
  PlasticTotals;
  TotalTotal;

  RegisterForm: FormGroup;

  letterObj = {
    to: '',
    from: '',
    text: ''
  };

  // user infor
  admin = [];
  Newadmin = [];

  options: string[] = ['One', 'Two', 'Three'];

  userLocation = "";
  searchQuery: any = "";
  searchResults = [];
  myLocation = "Search for Name";
  usersz = [];
  users = [];

  newreclaimer = [];
  reclaimername;
  reclaimersurname;
  reclaimerDate;
  reclaimercode;
  recordreclaimerdisplays = [];

  pdfObj = null;

  UserArray = {};

  // 27feb add ons
  truckcode2222;
  resultID;
  UpdateID;
  storage = firebase.storage().ref();

  isEnd: boolean = false;

  ///////////////////////////////////////////////////////////////

  otherPopup: boolean = false;
  showOtherPopup() {
    // alert("clicked")
    this.otherPopup = true;
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
    // this.coemBack();
  }

  popOpOpen: boolean = false;
  selectedCat="";
  showPopUp(userCat) {
    this.popOpOpen = true;
    this.selectedCat = userCat;
    this.showOtherPopup();
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

  /////////////////////////////////////////////////////////////////

  constructor(
    private modalcontroller: ModalController,
    public route: Router,
    public formGroup: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    private content: ElementRef,
    public rendered: Renderer2,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private location: Location
  ) {
    this.getprices();
    this.getMasses();

    // pulling for admin
    this.db.collection('admin').onSnapshot(snapshot => {
      // this.Newadmin = [];
      snapshot.forEach(Element => {
        this.Newadmin = [];
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

    // pulling from reclaimers
    this.db.collection('reclaimers').orderBy('name', "asc").onSnapshot(snapshot => {
      this.testArrays = [];
      snapshot.forEach(element => {

        this.testArrays.push({data:element.data(), id : element.id})
        console.log(this.testArrays);

        let id = {};
        let reclaimername = {};
        let reclaimersurname = {};
        let reclaimerDate = {};
        let name = {};
        let surname = {};
        let contact = {};
        let address = {};
        let OverallGrandTotal = {};
        let reclaimercode = {};

        // id = this.id = element.id;
        // reclaimername = this.reclaimername = element.data().name;
        // reclaimersurname = this.reclaimersurname = element.data().surname;
        // reclaimerDate = this.reclaimerDate = element.data().date;
        // reclaimercode = this.reclaimercode = element.data().reclaimercode;

        this.image = element.data().image;
        // this.truckcode2222 = element.data().reclaimercode;

        // name = this.name = element.data().name;
        // surname = this.surname = element.data().surname;
        // contact = this.contact = element.data().contact;
        // address = this.address = element.data().address;
        // OverallGrandTotal = this.OverallGrandTotal = element.data().OverallGrandTotal;

        this.usersz.push(reclaimercode)

        this.newreclaimer = [];
        this.newreclaimer.push({
          id: id,
          reName: reclaimername,
          reSurname: reclaimersurname,
          reDate: reclaimerDate,
        });
        // console.log(this.newreclaimer);

        // this.recordreclaimerdisplays.push({
        //   name: this.name,
        //   surname: this.surname,
        //   contact: this.contact,
        //   address: this.address,
        //   OverallGrandTotal: this.OverallGrandTotal,
        // })
        // console.log(this.recordreclaimerdisplays);

      });
    });

    this.RegisterForm = formGroup.group({
      name : ['', [Validators.required, Validators.maxLength(20)]],
      // IDno : ['', [Validators.required, Validators.maxLength(13)]],
      contact : ['', [Validators.required, Validators.maxLength(10)]],
      streetname : ['', [Validators.required, , Validators.maxLength(40)]],
      town : ['', [Validators.required, , Validators.maxLength(40)]],
      city : ['', [Validators.required, , Validators.maxLength(40)]],
    });
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

      ionViewDidEnter() {
        this.createLineChart();
      }
//slides
slideChanged() {
  this.slides.getActiveIndex().then(index => {
    // console.log(index);
    if(index == 0) {
      this.isBeginning = false;
    }else {
      this.isBeginning = true;
    }
    if(index == 1) {
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
    // this.getMaxMin();
  }

  getMaxMin() {
    if (this.contacts.lenght >= 10) {
      this.presentAlertPhoneMaxLenght();
      // console.log('Number is greater than 10 or equeal to 10');
    }  else {
      this.showInputs();
      // console.log('Number is okay');
    }
  }

  getPhoneInput(ev: any) {
    this.contact = ev.target.value;

    // calling firebase
    // this.contact[0] == '0'
    if (this.contact[0] !== '0') {
      this.presentAlertPhoneValidation();
    } else {
      // this.showInputs()
      console.log('im working');
      this.contact = this.contact;
    }
      // console.log(this.phoneVal);
      console.log(this.contact);
  }

  // getIDInput(ev: any) {
  //   this.IDno = ev.target.value;

  //   // calling firebase
  //   // this.contact[0] == '0'
  //   if (this.IDno.lenght == '13') {
  //     this.presentAlertIDValidation();
  //   } else {
  //     // this.showInputs()
  //     // console.log('im working');
  //     this.IDno = this.IDno;
  //   }
  //     // console.log(this.IDno);
  // }

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
            // console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertIDValidation() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>ID Numbers must have 13 digitz.</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.erasedToID();
            // console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertPhoneMaxLenght() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Phone Numbers must have 10 digits.</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.erasedToContact();
            // console.log('im working');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertPhoneMinLenght() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Phone Numbers has less than 10 digits.</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.erasedToContact();
            // console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  erasedToContact() {
    this.contact = '';
  }

  erasedToID() {
    this.IDno = '';
  }

  clearForm() {
    this.name = '';
    this.surnames = '';
    this.contacts = '';
    this.addresss = ''
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
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteReclaimer(id);
            this.route.navigateByUrl('/reclaimer');
          }
        }
      ]
    });
    await alert.present();
  }

  deleteReclaimer(id) {
    this.db.collection('reclaimers').doc(id).delete();
    console.log('Record deleted');
  }

  // /////////////////////////////////////////////////////////////////

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
            this.nextislide();
            // this.doneBtn();
            // this.allocate();
            // this.route.navigateByUrl('/reclaimer');
          }
        }
      ]
    });
    await alert.present();
  }

  AddUserToForm(id) {
    this.db.collection('reclaimers').where('id', '==', id).onSnapshot(element => {
      element.forEach(element => {
        let name = {};
        let contact = {};
        let address = {};
        let reclaimer = {};

        this.IDno = element.data().IDnumber;
        name = this.name = element.data().name;
        contact = this.contact = element.data().contact;
        this.image = element.data().image;
        reclaimer = this.truckcode2222 = element.data().reclaimercode;
        this.UpdateID = id;
        this.streetname = element.data().streetname;
        this.town = element.data().town;
        this.city = element.data().city;
        })

        // adding data to textboxes
        this.names = this.names;
        this.surnames = this.surnames;
        this.contacts = this.contacts;
        this.addresss = this.addresss
        this.reclaimercode = this.truckcode2222
      // })

        // console.log(this.names);
        // console.log(this.surnames);
        // console.log(this.contacts);
        // console.log(this.addresss);
        // console.log(this.reclaimercode);
  })

  }

  CheckInputsEmptyString() {
    if (
        this.GH001massz === undefined &&
        this.NFAL01massz === undefined &&
        this.PAP005massz === undefined &&
        this.PAP007massz === undefined &&
        this.PAP001massz === undefined &&
        this.PAP003massz === undefined &&
        this.HD001massz === undefined &&
        this.LD001massz === undefined &&
        this.LD003massz === undefined &&
        this.PET001massz === undefined &&
        this.PET003massz === undefined &&
        this.PET005massz === undefined
      ) {
        this.presentAlertcheckInputs();
      } else {
        this.checkinputfields();
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
            this.route.navigateByUrl('/reclaimer');
          }
        }
      ]
    });
    await alert.present();
  }

  checkinputfields() {
    // GH001mass
    if (this.GH001massz === null) {
      this.GH001massz = 0;
    } else if (this.GH001massz === undefined) {
      this.GH001massz = 0;
    }
    // console.log(this.GH001massz);

    // NFAL01mass
    if (this.NFAL01massz === null) {
      this.NFAL01massz = 0;
    }
    if (this.NFAL01massz === undefined) {
      this.NFAL01massz = 0;
    }
    // console.log(this.NFAL01massz);

    // PAP005mass
    if (this.PAP005massz === null) {
      this.PAP005massz = 0;
    }
    if (this.PAP005massz === undefined) {
      this.PAP005massz = 0;
    }
    // console.log(this.PAP005massz);

    // PAP007mass
    if (this.PAP007massz === null) {
      this.PAP007massz = 0;
    }
    if (this.PAP007massz === undefined) {
      this.PAP007massz = 0;
    }
    // console.log(this.PAP007massz);

    // PAP001mass
    if (this.PAP001massz === null) {
      this.PAP001massz = 0;
    }
    if (this.PAP001massz === undefined) {
      this.PAP001massz = 0;
    }
    // console.log(this.PAP001massz);

    // PAP003mass
    if (this.PAP003massz === null) {
      this.PAP003massz = 0;
    }
    if (this.PAP003massz === undefined) {
      this.PAP003massz = 0;
    }
    // console.log(this.PAP003massz);

    // HD001mass
    if (this.HD001massz === null) {
      this.HD001massz = 0;
    }
    if (this.HD001massz === undefined) {
      this.HD001massz = 0;
    }
    // console.log(this.HD001massz);

    // LD001mass
    if (this.LD001massz === null) {
      this.LD001massz = 0;
    }
    if (this.LD001massz === undefined) {
      this.LD001massz = 0;
    }
    // console.log(this.LD001massz);

    // LD003mass
    if (this.LD003massz === null) {
      this.LD003massz = 0;
    }
    if (this.LD003massz === undefined) {
      this.LD003massz = 0;
    }
    // console.log(this.LD003massz);

    // PET001mass
    if (this.PET001massz === null) {
      this.PET001massz = 0;
    }
    if (this.PET001massz === undefined) {
      this.PET001massz = 0;
    }
    // console.log(this.PET001massz);

    // PET003mass
    if (this.PET003massz === null) {
      this.PET003massz = 0;
    }
    if (this.PET003massz === undefined) {
      this.PET003massz = 0;
    }
    // console.log(this.PET003massz);

    // PET005mass
    if (this.PET005massz === null) {
      this.PET005massz = 0;
    }
    if (this.PET005massz === undefined) {
      this.PET005massz = 0;
    }
    // console.log(this.PET005massz);

    // under calculate the are other functions
    this.calculate();

  }

  // active form icons
    toggleIcon(event) {
      this.isLabelActive = !this.isLabelActive;
    }

  //   GH001;
  onChangeGH001(data): void {
    console.log(this.GH001massz);
    // console.log(data);

    this.GH001GrandTotal = +this.GH001massz * +this.GH001;
    console.log(this.GH001);
    console.log(this.GH001GrandTotal);

    this.GH001price = +this.GH001massz * +this.GH001;
    this.GH001pricez = (String(this.GH001price).substring(0, 6));
    // console.log(this.GH001pricez);
  }

  //   GH001 Total;
  onChangeTotalGH001(): void {
    this.GH001Total = this.GH001price;
    // console.log(this.GH001Total);
  }

  //   NFAL01;
  onChangeNFAL01(data): void {
    console.log(this.NFAL01massz);
    // console.log(data);

    this.NFAL01GrandTotal = +this.NFAL01massz * +this.NFAL01;
    // console.log(this.NFAL01GrandTotal);

    this.NFAL01price = +this.NFAL01massz * +this.NFAL01;
    this.NFAL01pricez = (String(this.NFAL01price).substring(0, 6));
    // console.log(this.NFAL01pricez);
  }

  //   NFAL01 Total NFAL01Total
  onChangeTotalNFAL01(): void {
    this.NFAL01Total = this.NFAL01price;
    // console.log(this.NFAL01Total);
  }

  //   PAP005;
  onChangePAP005(data): void {
    // console.log(this.PAP005mass);
    // console.log(data);

    this.PAP005GrandTotal = +this.PAP005massz * +this.PAP005;
    // console.log(this.PAP005GrandTotal);

    this.PAP005price = +this.PAP005massz * +this.PAP005;
    this.PAP005pricez = (String(this.PAP005price).substring(0, 6));
    // console.log(this.PAP005price);
  }

  //   PAP007;
  onChangePAP007(data): void {
    // console.log(this.PAP007mass);
    // console.log(data);

    this.PAP007GrandTotal = +this.PAP007massz * +this.PAP007;
    // console.log(this.PAP007GrandTotal);

    this.PAP007price = +this.PAP007massz * +this.PAP007;
    this.PAP007pricez = (String(this.PAP007price).substring(0, 6));
    // console.log(this.PAP007price);
  }

  //   PAP001;
  onChangePAP001(data): void {
    // console.log(this.PAP001mass);
    // console.log(data);

    this.PAP001GrandTotal = +this.PAP001massz * +this.PAP001;
    // console.log(this.PAP001GrandTotal);

    this.PAP001price = +this.PAP001massz * +this.PAP001;
    this.PAP001pricez = (String(this.PAP001price).substring(0, 6));
    // console.log(this.PAP001price);
  }

  //   PAP003;
  onChangePAP003(data): void {
    // console.log(this.PAP003mass);
    // console.log(data);

    this.PAP003GrandTotal = +this.PAP003massz * +this.PAP003;
    // console.log(this.PAP003GrandTotal);

    this.PAP003price = +this.PAP003massz * +this.PAP003;
    this.PAP003pricez = (String(this.PAP003price).substring(0, 6));
    // console.log(this.PAP003price);
  }

  //   Paper Total;
  onChangeTotal(): void {
    // PAP005mass
    if (this.PAP005massz === null) {
      this.PAP005massz = 0;
    }
    if (this.PAP005massz === undefined) {
      this.PAP005massz = 0;
    }
    // console.log(this.PAP005massz);

    // PAP007mass
    if (this.PAP007massz === null) {
      this.PAP007massz = 0;
    }
    if (this.PAP007massz === undefined) {
      this.PAP007massz = 0;
    }
    // console.log(this.PAP007massz);

    // PAP001mass
    if (this.PAP001massz === null) {
      this.PAP001massz = 0;
    }
    if (this.PAP001massz === undefined) {
      this.PAP001massz = 0;
    }
    // console.log(this.PAP001massz);

    // PAP003mass
    if (this.PAP003massz === null) {
      this.PAP003massz = 0;
    }
    if (this.PAP003massz === undefined) {
      this.PAP003massz = 0;
    }
    // console.log(this.PAP003massz);

    // get prices //////////////////////////////////////////////////////////////
    // PAP005price
    if (this.PAP005pricez === null) {
      this.PAP005pricez = 0;
    }
    if (this.PAP005pricez === undefined) {
      this.PAP005pricez = 0;
    }
    // console.log(this.PAP005pricez);

    // PAP007price
    if (this.PAP007pricez === null) {
      this.PAP007pricez = 0;
    }
    if (this.PAP007pricez === undefined) {
      this.PAP007pricez = 0;
    }
    // console.log(this.PAP007pricez);

    // PAP001price
    if (this.PAP001pricez === null) {
      this.PAP001pricez = 0;
    }
    if (this.PAP001pricez === undefined) {
      this.PAP001pricez = 0;
    }
    // console.log(this.PAP001pricez);

    // PAP003price
    if (this.PAP003pricez === null) {
      this.PAP003pricez = 0;
    }
    if (this.PAP003pricez === undefined) {
      this.PAP003pricez = 0;
    }
    // console.log(this.PAP003massz);

    this.PaperTotal = +this.PAP001pricez + +this.PAP007pricez + +this.PAP005pricez + +this.PAP003pricez;
    // console.log(this.PaperTotal);
  }

  //   HD001;
  onChangeHD001(data): void {
    // console.log(this.HD001mass);
    // console.log(data);

    this.HD001GrandTotal = +this.HD001massz * +this.HD001;
    // console.log(this.HD001GrandTotalz);

    this.HD001price = +this.HD001massz * +this.HD001;
    this.HD001pricez = (String(this.HD001price).substring(0, 6));
    // console.log(this.HD001pricez);
  }

  //   LD001;
  onChangeLD001(data): void {
    // console.log(this.LD001mass);
    // console.log(data);

    this.LD001GrandTotal = +this.LD001massz * +this.LD001;
    // console.log(this.LD001GrandTotal);

    this.LD001price = +this.LD001massz * +this.LD001;
    this.LD001pricez = (String(this.LD001price).substring(0, 6));
    // console.log(this.LD001pricez);
  }

  //   LD003;
  onChangeLD003(data): void {
    // console.log(this.LD003mass);
    // console.log(data);

    this.LD003GrandTotal = +this.LD003massz * +this.LD003;
    // console.log(this.LD003GrandTotalz);

    this.LD003price = +this.LD003massz * +this.LD003;
    this.LD003pricez = (String(this.LD003price).substring(0, 6));
    // console.log(this.LD003pricez);
  }

  //   PET001;
  onChangePET001(data): void {
    // console.log(this.PET001mass);
    // console.log(data);

    this.PET001GrandTotal = +this.PET001massz * +this.PET001;
    // console.log(this.PET001GrandTotalz);

    this.PET001price = +this.PET001massz * +this.PET001;
    this.PET001pricez = (String(this.PET001price).substring(0, 6));
    // console.log(this.PET001pricez);
  }

  //   PET003;
  onChangePET003(data): void {
    console.log(this.PET003massz);
    // console.log(data);

    this.PET003GrandTotal = +this.PET003massz * +this.PET003;
    // console.log(this.PET003GrandTotalz);

    this.PET003price = +this.PET003massz * +this.PET003;
    this.PET003pricez = (String(this.PET003price).substring(0, 6));
    // console.log(this.PET003pricez);
  }

  //   PET005;
  onChangePET005(data): void {
    // console.log(this.PET005mass);
    // console.log(data);

    this.PET005GrandTotal = +this.PET005massz * +this.PET005;
    // console.log(this.PET005GrandTotalz);

    this.PET005price = +this.PET005massz * +this.PET005;
    this.PET005pricez = (String(this.PET005price).substring(0, 6));
    // console.log(this.PET005pricez);
  }

  //   Plastic Total;
  onChangePlasticTotalzzz(): void {
    // HD001mass
    if (this.HD001massz === null) {
      this.HD001massz = 0;
    }
    if (this.HD001massz === undefined) {
      this.HD001massz = 0;
    }
    // console.log(this.HD001massz);

    // LD001mass
    if (this.LD001massz === null) {
      this.LD001massz = 0;
    }
    if (this.LD001massz === undefined) {
      this.LD001massz = 0;
    }
    // console.log(this.LD001massz);

    // LD003mass
    if (this.LD003massz === null) {
      this.LD003massz = 0;
    }
    if (this.LD003massz === undefined) {
      this.LD003massz = 0;
    }
    // console.log(this.LD003massz);

    // PET001mass
    if (this.PET001massz === null) {
      this.PET001massz = 0;
    }
    if (this.PET001massz === undefined) {
      this.PET001massz = 0;
    }
    // console.log(this.PET001massz);

    // PET003mass
    if (this.PET003massz === null) {
      this.PET003massz = 0;
    }
    if (this.PET003massz === undefined) {
      this.PET003massz = 0;
    }
    // console.log(this.PET003massz);

    // PET005mass
    if (this.PET005massz === null) {
      this.PET005massz = 0;
    }
    if (this.PET005massz === undefined) {
      this.PET005massz = 0;
    }
    // console.log(this.PET005massz);

    // check prices ///////////////////////////////////////////////////////////
    // HD001price
    if (this.HD001pricez === null) {
      this.HD001pricez = 0;
    }
    if (this.HD001pricez === undefined) {
      this.HD001pricez = 0;
    }
    // console.log(this.HD001pricez);

    // LD001price
    if (this.LD001pricez === null) {
      this.LD001pricez= 0;
    }
    if (this.LD001pricez === undefined) {
      this.LD001pricez = 0;
    }
    // console.log(this.LD001pricez);

    // LD003price
    if (this.LD003pricez === null) {
      this.LD003pricez = 0;
    }
    if (this.LD003pricez === undefined) {
      this.LD003pricez = 0;
    }
    // console.log(this.LD003pricez);

    // PET001price
    if (this.PET001pricez === null) {
      this.PET001pricez = 0;
    }
    if (this.PET001pricez === undefined) {
      this.PET001pricez = 0;
    }
    // console.log(this.PET001pricez);

    // PET003mass
    if (this.PET003pricez === null) {
      this.PET003pricez = 0;
    }
    if (this.PET003pricez === undefined) {
      this.PET003pricez = 0;
    }
    // console.log(this.PET003pricez);

    // PET005price
    if (this.PET005pricez === null) {
      this.PET005pricez = 0;
    }
    if (this.PET005pricez === undefined) {
      this.PET005pricez = 0;
    }
    // console.log(this.PET005pricez);

    this.PlasticTotals = +this.HD001pricez + +this.LD001pricez + +this.LD003pricez + +this.PET001pricez + +this.PET003pricez + +this.PET005pricez;
    // console.log(this.PlasticTotals);
  }

  TotalTotals() {
    this.TotalTotals = this.PlasticTotals;
  }

  calculate() {
    // GH001
    this.GH001GrandTotal = +this.GH001massz * +this.GH001;
    this.GH001Vat = +this.GH001GrandTotal / 1.15;
    this.GH001SubTotal = +this.GH001GrandTotal - +this.GH001Vat;
    // console.log(this.GH001GrandTotal);
    // console.log(this.GH001Vat);
    // console.log(this.GH001SubTotal);

    // NFAL01
    this.NFAL01GrandTotal = +this.NFAL01massz * +this.NFAL01;
    this.NFAL01Vat = +this.NFAL01GrandTotal / 1.15;
    this.NFAL01SubTotal = +this.NFAL01GrandTotal - +this.NFAL01Vat;
    // console.log(this.NFAL01GrandTotal);
    // console.log(this.NFAL01Vat);
    // console.log(this.NFAL01SubTotal);

    //   PAP005;
    this.PAP005GrandTotal = +this.PAP005massz * +this.PAP005;
    this.PAP005Vat = +this.PAP005GrandTotal / 1.15;
    this.PAP005SubTotal = +this.PAP005GrandTotal - +this.PAP005Vat;
    // console.log(this.PAP005GrandTotal);
    // console.log(this.PAP005Vat);
    // console.log(this.PAP005SubTotal);

    // PAP007
    this.PAP007GrandTotal = +this.PAP007massz * +this.PAP007;
    this.PAP007Vat = +this.PAP007GrandTotal / 1.15;
    this.PAP007SubTotal = +this.PAP007GrandTotal - +this.PAP007Vat;
    // console.log(this.PAP007GrandTotal);
    // console.log(this.PAP007Vat);
    // console.log(this.PAP007SubTotal);

    // PAP001
    this.PAP001GrandTotal = +this.PAP001massz * +this.PAP001;
    this.PAP001Vat = +this.PAP001GrandTotal / 1.15;
    this.PAP001SubTotal = +this.PAP001GrandTotal - +this.PAP001Vat;
    // console.log(this.PAP001GrandTotal);
    // console.log(this.PAP001Vat);
    // console.log(this.PAP001SubTotal);

    // PAP003
    this.PAP003GrandTotal = +this.PAP003massz * +this.PAP003;
    this.PAP003Vat = +this.PAP003GrandTotal / 1.15;
    this.PAP003SubTotal = +this.PAP003GrandTotal - +this.PAP003Vat;
    // console.log(this.PAP003GrandTotal);
    // console.log(this.PAP003Vat);
    // console.log(this.PAP003SubTotal);

    // HD001
    this.HD001GrandTotal = +this.HD001massz * +this.HD001;
    this.HD001Vat = +this.HD001GrandTotal / 1.15;
    this.HD001SubTotal = +this.HD001GrandTotal - +this.HD001Vat;
    // console.log(this.HD001GrandTotal);
    // console.log(this.HD001Vat);
    // console.log(this.HD001SubTotal);

    // LD001
    this.LD001GrandTotal = +this.LD001massz * +this.LD001;
    this.LD001Vat = +this.LD001GrandTotal / 1.15;
    this.LD001SubTotal = +this.LD001GrandTotal - +this.LD001Vat;
    // console.log(this.LD001GrandTotal);
    // console.log(this.LD001Vat);
    // console.log(this.LD001SubTotal);

    // LD003
    this.LD003GrandTotal = +this.LD003massz * +this.LD003;
    this.LD003Vat = +this.LD003GrandTotal / 1.15;
    this.LD003SubTotal = +this.LD003GrandTotal - +this.LD003Vat;
    // console.log(this.LD003GrandTotal);
    // console.log(this.LD003Vat);
    // console.log(this.LD003SubTotal);

    // PET005
    this.PET005GrandTotal = +this.PET005massz * +this.PET005;
    this.PET005Vat = +this.PET005GrandTotal / 1.15;
    this.PET005SubTotal = +this.PET005GrandTotal - +this.PET005Vat;
    // console.log(this.PET005GrandTotal);
    // console.log(this.PET005Vat);
    // console.log(this.PET005SubTotal);

    // PET001
    this.PET001GrandTotal = +this.PET001massz * +this.PET001;
    this.PET001Vat = +this.PET001GrandTotal / 1.15;
    this.PET001SubTotal = +this.PET001GrandTotal - +this.PET001Vat;
    // console.log(this.PET001GrandTotal);
    // console.log(this.PET001Vat);
    // console.log(this.PET001SubTotal);

    // PET003
    this.PET003GrandTotal = +this.PET003massz * +this.PET003;
    this.PET003Vat = +this.PET003GrandTotal / 1.15;
    this.PET003SubTotal = +this.PET003GrandTotal - +this.PET003Vat;
    // console.log(this.PET003GrandTotal);
    // console.log(this.PET003Vat);
    // console.log(this.PET003SubTotal);

    // overallMass
    this.overallMass = +this.GH001massz + +this.NFAL01massz + +this.PAP005massz + +this.PAP007massz + +this.PAP001massz + +this.PAP003massz +
    +this.HD001massz + +this.LD001massz + +this.LD003massz + +this.PET005massz + +this.PET001massz + +this.PET003massz;
    // console.log(this.overallMass);

    // calculate overall prices
    this.calculateOverall();

    // push to update overall storage
    this.updateStorage();

  }

  getprices() {
    // this.prices = this.db.collection('price').doc("SinUfRNnbB073KZiDIZE");
    // // console.log('prices firestore', this.prices);
    //   this.prices.get().then(element => {
    //     // console.log(element.data());
    //     this.GH001 = element.data().gl001;
    //     this.GH001sss = element.data().gl001;
    //     // console.log(this.GH001sss);
    //     this.HD001 = element.data().hd001;
    //     this.LD001 = element.data().ld001;
    //     this.LD003 = element.data().ld003;
    //     this.NFAL01 = element.data().nfalo1;
    //     this.PAP001 = element.data().pap001;
    //     this.PAP003 = element.data().pap003;
    //     this.PAP005 = element.data().pap005;
    //     this.PAP007 = element.data().pap007;
    //     this.PET001 = element.data().pet001;
    //     this.PET003 = element.data().pet003;
    //     this.PET005 = element.data().pet005;
    //     // console.log(element);

    //     console.log(this.GH001);
    //     console.log(this.HD001);
    //     console.log(this.LD003);
    //     console.log(this.NFAL01);
    //     console.log(this.PAP001);
    //     console.log(this.PAP003);
    //     console.log(this.PAP005);
    //     console.log(this.PET001);
    //     console.log(this.PET003);
    //     console.log(this.PET005);
    //     });
      
    // Glass Prices
    this.db.collection('price').doc("8FtqTT4N4mFpbI4DKc25").onSnapshot((snap) => {
      this.GH001 = snap.data().newgl001;
    })

    // Aluminium Prices
    this.db.collection('price').doc("ChHHlFcUFzucHOzPpEgE").onSnapshot(snap => {
      this.NFAL01 = snap.data().newnfal01;
    })

    // Paper Prices
    this.db.collection('price').doc("uk3Rla3tt9xgd8NivPJ6").onSnapshot(snap => {
      this.PAP003 = snap.data().newpap003;
      this.PAP001 = snap.data().newpap001;
      this.PAP005 = snap.data().newpap005;
      this.PAP007 = snap.data().newpap007;
    })

    // Plastic Prices
    this.db.collection('price').doc("7O6KqClxLD780ltfC6i5").onSnapshot(snap => {
      this.PET005 = snap.data().newpet005;
      this.PET001 = snap.data().newpet001;
      this.PET003 = snap.data().newpet003;
      this.LD003 = snap.data().newld003;
      this.LD001 = snap.data().newld001;
      this.HD001 = snap.data().newhd001;
    })

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

  calculateOverall() {
    // overall GrandTotal
    this.OverallGrandTotal2 = +this.GH001GrandTotal + +this.NFAL01GrandTotal + +this.PAP005GrandTotal + +this.PAP007GrandTotal + +this.PAP001GrandTotal + 
    +this.PAP003GrandTotal + +this.HD001GrandTotal + +this.LD001GrandTotal + +this.LD003GrandTotal + +this.PET001GrandTotal + +this.PET003GrandTotal + +this.PET005GrandTotal;
    console.log(this.OverallGrandTotal2);

    // this.OverallGrandTotal = this.OverallGrandTotal 
    //       +parseFloat(this.GH001GrandTotal) +
    //       +parseFloat(this.NFAL01GrandTotal) +
    //       +parseFloat(this.PAP005GrandTotal) +
    //       +parseFloat(this.PAP007GrandTotal) +
    //       +parseFloat(this.PAP001GrandTotal) +
    //       +parseFloat(this.PAP003GrandTotal) +
    //       +parseFloat(this.HD001GrandTotal) +
    //       +parseFloat(this.LD001GrandTotal) +
    //       +parseFloat(this.LD003GrandTotal) +
    //       +parseFloat(this.PET001GrandTotal) +
    //       +parseFloat(this.PET003GrandTotal) +
    //       +parseFloat(this.PET005GrandTotal);

    // overall GrandTotal
    this.OverallSubTotal = +this.GH001SubTotal + +this.NFAL01SubTotal + +this.PAP005SubTotal + +this.PAP007SubTotal + +this.PAP001SubTotal + 
    +this.PAP003SubTotal + +this.HD001SubTotal + +this.LD001SubTotal + +this.LD003SubTotal + +this.PET001SubTotal + +this.PET003SubTotal + +this.PET005SubTotal;
    console.log(this.OverallSubTotal);

    // overall GrandTotal
    this.OverallVat = +this.GH001Vat + +this.NFAL01Vat + +this.PAP005Vat + +this.PAP007Vat + +this.PAP001Vat +
    +this.PAP003Vat + +this.HD001Vat + +this.LD001Vat + +this.LD003Vat + +this.PET001Vat + +this.PET003Vat + +this.PET005Vat;
    console.log(this.OverallVat);

    // save to database
    this.Addreclaimer();
    
  }

  updateStorage() {
    // storageGH001
    this.storageGH001 = this.GH001storagemass + this.GH001massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({GL001: this.storageGH001});
    // console.log(this.storageGH001);

    // storage NFAL01;
    this.storageNFAL01 = this.NFAL01storagemass + this.NFAL01massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({NFAL01: this.storageNFAL01});
    // console.log(this.storageNFAL01);

    // storage PAP005;
    this.storagePAP005 = this.PAP005storagemass + this.PAP005massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP005: this.storagePAP005});
    // console.log(this.storagePAP005);

    // storage PAP007;
    this.storagePAP007 = this.PAP007storagemass + this.PAP007massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP007: this.storagePAP007});
    // console.log(this.storagePAP007);

    // storage PAP001;
    this.storagePAP001 = this.PAP001storagemass + this.PAP001massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP001: this.storagePAP001});
    // console.log(this.storagePAP001);

    // storage PAP003;
    this.storagePAP003 = this.PAP003storagemass + this.PAP003massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP003: this.storagePAP003});
    // console.log(this.storagePAP003);

    // storage HD001;
    this.storageHD001 = this.HD001storagemass + this.HD001massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({HD001: this.storageHD001});
    // console.log(this.storageHD001);

    // storage LD001;
    this.storageLD001 = this.LD001storagemass + this.LD001massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD001: this.storageLD001});
    // console.log(this.storageLD001);

    // storage LD003;
    this.storageLD003 = this.LD003storagemass + this.LD003massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD003: this.storageLD003});
    // console.log(this.storageLD003);

    // storage PET001;
    this.storagePET001 = this.PET001storagemass + this.PET001massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET001: this.storagePET001});
    // console.log(this.storagePET001);

    // storage PET003;
    this.storagePET003 = this.PET003storagemass + this.PET003massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET003: this.storagePET003});
    // console.log(this.storagePET003);

    // storage PET005;
    this.storagePET005 = this.PET005storagemass + this.PET005massz;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PEP005: this.storagePET005});
    // console.log(this.storagePET005);

    this.popOpOpen = false;
    
  }

  Addreclaimer() {
    console.log(this.truckcode2222)

    if(this.truckcode2222 === undefined) {
      this.savereclaimerprofile();
      console.log('no user registerd');
    }else if(this.truckcode2222 === null) {
      this.savereclaimerprofile()
      console.log('no user registerd');
    } else if(this.truckcode2222 !== undefined) {
      this.savereclaimerdata(this.UpdateID)
      console.log('user already exits');
    }

    // text boxes
    this.presentAlert();

  }

  savereclaimerprofile() {
    if (this.image == '') {
      this.image = 'data:image/png;base64,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'
    } else if (this.image == null) {
      this.image = 'data:image/png;base64,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'
    } else if (this.image == undefined) {
      this.image = 'data:image/png;base64,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'
    } 

    this.db.collection('reclaimers').add({
      reclaimercode: Math.floor(Math.random()*899999+100000),
      image: this.image,
      name: this.name,
      contact: this.contact,
      IDnumber: this.IDno,
      streetname: this.streetname,
      town: this.town,
      city: this.city,
    }).then(result => {
      // console.log(result);
      console.log(result.id);
      this.resultID = result.id
      // console.log(resultID);
      this.db.collection('reclaimers').doc(this.resultID).update({
        id: this.resultID
      })
      this.db.collection('reclaimersMass').add({
      date: moment(new Date()).format('MMMM DD YYYY, h:mm:ss'),
      GH001Mass: this.GH001massz,
      GH001Price: this.GH001,
      GH001: this.GH001GrandTotal,
      GH001Vat: this.GH001Vat,
      GH001SubTotal: this.GH001SubTotal,

      NFAL01Mass: this.NFAL01massz,
      NFAL01Price: this.NFAL01,
      NFAL01: this.NFAL01GrandTotal,
      NFAL01Vat: this.NFAL01Vat,
      NFAL01SubTotal: this.NFAL01SubTotal,

      PAP005Mass: this.PAP005massz,
      PAP005Price: this.PAP005,
      PAP005: this.PAP005GrandTotal,
      PAP005Vat: this.PAP005Vat,
      PAP005SubTotal: this.PAP005SubTotal,

      PAP007Mass: this.PAP007massz,
      PAP007Price: this.PAP007,
      PAP007: this.PAP007GrandTotal,
      PAP007Vat: this.PAP007Vat,
      PAP007SubTotal: this.PAP007SubTotal,

      PAP001Mass: this.PAP001massz,
      PAP001Price: this.PAP001,
      PAP001: this.PAP001GrandTotal,
      PAP001Vat: this.PAP001Vat,
      PAP001SubTotal: this.PAP001SubTotal,

      PAP003Mass: this.PAP003massz,
      PAP003Price: this.PAP003,
      PAP003: this.PAP003GrandTotal,
      PAP003Vat: this.PAP003Vat,
      PAP003SubTotal: this.PAP003SubTotal,

      HD001Mass: this.HD001massz,
      HD001Price: this.HD001,
      HD001: this.HD001GrandTotal,
      HD001Vat: this.HD001Vat,
      HD001SubTotal: this.HD001SubTotal,

      LD001Mass: this.LD001massz,
      LD001Price: this.LD001,
      LD001: this.LD001GrandTotal,
      LD001Vat: this.LD001Vat,
      LD001SubTotal: this.LD001SubTotal,

      LD003Mass: this.LD003massz,
      LD003Price: this.LD003,
      LD003: this.LD003GrandTotal,
      LD003Vat: this.LD003Vat,
      LD003SubTotal: this.LD003SubTotal,

      PET001Mass: this.PET001massz,
      PET001Price: this.PET001,
      PET001: this.PET001GrandTotal,
      PET001Vat: this.PET001Vat,
      PET001SubTotal: this.PET001SubTotal,

      PET003Mass: this.PET003massz,
      PET003Price: this.PET003,
      PET003: this.PET003GrandTotal,
      PET003Vat: this.PET003Vat,
      PET003SubTotal: this.PET003SubTotal,

      PEP005Mass: this.PET005massz,
      PEP005Price: this.PET005,
      PEP005: this.PET005GrandTotal,
      PEP005Vat: this.PET005Vat,
      PEP005SubTotal: this.PET005SubTotal,

      OverallMass: this.overallMass,
      OverallSubTotal: this.OverallSubTotal,
      OverallVat: this.OverallVat,
      OverallGrandTotal: this.OverallGrandTotal2,

      reclaimerID: this.resultID
      }).then(result => {
        // console.log(result);
      console.log(result.id);
      this.resultID = result.id
      // console.log(resultID);
      this.db.collection('reclaimersMass').doc(this.resultID).update({
        productcode: this.resultID
      })
      })
      // console.log('im here');
    }).then(result => {
      // this.truckcode = 
    })
    // this.presentToast();
  }

  savereclaimerdata(id) {
    this.db.collection('reclaimersMass').add({
      date: moment(new Date()).format('MMMM DD YYYY, h:mm:ss'),
      reclaimerID: id,

      GH001Mass: this.GH001massz,
      GH001Price: this.GH001,
      GH001: this.GH001GrandTotal,
      GH001Vat: this.GH001Vat,
      GH001SubTotal: this.GH001SubTotal,

      NFAL01Mass: this.NFAL01massz,
      NFAL01Price: this.NFAL01,
      NFAL01: this.NFAL01GrandTotal,
      NFAL01Vat: this.NFAL01Vat,
      NFAL01SubTotal: this.NFAL01SubTotal,

      PAP005Mass: this.PAP005massz,
      PAP005Price: this.PAP005,
      PAP005: this.PAP005GrandTotal,
      PAP005Vat: this.PAP005Vat,
      PAP005SubTotal: this.PAP005SubTotal,

      PAP007Mass: this.PAP007massz,
      PAP007Price: this.PAP007,
      PAP007: this.PAP007GrandTotal,
      PAP007Vat: this.PAP007Vat,
      PAP007SubTotal: this.PAP007SubTotal,

      PAP001Mass: this.PAP001massz,
      PAP001Price: this.PAP001,
      PAP001: this.PAP001GrandTotal,
      PAP001Vat: this.PAP001Vat,
      PAP001SubTotal: this.PAP001SubTotal,

      PAP003Mass: this.PAP003massz,
      PAP003Price: this.PAP003,
      PAP003: this.PAP003GrandTotal,
      PAP003Vat: this.PAP003Vat,
      PAP003SubTotal: this.PAP003SubTotal,

      HD001Mass: this.HD001massz,
      HD001Price: this.HD001,
      HD001: this.HD001GrandTotal,
      HD001Vat: this.HD001Vat,
      HD001SubTotal: this.HD001SubTotal,

      LD001Mass: this.LD001massz,
      LD001Price: this.LD001,
      LD001: this.LD001GrandTotal,
      LD001Vat: this.LD001Vat,
      LD001SubTotal: this.LD001SubTotal,

      LD003Mass: this.LD003massz,
      LD003Price: this.LD003,
      LD003: this.LD003GrandTotal,
      LD003Vat: this.LD003Vat,
      LD003SubTotal: this.LD003SubTotal,

      PET001Mass: this.PET001massz,
      PET001Price: this.PET001,
      PET001: this.PET001GrandTotal,
      PET001Vat: this.PET001Vat,
      PET001SubTotal: this.PET001SubTotal,

      PET003Mass: this.PET003massz,
      PET003Price: this.PET003,
      PET003: this.PET003GrandTotal,
      PET003Vat: this.PET003Vat,
      PET003SubTotal: this.PET003SubTotal,

      PEP005Mass: this.PET005massz,
      PEP005Price: this.PET005,
      PEP005: this.PET005GrandTotal,
      PEP005Vat: this.PET005Vat,
      PEP005SubTotal: this.PET005SubTotal,

      OverallMass: this.overallMass,
      OverallSubTotal: this.OverallSubTotal,
      OverallVat: this.OverallVat,
      OverallGrandTotal: this.OverallGrandTotal2,
    }).then(result => {
      // console.log(result);
    console.log(result.id);
    this.resultID = result.id
    // console.log(resultID);
    this.db.collection('reclaimersMass').doc(this.resultID).update({
      productcode: this.resultID
    })
    })
  }

  clearTextBoxes() {
    this.GH001massz = '';
    this.NFAL01massz = '';
    this.PAP005massz = '';
    this.PAP007massz = '';
    this.PAP001massz = '';
    this.PAP003massz = '';
    this.HD001massz = '';
    this.LD001massz = '';
    this.LD003massz = '';
    this.PET001massz = '';
    this.PET003massz = '';
    this.PET005massz = '';
    this.names = '';
    this.surnames = '';
    this.contacts = '';
    this.addresss = '';

    this.GH001price = '';
    this.NFAL01price = '';
    this.PAP005price = '';
    this.PAP007price = '';
    this.PAP001price = '';
    this.PAP003price = '';
    this.HD001price = '';
    this.LD001price = '';
    this.LD003price = '';
    this.PET001price = '';
    this.PET003price = '';
    this.PET005price = '';

    this.GH001pricez = '';
    this.NFAL01pricez = '';
    this.PAP005pricez = '';
    this.PAP007pricez = '';
    this.PAP001pricez = '';
    this.PAP003pricez = '';
    this.HD001pricez = '';
    this.LD001pricez = '';
    this.LD003pricez = '';
    this.PET001pricez = '';
    this.PET003pricez = '';
    this.PET005pricez = '';

    this.PlasticTotals = '';
    this.NFAL01Total = '';
    this.GH001Total = '';
    this.PaperTotal = '';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Transection Processed.</strong>!!!',
      buttons: [
         {
          text: 'Okay',
          handler: () => {
            this.clearTextBoxes();
            this.route.navigateByUrl('/reclaimer');
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

  async presentAlertCancel() {
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
            this.clearTextBoxes();
            this.route.navigateByUrl('/reclaimer');
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

    getItems(ev: any) {
      // Reset items back to all of the items
      // set val to the value of the searchbar
      const val = ev.target.value;
      const num = Number(val)
      // if the value is an empty string don't filter the items
      console.log(val);
      console.log(this.testArrays);
      
      if (val && val.trim() != "" && !(num == 0)) {
        console.log(num);
        console.log(!(num == 0));
        
        
        let arr = this.testArrays.filter(item => String(item.data.reclaimercode).indexOf(val) >= 0)
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
      console.log(this.testArrays);
      console.log(this.searchResults);
      
    }

    selectLocation(location) {
      this.userLocation = location;
      // this.recordinbounddisplaysz = [];
      console.log(this.userLocation);
      console.log(location);

      this.db.collection('reclaimers').where("reclaimercode","==",location).onSnapshot(element => {
        element.forEach(element => {
        this.IDno = element.data().IDnumber;
        this.name = element.data().name;
        this.contact = element.data().contact;
        this.image = element.data().image;
        this.truckcode2222 = element.data().reclaimercode;
        this.streetname = element.data().streetname;
        this.town = element.data().town;
        this.city = element.data().city;
          })
          console.log(this.IDno);
          console.log(this.name);
          console.log(this.contact);

        })
        console.log(this.truckcode2222);
    }

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
    doneBtn(){

      console.log("done");
      
      this.showPopUp(this.selectedCat)
      
      this.driverDetails = true;
      this.slideOne = false;
      this.slideTwo = true;
    }

    goAway() {
      // alert("clicked")
      // this.selectedCat = "";
      // this.driverInformation = false;
      // this.driverInfo = false;
      this.popOpOpen = false;
      this.slideOne = true;
      this.slideTwo = false;
      this.driverInfo = false
    }

    driverInfo: boolean = false;
    group1 = document.getElementsByClassName("flyer-inputs") as HTMLCollectionOf <HTMLElement>
    nextClick(){
      // this will slide the elements to their original place
      this.driverInfo = true;
      this.group1[0].style.right = "0";
      this.group1[0].style.width = "90%"
    }

allocate() {
    // adding data to textboxes
    // this.names = this.names;
    // this.surnames = this.surnames;
    // this.phoneVal = this.contacts;
    // this.addresss = this.addresss
    // console.log('im clicked');
}

viewReclaimerHistory() {
  this.route.navigate(['reclaimerHistory']);
}


switchView(id) {
  this.PullUserInfor(id);
  // this.pullDrive();
  this.reclaimer = this.db.collection('reclaimers').doc(id);
  this.reclaimer.get().then((documentSnapshot) => {
    this.ViewReclaimer = [];
    this.ViewReclaimer.push(documentSnapshot.data());
    console.log(this.ViewReclaimer);
  });
  this.db.collection('reclaimersMass').where('reclaimerID', '==', id).onSnapshot(snapshot => {
    this.ViewReclaimerMass = [];
    snapshot.forEach(element => {
      // this.ViewReclaimerMass = [];
      console.log(element.data());

    this.ViewReclaimerPDF.push(element.data())
    // console.log(this.ViewReclaimerPDF);

    this.idz = element.id;
    //  console.log(this.idz);
    this.productID = element.data().productcode;
    // console.log(this.productID);
    this.overallMass = element.data().OverallMass;
    this.overallMassz = (String(this.overallMass).substring(0, 6));
    this.OverallSubTotal = element.data().OverallSubTotal;
    this.OverallSubTotalz = (String(this.OverallSubTotal).substring(0, 6));
    this.OverallVat = element.data().OverallVat;
    this.OverallVatz = (String(this.OverallVat).substring(0, 6));
    this.OverallGrandTotal = element.data().OverallGrandTotal;
    this.OverallGrandTotalz = (String(this.OverallGrandTotal).substring(0, 6));

    this.ViewReclaimerMass.push({
      OverallMass: this.overallMassz,
      OverallSubTotal: this.OverallSubTotalz,
      OverallVat: this.OverallVatz,
      OverallGrandTotal: this.OverallGrandTotalz,
      reclaimerID: this.id,
      productID: this.productID
    });
      console.log(this.ViewReclaimerMass);
    
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
      this.PET001storagemass = element.data().PET001;
      this.PET001storagemassz = (String(this.PET001storagemass).substring(0, 6));
      this.PET003storagemass = element.data().PET003;
      this.PET003storagemassz = (String(this.PET003storagemass).substring(0, 6));
      this.PET005storagemass = element.data().PET005;
      this.PET005storagemassz = (String(this.PET005storagemass).substring(0, 6));

      this.paperTotal = this.paperTotal 
        +parseFloat(element.data().PAP001) +
        +parseFloat(element.data().PAP003) +
        +parseFloat(element.data().PAP005) +
        +parseFloat(element.data().PAP007);
      
        this.plasticTotal = this.paperTotal 
        +parseFloat(element.data().HD001) +
        +parseFloat(element.data().LD001) +
        +parseFloat(element.data().LD003) +
        +parseFloat(element.data().PET001) +
        +parseFloat(element.data().PET003) +
        +parseFloat(element.data().PEP005);
        // console.log(element.data().HD001);
        // console.log(element.data().LD001);
        // console.log(element.data().LD003);
        // console.log(element.data().PET001);
        // console.log(element.data().PET003);
        // console.log(element.data().PEP005);
        

      this.alumTotal = this.alumTotal +parseFloat(element.data().NFAL01);

      this.glassTotal = this.glassTotal +parseFloat(element.data().GH001);

      // graph
      this.GH001storagemassgraph = this.GH001storagemassgraph +parseFloat(element.data().GH001)
      this.NFAL01storagemassgraph = this.NFAL01storagemassgraph +parseFloat(element.data().NFAL01)

      this.PAP005storagemassgraph = this.PAP005storagemassgraph +parseFloat(element.data().PAP005)
      this.PAP007storagemassgraph = this.PAP007storagemassgraph  +parseFloat(element.data().PAP007)
      this.PAP001storagemassgraph = this.PAP001storagemassgraph +parseFloat(element.data().PAP001)
      this.PAP003storagemassgraph = this.PAP003storagemassgraph +parseFloat(element.data().PAP003)

      this.HD001storagemassgraph = this.HD001storagemassgraph +parseFloat(element.data().HD001)
      this.LD001storagemassgraph = this.LD001storagemassgraph +parseFloat(element.data().LD001)
      this.LD003storagemassgraph = this.LD003storagemassgraph +parseFloat(element.data().LD003)
      this.PET001storagemassgraph = this.PET001storagemassgraph +parseFloat(element.data().PET00)
      this.PET003storagemassgraph = this.PET003storagemassgraph +parseFloat(element.data().PET003)
      this.PET005storagemassgraph = this.PET005storagemassgraph +parseFloat(element.data().PET005)
    
    })
  })
  this.pullHistoryData(id);

  // this.pullMassz();
  // this.pullHistoryData();
  document.getElementById('driverDetailz').style.display = 'flex';
  document.getElementById('reclaimer-123').style.display = 'none';
}




// ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////



come: boolean = true;
bars: any;
colorArray: any;

idz;
productID;

reclaimer;

ViewReclaimerMass = [];
ViewReclaimerPDF = [];


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

GH001storagemassgraph;
NFAL01storagemassgraph;
PAP005storagemassgraph;
PAP007storagemassgraph;
PAP001storagemassgraph;
PAP003storagemassgraph;
HD001storagemassgraph;
LD001storagemassgraph;
LD003storagemassgraph;
PET001storagemassgraph;
PET003storagemassgraph;
PET005storagemassgraph;

paperTotal = 0;
plasticTotal = 0;
alumTotal = 0;
glassTotal = 0;

userArray = [];
timeArray = [];

januserArray = [];
febuserArray = [];
maruserArray = [];
apruserArray = [];
mayuserArray = [];
junuserArray = [];
juluserArray = [];
auguserArray = [];
sepuserArray = [];
octuserArray = [];
novuserArray = [];
decuserArray = [];

jantimeArray = [];
febtimeArray = [];
martimeArray = [];
aprtimeArray = [];
maytimeArray = [];
juntimeArray = [];
jultimeArray = [];
augtimeArray = [];
septimeArray = [];
octtimeArray = [];
novtimeArray = [];
dectimeArray = [];

jan = 0;
feb = 0;
mar = 0;
apr = 0;
may = 0;
jun = 0;
jul = 0;
aug = 0;
sep = 0;
oct = 0;
nov = 0;
dec = 0;
IDnumber:any

  PullUserInfor(id) {
    this.reclaimer = this.db.collection('reclaimers').doc(id).get().then(element => {
      console.log(element.data());
      // snap.forEach(element => {
        this.name = element.data().name;
        this.contact = element.data().contact;
        this.IDnumber = element.data().IDnumber;
        this.streetname = element.data().streetname;
        this.town = element.data().town;
        this.city = element.data().city;
      // });
      // console.log(this.name);
      // console.log(this.contact);
      // console.log(this.IDnumber);
      // console.log(this.streetname);
      // console.log(this.town);
      // console.log(this.city);
    });
    
  }

  async presentAlertUpdate() {
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
    this.db.collection('reclaimers').doc(this.id).update({
      name: this.name,
      contact: this.contact,
      IDnumber: this.IDnumber,
      streetname: this.streetname,
      town: this.town,
      city: this.city
    })
  }

  // getPhoneInput(ev: any) {
  //   this.contact = ev.target.value;
  
  //   // calling firebase
  //   // this.contact[0] == '0'
  //   if (this.contact[0] !== '0') {
  //     this.presentAlertPhoneValidation();
  //   } else {
  //     // this.showInputs()
  //     console.log('im working');
  //     this.contact = this.contact;
  //   }
  //     // console.log(this.phoneVal);
  //     console.log(this.contact);
  // }

  // async presentAlertPhoneValidation() {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm!',
  //     message: '<strong>Phone Numbers must start with a number: 0.</strong>!!!',
  //     buttons: [
  //       {
  //         text: 'Okay',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           this.erasedToContact();
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
  
  // erasedToContact() {
  //   this.contact = '';
  // }

  switch(){
    this.come = !this.come;
  }

pullHistoryData(id) {
  // January
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          janMass = +janMass + +parseFloat(this.januserArray[keyjan].OverallMass);
          this.jan = +this.jan + +janMass;
          console.log(this.jan);
        }
      }
    })
  })

  // February
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          febMass = +febMass + +parseFloat(this.febuserArray[keyfeb].OverallMass);
          this.feb = +this.feb + +febMass
          console.log(this.feb);
        }
      }
    })
  })

  // March
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          marMass = +marMass + +parseFloat(this.maruserArray[keymar].OverallMass);
        }
      }
      this.mar = +marMass;
      console.log(marMass);
      console.log(this.mar);
    })
  })

  // April
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          aprMass = +aprMass + +parseFloat(this.apruserArray[keyapr].OverallMass);
          this.apr = +this.apr + +aprMass;
          console.log(this.apr);
        }
      }
    })
  })

  // May
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          mayMass = +mayMass + +parseFloat(this.mayuserArray[keymay].OverallMass);
          this.may = +this.may + +mayMass;
          console.log(this.may);
        }
      }
    })
  })

  // June
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          junMass = +junMass + +parseFloat(this.junuserArray[keyjun].OverallMass);
          this.jun = +this.jun + +junMass;
          console.log(this.jun);
        }
      }
    })
  })

  // July
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          julMass = +julMass + +parseFloat(this.juluserArray[keyjul].OverallMass);
          this.jul = +this.jul + +julMass;
          console.log(this.jul);
        }
      }
    })
  })

  // August
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          augMass = +augMass + +parseFloat(this.auguserArray[keyaug].OverallMass);
          this.aug = +this.aug + +augMass; 
          console.log(this.aug);
        }
      }
    })
  })

  // September
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          sepMass = +sepMass + +parseFloat(this.sepuserArray[keysep].OverallMass);
          this.sep = +this.sep + +sepMass;
          console.log(this.sep);
        }
      }
    })
  })

  // October
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          octMass = +octMass + +parseFloat(this.octuserArray[keyoct].OverallMass);
          this.oct = +this.oct + +octMass;
          console.log(this.oct);
        }
      }
    })
  })

  // November
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          novMass = +novMass + +parseFloat(this.novuserArray[keynov].OverallMass);
          this.nov = +this.nov + +novMass;
          console.log(this.nov);
        }
      }
    })
  })

  // December
  this.db.collection('reclaimersMass').where("reclaimerID", "==", id).onSnapshot(snap => {
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
          decMass = +decMass + +parseFloat(this.decuserArray[keydec].OverallMass);
          this.dec = +this.dec + +decMass; 
          console.log(this.dec);
        }
      }
    })
  })

}
switchBack() {
  document.getElementById('driverDetailz').style.display = 'none';
  document.getElementById('reclaimer-123').style.display = 'flex';
}
// createLineChart() {
//   this.bars= new Chart(this.barChart.nativeElement, {
 
//     type: 'line',
//     data: {
//       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//       datasets: [{
//         label: 'Material Delivered',
//         data: [this.jan, this.feb, this.mar, this.apr, this.may, 
//               this.jun, this.jul, this.aug, this.sep, this.oct,
//               this.nov, this.dec],
//         backgroundColor: '#ffd7e9', // array should have same number of elements as number of dataset
//         borderColor: '#ffd7e9',// array should have same number of elements as number of dataset
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });
// }


}