import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute  } from '@angular/router';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {ModalController} from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-reclaimer-pdf',
  templateUrl: './reclaimer-pdf.page.html',
  styleUrls: ['./reclaimer-pdf.page.scss'],
})
export class ReclaimerPDFPage implements OnInit {

  db = firebase.firestore();

  name;
  surname;
  contact;
  address;

  prices;
  getprice;

  overallMass;
  overallMass2;
  OverallSubTotal;
  OverallSubTotal2;
  OverallVat;
  OverallGrandTotal;
  // substrings
  overallMassz;
  OverallSubTotalz;
  OverallSubTotalzzz;
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

  GH001pullPrices;
  NFAL01pullPrices;
  PAP005pullPrices;
  PAP007pullPrices;
  PAP001pullPrices;
  PAP001zpullPrices;
  PAP003pullPrices;
  HD001pullPrices;
  LD001pullPrices;
  LD003pullPrices;
  PET001pullPrices;
  PET003pullPrices;
  PET005pullPrices;

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

  letterObj = {
    to: '',
    from: '',
    text: ''
  };

  // user infor
  admin = [];
  Newadmin = [];

  newreclaimer = [];
  id;
  reclaimername;
  reclaimersurname;
  reclaimerDate;
  reclaimerAddress;
  reclaimercode;
  reclaimercontact;
  time;
  productCode;
  reclaimerID;
  IDnumber;
  streetname;
  town;
  city;

  pdfObj = null;

  constructor(
    private modalcontroller: ModalController,
    public route: Router,
    public formGroup: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private content: ElementRef,
    public rendered: Renderer2,
    private plt: Platform,
    private location: Location,
    private file: File,
    private fileOpener: FileOpener
  ) {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

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

    this.pdfmakerFirebase(this.id);

    this.getprices();
    this.getMasses();

   }

  ngOnInit() {
  }

  pdfmakerFirebase(id) {
    // pulling data from database
    this.db.collection('reclaimersMass').doc(this.id).get().then(element => {
      // element.forEach(element => {
        let name = {};
        let surname = {};
        let contact = {};
        let address = {};

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

        // Logistic infor
        OverallVat = this.OverallVat = element.data().OverallVat;
        this.OverallVatz = (String(OverallVat).substring(0, 6));
        OverallGrandTotal = this.OverallGrandTotal = element.data().OverallGrandTotal;
        this.OverallGrandTotalz = (String(OverallGrandTotal).substring(0, 6));
        this.overallMass2 = element.data().OverallMass;
        this.overallMassz = (String(this.overallMass2).substring(0, 6));
        OverallSubTotal = this.OverallSubTotal2 = element.data().OverallSubTotal;
        this.OverallSubTotalz = (String(this.OverallSubTotal2).substring(0, 6));
        this.OverallSubTotalzzz = (String(this.OverallSubTotal2).substring(0, 6));
        console.log(this.overallMass2);
        console.log(this.OverallSubTotal);
        console.log(this.OverallVat);
        console.log(this.OverallGrandTotal);
        console.log(this.overallMassz);
        console.log(this.OverallSubTotalz);
        console.log(this.OverallVatz);
        console.log(this.OverallGrandTotalz);
        console.log(this.OverallSubTotalz);

        // prices
        GH001  = element.data().GH001;
        NFAL01  = element.data().NFAL01;
        PAP005  = element.data().PAP005;
        PAP007  = element.data().PAP007;
        PAP001  = element.data().PAP001;
        this.PAP001z = (String(PAP001).substring(0, 6));
        PAP003  = element.data().PAP003;
        HD001  = element.data().HD001;
        LD001  = element.data().LD001;
        LD003  = element.data().LD003;
        PET001  = element.data().PET001;
        PET003  = element.data().PET003;
        PET005  = element.data().PEP005;
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

        this.time = element.data().date;
        this.productCode = element.data().productcode;
        this.reclaimerID = element.data().reclaimerID;

        this.testArray.push({
          overallMass: this.overallMass2,
          OverallSubTotal: this.OverallSubTotalz,
          OverallVat: this.OverallVatz,
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
          GH001SubTotal: this.GH001SubTotalz,
          GH001Vat: this.GH001Vatz,
          GH001GrandTotal: GH001GrandTotal,
          NFAL01SubTotal: this.NFAL01SubTotalz,
          NFAL01Vat: this.NFAL01Vatz,
          NFAL01GrandTotal: NFAL01GrandTotal,
          PAP005SubTotal: this.PAP005SubTotalz,
          PAP005Vat: this.PAP005Vatz,
          PAP005GrandTotal: PAP005GrandTotal,
          PAP007SubTotal: this.PAP007SubTotalz,
          PAP007Vat: this.PAP007Vatz,
          PAP007GrandTotal: PAP007GrandTotal,
          PAP001SubTotal: this.PAP001SubTotalz,
          PAP001Vat: this.PAP001Vatz,
          PAP001GrandTotal: PAP001GrandTotal,
          PAP003SubTotal: this.PAP003SubTotalz,
          PAP003Vat: this.PAP003Vatz,
          PAP003GrandTotal: PAP003GrandTotal,
          HD001SubTotal: this.HD001SubTotalz,
          HD001Vat: this.HD001Vatz,
          HD001GrandTotal: HD001GrandTotal,
          LD001SubTotal: this.LD001SubTotalz,
          LD001Vat: this.LD001Vatz,
          LD001GrandTotal: LD001GrandTotal,
          LD003SubTotal: this.LD003SubTotalz,
          LD003Vat: this.LD003Vatz,
          LD003GrandTotal: LD003GrandTotal,
          PET001SubTotal: this.PET001SubTotalz,
          PET001Vat: this.PET001Vatz,
          PET001GrandTotal: PET001GrandTotal,
          PET003SubTotal: this.PET003SubTotalz,
          PET003Vat: this.PET003Vatz,
          PET003GrandTotal: PET003GrandTotal,
          PET005SubTotal: this.PET005SubTotalz,
          PET005Vat: this.PET005Vatz,
          PET005GrandTotal: PET005GrandTotal,
        });
        // console.log(this.testArray);

        this.PDFArray = {
          overallMass: this.overallMass2,
          OverallSubTotal: this.OverallSubTotalz,
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
        // console.log(this.PDFArray);

        // PDFOverallz
        this.PDFOverallMass = {
          overallMass: this.overallMass2
        };
        // console.log(this.PDFOverallMass);

        this.PDFOverallSubTotal = {
          OverallSubTotal: this.OverallSubTotalz
        };
        // console.log(this.PDFOverallSubTotal);

        this.PDFOverallVat = {
          OverallVat: OverallVat
        };
        // console.log(this.PDFOverallVat);

        this.PDFOverallGrandTotal = {
          OverallGrandTotal: OverallGrandTotal
        };
        // console.log(this.PDFOverallGrandTotal);

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
        // console.log(this.PDFPrices);

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
        // console.log(this.PDFCodes);

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
        // console.log(this.PDFSubTotals);

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
        // console.log(this.PDFVats);

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
        // console.log(this.PDFGrandTotal);

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
        // console.log(this.PDFMass);

        this.pullReclaimer(this.reclaimerID)

      });

      // create PDF for Download
    // });
    }

    pullReclaimer(reclaimerID) {
      // pulling from reclaimers
    this.db.collection('reclaimers').doc(reclaimerID).onSnapshot(element => {
      this.newreclaimer = [];
      // snapshot.forEach(element => {
        let id = {};
        let reclaimername = {};
        let reclaimersurname = {};
        let reclaimerDate = {};

        id = this.id = element.id;
        reclaimername = this.name = element.data().name;
        this.IDnumber = element.data().IDnumber;
        this.contact = element.data().contact;
        this.streetname = element.data().streetname;
        this.town = element.data().town;
        this.city = element.data().city;
        console.log(this.name);
        console.log(this.IDnumber);
        console.log(this.contact);
        console.log(this.streetname);
        console.log(this.town);
        console.log(this.city);

        // this.newreclaimer = [];
        this.newreclaimer.push({
          id: id,
          reName: reclaimername,
          reSurname: reclaimersurname,
          reDate: reclaimerDate,
      });
      this.ForLoop();
    });
    }

    ForLoop() {
      // console.log(this.PDFArray);
      // console.log(this.PDFCodes);
      // console.log(this.PDFPrices);
      // console.log(this.PDFMass);
      // console.log(this.PDFSubTotals);
      // console.log(this.PDFVats);
      // console.log(this.PDFGrandTotal);

      // all (old pdf)
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

      // PDFCodes
      // tslint:disable-next-line: forin
      for (let key in this.PDFCodes) {
        // console.log(key);
        // if (this.PDFCodes[key] === '0') {
        //   console.log('Skipped because its 0');
        // } else if (this.PDFCodes[key] !== '0') {
          this.PDFCodesPrint.push({name : key, number : this.PDFCodes[key]});
        // }
      }
      // console.log(this.PDFCodesPrint);

      // PDFPrices
      // tslint:disable-next-line: forin
      for (let key in this.PDFPrices) {
        // console.log(key);
        // if (this.PDFPrices[key] === '0') {
        //   console.log('Skipped because its 0');
        // } else if (this.PDFPrices[key] !== '0') {
          this.PDFPricesPrint.push({name : key, number : this.PDFPrices[key]});
        // }
      }
      // console.log(this.PDFPricesPrint);

      // PDFMass
      // tslint:disable-next-line: forin
      for (let key in this.PDFMass) {
        // console.log(key);
        if (this.PDFMass[key] === '0') {
          // console.log('Skipped because its 0');
        } else if (this.PDFMass[key] !== '0') {
          this.PDFMassPrint.push({name : key, number : this.PDFMass[key]});
        }
      }
      // console.log(this.PDFMassPrint);

      // PDFSubTotals
      // tslint:disable-next-line: forin
      for (let key in this.PDFSubTotals) {
        // console.log(key);
        if (this.PDFSubTotals[key] === '0') {
          // console.log('Skipped because its 0');
        } else if (this.PDFSubTotals[key] !== '0') {
          this.PDFSubTotalsPrint.push({name : key, number : this.PDFSubTotals[key]});
        }
      }
      // console.log(this.PDFSubTotalsPrint);

      // PDFVats
      // tslint:disable-next-line: forin
      for (let key in this.PDFVats) {
        // console.log(key);
        if (this.PDFVats[key] === '0') {
          // console.log('Skipped because its 0');
        } else if (this.PDFVats[key] !== '0') {
          this.PDFVatsPrint.push({name : key, number : this.PDFVats[key]});
        }
      }
      // console.log(this.PDFVatsPrint);

      // PDFGrandTotal
      // tslint:disable-next-line: forin
      for (let key in this.PDFGrandTotal) {
        // console.log(key);
        if (this.PDFGrandTotal[key] === '0') {
          // console.log('Skipped because its 0');
        } else if (this.PDFGrandTotal[key] !== '0') {
          this.PDFGrandTotalPrint.push({name : key, number : this.PDFGrandTotal[key]});
        }
      }
      // console.log(this.PDFGrandTotalPrint);

      // PDFOverall Mass
      // tslint:disable-next-line: forin
      for (let key in this.PDFOverallMass) {
        console.log(key);
        this.PDFOverallMassPrint.push({name : key, number : this.PDFOverallMass[key]});
      }
      // console.log(this.PDFOverallMassPrint);

      // PDFOverall SubTotal
      // tslint:disable-next-line: forin
      for (let key in this.PDFOverallSubTotal) {
        // console.log(key);
        this.PDFOverallSubTotalPrint.push({name : key, number : this.PDFOverallSubTotal[key]});
      }
      // console.log(this.PDFOverallSubTotalPrint);

      // PDFOverall Vat
      // tslint:disable-next-line: forin
      for (let key in this.PDFOverallVat) {
        // console.log(key);
        this.PDFOverallVatPrint.push({name : key, number : this.PDFOverallVat[key]});
      }
      // console.log(this.PDFOverallVatPrint);

      // PDFOverall Grand Total
      // tslint:disable-next-line: forin
      for (let key in this.PDFOverallGrandTotal) {
        // console.log(key);
        this.PDFOverallGrandTotalPrint.push({name : key, number : this.PDFOverallGrandTotal[key]});
      }
      // console.log(this.PDFOverallGrandTotalPrint);

      // create PDF for Download
      this.CreatePDF2();
    }

    getprices() {
      // this.getprice = this.db.collection('price').onSnapshot(snapshot => {
      //   snapshot.forEach(element => {
      //     this.GH001 = element.data().gl001;
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
      //   });
      //   console.log(this.GH001);
      //   console.log(this.HD001);
      //   console.log(this.LD003);
      //   console.log(this.NFAL01);
      //   console.log(this.PAP001);
      //   console.log(this.PAP003);
      //   console.log(this.PAP005);
      //   console.log(this.PET001);
      //   console.log(this.PET003);
      //   console.log(this.PET005);
      // });

    //   // Glass Prices
    // this.db.collection('price').doc("8FtqTT4N4mFpbI4DKc25").onSnapshot((snap) => {
    //   this.GH001 = snap.data().newgl001;
    //   console.log(snap.data());
    // })
    // console.log(this.GH001);

    // // Aluminium Prices
    // this.db.collection('price').doc("ChHHlFcUFzucHOzPpEgE").onSnapshot(snap => {
    //   this.NFAL01 = snap.data().newnfal01;
    //   console.log(snap.data());
    // })
    // console.log(this.NFAL01);

    // // Paper Prices
    // this.db.collection('price').doc("uk3Rla3tt9xgd8NivPJ6").onSnapshot(snap => {
    //   this.PAP003 = snap.data().newpap003;
    //   this.PAP001 = snap.data().newpap001;
    //   this.PAP005 = snap.data().newpap005;
    //   this.PAP007 = snap.data().newpap007;
    //   console.log(snap.data());
    // })
    //     console.log(this.PAP003);
    //     console.log(this.PAP001);
    //     console.log(this.PAP005);
    //     console.log(this.PAP007);

    // // Plastic Prices
    // this.db.collection('price').doc("7O6KqClxLD780ltfC6i5").onSnapshot(snap => {
    //   this.PET005 = snap.data().newpet005;
    //   this.PET001 = snap.data().newpet001;
    //   this.PET003 = snap.data().newpet003;
    //   this.LD003 = snap.data().newld003;
    //   this.LD001 = snap.data().newld001;
    //   this.HD001 = snap.data().newhd001;
    //   console.log(snap.data());
    // })
    
    //     console.log(this.PET005);
    //     console.log(this.PET001);
    //     console.log(this.PET003);
    //     console.log(this.LD003);
    //     console.log(this.LD001);
    //     console.log(this.HD001);

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

    createPdf() {
      // All
      let printDataName = [];
      let printDataNumber = [];

      // Codes
      let printCodeName = [];
      let printCodeNumber = [];

      // Prices
      let printPriceName = [];
      let printPriceNumber = [];

      // Mass
      let printMassName = [];
      let printMassNumber = [];

      // Subtotals
      let printSubTotalName = [];
      let printSubTotalNumber = [];

      // Vats
      let printVatsName = [];
      let printVatsNumber = [];

      // Grand Total
      let printGrandTotalName = [];
      let printGrandTotalNumber = [];

      // Overalls
      let printOverallMass = [];
      let printOverallSubTotal = [];
      let printOverallVat = [];
      let printOverallGrandTotal = [];

      // All
      this.PDFArrayPrint.forEach((item) => {
        printDataName.push(item.name);
        printDataNumber.push(item.number);
      });

      // Codes
      this.PDFCodesPrint.forEach((item) => {
        printCodeName.push(item.name);
        // printCodeNumber.push(item.number);
        printCodeNumber.push(String(item.number).substring(0, 4));
      });

      // Prices
      this.PDFPricesPrint.forEach((item) => {
        printPriceName.push(item.name);
        // printPriceNumber.push(item.number);
        printPriceNumber.push(String(item.number).substring(0, 4));
      });

      // Mass
      this.PDFMassPrint.forEach((item) => {
        printMassName.push(item.name);
        // printMassNumber.push(item.number);
        printMassNumber.push(String(item.number).substring(0, 4));
      });

      // Subtotals
      this.PDFSubTotalsPrint.forEach((item) => {
        printSubTotalName.push(item.name);
        // printSubTotalNumber.push(item.number);
        printSubTotalNumber.push(String(item.number).substring(0, 4));
      });

      // Vats
      this.PDFVatsPrint.forEach((item) => {
        printVatsName.push(item.name);
        // printVatsNumber.push(item.number);
        printVatsNumber.push(String(item.number).substring(0, 4));
      });

      // Grand Total
      this.PDFGrandTotalPrint.forEach((item) => {
        printGrandTotalName.push(item.name);
        // printGrandTotalNumber.push(item.number);
        printGrandTotalNumber.push(String(item.number).substring(0, 4));
      });

      // PDFOverallz
      // PDFOverallMassPrint
      this.PDFOverallMassPrint.forEach((item) => {
        printOverallMass.push(item.number);
        this.printOverallMassz = (String(printOverallMass).substring(0, 4));
      });

      // PDFOverallSubTotalPrint
      this.PDFOverallSubTotalPrint.forEach((item) => {
        printOverallSubTotal.push(item.number);
        this.printOverallSubTotalz = (String(printOverallSubTotal).substring(0, 4));
      });

      // PDFOverallVatPrint
      this.PDFOverallVatPrint.forEach((item) => {
        printOverallVat.push(item.number);
        this.printOverallVatz = (String(printOverallVat).substring(0, 4));
      });

      // PDFOverallGrandTotalPrint
      this.PDFOverallGrandTotalPrint.forEach((item) => {
        printOverallGrandTotal.push(item.number);
        this.printOverallGrandTotalz = (String(printOverallGrandTotal).substring(0, 4));
      });

      var docDefinition = {
        content: [
          { text: 'Mthombowolwazi', style: 'header', color: "gray", bold: true, alignment: "center", fontFamily: 'Roboto', fontSize: 20, margin: [ 5, 2, 10, 20 ] },
          { text: 'General Service (PTY) LTD', style: 'header', fontSize: 8, color: "gray", alignment: "center", margin: [ 5, 2, 10, 20 ]},
          {
            image: 'data:image/png;base64,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',
            width: 150,
            height: 50,
            fit: [100, 100], alignment: "right", marginBottom: 10,
          },
          
          { text: this.letterObj.from },
          { text: '', style: 'subheader' },
          {
            layout: 'noBorders',
            style: 'tableExample',
            table: {
              widths: ['50%','50%'],
            
              body: [
                [{ text: 'Reclaimer Name', color: 'gray' }, { text: this.name, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
                [{ text: 'ID Number', color: 'gray' }, { text: this.IDnumber, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
                [{ text: 'Phone Numbers', color: 'gray' }, { text: this.contact, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
                [{ text: 'Streetname', color: 'gray' }, { text: this.streetname, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
                [{ text: 'Town', color: 'gray' }, { text: this.town, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
                [{ text: 'City', color: 'gray' }, { text: this.city, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
              ]
            }
          },
          this.letterObj.to,
          { text: '', style: 'subheader' },
          { text: '', style: 'subheader' },
          {
            layout: 'lightHorizontalLines',
            styles: Headers,
            table: {
              headerRows: 1,
              widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
              body: [
                [ 'CODE/NUMBER', 'PRICE', 'MASS(KG)', 'VAT', 'SUB-TOTAL', 'GRAND tOTAL' ],
                [ printCodeName, printPriceNumber, printMassNumber, printSubTotalNumber, printVatsNumber, printGrandTotalNumber],
                [ 'Overall Totals', '', this.printOverallMassz, this.printOverallSubTotalz, this.printOverallVatz, this.printOverallGrandTotalz],
              ]
            }
          },
          { text: '', style: 'subheader' },
          { text: '', style: 'subheader' },
          {
            layout: 'noBorders',
            table: {
              widths: ['50%','50%'],
              body: [
                [{ text: 'Printed Time', color: 'gray', fontSize: 9 }, { text: this.time, color: 'gray', Border: false, fontSize: 9 }],
                [{ text: 'Company Name', color: 'gray', fontSize: 9 }, { text: 'Mthombowolwazi General Service (PTY) LTD', color: 'gray', Border: false, fontSize: 9 }],
                [{ text: 'Registration Number', color: 'gray', fontSize: 9 }, { text: '2016/146912/07', color: 'gray', Border: false, fontSize: 9 }],
                [{ text: 'City of Joburg', color: 'gray', fontSize: 9 }, { text: 'Wastehub Permit', color: 'gray', Border: false, fontSize: 9 }],
                [{ text: 'BEE', color: 'gray', fontSize: 9 }, { text: 'Soweto JHB', color: '135% (Level 1)', Border: false, fontSize: 9 }],
                // [{ text: 'Item 45', color: 'gray' }, { text: '1868', color: 'gray', Border: false }],
              ]
            }
          },
        ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 13,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          }
        }
      };
      this.pdfObj = pdfMake.createPdf(docDefinition);
    }

    CreatePDF2(){
    // All
    let printDataName = [];
    let printDataNumber = [];

    // Codes
    let printCodeName = [];
    let printCodeNumber = [];

    // Prices
    let printPriceName = [];
    let printPriceNumber = [];

    // Mass
    let printMassName = [];
    let printMassNumber = [];

    // Subtotals
    let printSubTotalName = [];
    let printSubTotalNumber = [];

    // Vats
    let printVatsName = [];
    let printVatsNumber = [];

    // Grand Total
    let printGrandTotalName = [];
    let printGrandTotalNumber = [];

    // Overalls
    let printOverallMass = [];
    let printOverallSubTotal = [];
    let printOverallVat = [];
    let printOverallGrandTotal = [];

    // All
    this.PDFArrayPrint.forEach((item) => {
      printDataName.push(item.name);
      printDataNumber.push(item.number);
    });

    // Codes
    this.PDFCodesPrint.forEach((item) => {
      printCodeName.push(item.name);
      // printCodeNumber.push(item.number);
      printCodeNumber.push(String(item.number).substring(0, 4));
    });

    // Prices
    this.PDFPricesPrint.forEach((item) => {
      printPriceName.push(item.name);
      // printPriceNumber.push(item.number);
      printPriceNumber.push(String(item.number).substring(0, 4));
    });

    // Mass
    this.PDFMassPrint.forEach((item) => {
      printMassName.push(item.name);
      // printMassNumber.push(item.number);
      printMassNumber.push(String(item.number).substring(0, 4));
    });

    // Subtotals
    this.PDFSubTotalsPrint.forEach((item) => {
      printSubTotalName.push(item.name);
      // printSubTotalNumber.push(item.number);
      printSubTotalNumber.push(String(item.number).substring(0, 4));
    });

    // Vats
    this.PDFVatsPrint.forEach((item) => {
      printVatsName.push(item.name);
      // printVatsNumber.push(item.number);
      printVatsNumber.push(String(item.number).substring(0, 4));
    });

    // Grand Total
    this.PDFGrandTotalPrint.forEach((item) => {
      printGrandTotalName.push(item.name);
      // printGrandTotalNumber.push(item.number);
      printGrandTotalNumber.push(String(item.number).substring(0, 4));
    });

    // PDFOverallz
    // PDFOverallMassPrint
    this.PDFOverallMassPrint.forEach((item) => {
      printOverallMass.push(item.number);
      this.printOverallMassz = (String(printOverallMass).substring(0, 4));
    });

    // PDFOverallSubTotalPrint
    this.PDFOverallSubTotalPrint.forEach((item) => {
      printOverallSubTotal.push(item.number);
      this.printOverallSubTotalz = (String(printOverallSubTotal).substring(0, 4));
    });

    // PDFOverallVatPrint
    this.PDFOverallVatPrint.forEach((item) => {
      printOverallVat.push(item.number);
      this.printOverallVatz = (String(printOverallVat).substring(0, 4));
    });

    // PDFOverallGrandTotalPrint
    this.PDFOverallGrandTotalPrint.forEach((item) => {
      printOverallGrandTotal.push(item.number);
      this.printOverallGrandTotalz = (String(printOverallGrandTotal).substring(0, 4));
    });
    // console.log(this.PDFArrayPrint);
    // console.log(printDataName);  timez
    // console.log(printDataNumber);
  
    var docDefinition = {
  
      content: [
       {canvas: [ { type: 'rect', x: 0, y: 0, w: 600, h: 200, color: '#000' },
        
      ]},
        { text: 'Mthombowolwazi', style: 'header', color: "#fff", bold: true, alignment: "center", margin: [ 5, 2, 10, 20 ],	absolutePosition: { x: -100, y: 70 } },
        { text: 'General Service (PTY) LTD', fontSize: 10, color: "#fff", alignment: "center", margin: [ 5, 2, 10, 20 ], absolutePosition: { x: -100, y: 120 } },
        {
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAACtCAIAAADK/IESAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAADdLSURBVHhe7V0HnBXF/Z/Z/vpVrnAHR2/SRUSKYsGKGg22f9QYo8Zo+j9GE03M/2+Jmr/GNFvsRowao2AFFWmKgHSBo94dx3H97t1r2+f/m929d4V3lXcPPPh+hmV2dm/f7nzn12ZmZzEhBJ1A/wLj/H8C/QgnSO2HOEFqP8QJUvshTpDaD3GC1H6IE6T2Q5wgtR/iBKn9ECdI7Yc4QWo/xAlS+yFOkNoPcYLUfogTpPZDnCC1H+IEqf0QJ0jthzhBags02QweMpydbzJOkOqAmOTlWyOPnNVo6k7JNxcnSKVY/PvYfVNC6181Q3sDX74qO6XfWJyYTYhevjm84UWvisIaivDIkzNOuXtdJsM6R7+JOK4l1TTQwh9H1r8oRVGVhsKggw0kVxYbdQdSZFlXPK3Ulyf/t45fUqt2a4+fG/7iKSGG6ghy1JWJDEb3VO7Q7N2+gxojT18Veu/H4pqXY05R8nCckrrude2R2bF9K3kZ1YGAOqUUhEVCyVd9K6nBSv2JyyPb/+MJkeDqF+Ulf1Q2LVKdY8nA8UVqU7V+YJO+8CeRl67Vow1EQfXOgVbQkVb2ld53nsYXL2p/mBHd8wkXRdU6itbtR0t+I+74RHEOJwPHEalbP1IfmhF9YHpo9ZNYRSGoUPATnWPNwIghnDzlMrGN9CYJBzZrf7kotvBmEqyA9tRglWET6SpSc0Yk0zE7LkiVw+Y/fxh7ekGssZwxkaaiJgLW8zBGAVDO6V41auJkV8z+9dpjZ0V2L+VkVK8jsKMtvw4Wfe+XybTi/Z/U8q36o2dG1j4raoquoZBFZ2cgyEiuhbOx7K9RMxSQUa2z3womUiu260nUDf2WVDCKdaX6Fy/Jj86NHNrMxVAVyGhC6WwHHckHtqgxEObkAXzd2nJoUgkUPsBAStVuva4saV1Z/ZbUDx6K/O8E5eWb1FjIVFBjd+i0AdyHq5nqPcnsLSxZpx5Y6QY94ey3BUYsyyKG7e4ddon+Seo798Te+x1RZNVAMZCDVox2XXGgn3nkqdrdhZbuPgwNrXxG7kDwCYN4F0q/8C5vekHSfKX+Rqqums9eG/70YRGcEQNBVdqVSUAaBOSHGNTa7QJwcs3epHkulcXaV6+D6k8gppRRHx53Rfisn7idomSgX5EKMcP/zY1ufl2IoRrwd1rkUnfxYtZFD7oveTCdN/1OYadoPOhkjhxqBG4DUgJZFVFgxg38jS97ebFrFdJ99B9SIWb4+6XRg+vFVp1EhOicrqbzPnXeo4un/2xV0fkfIVcYwhbraIcADRxpSFqn0trXZAZx8Z7I1oAgddzZorOTPPQTUveuMf98ttpUwcZozGC3emKoXsKyw39098Rn5kQmXbp03ewt8nmeyZ/qusc6oUMAAbFIEkglJnr7nvCqv7NqIt3LIbenMDR8Fu/sJw/9gFTjQN2HS54sUSO8hsK4mVFTDXgKKyb/+fKhN/7RPbBYbUKxMJIjiKig6bpwgsABbiwzgZIjBGZQ8XIIeRPrXjDwZ//UK3qSqXhtfINJjcTq1mx66vGXpz/99oU7dy9T9HjFEaJmMnk7h95/btaMZWYTMmRM+3I5FD0wuGnrNIbpYmCEdslu9773wJGOlpdt1OV6weo/ag9QyAbXNHl+8nUv4BtJal3j/g9W/uqPz49/Z/mtpRVfNdaZ+qhXGaxTJxeSOgDnb2Su+VZxWen6JajyIMY0EkSMgMLFJ2uRbMx1HYOaBBWvtLtne4+t76uNu706StA4MGIkP+4LMQV8w0htCB1497OfPv7KxNWbHw6FD8UixNARsMkUfY4z9hMtB2mZzMnPcTfOw2llZgw11KOvN5JNX5KGOgTBvZhzgHM1EqPriDCiGSh/xbbq34SiJU5RzyG4wAVXmy1CG0AzE/3I5e+T+v/GkKrr2sr1D/3t1clrdzwei4WiYWTEXRkwfqLMnvYUO+Ul9qprmMtuRlwTUhEIKMchjkfBBrRlHdm9GfnGrfUO+9o0JOcPOwb4Su5BZVFjy8Y995dVvWeavfGbRp0hGCyY+QRtCNRvWj4LsXNf4JtB6v6KFf/4z4xlG+4Kx+qATvNwF0ZBzIy/cldez0x8g2q7tvoVeAWfpXQ/2vbJQOVQEcN03V+PkRGtzm6q4wxi1sY+3lH2RFSuco51G4E8BgsgqQkqGUjNHd5X86C+AaR+9tX/vvjOmYdqv4qEqLLtEBqiHkkHzg2VWhdq2DJdrSvAXNe9RSxW9yw8K1aZT7AZrNc1VLnr4PN1Tducw93Dwa91EnOTdk3MAc4c3DdyeoyTGgof/OcH53+x9XeabihHPnHTQGz2biw0IrNrEcEM0aOC0pDG8QzD8OGgYRKjOvhxRd0q54yu8NmT8is3qQbSEnY7ABorkz/AZ+PYJbWi+qvn351TWvVhuIkcechIAQJTsBWN+AjpXqekY1BSNV4N+lmOYTDPsIKmYFlGOt5XXrvM6ExjUCz9U/Ttn4iNFYYJtj0RTKTXJG/MoB2OUVL3HPjw1SVzQ9F9kcSjVb2CLTCTX0CMQSOfzkEjWza4O5/lWMxwDOaoV0O4xnqVExoP1a80zA7lbP96/e07NRk1tJvh0Arw80wsiY/WFsciqTtL3v73sosVNaTEqC1MMhqG0BmD3bgsi7Sdr54WqcrkeAykYpBXhmcZvqFeEV1aTcNaw0gwW0yNkpdvasKEN+mQX2KAfSe8csm9yRyZaY1jjtTdZYsXrVwAAYzWehg0KYBnVTi06XpLESe2c62BEZhV3lBE0L8Yg7CyVA8zAsuIwUZVdOPa0AbTbO9zLX0sWr89XUVNndw9h1y5J6nj5vVJdxLg2CK1rGrVolULDFPX7R7TpAN0Kh2i6ZpRG5g1rfcvGLCxGLOQqB5mBI6TmhpVl4utCX5lkhb7uuldZeVTIL+Nzn4HgHjGn538fvw4jiFSG0P7Fq+6zCRKnzGKEG8gdx1Vv90EwQwLfwZGgHES8MqwLKa8NtRHBUmvqP3SPverf8vPXK42VYFX18VkKIzwyDl9Fc8AjhVSNT26aOXlmllDQ5e+YBQAl9V4FEtHuFvdQ5g3I/XeA8uHsSI935Ju+85gaxOM6+uaBClcJ69b+VLs2Wtk8GkNpEI7AOfZOjMBQEw1vnHqZccBqUvX/TCkbY6Faed7HwKq2uiu+sWYmCa7Z9E404B7MkF1g+42ocw0TFPVDRnMBOSDkbp9W/f/6zZZhz0awODLH/K7AsB8x0PxEKN16xZ6iWOC1O37XyyteTncmW+RDEA9shoSo3S2V7dRMHsvw2mUSmIQSqdumLQvRNNlg/Kqse7Y1jfymsLg/ygiypx1g3jW7S5B5JhEXb4AOvFYFyPVfcjq0Sc1FC1dvvknMqiuvmy8DqCeBWg7PXlqxiRYAzIpowSEUYNIRjdiuhHVdZnzhku/CKx5YrjAqixxuQqUb93vBWXjy2ZAzTpXaAs6aMOq7ow+bL9Hn9RlG36EuaCm9KmQWoBfUFwolEfH6lpAiOoiajrRwR1t36xYrO94dXKowotYxSBAp2pYipcmXSZcJNJgfvDzSUpYYBjCENeMnxR7M+mDZBSyHalf+A3TYLQj7/XsGEeZ1D0H/1MVei8S6mNTagNYKz8NVY9DXLxGCdFdbOHXnit+ww/cQ7T2vQEcr9eX5ex5dxTripgGyCsVUyqpoHtJDIuRT347rmJ7piSoiiZlzdiWd+HC6oZN8IfphVCzHapfHnnqSpIwB6ojHE1SweP9fNsdmpYCtWsB5DN7O8rehYzmqN/ksRSWrr7Ndf7/uef9AxHu8O5DjIjcIJiEyqileCGBpMawq2nDi4M2vTbMxamGzkpuZfLPPob4etvufyGk5ox0OX+fAGDSudoDfdXxCziapH5d8pTO7FW6mDCUVLhqUWs1q0vMwC0oY5demSOMWyoM2QyC6xxqASbIAMWrG9Q/shnVzZimydvfHARNAKIX1ZRO+t4XGWNLG6sMRgjtq/139lhoB9CIOtQ/dfuSNln8cBw1UlWtYePeh+QY6fjBkw1Qh2t/ihqKwE11SoAwDD4t+EAYCUHxpOWEtA0fCUSjhn94BYigYTaLqa4w7uCu9wsqNuSJvKqpQs7Y8tHXrYo2wLW0YDDy9Z5FhrlH5+CiiZ8NWkltSR/qp6NG6rbSpxihOhX+kQ1gNBpAa29t6yVxOK3ExDLEjYbKccPXMHy4bcCDGWxGqr0Gkk0TZBTklb6fEwsbG5+YTHT7TDzhh58yEvh6BlxFVcDoRkvCrwoe8OcTV6+JjMaKfmdTdT389f6/ydFUiCkGj4VFvITYSCGSwY9tGTIDe8kN+5zlCGZMqGnsq8IQxZqt6gQThtHXP/jtTX85n/Ahw6SxKeuv271oROW2Ap5XVc2VP2N3zmlbqJhSxxgEWouEtCZzvcEdMrTE1Qs2tWBSv+v73XvoTSRUaGqfUAqONMch0YUkNxJEzDFCmr+gMH9KDroY6176Qr4NwiKpafBkV05gotedgyAmUdKR5mk5wQKYTAbp258+u7E0DUsN2F1fvzew45/TGGQQglnGHHX9JyCauq6BWqYxDyTwkYVGIbOOdOAAY8QEBjj5vsDRWRzrrZXTGuX10TA2DDqLzIStnaGJ2CVWpxxNhPbQORmT0Lxd0iYBEcAlj1gGqQqTERg+eOC0wQNPHjjgpIxAkd+XIwq+Dx40PrjXkJsX74C4YsBY5XcbsyCvqJFw9FDFLvnJs3MMha7DYJ8Th6p6pv76haGXri5+YX7xK2caYY7hQNW6C8/YeOojTypNnGno4ElZMQ+VVyTVFT90d81n53NCgqFwCaVP/V7s+ifSnP1k4yiQWt245v2vZsaidBZZUkhlQLvySJGZYYNmjRs+f0TRmfnZJ3Fc+x7zp68Obn1LjI+LSSjj5Bvl6/7e5iW4P89v3LVEsEZD24CYjJgRYgQjVJ7DIo0RdCgBQZz190fSxhWrId7qB9YN8JBp5KOCm33wravLnv0lJwSdS7SCgAIjz5N//E66s59sHAX1u+vgS7yQnLYEouny4DTfoNmT77zjpg0/vnb5WTP+e1DelMMZBRe3sli3BsUcQDsZNav9aUUn8wztpGgPzBhyTSBSnskLMWAUSjTdnX/mWv9Jm2NNyPKKrWRSDQwiq0YZ76TPeF8NoeMH7QGuVslaLVzfX+YogYtUWv2OApHMkcGmMztj7CVn/P1XN22df+aDAwdMdI4lQrgO1ZWBXnC8JHBVDC405JT2/AVywcwnrGvM8DorOG2CQDgqRQZd8bYqgykFFm1SVSsPkqrpCmKz9kqDi0m8o6MVDKSp9d49n7e4bMlFqkmtbFiO+cojcZHAm3V7kd9beNGcv/3i+q9mTPqBJHT9HnHFdk0LifEpuCwSc0bi7KHtHZn0AtYyqF3cnm64B8z53D1iixLCELlqOg1eabIZpezqBm4SBm8lieQeWgW0qm3v9xdS91e/1ckAcpcQIDJhmVPG/+Jn1208bdKtHNf1CxQ21rwig7MLJtjeBVKLpvOHL5bky2F0FOuo08AB7UoU0075QlcdLq3uQyqvVPc6PrBm6IYwZD2GJpJo5qKO5B3LFKNvupVSSio8fEXdJ72blg2BCghobsaUW65YMX/OHz2uTOdA91BbalgLBjiAoGLMGQkUY1oOw7mMhG+/OABTrIuF334ucPKnchOvGRC5KprFqM2rtaW+kq6aKO0AhrA4EakGkuv3cQc29QmrKSW1IbxRR+V0ClKPAF4mjTuZqaNvv2XByiH5M53ybgMEQg6CZ+aQyiOvb0RwUqJ3Q13pjCedBcqd/cOBwQPn+cxDSKrWVGu0HIjUZaNZXi0xBV7BrDI4fTebWU6MBDNXoG0IyLv1wz7RwCkltaJxmSCZPfJ74WRQuQLvufj0Fy46/S8C35u5sqFqUrEDvCTa5Wur1m/f7xUSvRsqebE7A7RyxzNRoMqweuitq8PleSYOxU0pTbpqNDtK1LJqhPiq+DEfI5L4nsFr27akw7nBR4KUklrdsKKr9xXagiC3BwU8Q264eNmU0dc6hT3HyucijOKzuxTAsvoGxSZc1OGc25zhXOcr82BG15sCSoNbJ1FL3yogpq0Ur+Uo0WgVxBVxJy1COLEGBuN9YKNeV9qjGukWUkeqpjfVNK1XlW7LKUEuH8rwTbr+kmUFudOcwl6heAVoOSdQoS7SFKGT1dQnXwJOcqcRJGFYT4iI9Zpm9R850umIqc2rk2KIHbSGzSkmegKHDhoZp6VtXJx8DZw6UoPR7YhtMOjMvG7B5UU5genXXfRxum+wU9RbDJkmxCeXgBM07LTOOtOzRzCgqDsxq5jVtPpBoW2nmkzQ0r1URjVg1OpLsg0qiKlpGsRA2KNwozvTwCv/EaV9nElF6kitD38lgkHtxgOAHQVGs33Trzr3g556uQlAUPFnit3tAFRpKDLslM5IzR/Dpw8zQKCd/cNAdI84aJM4frEW5WwZpdbUklGLTs006OzD5pMRO24xZmMJNTDcTN0O145PkyysKSQ1tKE7mpcy6kFp7glXnrvYLSWhd7Rih35gA9QtnWDBIN6bo+WP74xU8JXyRnJMR2aVYEIk30UPI/8hTSWOvqUyaqtcEFBnSi88CGSIitiB63D2roQaGI6DU7bimYizlySkjtTG6Ha9y6iMIFFCLi7/yrMXeVzZTuGR4cBWjSd+O54BL6lwkiB19XpqU5XeOqhtBWJqAWniO8Kk/2hN2FK2DpdWhz5Ip+Xa2yMNdgbKJJXJKUbt5lQ0Q0Whbe+Du5TMMfMUkarpoXBsf5ekcjxhWdelZ/w7cMR21IYcJqv/4eheAIv43NFdPDLwocSAikR2QhdYf6VvwS/AXNIEQkkgWbCO0/9sAaU71hYuwyAmdxs8nHVKe4C7xKrpn7+UzJlaKSI1qpZpZq3ZaXPEGEJS5uypTxQMONUpOmJseVcuWxGwV/Ckc6iZptOu7WSeXxyJvTliSkz6ATazLP7CsUMmwGHSoROSnaFZ0ya1wy5lsKyrX4yqRzzIEUeKSI3IJaIr7j0kADyQ24dGD7xlwojrnaJkoGSdEX8HTUDeKd9mC8Z31rHQIQhDVDdBvGvW83TiEbBlJXoknrH/2URaeXoI/tcQzv4aSw1tJsq0go7kyAH/1uT176eI1JCyj6XvBHYIyU083PizT3nM2U8S9q/XmsdQMdTwzOu6NQBAjLa3Co4rNtmcMmn8+645zxP5MEZbbWlxvMTKg5OGs/YzAzcjvaPuMPoHnz2VNHcpRaTG5M7WDWMYZBrc+af+g2U7DCR6B7qSkfOMUMnGR3+KanLH6sICWIH8cUKroXJwjrJcp72Wefds3zW3QAux513QA83M0U0rRlvKYQsJfpBHzKiPSMcdVSoK712BDm5LjruUIlIj8gFH92KCBcK4acKQXKDSiNtHpgz/ZW7WEXUbHQ5wX6J1IHQOi1DVVTt1Ynbd++HPgmqxTyNIzeIHr/V+6x7MNzK+ahNIjRNmwWYOtrSgmU6atU+zk4aYEUs6We0HGhxPfMmKbVJEqmzUgKvIuAgjIPXg2PCq68Pv/yb60T3al9/nak/28hPmTH7AOTV5WPeGun+Fu3mtXQgpfHN/4BHcXZNavgNCGmgKBOt+cdiW9NuuwGLYlFG7BR4okTZp9sbmtVW5cxQyYFYH7MT5W1CCNwAcgLCue10O13ahSLqD1JBKZKMCu1Bk6+zyxxYfeuSL+ldfCH94X2zp/8QWPyO/skp985PiZVAFdp0kDSufa2n4HHIHRjbMubk7ri8ac4YIwQ+LRG82vv3fgjs32BwTWTxZW4cwCy03bpU759i7dgY0NuinYZ9gBDFy/Ow2MJCi1ft3J2OOSypI1VFQN0OlT9+/776l4Q0XgMhiqR656pHUQMQGRVPqdmQs+QN6/adGsowKwNBIfQnEUM7YFoukC+5yuwJdiylgwgUchBkSypj3SzRq4viitDMFqRVb7WizmHMyzXzRjFXuZGCrImbim2z6ftzxcpdg/mv3fUMkVZeNnQ8+Vf7PXyM2ioFLojtzQuFpqZIzVbMpIgerdnBv3GGs/VeX3U7dQqSRNFVDPAPRIcQgPIPYrMHdfdjBU4SccQafWz/nZkrAqRNvi1tiylxzxiGS7li7FmiJfSh+jl2uIi6/dMad2xDpTFvUljgjcU215t7VvZTaVJAaPBCoXHYW424A+aFc0hm8dGU6iBzsLZSA+EbURl3VN7zMf/SoYnW5HREObNDNCF3sESNOcLEXPKgMmd7ZKGkbYPSjd9LuXpvm8tH6GT7onEz/KYLYzFxr2uK78H9zuYNWGecEVR08I5RRBIo98Z2YyKjZT3XVlveUR0+PvfbzXvpNqSA1GtRZTqPrJVA6m7m0EqUTntkqgWfSDS0kN5UsE99/CM6P10pvsPzZKNQdXJtDUvZw89yfe5ie9DpkFLL+nJbKOefUezAERxZzNlt0Y+Xtu3QYbS6nu/GMXU7oKtKeHHPELLiRxAGrhkK7lquPzG38++XB2j24cpPr7d/2htdUkKpFOWKwVmepLZT2lHwCW0dkaYmzC5mmWNPBL8QPHun9VA81Svav0TRrZAaoHTSl4zHx7mHUkAsLss4SXQ5blCc7A8faMteu3IZzAkGyLk+4ECLhxNUOgY0WY0o/5wnBCgrSycm9atmpIFVXTUxY2vutx8XU2Tq8wjPbskt3qSoGXsu/kD57spdGpbbECFWx9gqeUCtJiRMunPOIqbEMVJhFD61sK0PzdKcVo20L7QzNIxQL148+G+lcUweLB9AXnCEGgy0wCpnpV3WrC6wdUkGqodGxcZstS1KJRV4LryCdTt4+agluKBYu/kDY/EGP/aYNb2kLfxRjEGN3O0BwkjemswHUbiIve9Jpk/9bcls8wb7Nlp23yLPzTsYqpWe2ykCKNgW9GahgIuZQ58EVdqPsolNRwUm96alOifpVWzEHdFq+klVCmW6TmtmFejENI6rIq54kNfu6G+ds/1j945zI81eb+1fROdlQwiNP3imN8+/pzRzEwzFvxr0+aRyENzZ/gDiLLfvNsFm0M9Z/NKnW6OP488QOB+EpMNz22Mujt76e1sG4ThdIBanwMFTxUs4otY7KtchzSpqF2D4Htra8arqMDOGj/1N0tVVtdYD1b8hPXEhKv2QU1GD1ItH6AIM6+2YXLyXnMTlOuvK85wlh6bw1izOb0VasOeUthdZ/9Ez6HzwabaAnnSdqKNqRZXWhzKlXk5tedftzekVpakjleCDMElabS4tXm0WnJL4FAbXOpLu0CnBUCUbK3Z+/3IXTtH2ptvB2xUBy2xU8aYQaqbOrNzkozJ124azHRKnZE6ZMWWzZu5BpVWjDLqeHoKFhakrLt+i2Z26f0AwsIK8LZTOe6LxfdKvnqyOkglSW5+kkAVCtcRl18rZcNstrnHW7BTiqGEXk6Ka3mao9iZVw40HjlVujf7koEmtEbb8dT0SU5ipoPPW/euNrdIJZU380cfhNLut7cQ6R8YxFE2zbZKytfY7kcqtR9MHDEWhtcHssslQ5vWlgWxg0zbz4Yf3XGzy9HPRtRkpI5UAEgSjgyUq2jNpE2hmLPJpa8s2yC8GrrrKmsOzpxMK67g1l83NuqqrbfhwajJbgM654zO3LTv4zXjbvb4UD5lFem9myMwCHyHimudz+z+1Lq92LlLKs3Mnhc+/WJ14G5tMHx1woa+aN3B2r/Gf9RMwuOtIALBWkSj7Qg/TlLyqIIJp2svM2ec3+ETCKrC3sUr5pggYBSripfod79+oEk9kjDURF9jyxNhYIfI3LH2MnX3xEYrp550tvfrrgvZW37dj3n9bfG2IZ7oZvvVmQfYbNazOfHTBql9NiZMZw/nj03be1H7wZuOgez8X3eEBGPThPyG2a/9suvhXZfaSCVMHLGKAaIeamPm2zQbUl1eaVPjZ9ajjDrhOat2vCqhE4X9eNVS8prSrWwYxrJeRpbDWmTcEhN5/RNPWyXjKqaKEvt/5t4UcXvrPy+l1lb27e+/c3l1327KJTSw61fL9EFHzfv3zxkPzzXF7nvu1bB8TzdGPl7YxhIJebvko7/jw+o4DWfP5Ybso1xuzb1TtX+wO5SeMiFWs+gNm7Z3ytGmHtd34hfmc4zHCgljHDY5YHo4sZFrOcVW4dBQsDJdAMMEOtDeSg3CMFzr5DGzmnDX+fvxx79Rb6MiFQb5fwyMsj91l3x+bf07O2X1axcm/Fx+VV66rrt8bUcqBKibVQ5fYhnmTfumCr15PjFIHkmcabS25ft+0pVSFaq+E5O7VmVDORR3T/7Lsrhg+dap/Wd0iFpIo+RvKz8T4Uql3hQUFZAmFAG4VFnp3gLOA1vgt5i1E4H+R1w6I2L7fCdZY+GoWwx2KUToyWUGb+SeS7r+s9YrSi5qt/Lbn8hffmrPn6f0orPwhFy+UYkqPWfTYj2oRUs+bd1bd/9Pkdqha2CxmGveK8JxbMeyHgzXN76JIiztPFE7UnKKYjn1A0N29xUVafMwpIBakuH/YEiPMmL0RnIHk2VXaeJVQ6YUulk25Zulw51BfNQ4ZybyWNRKp3cLXWOIYNaA35J3HWlYFRAdK83+h3rPZMuqTbAzIILfn8zucWTd9z8C0QtUgIAZ2J5ydjFI2g3WVvbtzzyMHqtU6hhVMmXPffN341a+ov/d58HQP3NGkEKSb92j1G0ti0719a9GWhf66RhK6trsHee++9TrbvgNHGd7TGEs5kVMoZVbaUTtC9kLi44rUVsqV4LTqBdrpYGWW0WVjdgtfgtaIpLR5/fZm562POQAqI6S3/cs25RYKLOMe6gaq6Le+s/I5hELUb77dDGzJ0eud1DaWTRl8H+sU5YJnY0UPPyUNXC7WTGdMvMpkepjBLPHmE94ZpmY+OCXxPEjwGhwrHWw/Sx0iFpAIC+fAwHDBHGQXyeIs5hj4h5Q+IbJZLO1nUNh8C40p5hXKiEm3PKs2WpOIV+ru/V9YulHUU8aIBQ2ahSZf2eDLi6o2Pc1wHotkBdBWawnZVaz8opkRQ1ca8Avyd6Z4Xzgh8cmbm8jmZb04I/DKNH62AMwgC66FLsaUAKSI1ZwTL8QxIpJVANKl/ZCteunWkk/JNRbZZIVtkOxzbvBokZoQ8B7cZukZeuDH02QNi7eYMEKGxC6Lf+0fA+bFuo6ah+Ov9/4qvTQvX7w7AUBqmqh1G6pYPDUbHYU2n701BXEaIZprgr+sQnyHCgYPeA5twREgRqbnDecybDp2WpEKin9sCFh31S1kEb4oSbKliWu5Iqs06EEy7S1kW71ymwd/+Yon/9lXaVc8pP37fc+Mr7qwhPX6WZWt/zwkRHaIthr5qBz8numizA7VKG1MHHANHihqMyc5yeDZKt5ihMjYUi79+C+4R5dLZg4pmIF5v2e1TpIjU7OEM4WL0C4fAqEDNKk2QsYwotmSU5mFr8+fwaica4ViJAK2qoZRs0OQwyhrCFk3jp18jjj6rN0rNMLUDlWsUma4pATb75JG/uG7+JzMn3utypYkicEKbmijRG2gHKBF4r9hq8aZIPSn+mKg6+L1OWHU4oIlI3hTVdorWJgw3mA+eVq+FWcRpjqNk0UmZA+HjGCDYYtEqpMo2bkfbywtB2M37Z92uj5x5RAaqum7n02+PAdHkydAF57w6cMB0uzwYLquu3+4S6GqQe8qXLt8AjqSpKi2C6/ai0yc/OnPiz+xdw0Cfv2QodWxY0Sy3jt45FXTbFaB5aJTY58FDZ6KsIvuP+hYpIhV+5M/zG2q2iwYXocoWxNRm1HpyYJEyDTrZEkrqQNFo1apGqBf7EhadcCG4lEcI5E6Nnffz3g9l7Ni3aNXWXyPTPTB7yvSTfp6ZNtI5cBhKKla+s+y7DeF9tjMFYj0oe953L/nIOkix4W2zcQ/TFNOaPYAEpNJWy5Gpl2JPX60x2QapUggYFU7gBUG0+4/oVrA0MFhWgSbKK8gu7FI9TPm2uG/WxraKphnqMGumUrHd0I7g3b/9hz6VlfBV5yy6YNaTnTAKKMqf7Rbz4TZsGBoKRvZU1W+1d3etNOuLgVEwy3ZBYlgtmEg+Z7evkSJSAYWTeceaAos2nZRRDAkIBl7hyR0iIeChpBKbXZtLWi92w2cxRJVYdh8q7tCAdYkLZj72w8v3+Ly5zn7HCEUrKus3ac0xD7SjULQSWws4lG4w9yxnIrI1HNEpeA5JfmqkU4MUkjqeNdgwx7O2A0x5pXQiVqS8cqLjN1E9bDnJVChtUi2nyfaVbF7BY+JZpnxLgkGbbgNaSbfqmNBx3RaVACqHQYIvfWjVDrTlXawZ1sz0rsCxyJueCjNnI3WkZg3lAgWmwIuWCEKNBgSUITBpAuuz5ZWKLIgpR6WWrrFt5eE8SJZypqJMqbV41YlBv82fiopiWgui5EKDi86tL8ZrXwe6saprnerdFvgHdPPEJCB1pAJVg6fykuBiGRfIpTripei4h9SB72oDlrOSyQkMJ1JtTLmkiYqsnbHl1RJQWxXTvIGUpkMoVNPnrG7Z8xorxGxpZBkmPWPGaPZ3GxZKhoEVvVvf6gAvIKYQf1Z/JBUwZpaXCpsn2jTrkuDU7wXH3Fkz9ZK6sd/hRJ0XWEsJU+4tJWyJpiWdreXVZhTCHBPrIuep3NWT/r2eIyrXrdr4B9vvhd9lRd8E/ELZh6M1YLTbX1/h4bZ54u6rBfMTIKWkskNXNc07Nzh3tpq1nFERJEzrS2VEmQOtDMbVSpY/ZfVRUGtqh7NO/Ao2lfIKyer0qdlLJVVWnYGwpGPZuvsJU2uTahBkRKTyVYW6CVq3B9/TEQXQvQSUTcqQOlKjcs27a65Vc5fo3uL4B38wQRpXr/u+5nmRmlJINq8t6pf6wxaj1HWK21Qg1TBJuFTYtueNp96a0BQ+6FwxeThw6PP1Ox6PNXfxGhzyh79NYi6d9GzBYtArGQMP65fqS6SI1L3lSxd+eHlEKdEi7T8eTaMDMcgLmJdoohrYSjajrRWvk+zQHqJVDe8Jvv7a0qtkff+qTY+UHlr95bbHFbX9hyp6jU27XxMl5/U7g0U51b8eUHOvyfRM4bMMG5FJxkBnNzXo8x4l09TeWX7rjtJnQYkpcktnmw1glDHFcbUbPWgE4mRbBGk5of3m9taZ1qRDxvrkCTi+OiKqS2HLDk4cT9gYMehfEYwDaWTB6SuKBs62rn1EqKrb8vyiOTE5SH+RQVk1d+VVPUB4YClG+4ysPhBLZ1gZqj+aO5La9ih53CzvJ6d8G+6w+wr7SNHnkrpp16u7K56NRVHr7tM4oEEJZpHEZrGCQR0lkFRLXi2RddwlO061HWCn1jDiDF71rdMtRoF7OC0tnbjYCfkDJjuXPjIsXn6rgYI6nQMJzY5Ja7gJqCUYFG/PuBE4NKAopYwC+ppUsmbT43T6VgddLlDs0091s9mspHESneDMS3SiEc1LtF+CdjDZvFq6FyoHM4Qj/nDGJ7WFv7K/4MULKN076txT/vm9Sz4V+K4WHuwKShP6ZPnjhxo+B2sKPwdcYjPAmD7Szmx0AyDGoHuzhqSUUUDfkrr3wMd1kY1Kx+9MgKTyjJ8FC2q7vs29EFaibLECdYCdcVaq5Qhn+sOBjw4Mv0ATy8DPAkDYkxEYNrzgfLd0ROvI1h0g618lrz2w+cvd99tfbwAxFZXheeUvcHoGsTz1HkESsSud+OiHx1KKviV12fr7aCvtxGoTZLJBIJXjKYtU/Vrs8jbBUGj1A1O/17FVoKYbK/JuJlhlmqUfCNh94P2HX8p4btHc+Dy/7qOx0ty+1Hj3PvXfd+q7PsCV/j+E9Rr7nsE/codmB+ovNpnevAENujdvZKrFFNBXpIKLs3LDw1WNKxKa0tYwmCB1cSmplEWgE5SwHdvER3KwNb8QzBlHpNqMx2SxLM6oDXBVBmSNO2XSbd1Rv2ApGyvMPWuM1S/qb94pL/yp8uULbPUOASt8xYDHgxmvMVbEBWLKGpy//iaD7cB4dAqOZSMKOSqk9pX3a5r6oy8P03FZJAx0sAY4r4lgInYiXlgoLEBSzFa52ArSiU7XzNFVpCtEgyQjLUaI4g6be7fnTDGZsK14HTCI1wYW7ltWmDMceTTJb7i9DO9mqOq25s7rGpHDRG4ikQYUqjFC1ThcZ4qsBxqTSSeYxwjWWdOnZq2onjQX7L99cRPCmJLn0utuIAJ4vNRBa/Z4qWfbnO/Q+w34OX+RedLZfe21JEAfhjRvfnxtVf36y+b+85N1vys59K582Iq20P5FlD2T3e6W0llJtXUvVDQ9ZFA6ddmiUyFqzDSiApGFHb5rajwLubaSQ7/wsvNXgS1/QAL9Q9ogIFkvdNj1DiYZ6t2ufYLBadNNMJDYoGSAcwuH4C95tWbadNWzg7H8IYNH6Yd+nFv6uCHIdAqcdZ1mIrsmleMYXmCmLUC+5KxE3TP0YTu6+PQnb7x0XV72lBGF54EIHg5QTBpq0JhqhqWv8QKdYEFpLwQYVLsvyXr/AuqIBVPKNu5Iu6LO3Z5RB1xMZ1BMb4xqjRG9Iao3xGhqtFPULteCUS0o602aGbO+At/SmrEhNg39rep3GAUZ9dTPyyp7xGBV2unVc7glxp9nHBVGAX1IqsB7JIFauIkj/0vEQ8XD3laC2vII+RyWMDZpk7dGwi1ravci0SZPYxiwbVgIcWurxDcSfyYOvC2uwQkge2zCwKv1ydmfhgc9Hu8sIgzy1dzM6EIvPF4AwzC6gYafmtKuwdZIhcaXxLRL5z7PIIg6nRIKsHaIm5h5X4AbajYvNgeFlp60mIyX0N5f1Mh91tmH/5jereMCwafXFILB0bdSibSuD4rXX3mtt+4ig+9xV4MNr4vx5hppec5u6pEiMz5k4Jz8rNlCqwn0UFssQybPOcWVRdySC0w7hUlXnNHpwh+Qh30qNZgIJejlSualju4V6NCFSsJYHHRCfHsAoyLhQo0Tr9F8u+wxBlC8YnhceunDiHYJ9sbpBUMia+bo2UdNTAEpIhVQMOBk0K6twbOGjtURM7GuGwzhwLvRNbqUC7hIhkadHaCWM8US428b0XUarunkXglfSycu0cGBboNwiAjBSdfLee/bipeuEBEdnbv1Y07NJWxvvlQALcrnwbljkK8vvyPfJVJEKghdfWifPeJhA54fNG0kUiplosAQwyvxtoxSXxf8XhV4hUBDDOkHd+u/40EFO3+XCOBJ1cwiEb/Tk0fl20qdglE9saInlfx34v0KIKa+Qzdz0VyTDfdO8UoCr2Bz1MzUiUpCpOjno3LNjn2L1NbdMnQWL8IWz0NO5qNEdfMSxDC6jOxkqBjpTLFyb4w0dKnLQPdaStuhk24cE5kYWPcoAz8Mj/tFfGSXgI+mpLlrFpg8FPWGUXD1BA6NOZ0IyVm1qfdIEam1jbtNrLQOicET0lTk89KRRpbDw2dyMVlnTF6jvBJNNbEqVSpflOnPgZh2DgyBZ/Yqna3TZcq+ZYntIwkBbHPYYKMj7iN8zLGb4I6Z7vTiZ7hYAelVjyDA52b9RWb+mKNpTW2kitSGnaLYZnoskGoScCsc38mXxQycYAoMZ6oMaGCiSKCEt6s/MyHaAR7opCT7xEQwEPHtN7y7tLAAZhgKHF4TUguMmmJk0h16xtp4wGJySGw81VP5bZPrzaqd8DtukTc5Y8K5R1nx2kjRTWT4hxrWUHY7WOuxOMgbKwi5mosXDUUIKYfWaZc2kC/BB4UqE4x8SS/qkFd6hmlkf2nEBDVqMdmx7sWqNzb6gejYR+jC9vZJ1mWlmst65Ga1hsDyJiIT5tMJkccCUkRqdvpYhqS1fuUW6hPqkGHb3MDI2Tz2qn6BC6rbq8giW5EZDMqIXDu4ZiFddaVjkJzPTdNQw9RztvatbRsQrAb03JXy2P+hYW3zCSaPPAdu8JbdZnJRp6gnYBjGJeJRc82sQb1tFMlGikj1enIumPlo685CCG/8ngK/r81rYCDKY8/hCEMUbivIpV1JcIvu6Ax38FRJGdbBN5gozHC2qbK6aiohKv2HcwpaF0KY6NQfEBaiJacQGBXqTw7s/CuhPLcyD90DxozPzeVPNYacfPRNaRwpIhUwZewNOf7ZUrNnCKQGvIXSYSNlgpuZdAWOur6S7OEaOnMlIEQn6Ap4p4M70ZCEi+o6Bgc41mRqMfoma3ttr7tik+4yMrfHTSl4vKySlbblVay7e+EfYYwDHi5ztDlm7jHEKCB1pALOnnE/VLpd15hBbilBiA7e1M6ad+vwR/ZUFQAmgqlyhoKE8LQO71dBzMSX0ci3jYgPAtxIg9Ha06ZtQ03TBr2rjnwCx7mzbsO/+TmuaQThnFVHuw+Q0YBbyBylT5qf0jrsDlJ6Q0X5swsHnGN3FoLlq6zfrCjtZ3QuWXPXouXzFbkOHCsb1iq5umbqngO38tE8EK8EgKiXN5mJzxoqA76XEiHRRqOlq9kUiBBSJ91B861Mqbf4f6WK+XCop4yyDOdz8dkTzcmXdmbmjxZS3cpGFp1vj5jSFe7VkrLK1Vaxg/0HV2wufkqO0dFQCkLnsniYIUTxaYaMgwN9e+4mHVWjhpgBX5tSnaGyEC1FG0wlbDJWC8CKRxv7JyNrR4viFZB04HJ38d0m3zPnCNxqgZNEni2aRSZdeMzJqI1U31ZN/c64rMCP60bLbPem8MH3V92mmcH4enDgWIlixmj2z5KWRXRgLSjsvVEsP4ckihyIgZj0MhTYS4fToe5NFKo2tChYzTS9cLl60sM4vswcj9jGMd5Nz9C3PuJdSt2DV3IJLjL5MnP03J4JdyqRUlJNUy+vWqM3VyPUSkSucXYQ2r73rYi2LWpNzASAQLMsXnDmy5fcOnvsZQoyeI5IumpIq19k68YmkFcTYclkBm40dAhaaW+zoeFgBSOPfkqddwFiw45vy0Co6veue4VR0gkX677iBZXrd0v+fDLnFlI46RiVURspvbn6pj2VdVvt940AIEwbtj9n5zdsf/6Lrx+OhB1GGQaB6T1vxhOjBl0Au1MuE8/7NeNKJxLnJsE8bvmTWJcOpwP+lh+8DjKUVEiqywzs1mf/gDBRunSsBWgN7i1/5OumED7YbUaxR3SxHB48y5hzC0ricp99hJTen0ca4JEy4/4LGM6GplLIxJSGpV/eFYmVOy8NYrqq0Yxxv5s27ha6b2HwVH7B48KwMxWeQZw8kPYxHsYIEMlm70NYpiu6q7wR9TIZhyC2aWFUQHzFmeK+75tCd8dhJN7lFaX0IcaZtzETLmDZLnuijwGklFSXlJGTNZFvXnQRSJXV2tKKFV9s+bPJVMlRR0w9PjSm8PtnntJ+0URPGnPeneJF96G0MQdZsbmTrzXArPorGVeY6G7kqfPfcqV7wS3AtHMmKF5DcH/9MP2ReMDUIbDEu32SO5BrTr7KPPN2NjvlE+17jVRrkmGFZ9keKYDOczD1Z/5zxmdr74vakkPosrqFWfMvmfuUc9JhGHUOOvNXQY5N1A/hFIE99bvn/cl1xuvYfSjeTYTdyFj7w8i2qTpuojMIramEhwMjxi143KIrUKhPucqc90s8dPqxrm/bIdW3O6ZovgoatPlnIaZkMChSZ/UGwYUyvdMWnL2QzjnrGJKQbo/GtAeDjGC+Hi3gcja7Zz9n0C8GOkewhIx9U5SPfx1qCNbt14IVeqzJpOPwmHaDYBacMlbkPF7RIwmuvAnGnB+QC+9ih81kOOEbI6BxpJrU+mApVGLr7h7g1R6qofWL0LmnPSoIXay/nB0YxTCBuMTHQVTEF2zwzftj4Du3Y1GOM4o4ZAazo6/80wx7Ea8YOorUm43lpLEUh8pFpcqn13kjtSbvVYtmavN+ZZ71I7ZgErSrbx6dNlK04lkcxaUf/GvJBRCJtv9ZglxelOaa/MMr13cupjbe+ewHW/c9BWa4Paj2tL5t1DwVEH5HDDDKG39VPryVzdBZlsEcwZxJmJgYMDMHs7mj+EETmcKJbPYw5hvhB3WJVJO6s+Td15fOP5xUlkWC4L72wo8H5c5wijpFccn7r39yYXxV144AvwJtJZ2fO3D3YlPmOckQvNiXQ9Jy+bQ8HMhjvClcNCVlSDWp2/a88Z/lV7QnAyNRRJec/tqEEVc6JV1hxYaHVm65MwbuVafgeORz5930rXV+a97McYJU21TDVA/3OQUBZftPmTDiCme/G6ip35EgpDkMvIDOmPrAccUo4JggFZRFTG2UlaCz3xVAu4Qih1rPeEoIYBQb2eOHL3D2jxukmtQd+xYfTgbPo4kjrhTF7q6XXh/cXVr5WZsJp4cBnC1RQqdPu6tLX7r/IaWkNjaV7Nq/WD3stReQ1LTAkObpK10jGD7IsGonzgDEwS43mjLsjvhSy8cVUkqqTjQarbQlQxDpyvVusQcrIxTkTPO7R4ETlBCg3nmBnXHS7+fNfMgpOs6QUlI/XfNbVtBbzQqlZi/NO2pc4Y8Lc53VzrsDgfdOGPGdeB9yO0ArycucOffk3zr7xx9SR+resiUlta9prQwh1L5XLPj+t1afP+txj6tnrxTJSn1HXRQMi9J8g5yd4xKpI1UU/AMCs6nqtUwnKEmo/Qtm/7V36+QEfIN0rf2aU2BKJTe1ppKQkrXqj1WkjtSC3FO/e9GKUYMuclnfM/D40ciBV48Zeol1sMc4beJPh+ReCMbYBrBr50cUXDkw/bKTx91oFR+nSHmP0t43F62kgWOGd9L18z91ib0XqW1733hn+RX25BjDxIU5U86e9siQgrnWweMaqSbVMNS/vjZh1JDz50y5+wgXKFO00B+eG5CfNZlh2HRf0bfOerE7IwHHA1JNKqA+uNctZkpSEpaq3lf+SX72VEVrUrVYdvoop/S4x1Eg9QT6Gif0VT/ECVL7IU6Q2g9xgtR+iBOk9kOcILXfAaH/BwCduVrVMMLTAAAAAElFTkSuQmCC',
          fit: [100, 100], alignment: "right", margin:[ 0, 0 , 40, 0 ], absolutePosition: { x: 30, y: 50 }, width: 20
        },
        {
          layout: 'noBorders',
          style: 'tableExample',
          table: {
            widths: ['50%','50%'],
          
            body: [
              [{ text: 'Reclaimer Name', color: 'gray' }, { text: this.name, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
              [{ text: 'ID Number', color: 'gray' }, { text: this.IDnumber, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
              [{ text: 'Phone Numbers', color: 'gray' }, { text: this.contact, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
              [{ text: 'Streetname', color: 'gray' }, { text: this.streetname, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
              [{ text: 'Town', color: 'gray' }, { text: this.town, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
              [{ text: 'City', color: 'gray' }, { text: this.city, color: 'gray', Border: false,bold: true, fontSize: 14, alignment: 'right' }],
            ]
          }
        },
        { text: '', style: 'subheader'},
        { text: '', style: 'subheader'},
        {
          style: 'khuthy',
          layout: 'Borders',
         
          table: {
           
            widths: ['16.6%', '16.6%', '16.6%', '16.6%', '16.6%', '16.6%'],
            body: [
              [ 'CODE/NUMBER', 'PRICE', 'MASS(KG)', 'VAT', 'SUB-TOTAL', 'GRAND tOTAL' ],
            ]
          }
        },
        { 
          style: 'khuthy',
          
          table: {
            widths: [ '16.6%', '16.6%', '16.6%', '16.6%', '16.6%', '16.6%' ],
            body: [
              [ printCodeName, printPriceNumber, printMassNumber, printSubTotalNumber, printVatsNumber, printGrandTotalNumber],
              [ 'Overall Totals', '', this.printOverallMassz, this.printOverallSubTotalz, this.printOverallVatz, this.printOverallGrandTotalz],
            ]
          },
          layout:  {
            fillColor: function (rowIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
            hLineColor: function () {
              return '#ffffff';
            },
            vLineColor: function () {
              return '#ffffff';
            },
          }
         
        },
        { text: '', style: 'subheader'},
        { text: '', style: 'subheader'},
        {
          layout: 'noBorders',
          style: 'khuthy',
          table: {
            widths: ['50%','50%'],
            style: 'body',
            body: [
              // [{ text: 'DELIVERY TO', color: 'grey', fontSize: 14, bold: true, margin: [0, 0,0, 10] }, { text: 'DRIVER', color: 'gray', Border: false, fontSize: 14, alignment: "right", bold: true,  margin: [0, 0,0, 10] }],
              // [{ text: 'Printed Time', color: 'gray', fontSize: 9 }, { text: this.timez, color: 'gray', Border: false, fontSize: 9, alignment: "right" }],
              [{ text: 'Company Name', color: 'gray', fontSize: 9 }, { text: 'Mthombowolwazi General Service (PTY) LTD', color: 'gray', Border: false, fontSize: 9 , alignment: "right"}],
              [{ text: 'Registration Number', color: 'gray', fontSize: 9 }, { text: '2016/146912/07', color: 'gray', Border: false, fontSize: 9, alignment: "right" }],
              [{ text: 'City of Joburg', color: 'gray', fontSize: 9 }, { text: 'Wastehub Permit', color: 'gray', Border: false, fontSize: 9, alignment: "right" }],
              [{ text: 'BEE', color: 'gray', fontSize: 9 }, { text: 'Soweto JHB', color: '135% (Level 1)', Border: false, fontSize: 9, alignment: "right" }],
              // [{ text: 'Item 45', color: 'gray' }, { text: '1868', color: 'gray', Border: false }],
            ]
          }
        },
      ],
    
      styles: {
        tableExample: {
          margin:[40, 0, 40, 0]
        },
        header: {
          fontSize: 35,
         
         
        },
        khuthy: {
          margin:[40, 0, 40, 0],
         
        },
        body: {
          border: false
        },
        
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
          lineHeight: 1.5,
        },
      },
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [ 0, 0, 0, 0 ],
     
    };
      this.pdfObj = pdfMake.createPdf(docDefinition, null, pdfMake.fonts);
    }

  downloadPdf() {
      if (this.plt.is('cordova')) {
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });

          // Save the PDF to the data Directory of our App
          this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
          });
        });
      } else {
        // On a browser simply use download!
        this.pdfObj.download();
      }
    }

  Logout() {
      firebase.auth().signOut().then((res) => {
        console.log(res);
        this.route.navigateByUrl('/login');
       });
      }
  
      myBackButton(){
        this.location.back();
        // this.menuCtrl.enable(true);
      }

}
