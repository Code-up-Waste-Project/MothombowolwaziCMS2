import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

// import { ModalpopupPage } from '../modalpopup/modalpopup.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

// @ViewChild('barChart', {static: false}) barChart;
// bars: any;
// colorArray: any;

  // user infor
  admin = [];
  Newadmin = [];

  db = firebase.firestore();
  profiles;
  profile = {
  image: null,
  name: null,
  addres: null,
  surname: null,
  position: null,
  isAdmin: true,
  // ActiveAcount : Boolean,
  // userid:firebase.auth().currentUser.uid,
  // email:firebase.auth().currentUser.email
    };
  isAdmin: any;

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

  GH001: string;
  NFAL01: string;
  Totalpaper: number = 0;
  Totalplastic: number = 0;
  Totalplasticz: string;
  ActiveAcount: Boolean;

  constructor(
    private modalcontroller: ModalController,
    private menuCtrl: MenuController,
    public route: Router,
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
      // console.log('Newadmins', this.Newadmin);
    });

    }

 
  ngOnInit() {
    
    

    this.menuCtrl.enable(true); // or true

    this.getMasses();
    console.log( this.getMasses());
  }

  getMasses() {
    let totalPaperz = 0;
    let GH001z;
    let NFAL01z;

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

      totalPaperz = +this.PAP005storagemass + +this.PAP007storagemass + +this.PAP001storagemass + +this.PAP003storagemass;
      this.Totalpaper = Number(String(totalPaperz).substring(0, 6));

      this.Totalplastic = +this.HD001storagemass + +this.LD001storagemass + +this.LD003storagemass + +this.PET001storagemass +
      +this.PET003storagemass + +this.PET005storagemass;
      this.Totalplasticz = (String(this.Totalplastic).substring(0, 6));
      String(this.Totalplastic).substring(0, 6);

      GH001z = this.GH001storagemass;
      this.GH001 = (String(GH001z).substring(0, 6));
      NFAL01z = this.NFAL01storagemass;
      this.NFAL01 = (String(NFAL01z).substring(0, 6));
    });
  }



  Logout() {
    firebase.auth().signOut().then((res) => {
      console.log(res);
      this.route.navigateByUrl('/login');
     });
    }
    editprofile() {
      this.route.navigate(['profile']);
    }
  ionViewWillEnter(){

    firebase.auth().onAuthStateChanged(user => {
      firebase.firestore().collection('admin').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot =>{
        console.log('activateuser', snapshot.data().ActiveAccount);
        this.ActiveAcount =snapshot.data().ActiveAcount;
 
        if (this.ActiveAcount == false){
 
    
           this.route.navigate(['contactmanager']);
         
        }
        else if (this.ActiveAcount == true){
          this.route.navigate(['home'])
        }
      })
    })
  }
}
