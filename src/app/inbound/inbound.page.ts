import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform, IonSlides } from '@ionic/angular';
import { element } from 'protractor';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment'


@Component({
  selector: 'app-inbound',
  templateUrl: './inbound.page.html',
  styleUrls: ['./inbound.page.scss'],
})

export class InboundPage implements OnInit {

  storage = firebase.storage().ref();

  transtioning: boolean = false;
  isBeginning: boolean = false;
  isEnd: boolean = false;
  nextText = 'Next'
  // start of Declaretions
  // user infor
  admin = [];
  Newadmin = [];
  Userz = [];

  records;
  recordinbounddisplays = [];
  recordinbounddisplaysHome = [];
  recordinbounddisplaysz = [];

  testArray = [];
  PDFArray = {};
  PDFArrayPrint = [];
  time;
  timez;
  ids;

  name;
  surname;

  pdfObj = null;

  letterObj = {
    to: '',
    from: '',
    text: ''
  };

  db = firebase.firestore();

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

  RegisterForm: FormGroup;

  image;
  DriverNameInput;
  RegistarionNumberPlatesInput;
  TruckSourcessInput;
  DestinationInput;
  PhoneNumbersInput;
  CompanyAddressInput;
  resultID;
  UpdateID;
  truckcode2222;

  id;
  truckcode;
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

  @ViewChild('slides', {static: false}) slides: IonSlides;
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
  popOpOpen: boolean;
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

  
  driverInfo = false;
  group1 = document.getElementsByClassName("flyer-inputs") as HTMLCollectionOf <HTMLElement>
  newDriverClick(){
    // this will slide the elements to their original place
    this.driverInfo = true;
    this.group1[0].style.right = "0";
    this.group1[0].style.width = "90%"
  }

  constructor(
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    public route: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public formGroup: FormBuilder,
    private modalController: ModalController
  ) {
    this.RegisterForm = formGroup.group({
      DriverNameInput : ['', [Validators.required, Validators.maxLength(15)]],
      RegistarionNumberPlatesInput : ['', [Validators.required, Validators.maxLength(15)]],
      // DestinationInput : ['', [Validators.required, Validators.maxLength(50)]],
      TruckSourcessInput : ['', [Validators.required, , Validators.maxLength(50)]],
      PhoneNumbersInput : ['', [Validators.required, , Validators.maxLength(10)]],
      CompanyAddressInput : ['', [Validators.required, , Validators.maxLength(50)]],
    });


    // pulling for admin
    this.db.collection('admin').onSnapshot(snapshot => {
      // this.Newadmin = [];
      snapshot.forEach(Element => {
        this.admin.push(Element.data());
        // console.log(Element.data());
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

   slideChanged($ev) {
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
    this.sortTable()
  }

  sortTable() {
    this.db.collection('inbounds').onSnapshot(element => {
      this.recordinbounddisplaysz = [];
      element.forEach(element => {
        let time = {};
        let id = {};

        id = this.ids = element.id;
        time = this.time = element.data().time;

        this.recordinbounddisplaysz.push(element.data());
        // console.log(element.data());
        console.log(this.recordinbounddisplaysz);
      })
    })
  }

  pdfmakerFirebase() {
    this.db.collection('inboundsMass').onSnapshot(element => {
      this.recordinbounddisplays = [];
      element.forEach(element => {

        this.recordinbounddisplaysHome.push(element.data())

        console.log(this.recordinbounddisplaysHome);

        let time = {};
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

        this.ids = element.id;
        // console.log(this.ids);

        time = this.time = element.data().time;
        GH001storagemass = this.GH001storagemass = element.data().inboundGH001;
        this.GH001storagemassz = (String(GH001storagemass).substring(0, 6));
        NFAL01storagemass = this.NFAL01storagemass = element.data().inboundNFAL01;
        this.NFAL01storagemassz = (String(NFAL01storagemass).substring(0, 6));
        PAP005storagemass = this.PAP005storagemass = element.data().inboundPAP005;
        this.PAP005storagemassz = (String(PAP005storagemass).substring(0, 6));
        PAP007storagemass = this.PAP007storagemass = element.data().inboundPAP007;
        this.PAP007storagemassz = (String(PAP007storagemass).substring(0, 6));
        PAP001storagemass = this.PAP001storagemass = element.data().inboundPAP001;
        this.PAP001storagemassz = (String(PAP001storagemass).substring(0, 6));
        PAP003storagemass = this.PAP003storagemass = element.data().inboundPAP003;
        this.PAP003storagemassz = (String(PAP003storagemass).substring(0, 6));
        HD001storagemass = this.HD001storagemass = element.data().inboundHD001;
        this.HD001storagemassz = (String(HD001storagemass).substring(0, 6));
        LD001storagemass = this.LD001storagemass = element.data().inboundLD001;
        this.LD001storagemassz = (String(LD001storagemass).substring(0, 6));
        LD003storagemass = this.LD003storagemass = element.data().inboundLD003;
        this.LD003storagemassz = (String(LD003storagemass).substring(0, 6));
        PET001storagemass = this.PET001storagemass = element.data().inboundPET001;
        this.PET001storagemassz = (String(PET001storagemass).substring(0, 6));
        PET003storagemass = this.PET003storagemass = element.data().inboundPET003;
        this.PET003storagemassz = (String(PET003storagemass).substring(0, 6));
        PET005storagemass = this.PET005storagemass = element.data().inboundPET005;
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

        this.recordinbounddisplays.push({
          id: this.ids,
          time: this.time,
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
        // console.log(this.recordinbounddisplays);

      // create PDF
        this.ForLoop();
    });
  });
  }

  ForLoop() {
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

      // create PDF
      // this.downloadPdf();
    }

  getMasses() {
    this.db.collection('storage').onSnapshot(snapshot => {
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
        this.GH001mass === undefined &&
        this.NFAL01mass === undefined &&
        this.PAP005mass === undefined &&
        this.PAP007mass === undefined &&
        this.PAP001mass === undefined &&
        this.PAP003mass === undefined &&
        this.HD001mass === undefined &&
        this.LD001mass === undefined &&
        this.LD003mass === undefined &&
        this.PET001mass === undefined &&
        this.PET003mass === undefined &&
        this.PET005mass === undefined
      ) {
        this.presentAlertcheckInputs();
      } else {
        this.checkinputfields();
      }
    //   textAreaEmpty(text:string){
    //     if(text.length > 0)
    //       console.log(text);
    // }

  }

  async presentAlertcheckInputs() {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: '<strong>Please fill in the blank spaces.</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.route.navigateByUrl('/inbound');
          }
        }
      ]
    });
    await alert.present();
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

    this.presentAlertupdate();

  }

  saveDatafirebase() {
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

    this.popOpOpen = false;
    
  }

  createDriver() {
    console.log(this.truckcode2222)

    if(this.truckcode2222 === undefined) {
      this.recordInbounds();
      console.log('no user registerd');
    }else if(this.truckcode2222 === null) {
      this.recordInbounds()
      console.log('no user registerd');
    } else if(this.truckcode2222 !== undefined) {
      this.SaveInbound2(this.UpdateID)
      console.log('user already exits');
    }

    // time: moment(new Date()).format('MMMM DD YYYY, h:mm:ss'),
    //   inboundGH001: this.GH001mass,
    //   inboundNFAL01: this.NFAL01mass,
    //   inboundPAP005: this.PAP005mass,
    //   inboundPAP007: this.PAP007mass,
    //   inboundPAP001: this.PAP001mass,
    //   inboundPAP003: this.PAP003mass,
    //   inboundHD001: this.HD001mass,
    //   inboundLD001: this.LD001mass,
    //   inboundLD003: this.LD003mass,
    //   inboundPET001: this.PET001mass,
    //   inboundPET003: this.PET003mass,
    //   inboundPET005: this.PET005mass,
    //   Userid: firebase.auth().currentUser.uid

  }

  recordInbounds() {
    this.db.collection('inbounds').add({
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
      this.db.collection('inbounds').doc(this.resultID).update({
        id: this.resultID
      })
      this.db.collection('inboundsMass').add({
        date: moment(new Date()).format('MMMM DD YYYY'),
        GH001: this.GH001mass,
        NFAL01: this.NFAL01mass,
        PAP005: this.PAP005mass,
        PAP007: this.PAP007mass,
        PAP001: this.PAP001mass,
        PAP003: this.PAP003mass,
        HD001: this.HD001mass,
        LD001: this.LD001mass,
        LD003: this.LD003mass,
        PET00: this.PET001mass,
        PET003: this.PET003mass,
        PET005: this.PET005mass,
        driverID: this.resultID
      }).then(result => {
        // console.log(result);
        console.log(result.id);
        this.resultID = result.id
        // console.log(resultID);
        this.db.collection('inboundsMass').doc(this.resultID).update({
          truckcode: this.resultID
        })
      })
    })
  }

  SaveInbound2(id) {
    this.db.collection('inboundsMass').add({
      date: moment(new Date()).format('MMMM DD YYYY'),
      GH001: this.GH001mass,
        NFAL01: this.NFAL01mass,
        PAP005: this.PAP005mass,
        PAP007: this.PAP007mass,
        PAP001: this.PAP001mass,
        PAP003: this.PAP003mass,
        HD001: this.HD001mass,
        LD001: this.LD001mass,
        LD003: this.LD003mass,
        PET00: this.PET001mass,
        PET003: this.PET003mass,
        PET005: this.PET005mass,
      driverID: id,
    }).then(result => {
      // console.log(result);
      console.log(result.id);
      this.resultID = result.id
      // console.log(resultID);
      this.db.collection('inboundsMass').doc(this.resultID).update({
        truckcode: this.resultID
      })
    })
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
            // this.nextClick();
            this.animateJs();
            // this.route.navigateByUrl('/reclaimer');
          }
        }
      ]
    });
    await alert.present();
  }

  AddUserToForm(id) {
    this.db.collection('inbounds').where('id', '==', id).onSnapshot(element => {
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
            this.deleteInbound(id);
            this.route.navigateByUrl('/inbound');
          }
        }
      ]
    });
    await alert.present();
  }

  deleteInbound(id) {
    this.db.collection('inbounds').doc(id).delete();
    console.log('Record deleted');
  }

  async presentAlertupdate() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to Save Masses?.</strong>!!!',
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
            this.saveDatafirebase();
            this.createDriver();
            this.clearInputs();
            this.route.navigateByUrl('/inbound');
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  clearInputs() {
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
  }

  async presentAlertupdatedelete() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to Cancel, Data will not be saved.</strong>!!!',
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
            this.route.navigateByUrl('/analytics');
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

  Logout() {
    firebase.auth().signOut().then((res) => {
      console.log(res);
      this.route.navigateByUrl('/login');
     });
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
    this.isGlass = false;
    
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

}
