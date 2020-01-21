import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  @ViewChild('barChart', {static: false}) barChart;
  bars: any;
  colorArray: any;

  db = firebase.firestore();

  GL001;
  NFAL01;
  PAP005;
  PAP007;
  PAP001;
  PAP003;
  HD001;
  LD001;
  LD003;
  PET005;
  PET001;
  PET003;

  Prices = [];
  test = [];

  Code;
  categoryName = 'Paper';
  codeName = 'cardbox';
  codeID = 'PAP0144';
  price = 12;

  InputcategoryName;
  InputcodeName;
  InputcodeID;
  Inputprice;

  constructor(
    public route: Router,
  ) { }

  ngOnInit() {
    this.getPrices();
    this.getPricess();
    // this.getPricesss();
    // this.getMass();
  }

  // Pulling data from firebase
  getPrices() {
    this.db.collection('Categories').doc(this.categoryName).collection(this.codeID).onSnapshot(snapshot => {
      this.Prices = [];
      snapshot.forEach(element => {
        this.Prices.push(element.data());
        console.log(element.data());
      });
      // this.Prices.push(snapshot);   collection('categories').doc('RxFQns7oHLUP5ljqgGFt')
    });
    console.log(this.Prices);
  }

  getPricess() {
    this.db.collection('Categories').doc(this.categoryName).collection(this.codeID).onSnapshot(snapshot => {
      this.Prices = [];
      snapshot.forEach(element => {
        this.Prices.push(element);
        console.log(element);
      });
      // this.Prices.push(snapshot);   collection('categories').doc('RxFQns7oHLUP5ljqgGFt')
    });
    console.log(this.Prices);
  }

  getPricesss() {
    this.db.collection('materials').doc('paper').onSnapshot(snapshot => {
      this.Prices = [];
      // snapshot.forEach(element => {
      //   this.Prices.push(element.data());
        console.log(snapshot.data());
      // });
      this.Prices.push(snapshot);
    });
    console.log(this.Prices);
  }

  btns() {
    this.InputGL001s();
    // this.InputNFAL01();
    // this.InputPAP005();
  }

  // InputGL001() {
  //   this.db.collection('categories').doc('Glass').collection('GL001').doc('RxFQns7oHLUP5ljqgGFt').set({
  //     testing: new Date(),
  //   });
  //   console.log('shit 1 was click to firebase');
  // }

  InputGL001s() {
    let Codeidssss;
    Codeidssss = this.codeID;
    this.db.collection('Categories').doc(this.categoryName).collection(this.codeID).doc().set({
      testing: new Date(),
      Codeidssss: this.price,
      codeid:this.codeID
    });
    console.log('shit 1 was click to firebase');
  }

  // InputNFAL01() {
  //   this.db.collection('categories').doc('Non-ferrous').collection('Aluminium').doc('RxFQns7oHLUP5ljqgGFt').set({
  //     testing: new Date(),
  //   });
  //   console.log('shit 2 was click to firebase');
  // }

  // InputPAP005() {
  //   this.db.collection('categories').doc('Paper').collection('Paper').doc('RxFQns7oHLUP5ljqgGFt').update({
  //     testing: new Date(),
  //     giii: "awe ninja"
  //   });
  //   console.log('update shit was click to firebase');
  // }

  // InputPAP007() {
  //   this.db.collection('materials').doc('paper').collection('Paper').doc('RxFQns7oHLUP5ljqgGFt').set({
  //     testing: new Date(),
  //   });
  //   console.log('shit 3 was click to firebase');
  // }

  // firebase.firestore().collection('NumberOfProducts').doc('MwjotZqh3JPKx0qEcuui').get().then(result => {
  //   let number : string = String(Number(result.data().numberOfProducts) + 1)
  //   firebase.firestore().collection('NumberOfProducts').doc('MwjotZqh3JPKx0qEcuui').update({
  //     numberOfProducts: number
  //   })
  // })

}
