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

  prices;
  getprice;

  overallMass;
  OverallSubTotal;
  OverallVat;
  OverallGrandTotal;

  isLabelActive;

  GH001;
  NFAL01;
  PAP005;
  PAP007;
  PAP001;
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

  // NFAL01;
  NFAL01SubTotal;
  NFAL01Vat;
  NFAL01GrandTotal;

  // PAP005;
  PAP005SubTotal;
  PAP005Vat;
  PAP005GrandTotal;

  // PAP007;
  PAP007SubTotal;
  PAP007Vat;
  PAP007GrandTotal;

  // PAP001;
  PAP001SubTotal;
  PAP001Vat;
  PAP001GrandTotal;

  // PAP003;
  PAP003SubTotal;
  PAP003Vat;
  PAP003GrandTotal;

  // HD001;
  HD001SubTotal;
  HD001Vat;
  HD001GrandTotal;

  // LD001;
  LD001SubTotal;
  LD001Vat;
  LD001GrandTotal;

  // LD003;
  LD003SubTotal;
  LD003Vat;
  LD003GrandTotal;

  // PET001;
  PET001SubTotal;
  PET001Vat;
  PET001GrandTotal;

  // PET003;
  PET003SubTotal;
  PET003Vat;
  PET003GrandTotal;

  // PET005;
  PET005SubTotal;
  PET005Vat;
  PET005GrandTotal;

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

  pdfObj = null;

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

    this.RegisterForm = formGroup.group({
      name : ['', [Validators.required, Validators.maxLength(15)]],
      surname : ['', [Validators.required, Validators.maxLength(15)]],
      contact : ['', [Validators.required, Validators.maxLength(10)]],
      address : ['', [Validators.required, , Validators.maxLength(40)]],
    });
   }

  ngOnInit() {
  }

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

    // create receipt
    this.createPdf();

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

  createPdf() {
    var docDefinition = {
      content: [
        { text: 'Mothombowolwazi', style: 'header' },
        // { text: new Date().toTimeString(), alignment: 'right' },

        { text: '', style: 'subheader' },
        { text: this.letterObj.from },

        { text: '', style: 'subheader' },
        this.letterObj.to,

        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },

        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
            body: [
              [ 'NAME', 'SURNAME', 'CONTACT', 'ADDRESS' ],
              [ this.name, this.surname , this.contact, this.address ],
            ]
          }
        },

        { text: '', style: 'subheader' },
        { text: this.letterObj.from },

        { text: '', style: 'subheader' },
        this.letterObj.to,

        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
            body: [
              [ 'GLASS ', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
              [ 'GH001', this.GH001, this.GH001mass, this.GH001SubTotal, this.GH001Vat, this.GH001GrandTotal ],
            ]
          }
        },

        { text: '', style: 'subheader' },
        { text: this.letterObj.from },

        { text: '', style: 'subheader' },
        this.letterObj.to,

        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
            body: [
              [ 'NON-FERROUS', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
              [ 'NFAL01', this.NFAL01, this.NFAL01mass, this.NFAL01SubTotal , this.NFAL01Vat, this.NFAL01GrandTotal ],
            ]
          }
        },

        { text: '', style: 'subheader' },
        { text: this.letterObj.from },

        { text: '', style: 'subheader' },
        this.letterObj.to,

        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
            body: [
              [ 'PAPER', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
              [ 'PAP005', this.PAP005, this.PAP005mass, this.PAP005SubTotal , this.PAP005Vat, this.PAP005GrandTotal ],
              [ 'PAP007', this.PAP007, this.PAP007mass, this.PAP007SubTotal , this.PAP007Vat, this.PAP007GrandTotal ],
              [ 'PAP001', this.PAP001, this.PAP001mass, this.PAP001SubTotal , this.PAP001Vat, this.PAP001GrandTotal ],
              [ 'PAP003', this.PAP003, this.PAP003mass, this.PAP003SubTotal , this.PAP003Vat, this.PAP003GrandTotal ],
            ]
          }
        },

        { text: '', style: 'subheader' },
        { text: this.letterObj.from },

        { text: '', style: 'subheader' },
        this.letterObj.to,

        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
            body: [
              [ 'PLASTIC', 'PRICE INCL', 'MASS', 'SUB Total', 'VAT', 'GRAND TOTAL' ],
              [ 'HD001', this.HD001, this.HD001mass, this.HD001SubTotal , this.HD001Vat, this.HD001GrandTotal ],
              [ 'LD001', this.LD001, this.LD001mass, this.LD001SubTotal , this.LD001Vat, this.LD001GrandTotal ],
              [ 'LD003', this.LD003, this.LD003mass, this.LD003SubTotal , this.LD003Vat, this.LD003GrandTotal ],
              [ 'PET001', this.PET001, this.PET001mass, this.PET001SubTotal , this.PET001Vat, this.PET001GrandTotal ],
              [ 'PET003', this.PET003, this.PET003mass, this.PET003SubTotal , this.PET003Vat, this.PET003GrandTotal ],
              [ 'PET005', this.PET005, this.PET005mass, this.PET005SubTotal , this.PET005Vat, this.PET005GrandTotal ],
            ]
          }
        },

        { text: '', style: 'subheader' },
        { text: this.letterObj.from },

        { text: '', style: 'subheader' },
        this.letterObj.to,

        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
            body: [
              [ 'OVERALL PRICE', 'OVERALL SUB-TOTAL', 'OVERALL VAT', 'OVERALL GRAND-TOTAL' ],
              [ '', this.OverallSubTotal , this.OverallVat, this.OverallGrandTotal ],
            ]
          }
        },
      ],

      footer: {
        columns: [
          'Printed Date',
          { text: new Date().toTimeString(), alignment: 'right' }
        ]
      },

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

}
