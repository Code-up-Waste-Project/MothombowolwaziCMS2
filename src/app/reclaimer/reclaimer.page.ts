import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
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
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-reclaimer',
  templateUrl: './reclaimer.page.html',
  styleUrls: ['./reclaimer.page.scss'],
})
export class ReclaimerPage implements OnInit {

  db = firebase.firestore();

  name;
  surname;
  contact;
  address;
  time;
  id;

  names;
  surnames;
  contacts;
  addresss;

  prices;
  getprice;

  overallMass;
  OverallSubTotal;
  OverallVat;
  OverallGrandTotal;
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
  recordreclaimerdisplays = [];

  pdfObj = null;

  UserArray = {};

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
    this.coemBack();
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
    console.log(this.selectedCat);
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
    private fileOpener: FileOpener
  ) {
    this.getprices();
    this.getMasses();

    // pulling for admin
    this.db.collection('admin').onSnapshot(snapshot => {
      // this.Newadmin = [];
      snapshot.forEach(Element => {
        this.admin.push(Element.data());
      });
      this.admin.forEach(item => {
        if (item.userid === firebase.auth().currentUser.uid) {
          this.Newadmin.push(item);
        }
      });
      // console.log('Newadmins', this.Newadmin);
    });

    // pulling from reclaimers
    this.db.collection('reclaimers').onSnapshot(snapshot => {
      this.testArrays = [];
      snapshot.forEach(element => {
        let id = {};
        let reclaimername = {};
        let reclaimersurname = {};
        let reclaimerDate = {};
        let name = {};
        let surname = {};
        let contact = {};
        let address = {};
        let OverallGrandTotal = {};

        id = this.id = element.id;
        reclaimername = this.reclaimername = element.data().name;
        reclaimersurname = this.reclaimersurname = element.data().surname;
        reclaimerDate = this.reclaimerDate = element.data().date;

        name = this.name = element.data().name;
        surname = this.surname = element.data().surname;
        contact = this.contact = element.data().contact;
        address = this.address = element.data().address;
        OverallGrandTotal = this.OverallGrandTotal = element.data().OverallGrandTotal;

        this.usersz.push(contact)

        this.newreclaimer = [];
        this.newreclaimer.push({
          id: id,
          reName: reclaimername,
          reSurname: reclaimersurname,
          reDate: reclaimerDate,
        });
        // console.log(this.newreclaimer);

        this.testArrays.push({
          id: id,
          name: this.name,
          surname: this.surname,
          contact: this.contact,
          address: this.address,
          OverallGrandTotal: this.OverallGrandTotal
        })

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
      names : ['', [Validators.required, Validators.maxLength(15)]],
      surnames : ['', [Validators.required, Validators.maxLength(15)]],
      // contacts : ['', [Validators.required, Validators.maxLength(10)]],
      addresss : ['', [Validators.required, , Validators.maxLength(40)]],
    });
   }

  ngOnInit() {
  }

  checkPhoneInput() {
    // calling firebase
    // this.contact[0] == '0'
    if (this.contacts[0] != '0') {
      this.presentAlertPhoneValidation();
    } else {
      this.showInputs()
    }
    // .then((data) => {
    //   console.log(data);
    // }).catch((error) => {
    //   var errorCode = error.code;
    //   var errorCode = error.message;
    //   return errorCode;
    // });

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
            this.clearForm();
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  clearForm() {
    this.names = '';
    this.surnames = '';
    this.contacts = '';
    this.addresss = ''
  }

  async presentAlertDelete(id) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to Delete this record, Data will not be saved.</strong>!!!',
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
      message: '<strong>Are you sure you want add clicked user to form?</strong>!!!',
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
            // this.route.navigateByUrl('/reclaimer');
          }
        }
      ]
    });
    await alert.present();
  }

  AddUserToForm(id) {
    this.db.collection('reclaimers').doc(id).onSnapshot(element => {
      // element.forEach(element => {
        let name = {};
        let surname = {};
        let contact = {};
        let address = {};

        name = this.names = element.data().name;
        surname = this.surnames = element.data().surname;
        contact = this.contacts = element.data().contact;
        address = this.addresss = element.data().address;
        // })

        console.log(this.names);
        console.log(this.surnames);
        console.log(this.contacts);
        console.log(this.addresss);

        // adding data to textboxes
        this.names = this.names;
        this.surnames = this.surnames;
        this.contacts = this.contacts;
        this.addresss = this.addresss
      // })
  })

  this.nextClick()

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
      message: '<strong>No Data Was Input, Transaction will be Cancelled.</strong>!!!',
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

    // text boxes
    this.presentAlert();

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
    // console.log(this.GH001GrandTotal);

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

    // save to database
    this.Addreclaimer();

  }

  getprices() {
    this.getprice = this.db.collection('price').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.GH001 = element.data().gl001;
        this.HD001 = element.data().hd001;
        this.LD001 = element.data().ld001;
        this.LD003 = element.data().ld003;
        this.NFAL01 = element.data().nfalo1;
        this.PAP001 = element.data().pap001;
        this.PAP003 = element.data().pap003;
        this.PAP005 = element.data().pap005;
        this.PAP007 = element.data().pap007;
        this.PET001 = element.data().pet001;
        this.PET003 = element.data().pet003;
        this.PET005 = element.data().pet005;
        // console.log(element);
      });
      // console.log(this.GH001);
      // console.log(this.HD001);
      // console.log(this.LD003);
      // console.log(this.NFAL01);
      // console.log(this.PAP001);
      // console.log(this.PAP003);
      // console.log(this.PAP005);
      // console.log(this.PET001);
      // console.log(this.PET003);
      // console.log(this.PET005);
    });
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
    this.OverallGrandTotal = +this.GH001GrandTotal + +this.NFAL01GrandTotal + +this.PAP005GrandTotal + +this.PAP007GrandTotal + +this.PAP001GrandTotal + 
    +this.PAP003GrandTotal + +this.HD001GrandTotal + +this.LD001GrandTotal + +this.LD003GrandTotal + +this.PET001GrandTotal + +this.PET003GrandTotal + +this.PET005GrandTotal;
    // console.log(this.OverallGrandTotal);

    // overall GrandTotal
    this.OverallSubTotal = +this.GH001SubTotal + +this.NFAL01SubTotal + +this.PAP005SubTotal + +this.PAP007SubTotal + +this.PAP001SubTotal + 
    +this.PAP003SubTotal + +this.HD001SubTotal + +this.LD001SubTotal + +this.LD003SubTotal + +this.PET001SubTotal + +this.PET003SubTotal + +this.PET005SubTotal;
    // console.log(this.OverallSubTotal);

    // overall GrandTotal
    this.OverallVat = +this.GH001Vat + +this.NFAL01Vat + +this.PAP005Vat + +this.PAP007Vat + +this.PAP001Vat +
    +this.PAP003Vat + +this.HD001Vat + +this.LD001Vat + +this.LD003Vat + +this.PET001Vat + +this.PET003Vat + +this.PET005Vat;
    // console.log(this.OverallVat);
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
  }

  Addreclaimer() {
    this.db.collection('reclaimers').doc().set({
      date: new Date(),
      name: this.names,
      surname: this.surnames,
      address: this.addresss,
      contact: this.contacts,

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
      OverallGrandTotal: this.OverallGrandTotal,
    });
    // this.presentToast();
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
      message: '<strong>Are you sure you want to erase data? data will not be saved.</strong>!!!',
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


    togglePlastic() {
      // Changes the header tab
      document.getElementById("toPaper").style.display = "none";
      document.getElementById("toPlastic").style.display = "flex";
      document.getElementById("toAluminium").style.display = "none";
      document.getElementById("toGlass").style.display = "none";

      // Changes the color of the Paper tab
      document.getElementById("Paper").style.background = "white";
      document.getElementById("Paper").style.color = "black";

      // Changes the color of the Cans tab
      document.getElementById("Aluminium").style.background = "white";
      document.getElementById("Aluminium").style.color = "black";

      // Changes the color of the Glass tab
      document.getElementById("Glass").style.background = "white";
      document.getElementById("Glass").style.color = "black";

      // Changes the color of the Plastic tab
      document.getElementById("Plastic").style.background = "#568C0B";
      document.getElementById("Plastic").style.color = "white";;
    }
    togglePaper() {
     // Changes the header tab
     document.getElementById("toPaper").style.display = "flex";
     document.getElementById("toPlastic").style.display = "none";
     document.getElementById("toAluminium").style.display = "none";
     document.getElementById("toGlass").style.display = "none";

     // Changes the color of the Paper tab
     document.getElementById("Paper").style.background = "#568C0B";
     document.getElementById("Paper").style.color = "white";

     // Changes the color of the Cans tab
     document.getElementById("Aluminium").style.background = "white";
     document.getElementById("Aluminium").style.color = "black";

     // Changes the color of the Glass tab
     document.getElementById("Glass").style.background = "white";
     document.getElementById("Glass").style.color = "black";

     // Changes the color of the Plastic tab
     document.getElementById("Plastic").style.background = "white";
     document.getElementById("Plastic").style.color = "black";
    }
    toggleAluminium() {
       // Changes the header tab
       document.getElementById("toPaper").style.display = "none";
       document.getElementById("toPlastic").style.display = "none";
       document.getElementById("toAluminium").style.display = "flex";
       document.getElementById("toGlass").style.display = "none";

       // Changes the color of the Paper tab
       document.getElementById("Paper").style.background = "white";
       document.getElementById("Paper").style.color = "black";

       // Changes the color of the Cans tab
       document.getElementById("Aluminium").style.background = "#568C0B";
       document.getElementById("Aluminium").style.color = "white";

       // Changes the color of the Glass tab
       document.getElementById("Glass").style.background = "white";
       document.getElementById("Glass").style.color = "black";

       // Changes the color of the Plastic tab
       document.getElementById("Plastic").style.background = "white";
       document.getElementById("Plastic").style.color = "black";
    }
    toggleGlass() {
    // Changes the header tab
    document.getElementById("toPaper").style.display = "none";
    document.getElementById("toPlastic").style.display = "none";
    document.getElementById("toAluminium").style.display = "none";
    document.getElementById("toGlass").style.display = "flex";

    // Changes the color of the Paper tab
    document.getElementById("Paper").style.background = "white";
    document.getElementById("Paper").style.color = "black";

    // Changes the color of the Cans tab
    document.getElementById("Aluminium").style.background = "white";
    document.getElementById("Aluminium").style.color = "black";

    // Changes the color of the Glass tab
    document.getElementById("Glass").style.background = "#568C0B";
    document.getElementById("Glass").style.color = "white";

    // Changes the color of the Plastic tab
    document.getElementById("Plastic").style.background = "white";
    document.getElementById("Plastic").style.color = "black";
    }
    toggleReclaimer() {
      // Changes the header tab
      document.getElementById("toPaper").style.display = "none";
      document.getElementById("toPlastic").style.display = "none";
      document.getElementById("toAluminium").style.display = "none";
      document.getElementById("toGlass").style.display = "flex";

      // Changes the color of the Paper tab
      document.getElementById("Paper").style.background = "white";
      document.getElementById("Paper").style.color = "black";

      // Changes the color of the Cans tab
      document.getElementById("Aluminium").style.background = "white";
      document.getElementById("Aluminium").style.color = "black";

      // Changes the color of the Glass tab
      document.getElementById("Glass").style.background = "#568C0B";
      document.getElementById("Glass").style.color = "white";

      // Changes the color of the Plastic tab
      document.getElementById("Plastic").style.background = "white";
      document.getElementById("Plastic").style.color = "black";
      }
    motherDiv = document.getElementsByClassName("Mother") as HTMLCollectionOf <HTMLElement>;

  goAway() {
    // this.motherDiv[0].style.display = "none";
    this.selectedCat = "";
  }

  coemBack() {
    this.motherDiv[0].style.display = "block";
  }

  driverInfo: boolean = false;
  group1 = document.getElementsByClassName("Group1") as HTMLCollectionOf <HTMLElement>
  nextClick(){
    this.driverInfo = true;
    this.group1[0].style.left = "10px";
    this.group1[0].style.width = "40%"
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    console.log(val);
    if (val && val.trim() != "") {
      this.searchResults = this.usersz.filter(item => {
        return item.toString().indexOf(val.toString().toLowerCase()) > -1;
      });
      console.log('Results = ',this.searchResults);
    } else if (val != " ") {
      this.searchResults = this.usersz.filter(item => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else if (val == "") {
      this.searchResults = [];
    }

    // console.log(this.usersz);
    // console.log(this.searchResults);
    
  }

  selectLocation(location) {
    this.userLocation = location;
    this.searchResults = [];
    console.log(this.userLocation);
    console.log(location);

    this.db.collection('reclaimers').where("contact","==",location).onSnapshot(element => {
      element.forEach(element => {
        let name = {};
        let surname = {};
        let contact = {};
        let address = {};

        name = this.names = element.data().name;
        surname = this.surnames = element.data().surname;
        contact = this.contacts = element.data().contact;
        address = this.addresss = element.data().address;
        })

        // console.log(this.names);
        // console.log(this.surnames);
        // console.log(this.contacts);
        // console.log(this.addresss);

        // adding data to textboxes
        this.names = this.names;
        this.surnames = this.surnames;
        this.contacts = this.contacts;
        this.addresss = this.addresss
      // })

  })

  // angular.json  code (do not delete)
  // {
  //   "glob": "**/*",
  //   "input": "node_modules/ionic4-auto-complete/assets/",
  //   "output": "./assets/"
  // }

}
}