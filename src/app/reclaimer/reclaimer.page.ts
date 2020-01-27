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

  newreclaimer = [];
  reclaimername;
  reclaimersurname;
  reclaimerDate;

  pdfObj = null;

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
      this.newreclaimer = [];
      snapshot.forEach(element => {
        let id = {};
        let reclaimername = {};
        let reclaimersurname = {};
        let reclaimerDate = {};

        id = this.id = element.id;
        reclaimername = this.reclaimername = element.data().name;
        reclaimersurname = this.reclaimersurname = element.data().surname;
        reclaimerDate = this.reclaimerDate = element.data().date;

        // this.newreclaimer = [];
        this.newreclaimer.push({
          id: id,
          reName: reclaimername,
          reSurname: reclaimersurname,
          reDate: reclaimerDate,
        });
        // console.log(this.newreclaimer);
      });
    });

    this.RegisterForm = formGroup.group({
      name : ['', [Validators.required, Validators.maxLength(15)]],
      surname : ['', [Validators.required, Validators.maxLength(15)]],
      contact : ['', [Validators.required, Validators.maxLength(10)]],
      address : ['', [Validators.required, , Validators.maxLength(40)]],
    });

    // calling firebase
    this.pdfmakerFirebase();

   }

  ngOnInit() {
  }

  pdfmakerFirebase() {
    // pulling data from database
    this.db.collection('reclaimers').onSnapshot(element => {
      element.forEach(element => {
        let name = {};
        let surname = {};
        let contact = {};
        let address = {};
        let time = {};

        let overallMass = {};
        let OverallSubTotal = {};
        let OverallVat = {};
        let OverallGrandTotal = {};

        let GH001 = {};
        let NFAL01 = {};
        let PAP005 = {};
        let PAP007 = {};
        let PAP001 = {};
        let PAP003 = {};
        let HD001 = {};
        let LD001 = {};
        let LD003 = {};
        let PET001 = {};
        let PET003 = {};
        let PET005 = {};

        let GH001mass = {};
        let NFAL01mass = {};
        let PAP005mass = {};
        let PAP007mass = {};
        let PAP001mass = {};
        let PAP003mass = {};
        let HD001mass = {};
        let LD001mass = {};
        let LD003mass = {};
        let PET001mass = {};
        let PET003mass = {};
        let PET005mass = {};

        // Inputs
        let GH001price = {};
        let NFAL01price = {};
        let PAP005price = {};
        let PAP007price = {};
        let PAP001price = {};
        let PAP003price = {};
        let HD001price = {};
        let LD001price = {};
        let LD003price = {};
        let PET001price = {};
        let PET003price = {};
        let PET005price = {};

        // GH001
        let GH001SubTotal = {};
        let GH001Vat = {};
        let GH001GrandTotal = {};

        // NFAL01;
        let NFAL01SubTotal = {};
        let NFAL01Vat = {};
        let NFAL01GrandTotal = {};

        // PAP005;
        let PAP005SubTotal = {};
        let PAP005Vat = {};
        let PAP005GrandTotal = {};

        // PAP007;
        let PAP007SubTotal = {};
        let PAP007Vat = {};
        let PAP007GrandTotal = {};

        // PAP001;
        let PAP001SubTotal = {};
        let PAP001Vat = {};
        let PAP001GrandTotal = {};

        // PAP003;
        let PAP003SubTotal = {};
        let PAP003Vat = {};
        let PAP003GrandTotal = {};

        // HD001;
        let HD001SubTotal = {};
        let HD001Vat = {};
        let HD001GrandTotal = {};

        // LD001;
        let LD001SubTotal = {};
        let LD001Vat = {};
        let LD001GrandTotal = {};

        // LD003;
        let LD003SubTotal = {};
        let LD003Vat = {};
        let LD003GrandTotal = {};

        // PET001;
        let PET001SubTotal = {};
        let PET001Vat = {};
        let PET001GrandTotal = {};

        // PET003;
        let PET003SubTotal = {};
        let PET003Vat = {};
        let PET003GrandTotal = {};

        // PET005;
        let PET005SubTotal = {};
        let PET005Vat = {};
        let PET005GrandTotal = {};

        // user infor
        this.id = element.id;
        // console.log(this.ids);

        time = this.time = element.data().time;

        name = this.name = element.data().name;
        surname = this.surname = element.data().surname;
        contact = this.contact = element.data().contact;
        address = this.address = element.data().address;
        // console.log(this.name);
        // console.log(this.surname);
        // console.log(this.contact);
        // console.log(this.address);

        // Logistic infor
        overallMass = this.overallMass = element.data().OverallMass;
        this.overallMassz = (String(overallMass).substring(0, 6));
        OverallSubTotal = this.OverallSubTotal = element.data().OverallSubTotal;
        this.OverallSubTotalz = (String(OverallSubTotal).substring(0, 6));
        OverallVat = this.OverallVat = element.data().OverallVat;
        this.OverallVatz = (String(OverallVat).substring(0, 6));
        OverallGrandTotal = this.OverallGrandTotal = element.data().OverallGrandTotal;
        this.OverallGrandTotalz = (String(OverallGrandTotal).substring(0, 6));
        // console.log(this.overallMass);
        // console.log(this.OverallSubTotal);
        // console.log(this.OverallVat);
        // console.log(this.OverallGrandTotal);
        // console.log(this.overallMassz);
        // console.log(this.OverallSubTotalz);
        // console.log(this.OverallVatz);
        // console.log(this.OverallGrandTotalz);

        // prices
        GH001 = this.GH001 = element.data().GH001;
        NFAL01 = this.NFAL01 = element.data().NFAL01;
        PAP005 = this.PAP005 = element.data().PAP005;
        PAP007 = this.PAP007 = element.data().PAP007;
        PAP001 = this.PAP001 = element.data().PAP001;
        this.PAP001z = (String(PAP001).substring(0, 6));
        PAP003 = this.PAP003 = element.data().PAP003;
        HD001 = this.HD001 = element.data().HD001;
        LD001 = this.LD001 = element.data().LD001;
        LD003 = this.LD003 = element.data().LD003;
        PET001 = this.PET001 = element.data().PET001;
        PET003 = this.PET003 = element.data().PET003;
        PET005 = this.PET005 = element.data().PEP005;
        // console.log(this.GH001);
        // console.log(this.NFAL01);
        // console.log(this.PAP005);
        // console.log(this.PAP007);
        // console.log(this.PAP001);
        // console.log(this.PAP003);
        // console.log(this.HD001);
        // console.log(this.LD001);
        // console.log(this.LD003);
        // console.log(this.PET001);
        // console.log(this.PET003);
        // console.log(this.PET005);

        // mass
        GH001mass = this.GH001mass = element.data().GH001Mass;
        NFAL01mass = this.NFAL01mass = element.data().NFAL01Mass;
        PAP005mass = this.PAP005mass = element.data().PAP005Mass;
        PAP007mass = this.PAP007mass = element.data().PAP007Mass;
        PAP001mass = this.PAP001mass = element.data().PAP001Mass;
        PAP003mass = this.PAP003mass = element.data().PAP003Mass;
        HD001mass = this.HD001mass = element.data().HD001Mass;
        LD001mass = this.LD001mass = element.data().LD001Mass;
        LD003mass = this.LD003mass = element.data().LD003Mass;
        PET001mass = this.PET001mass = element.data().PET001Mass;
        PET003mass = this.PET003mass = element.data().PET003Mass;
        PET005mass = this.PET005mass = element.data().PEP005Mass;
        // console.log(this.GH001mass);
        // console.log(this.NFAL01mass);
        // console.log(this.PAP005mass);
        // console.log(this.PAP007mass);
        // console.log(this.PAP001mass);
        // console.log(this.PAP003mass);
        // console.log(this.HD001mass);
        // console.log(this.LD001mass);
        // console.log(this.LD003mass);
        // console.log(this.PET001mass);
        // console.log(this.PET003mass);
        // console.log(this.PET005mass);

        // get prices
        GH001price = this.GH001price = element.data().GH001Price;
        this.GH001pricez = (String(GH001price).substring(0, 6));
        NFAL01price = this.NFAL01price = element.data().NFAL01Price;
        this.NFAL01pricez = (String(NFAL01price).substring(0, 6));
        PAP005price = this.PAP005price = element.data().PAP005Price;
        this.PAP005pricez = (String(PAP005price).substring(0, 6));
        PAP007price = this.PAP007price = element.data().PAP007Price;
        this.PAP007pricez = (String(PAP007price).substring(0, 6));
        PAP001price = this.PAP001price = element.data().PAP001Price;
        this.PAP001pricez = (String(PAP001price).substring(0, 6));
        PAP003price = this.PAP003price = element.data().PAP003Price;
        this.PAP003pricez = (String(PAP003price).substring(0, 6));
        HD001price = this.HD001price = element.data().HD001Price;
        this.HD001pricez = (String(HD001price).substring(0, 6));
        LD001price = this.LD001price = element.data().LD001Price;
        this.LD001pricez = (String(LD001price).substring(0, 6));
        LD003price = this.LD003price = element.data().LD003Price;
        this.LD003pricez = (String(LD003price).substring(0, 6));
        PET001price = this.PET001price = element.data().PET001Price;
        this.PET001pricez = (String(PET001price).substring(0, 6));
        PET003price = this.PET003price = element.data().PET003Price;
        this.PET003pricez = (String(PET003price).substring(0, 6));
        PET005price = this.PET005price = element.data().PEP005Price;
        this.PET005pricez = (String(PET005price).substring(0, 6));
        // console.log(this.GH001price);
        // console.log(this.NFAL01price);
        // console.log(this.PAP005price);
        // console.log(this.PAP007price);
        // console.log(this.PAP001price);
        // console.log(this.PAP003price);
        // console.log(this.HD001price);
        // console.log(this.LD001price);
        // console.log(this.LD003price);
        // console.log(this.PET001price);
        // console.log(this.PET003price);
        // console.log(this.PET005price);
        // console.log(this.GH001pricez);
        // console.log(this.NFAL01pricez);
        // console.log(this.PAP005pricez);
        // console.log(this.PAP007pricez);
        // console.log(this.PAP001pricez);
        // console.log(this.PAP003pricez);
        // console.log(this.HD001pricez);
        // console.log(this.LD001pricez);
        // console.log(this.LD003pricez);
        // console.log(this.PET001pricez);
        // console.log(this.PET003pricez);
        // console.log(this.PET005pricez);

        // tractionsation data
        // GH001
        GH001SubTotal = this.GH001SubTotal = element.data().GH001SubTotal;
        this.GH001SubTotalz = (String(GH001SubTotal).substring(0, 6));
        GH001Vat = this.GH001Vat = element.data().GH001Vat;
        this.GH001Vatz = (String(GH001Vat).substring(0, 6));
        GH001GrandTotal = this.GH001GrandTotal = element.data().GH001;
        this.GH001GrandTotalz = (String(GH001GrandTotal).substring(0, 6));
        // console.log(this.GH001SubTotal);
        // console.log(this.GH001Vat);
        // console.log(this.GH001);
        // console.log(this.GH001SubTotalz);
        // console.log(this.GH001Vatz);
        // console.log(this.GH001GrandTotalz);

        // NFAL01;
        NFAL01SubTotal = this.NFAL01SubTotal = element.data().NFAL01SubTotal;
        this.NFAL01SubTotalz = (String(NFAL01SubTotal).substring(0, 6));
        NFAL01Vat = this.NFAL01Vat = element.data().NFAL01Vat;
        this.NFAL01Vatz = (String(NFAL01Vat).substring(0, 6));
        NFAL01GrandTotal = this.NFAL01GrandTotal = element.data().NFAL01;
        this.NFAL01GrandTotalz = (String(NFAL01GrandTotal).substring(0, 6));
        // console.log(this.NFAL01SubTotal);
        // console.log(this.NFAL01Vat);
        // console.log(this.NFAL01GrandTotal);
        // console.log(this.NFAL01SubTotalz);
        // console.log(this.NFAL01Vatz);
        // console.log(this.NFAL01GrandTotalz);

        // PAP005;
        PAP005SubTotal = this.PAP005SubTotal = element.data().PAP005SubTotal;
        this.PAP005SubTotalz = (String(PAP005SubTotal).substring(0, 6));
        PAP005Vat = this.PAP005Vat = element.data().PAP005Vat;
        this.PAP005Vatz = (String(PAP005Vat).substring(0, 6));
        PAP005GrandTotal = this.PAP005GrandTotal = element.data().PAP005;
        this.PAP005GrandTotalz = (String(PAP005GrandTotal).substring(0, 6));
        // console.log(this.PAP005SubTotal);
        // console.log(this.PAP005Vat);
        // console.log(this.PAP005GrandTotal);
        // console.log(this.PAP005SubTotalz);
        // console.log(this.PAP005Vatz);
        // console.log(this.PAP005GrandTotalz);

        // PAP007;
        PAP007SubTotal = this.PAP007SubTotal = element.data().PAP007SubTotal;
        this.PAP007SubTotalz = (String(PAP007SubTotal).substring(0, 6));
        PAP007Vat = this.PAP007Vat = element.data().PAP007Vat;
        this.PAP007Vatz = (String(PAP007Vat).substring(0, 6));
        PAP007GrandTotal = this.PAP007GrandTotal = element.data().PAP007;
        this.PAP007GrandTotalz = (String(PAP007GrandTotal).substring(0, 6));
        // console.log(this.PAP007SubTotal);
        // console.log(this.PAP007Vat);
        // console.log(this.PAP007GrandTotal);
        // console.log(this.PAP007SubTotalz);
        // console.log(this.PAP007Vatz);
        // console.log(this.PAP007GrandTotalz);

        // PAP001;
        PAP001SubTotal = this.PAP001SubTotal = element.data().PAP001SubTotal;
        this.PAP001SubTotalz = (String(PAP001SubTotal).substring(0, 6));
        PAP001Vat = this.PAP001Vat = element.data().PAP001Vat;
        this.PAP001Vatz = (String(PAP001Vat).substring(0, 6));
        PAP001GrandTotal = this.PAP001GrandTotal = element.data().PAP001;
        this.PAP001GrandTotalz = (String(PAP001GrandTotal).substring(0, 6));
        // console.log(this.PAP001SubTotal);
        // console.log(this.PAP001Vat);
        // console.log(this.PAP001GrandTotal);
        // console.log(this.PAP001SubTotalz);
        // console.log(this.PAP001Vatz);
        // console.log(this.PAP001GrandTotalz);

        // PAP003;
        PAP003SubTotal = this.PAP003SubTotal = element.data().PAP003SubTotal;
        this.PAP003SubTotalz = (String(PAP003SubTotal).substring(0, 6));
        PAP003Vat = this.PAP003Vat = element.data().PAP003Vat;
        this.PAP003Vatz = (String(PAP003Vat).substring(0, 6));
        PAP003GrandTotal = this.PAP003GrandTotal = element.data().PAP003;
        this.PAP003GrandTotalz = (String(PAP003GrandTotal).substring(0, 6));
        // console.log(this.PAP003SubTotal);
        // console.log(this.PAP003Vat);
        // console.log(this.PAP003GrandTotal);
        // console.log(this.PAP003SubTotalz);
        // console.log(this.PAP003Vatz);
        // console.log(this.PAP003GrandTotalz);

        // HD001;
        HD001SubTotal = this.HD001SubTotal = element.data().HD001SubTotal;
        this.HD001SubTotalz = (String(HD001SubTotal).substring(0, 6));
        HD001Vat = this.HD001Vat = element.data().HD001Vat;
        this.HD001Vatz = (String(HD001Vat).substring(0, 6));
        HD001GrandTotal = this.HD001GrandTotal = element.data().HD001;
        this.HD001GrandTotalz = (String(HD001GrandTotal).substring(0, 6));
        // console.log(this.HD001SubTotal);
        // console.log(this.HD001Vat);
        // console.log(this.HD001GrandTotal);
        // console.log(this.HD001SubTotalz);
        // console.log(this.HD001Vatz);
        // console.log(this.HD001GrandTotalz);

        // LD001;
        LD001SubTotal = this.LD001SubTotal = element.data().LD001SubTotal;
        this.LD001SubTotalz = (String(LD001SubTotal).substring(0, 6));
        LD001Vat = this.LD001Vat = element.data().LD001Vat;
        this.LD001Vatz = (String(LD001Vat).substring(0, 6));
        LD001GrandTotal = this.LD001GrandTotal = element.data().LD001;
        this.LD001GrandTotalz = (String(LD001GrandTotal).substring(0, 6));
        // console.log(this.LD001SubTotal);
        // console.log(this.LD001Vat);
        // console.log(this.LD001GrandTotal);
        // console.log(this.LD001SubTotalz);
        // console.log(this.LD001Vatz);
        // console.log(this.LD001GrandTotalz);

        // LD003;
        LD003SubTotal = this.LD003SubTotal = element.data().LD003SubTotal;
        this.LD003SubTotalz = (String(LD003SubTotal).substring(0, 6));
        LD003Vat = this.LD003Vat = element.data().LD003Vat;
        this.LD003Vatz = (String(LD003Vat).substring(0, 6));
        LD003GrandTotal = this.LD003GrandTotal = element.data().LD003;
        this.LD003GrandTotalz = (String(LD003GrandTotal).substring(0, 6));
        // console.log(this.LD003SubTotal);
        // console.log(this.LD003Vat);
        // console.log(this.LD003GrandTotal);
        // console.log(this.LD003SubTotalz);
        // console.log(this.LD003Vatz);
        // console.log(this.LD003GrandTotalz);

        // PET001;
        PET001SubTotal = this.PET001SubTotal = element.data().PET001SubTotal;
        this.PET001SubTotalz = (String(PET001SubTotal).substring(0, 6));
        PET001Vat = this.PET001Vat = element.data().PET001Vat;
        this.PET001Vatz = (String(PET001Vat).substring(0, 6));
        PET001GrandTotal = this.PET001GrandTotal = element.data().PET001;
        this.PET001GrandTotalz = (String(PET001GrandTotal).substring(0, 6));
        // console.log(this.PET001SubTotal);
        // console.log(this.PET001Vat);
        // console.log(this.PET001GrandTotal);
        // console.log(this.PET001SubTotalz);
        // console.log(this.PET001Vatz);
        // console.log(this.PET001GrandTotalz);

        // PET003;
        PET003SubTotal = this.PET003SubTotal = element.data().PET003SubTotal;
        this.PET003SubTotalz = (String(PET003SubTotal).substring(0, 6));
        PET003Vat = this.PET003Vat = element.data().PET003Vat;
        this.PET003Vatz = (String(PET003Vat).substring(0, 6));
        PET003GrandTotal = this.PET003GrandTotal = element.data().PET003;
        this.PET003GrandTotalz = (String(PET003GrandTotal).substring(0, 6));
        // console.log(this.PET003SubTotal);
        // console.log(this.PET003Vat);
        // console.log(this.PET003GrandTotal);
        // console.log(this.PET003SubTotalz);
        // console.log(this.PET003Vatz);
        // console.log(this.PET003GrandTotalz);

        // PET005;
        PET005SubTotal = this.PET005SubTotal = element.data().PEP005SubTotal;
        this.PET005SubTotalz = (String(PET005SubTotal).substring(0, 6));
        PET005Vat = this.PET005Vat = element.data().PEP005Vat;
        this.PET005Vatz = (String(PET005Vat).substring(0, 6));
        PET005GrandTotal = this.PET005GrandTotal = element.data().PEP005;
        this.PET005GrandTotalz = (String(PET005GrandTotal).substring(0, 6));
        // console.log(this.PET005SubTotal);
        // console.log(this.PET005Vat);
        // console.log(this.PET005GrandTotal);
        // console.log(this.PET005SubTotalz);
        // console.log(this.PET005Vatz);
        // console.log(this.PET005GrandTotalz);

        this.testArray.push({
          id: this.id,
          name: name,
          surname: surname,
          contact: contact,
          address: address,
          overallMass: overallMass,
          OverallSubTotal: OverallSubTotal,
          OverallVat: OverallVat,
          OverallGrandTotal: OverallGrandTotal,
          GH001: GH001,
          NFAL01: NFAL01,
          PAP005: PAP005,
          PAP007: PAP007,
          PAP001: PAP001,
          PAP003: PAP003,
          HD001: HD001,
          LD001: LD001,
          LD003: LD003,
          PET001: PET001,
          PET003: PET003,
          PET005: PET005,
          GH001mass: GH001mass,
          NFAL01mass: NFAL01mass,
          PAP005mass: PAP005mass,
          PAP007mass: PAP007mass,
          PAP001mass: PAP001mass,
          PAP003mass: PAP003mass,
          HD001mass: HD001mass,
          LD001mass: LD001mass,
          LD003mass: LD003mass,
          PET001mass: PET001mass,
          PET003mass: PET003mass,
          PET005mass: PET005mass,
          GH001price: GH001price,
          NFAL01price: NFAL01price,
          PAP005price: PAP005price,
          PAP007price: PAP007price,
          PAP001price: PAP001price,
          PAP003price: PAP003price,
          HD001price: HD001price,
          LD001price: LD001price,
          LD003price: LD003price,
          PET001price: PET001price,
          PET003price: PET003price,
          PET005price: PET005price,
          GH001SubTotal: GH001SubTotal,
          GH001Vat: GH001Vat,
          GH001GrandTotal: GH001GrandTotal,
          NFAL01SubTotal: NFAL01SubTotal,
          NFAL01Vat: NFAL01Vat,
          NFAL01GrandTotal: NFAL01GrandTotal,
          PAP005SubTotal: PAP005SubTotal,
          PAP005Vat: PAP005Vat,
          PAP005GrandTotal: PAP005GrandTotal,
          PAP007SubTotal: PAP007SubTotal,
          PAP007Vat: PAP007Vat,
          PAP007GrandTotal: PAP007GrandTotal,
          PAP001SubTotal: PAP001SubTotal,
          PAP001Vat: PAP001Vat,
          PAP001GrandTotal: PAP001GrandTotal,
          PAP003SubTotal: PAP003SubTotal,
          PAP003Vat: PAP003Vat,
          PAP003GrandTotal: PAP003GrandTotal,
          HD001SubTotal: HD001SubTotal,
          HD001Vat: HD001Vat,
          HD001GrandTotal: HD001GrandTotal,
          LD001SubTotal: LD001SubTotal,
          LD001Vat: LD001Vat,
          LD001GrandTotal: LD001GrandTotal,
          LD003SubTotal: LD003SubTotal,
          LD003Vat: LD003Vat,
          LD003GrandTotal: LD003GrandTotal,
          PET001SubTotal: PET001SubTotal,
          PET001Vat: PET001Vat,
          PET001GrandTotal: PET001GrandTotal,
          PET003SubTotal: PET003SubTotal,
          PET003Vat: PET003Vat,
          PET003GrandTotal: PET003GrandTotal,
          PET005SubTotal: PET005SubTotal,
          PET005Vat: PET005Vat,
          PET005GrandTotal: PET005GrandTotal,
        });

        this.PDFArray = {
          overallMass: overallMass,
          OverallSubTotal: OverallSubTotal,
          OverallVat: OverallVat,
          OverallGrandTotal: OverallGrandTotal,

          GH001: GH001,
          NFAL01: NFAL01,
          PAP005: PAP005,
          PAP007: PAP007,
          PAP001: PAP001,
          PAP003: PAP003,
          HD001: HD001,
          LD001: LD001,
          LD003: LD003,
          PET001: PET001,
          PET003: PET003,
          PET005: PET005,

          GH001mass: GH001mass,
          NFAL01mass: NFAL01mass,
          PAP005mass: PAP005mass,
          PAP007mass: PAP007mass,
          PAP001mass: PAP001mass,
          PAP003mass: PAP003mass,
          HD001mass: HD001mass,
          LD001mass: LD001mass,
          LD003mass: LD003mass,
          PET001mass: PET001mass,
          PET003mass: PET003mass,
          PET005mass: PET005mass,

          GH001price: GH001price,
          NFAL01price: NFAL01price,
          PAP005price: PAP005price,
          PAP007price: PAP007price,
          PAP001price: PAP001price,
          PAP003price: PAP003price,
          HD001price: HD001price,
          LD001price: LD001price,
          LD003price: LD003price,
          PET001price: PET001price,
          PET003price: PET003price,
          PET005price: PET005price,

          GH001SubTotal: GH001SubTotal,
          NFAL01SubTotal: NFAL01SubTotal,
          PAP005SubTotal: PAP005SubTotal,
          PAP007SubTotal: PAP007SubTotal,
          PAP001SubTotal: PAP001SubTotal,
          PAP003SubTotal: PAP003SubTotal,
          HD001SubTotal: HD001SubTotal,
          LD001SubTotal: LD001SubTotal,
          LD003SubTotal: LD003SubTotal,
          PET001SubTotal: PET001SubTotal,
          PET003SubTotal: PET003SubTotal,
          PET005SubTotal: PET005SubTotal,

          GH001Vat: GH001Vat,
          NFAL01Vat: NFAL01Vat,
          PAP005Vat: PAP005Vat,
          PAP007Vat: PAP007Vat,
          PAP001Vat: PAP001Vat,
          PAP003Vat: PAP003Vat,
          HD001Vat: HD001Vat,
          LD001Vat: LD001Vat,
          LD003Vat: LD003Vat,
          PET001Vat: PET001Vat,
          PET003Vat: PET003Vat,
          PET005Vat: PET005Vat,

          GH001GrandTotal: GH001GrandTotal,
          NFAL01GrandTotal: NFAL01GrandTotal,
          PAP005GrandTotal: PAP005GrandTotal,
          PAP007GrandTotal: PAP007GrandTotal,
          PAP001GrandTotal: PAP001GrandTotal,
          PAP003GrandTotal: PAP003GrandTotal,
          HD001GrandTotal: HD001GrandTotal,
          LD001GrandTotal: LD001GrandTotal,
          LD003GrandTotal: LD003GrandTotal,
          PET001GrandTotal: PET001GrandTotal,
          PET003GrandTotal: PET003GrandTotal,
          PET005GrandTotal: PET005GrandTotal,
        };

        // PDFOverallz
        this.PDFOverallMass = {
          overallMass: overallMass
        };

        this.PDFOverallSubTotal = {
          OverallSubTotal: OverallSubTotal
        };

        this.PDFOverallVat = {
          OverallVat: OverallVat
        };

        this.PDFOverallGrandTotal = {
          OverallGrandTotal: OverallGrandTotal
        };

        // PDFPrices
        this.PDFPrices = {
          GH001price: GH001price,
          NFAL01price: NFAL01price,
          PAP005price: PAP005price,
          PAP007price: PAP007price,
          PAP001price: PAP001price,
          PAP003price: PAP003price,
          HD001price: HD001price,
          LD001price: LD001price,
          LD003price: LD003price,
          PET001price: PET001price,
          PET003price: PET003price,
          PET005price: PET005price
        };

        // PDFCodes
        this.PDFCodes = {
          GH001: GH001,
          NFAL01: NFAL01,
          PAP005: PAP005,
          PAP007: PAP007,
          PAP001: PAP001,
          PAP003: PAP003,
          HD001: HD001,
          LD001: LD001,
          LD003: LD003,
          PET001: PET001,
          PET003: PET003,
          PET005: PET005
        };

        // PDFSubTotals
        this.PDFSubTotals = {
          GH001SubTotal: GH001SubTotal,
          NFAL01SubTotal: NFAL01SubTotal,
          PAP005SubTotal: PAP005SubTotal,
          PAP007SubTotal: PAP007SubTotal,
          PAP001SubTotal: PAP001SubTotal,
          PAP003SubTotal: PAP003SubTotal,
          HD001SubTotal: HD001SubTotal,
          LD001SubTotal: LD001SubTotal,
          LD003SubTotal: LD003SubTotal,
          PET001SubTotal: PET001SubTotal,
          PET003SubTotal: PET003SubTotal,
          PET005SubTotal: PET005SubTotal
        };

        // PDFVats
        this.PDFVats = {
          GH001Vat: GH001Vat,
          NFAL01Vat: NFAL01Vat,
          PAP005Vat: PAP005Vat,
          PAP007Vat: PAP007Vat,
          PAP001Vat: PAP001Vat,
          PAP003Vat: PAP003Vat,
          HD001Vat: HD001Vat,
          LD001Vat: LD001Vat,
          LD003Vat: LD003Vat,
          PET001Vat: PET001Vat,
          PET003Vat: PET003Vat,
          PET005Vat: PET005Vat
        };

        // PDFGrandTotal
        this.PDFGrandTotal = {
          GH001GrandTotal: GH001GrandTotal,
          NFAL01GrandTotal: NFAL01GrandTotal,
          PAP005GrandTotal: PAP005GrandTotal,
          PAP007GrandTotal: PAP007GrandTotal,
          PAP001GrandTotal: PAP001GrandTotal,
          PAP003GrandTotal: PAP003GrandTotal,
          HD001GrandTotal: HD001GrandTotal,
          LD001GrandTotal: LD001GrandTotal,
          LD003GrandTotal: LD003GrandTotal,
          PET001GrandTotal: PET001GrandTotal,
          PET003GrandTotal: PET003GrandTotal,
          PET005GrandTotal: PET005GrandTotal
        };

        // PDFMass
        this.PDFMass = {
          GH001mass: GH001mass,
          NFAL01mass: NFAL01mass,
          PAP005mass: PAP005mass,
          PAP007mass: PAP007mass,
          PAP001mass: PAP001mass,
          PAP003mass: PAP003mass,
          HD001mass: HD001mass,
          LD001mass: LD001mass,
          LD003mass: LD003mass,
          PET001mass: PET001mass,
          PET003mass: PET003mass,
          PET005mass: PET005mass
        };

      });

      // create PDF for Download
      this.ForLoop();
      console.log('wola the im clicked');

    });
  }

  ForLoop() {
    console.log(this.PDFArray);
    console.log(this.PDFCodes);
    console.log(this.PDFPrices);
    console.log(this.PDFMass);
    console.log(this.PDFSubTotals);
    console.log(this.PDFVats);
    console.log(this.PDFGrandTotal);

    // all (old pdf)
    // tslint:disable-next-line: forin
    for (let key in this.PDFArray) {
      console.log(key);
      if (this.PDFArray[key] === '0') {
        console.log('Skipped because its 0');
      } else if (this.PDFArray[key] !== '0') {
        this.PDFArrayPrint.push({name : key, number : this.PDFArray[key]});
      }
    }
    console.log(this.PDFArrayPrint);

    // PDFCodes
    // tslint:disable-next-line: forin
    for (let key in this.PDFCodes) {
      console.log(key);
      // if (this.PDFCodes[key] === '0') {
      //   console.log('Skipped because its 0');
      // } else if (this.PDFCodes[key] !== '0') {
        this.PDFCodesPrint.push({name : key, number : this.PDFCodes[key]});
      // }
    }
    console.log(this.PDFCodesPrint);

    // PDFPrices
    // tslint:disable-next-line: forin
    for (let key in this.PDFPrices) {
      console.log(key);
      // if (this.PDFPrices[key] === '0') {
      //   console.log('Skipped because its 0');
      // } else if (this.PDFPrices[key] !== '0') {
        this.PDFPricesPrint.push({name : key, number : this.PDFPrices[key]});
      // }
    }
    console.log(this.PDFPricesPrint);

    // PDFMass
    // tslint:disable-next-line: forin
    for (let key in this.PDFMass) {
      console.log(key);
      if (this.PDFMass[key] === '0') {
        console.log('Skipped because its 0');
      } else if (this.PDFMass[key] !== '0') {
        this.PDFMassPrint.push({name : key, number : this.PDFMass[key]});
      }
    }
    console.log(this.PDFMassPrint);

    // PDFSubTotals
    // tslint:disable-next-line: forin
    for (let key in this.PDFSubTotals) {
      console.log(key);
      if (this.PDFSubTotals[key] === '0') {
        console.log('Skipped because its 0');
      } else if (this.PDFSubTotals[key] !== '0') {
        this.PDFSubTotalsPrint.push({name : key, number : this.PDFSubTotals[key]});
      }
    }
    console.log(this.PDFSubTotalsPrint);

    // PDFVats
    // tslint:disable-next-line: forin
    for (let key in this.PDFVats) {
      console.log(key);
      if (this.PDFVats[key] === '0') {
        console.log('Skipped because its 0');
      } else if (this.PDFVats[key] !== '0') {
        this.PDFVatsPrint.push({name : key, number : this.PDFVats[key]});
      }
    }
    console.log(this.PDFVatsPrint);

    // PDFGrandTotal
    // tslint:disable-next-line: forin
    for (let key in this.PDFGrandTotal) {
      console.log(key);
      if (this.PDFGrandTotal[key] === '0') {
        console.log('Skipped because its 0');
      } else if (this.PDFGrandTotal[key] !== '0') {
        this.PDFGrandTotalPrint.push({name : key, number : this.PDFGrandTotal[key]});
      }
    }
    console.log(this.PDFGrandTotalPrint);

    // PDFOverall Mass
    // tslint:disable-next-line: forin
    for (let key in this.PDFOverallMass) {
      console.log(key);
      this.PDFOverallMassPrint.push({name : key, number : this.PDFOverallMass[key]});
    }
    console.log(this.PDFOverallMassPrint);

    // PDFOverall SubTotal
    // tslint:disable-next-line: forin
    for (let key in this.PDFOverallSubTotal) {
      console.log(key);
      this.PDFOverallSubTotalPrint.push({name : key, number : this.PDFOverallSubTotal[key]});
    }
    console.log(this.PDFOverallSubTotalPrint);

    // PDFOverall Vat
    // tslint:disable-next-line: forin
    for (let key in this.PDFOverallVat) {
      console.log(key);
      this.PDFOverallVatPrint.push({name : key, number : this.PDFOverallVat[key]});
    }
    console.log(this.PDFOverallVatPrint);

    // PDFOverall Grand Total
    // tslint:disable-next-line: forin
    for (let key in this.PDFOverallGrandTotal) {
      console.log(key);
      this.PDFOverallGrandTotalPrint.push({name : key, number : this.PDFOverallGrandTotal[key]});
    }
    console.log(this.PDFOverallGrandTotalPrint);

    // create PDF for Download
    // this.createPdf();
    // this.downloadPdf();
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

  checkinputfields() {
    // GH001mass
    if (this.GH001mass === null) {
      this.GH001mass = 0;
    } else if (this.GH001mass === undefined) {
      this.GH001mass = 0;
    }
    // console.log(this.GH001mass);

    // NFAL01mass
    if (this.NFAL01mass === null) {
      this.NFAL01mass = 0;
    }
    if (this.NFAL01mass === undefined) {
      this.NFAL01mass = 0;
    }
    // console.log(this.NFAL01mass);

    // PAP005mass
    if (this.PAP005mass === null) {
      this.PAP005mass = 0;
    }
    if (this.PAP005mass === undefined) {
      this.PAP005mass = 0;
    }
    // console.log(this.PAP005mass);

    // PAP007mass
    if (this.PAP007mass === null) {
      this.PAP007mass = 0;
    }
    if (this.PAP007mass === undefined) {
      this.PAP007mass = 0;
    }
    // console.log(this.PAP007mass);

    // PAP001mass
    if (this.PAP001mass === null) {
      this.PAP001mass = 0;
    }
    if (this.PAP001mass === undefined) {
      this.PAP001mass = 0;
    }
    // console.log(this.PAP001mass);

    // PAP003mass
    if (this.PAP003mass === null) {
      this.PAP003mass = 0;
    }
    if (this.PAP003mass === undefined) {
      this.PAP003mass = 0;
    }
    // console.log(this.PAP003mass);

    // HD001mass
    if (this.HD001mass === null) {
      this.HD001mass = 0;
    }
    if (this.HD001mass === undefined) {
      this.HD001mass = 0;
    }
    // console.log(this.HD001mass);

    // LD001mass
    if (this.LD001mass === null) {
      this.LD001mass = 0;
    }
    if (this.LD001mass === undefined) {
      this.LD001mass = 0;
    }
    // console.log(this.LD001mass);

    // LD003mass
    if (this.LD003mass === null) {
      this.LD003mass = 0;
    }
    if (this.LD003mass === undefined) {
      this.LD003mass = 0;
    }
    // console.log(this.LD003mass);

    // PET001mass
    if (this.PET001mass === null) {
      this.PET001mass = 0;
    }
    if (this.PET001mass === undefined) {
      this.PET001mass = 0;
    }
    // console.log(this.PET001mass);

    // PET003mass
    if (this.PET003mass === null) {
      this.PET003mass = 0;
    }
    if (this.PET003mass === undefined) {
      this.PET003mass = 0;
    }
    // console.log(this.PET003mass);

    // PET005mass
    if (this.PET005mass === null) {
      this.PET005mass = 0;
    }
    if (this.PET005mass === undefined) {
      this.PET005mass = 0;
    }
    // console.log(this.PET005mass);

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
    // console.log(this.GH001mass);
    // console.log(data);

    this.GH001GrandTotal = +this.GH001mass * +this.GH001;
    // console.log(this.GH001GrandTotal);

    this.GH001price = +this.GH001mass * +this.GH001;
    this.GH001pricez = (String(this.GH001price).substring(0, 6));
    // console.log(this.GH001price);
  }

  //   GH001 Total;
  onChangeTotalGH001(): void {
    this.GH001Total = this.GH001price;
    // console.log(this.GH001Total);
  }

  //   NFAL01;
  onChangeNFAL01(data): void {
    // console.log(this.NFAL01mass);
    // console.log(data);

    this.NFAL01GrandTotal = +this.NFAL01mass * +this.NFAL01;
    // console.log(this.NFAL01GrandTotal);

    this.NFAL01price = +this.NFAL01mass * +this.NFAL01;
    this.NFAL01pricez = (String(this.NFAL01price).substring(0, 6));
    // console.log(this.NFAL01price);
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

    this.PAP005GrandTotal = +this.PAP005mass * +this.PAP005;
    // console.log(this.PAP005GrandTotal);

    this.PAP005price = +this.PAP005mass * +this.PAP005;
    this.PAP005pricez = (String(this.PAP005price).substring(0, 6));
    // console.log(this.PAP005price);
  }

  //   PAP007;
  onChangePAP007(data): void {
    // console.log(this.PAP007mass);
    // console.log(data);

    this.PAP007GrandTotal = +this.PAP007mass * +this.PAP007;
    // console.log(this.PAP007GrandTotal);

    this.PAP007price = +this.PAP007mass * +this.PAP007;
    this.PAP007pricez = (String(this.PAP007price).substring(0, 6));
    // console.log(this.PAP007price);
  }

  //   PAP001;
  onChangePAP001(data): void {
    // console.log(this.PAP001mass);
    // console.log(data);

    this.PAP001GrandTotal = +this.PAP001mass * +this.PAP001;
    // console.log(this.PAP001GrandTotal);

    this.PAP001price = +this.PAP001mass * +this.PAP001;
    this.PAP001pricez = (String(this.PAP001price).substring(0, 6));
    // console.log(this.PAP001price);
  }

  //   PAP003;
  onChangePAP003(data): void {
    // console.log(this.PAP003mass);
    // console.log(data);

    this.PAP003GrandTotal = +this.PAP003mass * +this.PAP003;
    // console.log(this.PAP003GrandTotal);

    this.PAP003price = +this.PAP003mass * +this.PAP003;
    this.PAP003pricez = (String(this.PAP003price).substring(0, 6));
    // console.log(this.PAP003price);
  }

  //   Paper Total;
  onChangeTotal(): void {
    // PAP005mass
    if (this.PAP005mass === null) {
      this.PAP005mass = 0;
    }
    if (this.PAP005mass === undefined) {
      this.PAP005mass = 0;
    }
    // console.log(this.PAP005mass);

    // PAP007mass
    if (this.PAP007mass === null) {
      this.PAP007mass = 0;
    }
    if (this.PAP007mass === undefined) {
      this.PAP007mass = 0;
    }
    // console.log(this.PAP007mass);

    // PAP001mass
    if (this.PAP001mass === null) {
      this.PAP001mass = 0;
    }
    if (this.PAP001mass === undefined) {
      this.PAP001mass = 0;
    }
    // console.log(this.PAP001mass);

    // PAP003mass
    if (this.PAP003mass === null) {
      this.PAP003mass = 0;
    }
    if (this.PAP003mass === undefined) {
      this.PAP003mass = 0;
    }
    // console.log(this.PAP003mass);

    // get prices //////////////////////////////////////////////////////////////
    // PAP005price
    if (this.PAP005price === null) {
      this.PAP005price = 0;
    }
    if (this.PAP005price === undefined) {
      this.PAP005price = 0;
    }
    // console.log(this.PAP005price);

    // PAP007price
    if (this.PAP007price === null) {
      this.PAP007price = 0;
    }
    if (this.PAP007price === undefined) {
      this.PAP007price = 0;
    }
    // console.log(this.PAP007price);

    // PAP001price
    if (this.PAP001price === null) {
      this.PAP001price = 0;
    }
    if (this.PAP001price === undefined) {
      this.PAP001price = 0;
    }
    // console.log(this.PAP001price);

    // PAP003price
    if (this.PAP003price === null) {
      this.PAP003price = 0;
    }
    if (this.PAP003price === undefined) {
      this.PAP003price = 0;
    }
    // console.log(this.PAP003mass);

    this.PaperTotal = +this.PAP001price + +this.PAP007price + +this.PAP005price + +this.PAP003price;
    // console.log(this.PaperTotal);
  }

  //   HD001;
  onChangeHD001(data): void {
    // console.log(this.HD001mass);
    // console.log(data);

    this.HD001GrandTotal = +this.HD001mass * +this.HD001;
    // console.log(this.HD001GrandTotal);

    this.HD001price = +this.HD001mass * +this.HD001;
    this.HD001pricez = (String(this.HD001price).substring(0, 6));
    // console.log(this.HD001price);
  }

  //   LD001;
  onChangeLD001(data): void {
    // console.log(this.LD001mass);
    // console.log(data);

    this.LD001GrandTotal = +this.LD001mass * +this.LD001;
    // console.log(this.LD001GrandTotal);

    this.LD001price = +this.LD001mass * +this.LD001;
    this.LD001pricez = (String(this.LD001price).substring(0, 6));
    // console.log(this.LD001price);
  }

  //   LD003;
  onChangeLD003(data): void {
    // console.log(this.LD003mass);
    // console.log(data);

    this.LD003GrandTotal = +this.LD003mass * +this.LD003;
    // console.log(this.LD003GrandTotal);

    this.LD003price = +this.LD003mass * +this.LD003;
    this.LD003pricez = (String(this.LD003price).substring(0, 6));
    // console.log(this.LD003price);
  }

  //   PET001;
  onChangePET001(data): void {
    // console.log(this.PET001mass);
    // console.log(data);

    this.PET001GrandTotal = +this.PET001mass * +this.PET001;
    // console.log(this.PET001GrandTotal);

    this.PET001price = +this.PET001mass * +this.PET001;
    this.PET001pricez = (String(this.PET001price).substring(0, 6));
    // console.log(this.PET001price);
  }

  //   PET003;
  onChangePET003(data): void {
    // console.log(this.PET003mass);
    // console.log(data);

    this.PET003GrandTotal = +this.PET003mass * +this.PET003;
    // console.log(this.PET003GrandTotal);

    this.PET003price = +this.PET003mass * +this.PET003;
    this.PET003pricez = (String(this.PET003price).substring(0, 6));
    // console.log(this.PET003price);
  }

  //   PET005;
  onChangePET005(data): void {
    // console.log(this.PET005mass);
    // console.log(data);

    this.PET005GrandTotal = +this.PET005mass * +this.PET005;
    // console.log(this.PET005GrandTotal);

    this.PET005price = +this.PET005mass * +this.PET005;
    this.PET005pricez = (String(this.PET005price).substring(0, 6));
    // console.log(this.PET005price);
  }

  //   Plastic Total;
  onChangePlasticTotalzzz(): void {
    // HD001mass
    if (this.HD001mass === null) {
      this.HD001mass = 0;
    }
    if (this.HD001mass === undefined) {
      this.HD001mass = 0;
    }
    // console.log(this.HD001mass);

    // LD001mass
    if (this.LD001mass === null) {
      this.LD001mass = 0;
    }
    if (this.LD001mass === undefined) {
      this.LD001mass = 0;
    }
    // console.log(this.LD001mass);

    // LD003mass
    if (this.LD003mass === null) {
      this.LD003mass = 0;
    }
    if (this.LD003mass === undefined) {
      this.LD003mass = 0;
    }
    // console.log(this.LD003mass);

    // PET001mass
    if (this.PET001mass === null) {
      this.PET001mass = 0;
    }
    if (this.PET001mass === undefined) {
      this.PET001mass = 0;
    }
    // console.log(this.PET001mass);

    // PET003mass
    if (this.PET003mass === null) {
      this.PET003mass = 0;
    }
    if (this.PET003mass === undefined) {
      this.PET003mass = 0;
    }
    // console.log(this.PET003mass);

    // PET005mass
    if (this.PET005mass === null) {
      this.PET005mass = 0;
    }
    if (this.PET005mass === undefined) {
      this.PET005mass = 0;
    }
    // console.log(this.PET005mass);

    // check prices ///////////////////////////////////////////////////////////
    // HD001price
    if (this.HD001price === null) {
      this.HD001price = 0;
    }
    if (this.HD001price === undefined) {
      this.HD001price = 0;
    }
    console.log(this.HD001price);

    // LD001price
    if (this.LD001price === null) {
      this.LD001price = 0;
    }
    if (this.LD001price === undefined) {
      this.LD001price = 0;
    }
    console.log(this.LD001price);

    // LD003price
    if (this.LD003price === null) {
      this.LD003price = 0;
    }
    if (this.LD003price === undefined) {
      this.LD003price = 0;
    }
    console.log(this.LD003price);

    // PET001price
    if (this.PET001price === null) {
      this.PET001price = 0;
    }
    if (this.PET001price === undefined) {
      this.PET001price = 0;
    }
    console.log(this.PET001price);

    // PET003mass
    if (this.PET003price === null) {
      this.PET003price = 0;
    }
    if (this.PET003price === undefined) {
      this.PET003price = 0;
    }
    console.log(this.PET003price);

    // PET005price
    if (this.PET005price === null) {
      this.PET005price = 0;
    }
    if (this.PET005price === undefined) {
      this.PET005price = 0;
    }
    console.log(this.PET005price);

    this.PlasticTotals = +this.HD001price + +this.LD001price + +this.LD003price + +this.PET001price + +this.PET003price + +this.PET005price;
    // console.log(this.PlasticTotals);
  }

  TotalTotals() {
    this.TotalTotals = this.PlasticTotals;
  }

  calculate() {
    // GH001
    this.GH001GrandTotal = +this.GH001mass * +this.GH001;
    this.GH001Vat = +this.GH001GrandTotal / 1.15;
    this.GH001SubTotal = +this.GH001GrandTotal - +this.GH001Vat;
    // console.log(this.GH001GrandTotal);
    // console.log(this.GH001Vat);
    // console.log(this.GH001SubTotal);

    // NFAL01
    this.NFAL01GrandTotal = +this.NFAL01mass * +this.NFAL01;
    this.NFAL01Vat = +this.NFAL01GrandTotal / 1.15;
    this.NFAL01SubTotal = +this.NFAL01GrandTotal - +this.NFAL01Vat;
    // console.log(this.NFAL01GrandTotal);
    // console.log(this.NFAL01Vat);
    // console.log(this.NFAL01SubTotal);

    //   PAP005;
    this.PAP005GrandTotal = +this.PAP005mass * +this.PAP005;
    this.PAP005Vat = +this.PAP005GrandTotal / 1.15;
    this.PAP005SubTotal = +this.PAP005GrandTotal - +this.PAP005Vat;
    // console.log(this.PAP005GrandTotal);
    // console.log(this.PAP005Vat);
    // console.log(this.PAP005SubTotal);

    // PAP007
    this.PAP007GrandTotal = +this.PAP007mass * +this.PAP007;
    this.PAP007Vat = +this.PAP007GrandTotal / 1.15;
    this.PAP007SubTotal = +this.PAP007GrandTotal - +this.PAP007Vat;
    // console.log(this.PAP007GrandTotal);
    // console.log(this.PAP007Vat);
    // console.log(this.PAP007SubTotal);

    // PAP001
    this.PAP001GrandTotal = +this.PAP001mass * +this.PAP001;
    this.PAP001Vat = +this.PAP001GrandTotal / 1.15;
    this.PAP001SubTotal = +this.PAP001GrandTotal - +this.PAP001Vat;
    // console.log(this.PAP001GrandTotal);
    // console.log(this.PAP001Vat);
    // console.log(this.PAP001SubTotal);

    // PAP003
    this.PAP003GrandTotal = +this.PAP003mass * +this.PAP003;
    this.PAP003Vat = +this.PAP003GrandTotal / 1.15;
    this.PAP003SubTotal = +this.PAP003GrandTotal - +this.PAP003Vat;
    // console.log(this.PAP003GrandTotal);
    // console.log(this.PAP003Vat);
    // console.log(this.PAP003SubTotal);

    // HD001
    this.HD001GrandTotal = +this.HD001mass * +this.HD001;
    this.HD001Vat = +this.HD001GrandTotal / 1.15;
    this.HD001SubTotal = +this.HD001GrandTotal - +this.HD001Vat;
    // console.log(this.HD001GrandTotal);
    // console.log(this.HD001Vat);
    // console.log(this.HD001SubTotal);

    // LD001
    this.LD001GrandTotal = +this.LD001mass * +this.LD001;
    this.LD001Vat = +this.LD001GrandTotal / 1.15;
    this.LD001SubTotal = +this.LD001GrandTotal - +this.LD001Vat;
    // console.log(this.LD001GrandTotal);
    // console.log(this.LD001Vat);
    // console.log(this.LD001SubTotal);

    // LD003
    this.LD003GrandTotal = +this.LD003mass * +this.LD003;
    this.LD003Vat = +this.LD003GrandTotal / 1.15;
    this.LD003SubTotal = +this.LD003GrandTotal - +this.LD003Vat;
    // console.log(this.LD003GrandTotal);
    // console.log(this.LD003Vat);
    // console.log(this.LD003SubTotal);

    // PET005
    this.PET005GrandTotal = +this.PET005mass * +this.PET005;
    this.PET005Vat = +this.PET005GrandTotal / 1.15;
    this.PET005SubTotal = +this.PET005GrandTotal - +this.PET005Vat;
    // console.log(this.PET005GrandTotal);
    // console.log(this.PET005Vat);
    // console.log(this.PET005SubTotal);

    // PET001
    this.PET001GrandTotal = +this.PET001mass * +this.PET001;
    this.PET001Vat = +this.PET001GrandTotal / 1.15;
    this.PET001SubTotal = +this.PET001GrandTotal - +this.PET001Vat;
    // console.log(this.PET001GrandTotal);
    // console.log(this.PET001Vat);
    // console.log(this.PET001SubTotal);

    // PET003
    this.PET003GrandTotal = +this.PET003mass * +this.PET003;
    this.PET003Vat = +this.PET003GrandTotal / 1.15;
    this.PET003SubTotal = +this.PET003GrandTotal - +this.PET003Vat;
    // console.log(this.PET003GrandTotal);
    // console.log(this.PET003Vat);
    // console.log(this.PET003SubTotal);

    // overallMass
    this.overallMass = +this.GH001mass + +this.NFAL01mass + +this.PAP005mass + +this.PAP007mass + +this.PAP001mass + +this.PAP003mass +
    +this.HD001mass + +this.LD001mass + +this.LD003mass + +this.PET005mass + +this.PET001mass + +this.PET003mass;
    console.log(this.overallMass);

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
    this.storageGH001 = this.GH001storagemass + this.GH001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({GL001: this.storageGH001});
    // console.log(this.storageGH001);

    // storage NFAL01;
    this.storageNFAL01 = this.NFAL01storagemass + this.NFAL01mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({NFAL01: this.storageNFAL01});
    // console.log(this.storageNFAL01);

    // storage PAP005;
    this.storagePAP005 = this.PAP005storagemass + this.PAP005mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP005: this.storagePAP005});
    // console.log(this.storagePAP005);

    // storage PAP007;
    this.storagePAP007 = this.PAP007storagemass + this.PAP007mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP007: this.storagePAP007});
    // console.log(this.storagePAP007);

    // storage PAP001;
    this.storagePAP001 = this.PAP001storagemass + this.PAP001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP001: this.storagePAP001});
    // console.log(this.storagePAP001);

    // storage PAP003;
    this.storagePAP003 = this.PAP003storagemass + this.PAP003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PAP003: this.storagePAP003});
    // console.log(this.storagePAP003);

    // storage HD001;
    this.storageHD001 = this.HD001storagemass + this.HD001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({HD001: this.storageHD001});
    // console.log(this.storageHD001);

    // storage LD001;
    this.storageLD001 = this.LD001storagemass + this.LD001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD001: this.storageLD001});
    // console.log(this.storageLD001);

    // storage LD003;
    this.storageLD003 = this.LD003storagemass + this.LD003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({LD003: this.storageLD003});
    // console.log(this.storageLD003);

    // storage PET001;
    this.storagePET001 = this.PET001storagemass + this.PET001mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET001: this.storagePET001});
    // console.log(this.storagePET001);

    // storage PET003;
    this.storagePET003 = this.PET003storagemass + this.PET003mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PET003: this.storagePET003});
    // console.log(this.storagePET003);

    // storage PET005;
    this.storagePET005 = this.PET005storagemass + this.PET005mass;
    this.db.collection("storage").doc("hD3GRe9MMPFB401vA7kS").update({PEP005: this.storagePET005});
    // console.log(this.storagePET005);
  }

  Addreclaimer() {
    this.db.collection('reclaimers').doc().set({
      date: new Date(),
      name: this.name,
      surname: this.surname,
      address: this.address,
      contact: this.contact,

      GH001Mass: this.GH001mass,
      GH001Price: this.GH001,
      GH001: this.GH001GrandTotal,
      GH001Vat: this.GH001Vat,
      GH001SubTotal: this.GH001SubTotal,

      NFAL01Mass: this.NFAL01mass,
      NFAL01Price: this.NFAL01,
      NFAL01: this.NFAL01GrandTotal,
      NFAL01Vat: this.NFAL01Vat,
      NFAL01SubTotal: this.NFAL01SubTotal,

      PAP005Mass: this.PAP005mass,
      PAP005Price: this.PAP005,
      PAP005: this.PAP005GrandTotal,
      PAP005Vat: this.PAP005Vat,
      PAP005SubTotal: this.PAP005SubTotal,

      PAP007Mass: this.PAP007mass,
      PAP007Price: this.PAP007,
      PAP007: this.PAP007GrandTotal,
      PAP007Vat: this.PAP007Vat,
      PAP007SubTotal: this.PAP007SubTotal,

      PAP001Mass: this.PAP001mass,
      PAP001Price: this.PAP001,
      PAP001: this.PAP001GrandTotal,
      PAP001Vat: this.PAP001Vat,
      PAP001SubTotal: this.PAP001SubTotal,

      PAP003Mass: this.PAP003mass,
      PAP003Price: this.PAP003,
      PAP003: this.PAP003GrandTotal,
      PAP003Vat: this.PAP003Vat,
      PAP003SubTotal: this.PAP003SubTotal,

      HD001Mass: this.HD001mass,
      HD001Price: this.HD001,
      HD001: this.HD001GrandTotal,
      HD001Vat: this.HD001Vat,
      HD001SubTotal: this.HD001SubTotal,

      LD001Mass: this.LD001mass,
      LD001Price: this.LD001,
      LD001: this.LD001GrandTotal,
      LD001Vat: this.LD001Vat,
      LD001SubTotal: this.LD001SubTotal,

      LD003Mass: this.LD003mass,
      LD003Price: this.LD003,
      LD003: this.LD003GrandTotal,
      LD003Vat: this.LD003Vat,
      LD003SubTotal: this.LD003SubTotal,

      PET001Mass: this.PET001mass,
      PET001Price: this.PET001,
      PET001: this.PET001GrandTotal,
      PET001Vat: this.PET001Vat,
      PET001SubTotal: this.PET001SubTotal,

      PET003Mass: this.PET003mass,
      PET003Price: this.PET003,
      PET003: this.PET003GrandTotal,
      PET003Vat: this.PET003Vat,
      PET003SubTotal: this.PET003SubTotal,

      PEP005Mass: this.PET005mass,
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
    this.name = '';
    this.surname = '';
    this.contact = '';
    this.address = '';

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

}
