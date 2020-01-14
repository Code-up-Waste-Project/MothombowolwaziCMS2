import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbound',
  templateUrl: './inbound.page.html',
  styleUrls: ['./inbound.page.scss'],
})
export class InboundPage implements OnInit {

  // start of Declaretions
  // user infor
  admin = [];
  Newadmin = [];

  records;
  recordinbounddisplays = [];

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

  constructor(
    public route: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
  ) {
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
      console.log('Newadmins', this.Newadmin);
    });
    this.getMasses();
    this.recordInboundsdisplay();
   }

  ngOnInit() {

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
      console.log(this.GH001storagemass);
      console.log(this.NFAL01storagemass);
      console.log(this.PAP005storagemass);
      console.log(this.PAP007storagemass);
      console.log(this.PAP001storagemass);
      console.log(this.PAP003storagemass);
      console.log(this.HD001storagemass);
      console.log(this.LD001storagemass);
      console.log(this.LD003storagemass);
      console.log(this.PET001storagemass);
      console.log(this.PET003storagemass);
      console.log(this.PET005storagemass);
    });
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
    console.log(this.storageGH001);

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

  recordInbounds() {
    this.db.collection("inbounds").doc("hD3GRe9MMPFB401vA7kS").set({
      time: new Date(),
      storageGH001: this.storageGH001,
      storageNFAL01: this.storageNFAL01,
      storagePAP005: this.storagePAP005,
      storagePAP007: this.storagePAP007,
      storagePAP001: this.storagePAP001,
      storagePAP003: this.storagePAP003,
      storageHD001: this.storageHD001,
      storageLD001: this.storageLD001,
      storageLD003: this.storageLD003,
      storagePET001: this.storagePET001,
      storagePET003: this.storagePET003,
      storagePET005: this.storagePET005,
    });
  }

  recordInboundsdisplay() {
    this.recordinbounddisplays = [];
    this.records = this.db.collection('inbounds').doc();
    this.records.get().then((documentSnapshot) => {
        this.recordinbounddisplays = [];
        // console.log(documentSnapshot.data());
        this.recordinbounddisplays.push(documentSnapshot.data());
        console.log(this.recordinbounddisplays);
      });
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
            this.recordInbounds();
            this.saveDatafirebase();
            this.clearInputs();
            this.route.navigateByUrl('/analytics');
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

}
