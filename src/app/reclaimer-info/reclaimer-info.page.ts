import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import * as firebase from 'firebase';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { Router, ActivatedRoute  } from '@angular/router';
import { ModalController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { element } from 'protractor';
import { Location } from "@angular/common";

@Component({
  selector: 'app-reclaimer-info',
  templateUrl: './reclaimer-info.page.html',
  styleUrls: ['./reclaimer-info.page.scss'],
})
export class ReclaimerInfoPage implements OnInit {

  db = firebase.firestore();

  idz;
  productID;
  id;
  reclaimer;
  ViewReclaimer = [];
  ViewReclaimerMass = [];
  ViewReclaimerPDF = [];

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

  constructor(
    private modalcontroller: ModalController,
    public route: Router,
    public formGroup: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    private content: ElementRef,
    public activatedRoute: ActivatedRoute,
    public rendered: Renderer2,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private location: Location
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.reclaimer = this.db.collection('reclaimers').doc(this.id);
    this.reclaimer.get().then((documentSnapshot) => {
      this.ViewReclaimer = [];
      // documentSnapshot.forEach(element => {
        // console.log(documentSnapshot.data()); 0769424068
      this.ViewReclaimer.push(documentSnapshot.data());
      console.log(this.ViewReclaimer);
      // console.log(this.id);
      // });
    });

    this.db.collection('reclaimersMass').where('reclaimerID', '==', this.id).onSnapshot(snapshot => {
      snapshot.forEach(element => {
        // this.ViewReclaimerMass = [];
        console.log(element.data());

      this.ViewReclaimerPDF.push(element.data())
      console.log(this.ViewReclaimerPDF);

      this.idz = element.id;
       console.log(this.idz);
      this.productID = element.data().productcode;
      console.log(this.productID);
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
   }

  ngOnInit() {
  }

}
