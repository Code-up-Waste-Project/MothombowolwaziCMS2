import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import * as firebase from 'firebase';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { Router, ActivatedRoute  } from '@angular/router';
import { ModalController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { element } from 'protractor';
import { Location } from "@angular/common";

@Component({
  selector: 'app-outbound-driver-info',
  templateUrl: './outbound-driver-info.page.html',
  styleUrls: ['./outbound-driver-info.page.scss'],
})
export class OutboundDriverInfoPage implements OnInit {

  db = firebase.firestore();

  image;

  id;
  Outbound;
  OutboundMass;
  ViewOutbound = [];
  ViewOutboundMasses = [];

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
    public toastController: ToastController,
    private modalcontroller: ModalController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public activatedRoute: ActivatedRoute,
    public menuCtrl: MenuController,
    private content: ElementRef,
    public rendered: Renderer2,
    private plt: Platform,
    private file: File,
    private location: Location,
    private fileOpener: FileOpener
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.Outbound = this.db.collection('outbound').doc(this.id);
    this.Outbound.get().then((documentSnapshot) => {
      this.ViewOutbound = [];
      // console.log(documentSnapshot.data());
      this.ViewOutbound.push(documentSnapshot.data());
      console.log(this.ViewOutbound);
    });

    this.db.collection('outboundMass').where('driverID', '==', this.id).onSnapshot(snapshot => {
      snapshot.forEach(element => {
        console.log(element.data());
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
        
      });
    })

   }

  ngOnInit() {
  }

}
