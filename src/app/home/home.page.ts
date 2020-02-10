import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';
// import { ModalpopupPage } from '../modalpopup/modalpopup.page';
import * as moment from 'moment'
import { element } from 'protractor';
import { format } from 'url';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  viewBackdrop = false

  @ViewChild('barChart', { static: false }) barChart;
  @ViewChild('barChart1', { static: false }) barChart1;
  @ViewChild('barChart2', { static: false }) barChart2;

  //store element into a variable
  imgGraph = document.getElementsByClassName('inbgraph');
  imgGraph2 = document.getElementsByClassName('inbgraph2');
  imgGraph3 = document.getElementsByClassName('inbgraph3');

  inboundweight = 0;
  outboundweight = 0;
  Reclaimerweight = 0;

  //graghdatainbound
  inboundgh001 = 0;
  inboundnfalo1 = 0;
  inboundpap005 = 0;
  inboundpap007 = 0;
  inboundpap001 = 0;
  inboundpap003 = 0;
  inboundhd001 = 0;
  inboundld001 = 0;
  inboundld003 = 0;
  inboundpet001 = 0;
  inboundpet003 = 0;
  inboundpet005 = 0;

  inboundpaper = 0;
  inboundAlum = 0;
  inboundplastic = 0;

  //outboundgraphs
  outboundglass = 0;
  outboundpaper = 0;
  outboundAlum = 0;
  outboundplastic = 0;


  //reclaimer
  reclaimergh001mass = 0;
  reclaimernfa01Mass = 0;
  reclaimerpap005mass = 0;
  reclaimerpap007Mass = 0;
  reclaimerpap001mass = 0;
  reclaimerpap003mass = 0;
  reclaimerhd001mass = 0;
  reclaimerld001mass = 0;
  reclaimerld003mass = 0;
  reclaimerpet001mass = 0;
  reclaimerpet003mass = 0;
  reclaimerpet005mass = 0;
  //outboundgraphs


  outboundgh001 = 0;
  outboundnfal01 = 0;
  outboundpap005 = 0;
  outboundpap007 = 0;
  outboundpap003 = 0;
  outboundpap001 = 0;
  outboundhd001 = 0;
  outboundld001 = 0;
  outboundld003 = 0;
  outboundpet003 = 0;
  outboundpet001 = 0;
  outboundpet005 = 0;

  reclaimerglass = 0;
  reclaimerpaper = 0;
  reclaimerAlum = 0;
  reclaimerplastic = 0;

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

  pricess = {
    gl001: null,
    hd001: null,
    pap005: null,
    pap007: null,
    pap001: null,
    pap003: null,
    ld003: null,
    ld001: null,
    nfalo1: null,
    pet005: null,
    pet003: null,
    pet001: null,
    time: null
  };

  price = [];
  prices;

  bars: any;
  colorArray: any;

  inboundss = [];
  newInbound = [];

  burgercontent: any = document.getElementsByClassName('burgercontent');
  burger: boolean = false;

  /* Div */
  editDiv: any = document.getElementsByClassName('editDiv');
  edit: boolean = false;

  deleteDiv: any = document.getElementsByClassName('deleteDiv');
  delete: boolean = false;

  createDiv: any = document.getElementsByClassName('createDiv');
  create: boolean = false;


  paperDiv: any = document.getElementsByClassName('paperDiv');
  paper: boolean = false;

  glasshDiv: any = document.getElementsByClassName('glassDiv');
  glassh: boolean = false;

  plasticDiv: any = document.getElementsByClassName('plasticDiv');
  plastic: boolean = false;

  aluDiv: any = document.getElementsByClassName('aluDiv');
  alu: boolean = false;


  fix: any = document.getElementsByClassName('fix');

  // Reclaimer
  reclaimerID;
  reclaimername;
  reclaimersurname;
  reclaimerDate;

  // inBound
  InID;
  indate;
  inDriverName;
  inRegistarionNumberPlates;
  inovarallMass;

  // OutBound
  id;
  outdate;
  outDriverName;
  outRegistarionNumberPlates;
  outovarallMass;

  newreclaimer = [];
  outbound = [];
  inbound = [];

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
  //inbound
  inboundGH001;
  inboundHD001;
  inboundLD001;
  inboundLD003;
  inboundNFAL01;
  inboundPAP001;
  inboundPAP003;
  inboundPAP005;
  inboundPAP007;
  inboundPET001;
  inboundPET003;
  inboundPET005;


  //Reclaomers
  GH001Mass;
  HD001Mass;
  LD001Mass;
  LD003Mass;
  NFAL01Mass;
  PAP001Mass;
  PAP003Mass;
  PAP007Mass;
  PET001Mass;
  PET003Mass;
  PET005Mass;
  PAP005Mass

  //outbound
  PAP005;
  HD001;
  LD001;
  LD003;
  NFAL01;
  PAP001;
  PAP003;
  PAP007;
  PET001;
  PET003;
  PET005;

  //storage
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
  nFAL01: string;

  Totalpaperinbound: number = 0;
  Totalpapersinbound: string;
  Totalplasticinbound: number = 0;

  Totalpaper: number = 0;
  Totalplastic: number = 0;

  Totalplasticz: string;
  ActiveAcount: Boolean;
  glass: boolean = false;
  glassDiv: any = document.getElementsByClassName('glassDiv');

  // code added by nathi 3 feb
  // beginningDate = Date.now() - 1514184967000;
  // beginningDateObject = new Date(this.beginningDate);

  InboundGraph = [];
  outBoundGraph = [];
  inboundGraphDisplay = [];
  outBoundGraphDisplayDay = [];
  outBoundGraphDisplayWeek = [];
  outBoundGraphDisplayMonth = [];
  outGH001 = [];
  ReclaimerGraph = [];
  datesss;
  dateq;
  dateqq;
  datez;

  weekTime;

  outboundDay;
  outboundWeek;
  outboundMonth;
  outboundYear;

  viewingGraph = ''
  xAxisSize = 5
  yAxisSize = 3

  // variebles for graphs                                     inbound
  // day
  totalInBoundDayGL001 = 0;
  totalInBoundDayNFAL01 = 0;
  totalInBoundDayPAP005 = 0;
  totalInBoundDayPAP007 = 0;
  totalInBoundDayPAP003 = 0;
  totalInBoundDayPAP001 = 0;
  totalInBoundDayHD001 = 0;
  totalInBoundDayLD001 = 0;
  totalInBoundDayLD003 = 0;
  totalInBoundDayPET001 = 0;
  totalInBoundDayPET003 = 0;
  totalInBoundDayPET005 = 0;
  // week
  totalInBoundWeekGL001 = 0;
  totalInBoundWeekNFAL01 = 0;
  totalInBoundWeekPAP005 = 0;
  totalInBoundWeekPAP007 = 0;
  totalInBoundWeekPAP003 = 0;
  totalInBoundWeekPAP001 = 0;
  totalInBoundWeekHD001 = 0;
  totalInBoundWeekLD001 = 0;
  totalInBoundWeekLD003 = 0;
  totalInBoundWeekPET001 = 0;
  totalInBoundWeekPET003 = 0;
  totalInBoundWeekPET005 = 0;
  // Month
  totalInBoundMonthGL001 = 0;
  totalInBoundMonthNFAL01 = 0;
  totalInBoundMonthPAP005 = 0;
  totalInBoundMonthPAP007 = 0;
  totalInBoundMonthPAP003 = 0;
  totalInBoundMonthPAP001 = 0;
  totalInBoundMonthHD001 = 0;
  totalInBoundMonthLD001 = 0;
  totalInBoundMonthLD003 = 0;
  totalInBoundMonthPET001 = 0;
  totalInBoundMonthPET003 = 0;
  totalInBoundMonthPET005 = 0;

  // variebles for graphs                                   outbound
  // day
  totaloutBoundDayGL001 = 0;
  totaloutBoundDayNFAL01 = 0;
  totaloutBoundDayPAP005 = 0;
  totaloutBoundDayPAP007 = 0;
  totaloutBoundDayPAP003 = 0;
  totaloutBoundDayPAP001 = 0;
  totaloutBoundDayHD001 = 0;
  totaloutBoundDayLD001 = 0;
  totaloutBoundDayLD003 = 0;
  totaloutBoundDayPET001 = 0;
  totaloutBoundDayPET003 = 0;
  totaloutBoundDayPET005 = 0;
  // week
  totaloutBoundWeekGL001 = 0;
  totaloutBoundWeekNFAL01 = 0;
  totaloutBoundWeekPAP005 = 0;
  totaloutBoundWeekPAP007 = 0;
  totaloutBoundWeekPAP003 = 0;
  totaloutBoundWeekPAP001 = 0;
  totaloutBoundWeekHD001 = 0;
  totaloutBoundWeekLD001 = 0;
  totaloutBoundWeekLD003 = 0;
  totaloutBoundWeekPET001 = 0;
  totaloutBoundWeekPET003 = 0;
  totaloutBoundWeekPET005 = 0;
  // Month
  totaloutBoundMonthGL001 = 0;
  totaloutBoundMonthNFAL01 = 0;
  totaloutBoundMonthPAP005 = 0;
  totaloutBoundMonthPAP007 = 0;
  totaloutBoundMonthPAP003 = 0;
  totaloutBoundMonthPAP001 = 0;
  totaloutBoundMonthHD001 = 0;
  totaloutBoundMonthLD001 = 0;
  totaloutBoundMonthLD003 = 0;
  totaloutBoundMonthPET001 = 0;
  totaloutBoundMonthPET003 = 0;
  totaloutBoundMonthPET005 = 0;

  // variebles for graphs                                     Reclaimers
  // day
  totalReclaimerDayGL001 = 0;
  totalReclaimerDayNFAL01 = 0;
  totalReclaimerDayPAP005 = 0;
  totalReclaimerDayPAP007 = 0;
  totalReclaimerDayPAP003 = 0;
  totalReclaimerDayPAP001 = 0;
  totalReclaimerDayHD001 = 0;
  totalReclaimerDayLD001 = 0;
  totalReclaimerDayLD003 = 0;
  totalReclaimerDayPET001 = 0;
  totalReclaimerDayPET003 = 0;
  totalReclaimerDayPET005 = 0;
  // week
  totalReclaimerWeekGL001 = 0;
  totalReclaimerWeekNFAL01 = 0;
  totalReclaimerWeekPAP005 = 0;
  totalReclaimerWeekPAP007 = 0;
  totalReclaimerWeekPAP003 = 0;
  totalReclaimerWeekPAP001 = 0;
  totalReclaimerWeekHD001 = 0;
  totalReclaimerWeekLD001 = 0;
  totalReclaimerWeekLD003 = 0;
  totalReclaimerWeekPET001 = 0;
  totalReclaimerWeekPET003 = 0;
  totalReclaimerWeekPET005 = 0;
  // Month
  totalReclaimerMonthGL001 = 0;
  totalReclaimerMonthNFAL01 = 0;
  totalReclaimerMonthPAP005 = 0;
  totalReclaimerMonthPAP007 = 0;
  totalReclaimerMonthPAP003 = 0;
  totalReclaimerMonthPAP001 = 0;
  totalReclaimerMonthHD001 = 0;
  totalReclaimerMonthLD001 = 0;
  totalReclaimerMonthLD003 = 0;
  totalReclaimerMonthPET001 = 0;
  totalReclaimerMonthPET003 = 0;
  totalReclaimerMonthPET005 = 0;
  bD = document.getElementsByClassName('bD')
  constructor(
    private modalcontroller: ModalController,
    private menuCtrl: MenuController,
    public route: Router,
    private render: Renderer2,
    public alertController: AlertController,
  ) {
    // pulling for admin
    this.db.collection('admin').onSnapshot(snapshot => {
      this.Newadmin = [];
      snapshot.forEach(Element => {
        this.admin.push(Element.data());
      });
      this.admin.forEach(item => {

        if (item.userid === firebase.auth().currentUser.uid) {
          this.Newadmin = [];
          this.Newadmin.push(item);
        }
      });
      // console.log('Newadmins', this.Newadmin);
    });

    // code by nathi 3 feb
    this.pullWeeklyInbound();
    this.PullDayData();
    // console.log("im working ninja");

  }

  //increase the size of clicked graph
  createBarChart() {
    Chart.defaults.global.defaultFontSize = this.xAxisSize;
    Chart.defaults.global.defaultFontFamily = 'Roboto';
  
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['GH001', 'NFAL01', 'PAP005', 'PAP007', 'PAP001', 'PAP003', 'HD001', 'LD001', 'LD003', 'PET001', 'PET003', 'PET005'],
        datasets: [{
          label: 'INBOUND',
          data: [
            this.inboundgh001,
            this.inboundnfalo1,
  
            this.inboundpap005,
            this.inboundpap007,
            this.inboundpap001,
            this.inboundpap003,
  
            this.inboundhd001,
            this.inboundld001,
            this.inboundld003,
            this.inboundpet001,
            this.inboundpet003,
            this.inboundpet005,
  
          ],
          // data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP007storagemass, this.PAP003storagemass],
          backgroundColor: 'rgb(90, 78, 31)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(90, 78, 31)',  // array should have same number of elements as number of dataset
          borderWidth: 0.1,
  
        }]
      },
      options: {
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        labels: {
          defaultFontSize: this.yAxisSize
        }
      }
    });
  }
  
  /* bar chart */
  createBarChart1() {
    Chart.defaults.global.defaultFontSize = this.xAxisSize;
    Chart.defaults.global.defaultFontFamily = 'Roboto';
    this.bars = new Chart(this.barChart1.nativeElement, {
      type: 'bar',
      data: {
        labels: ['GH001', 'NFAL01', 'PAP005', 'PAP007', 'PAP001', 'PAP003', 'HD001', 'LD001', 'LD003', 'PET001', 'PET003', 'PET005'],
        // labels: ['Aluminium', 'Glass', 'Paper(PAP005)', 'Paper(PAP007)', 'Paper(PAP003)', 'Paper(PAP003)'],
        datasets: [{
          label: 'OUTBOUND',
          data: [
            this.outboundgh001,
            this.outboundnfal01,
            this.outboundpap005,
            this.outboundpap007,
            this.outboundpap001,
            this.outboundpap003,
            this.outboundhd001,
            this.outboundld001,
            this.outboundld003,
            this.outboundpet001,
            this.outboundpet003,
            this.outboundpet005
          ],
  
          // data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP007storagemass, this.PAP003storagemass],
          backgroundColor: 'rgb(75, 35, 54)', // array should have same number of elements as number of dataset
          borderColor: 'rrgb(75, 35, 54)ed',  // array should have same number of elements as number of dataset
          borderWidth: 0.1,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: false,
  
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        labels: {
          defaultFontSize: this.yAxisSize
        }
      }
    });
  }
  
  /* bar chart */
  
  createBarChart2() {
    Chart.defaults.global.defaultFontSize = this.xAxisSize;
    Chart.defaults.global.defaultFontFamily = 'Roboto';
    this.bars = new Chart(this.barChart2.nativeElement, {
      type: 'bar',
      data: {
        labels: ['GH001', 'NFAL01', 'PAP005', 'PAP007', 'PAP001', 'PAP003', 'HD001', 'LD001', 'LD003', 'PET001', 'PET003', 'PET005'],
        // labels: ['Aluminium', 'Glass', 'Paper(PAP005)', 'Paper(PAP007)', 'Paper(PAP003)', 'Paper(PAP003)'],
        datasets: [{
          label: 'RECLAIMER',
  
          data: [
            this.reclaimergh001mass,
            this.reclaimernfa01Mass,
            this.reclaimerpap005mass,
            this.reclaimerpap007Mass,
            this.reclaimerpap001mass,
            this.reclaimerpap003mass,
            this.reclaimerhd001mass,
            this.reclaimerld001mass,
            this.reclaimerld003mass,
            this.reclaimerpet001mass,
            this.reclaimerpet003mass,
            this.reclaimerpet005mass
          ],
          // data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP007storagemass, this.PAP003storagemass],
          backgroundColor: 'rgb(29, 61, 61)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(29, 61, 61)',  // array should have same number of elements as number of dataset
          borderWidth: 0.1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: false,
  
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        labels: {
          defaultFontSize: this.yAxisSize
        }
      }
    });
  }
  
  transformGraph(graph) {

    if (this.viewingGraph == graph) {
      this.viewingGraph = ''
      this.viewBackdrop = false
    } else {
      this.viewingGraph = graph
      this.viewBackdrop = true;
    }
    if (this.viewBackdrop) {
      this.render.setStyle(this.bD[0],'display','block')
    } else {
      setTimeout(() => {
        console.log('çloses');
        
        this.render.setStyle(this.bD[0],'display','none')
      }, 500);
    }
  }
backdrop() {

}



//chart
updated

updatedoutbound
updateReclaimer

ionViewDidEnter() {

  //pulling data
  //inbound
  this.inboundgh001 = 0;
  this.inboundpap005 = 0;
  this.inboundAlum = 0;
  this.inboundweight = 0;
  this.inboundplastic = 0;
  firebase.firestore().collection('inbounds').get().then(res => {
    res.forEach(val => {

      // console.log('inboundcalculate',val.data().inboundGH001+val.data().inboundHD001+val.data().inboundLD003+val.data().inboundNFAL01+val.data().inboundPAP001+val.data().inboundPAP003+val.data().inboundPAP005 +val.data().inboundPAP007+val.data().inboundPET001+val.data().inboundPET003+val.data().inboundPET005)
      this.inboundweight = this.inboundweight
        + parseFloat(val.data().inboundGH001) +
        +parseFloat(val.data().inboundNFAL01) +

        +parseFloat(val.data().inboundPAP001) +
        +parseFloat(val.data().inboundPAP003) +
        +parseFloat(val.data().inboundPAP005) +
        +parseFloat(val.data().inboundPAP007) +

        +parseFloat(val.data().inboundHD001) +
        +parseFloat(val.data().inboundLD001) +
        +parseFloat(val.data().inboundLD003) +
        +parseFloat(val.data().inboundPET001) +
        +parseFloat(val.data().inboundPET003) +
        +parseFloat(val.data().inboundPET005);

      // console.log(new Date(val.data().time.seconds*1000))
      this.updated = (new Date(val.data().time.seconds * 1000)).toDateString();

      this.inboundgh001 = this.inboundgh001 + parseFloat(val.data().inboundGH001)
      this.inboundnfalo1 = this.inboundnfalo1 + parseFloat(val.data().inboundNFAL01)

      this.inboundpap005 = this.inboundpap005 + parseFloat(val.data().inboundPAP005)
      this.inboundpap007 = this.inboundpap007 + parseFloat(val.data().inboundPAP007)
      this.inboundpap001 = this.inboundpap001 + parseFloat(val.data().inboundPAP001)
      this.inboundpap003 = this.inboundpap003 + parseFloat(val.data().inboundPAP003)

      this.inboundhd001 = this.inboundhd001 + parseFloat(val.data().inboundHD001)
      this.inboundld001 = this.inboundld001 + parseFloat(val.data().inboundLD001)
      this.inboundld003 = this.inboundld003 + parseFloat(val.data().inboundLD003)
      this.inboundpet001 = this.inboundpet001 + parseFloat(val.data().inboundPET001)
      this.inboundpet003 = this.inboundpet003 + parseFloat(val.data().inboundPET003)
      this.inboundpet005 = this.inboundpet005 + parseFloat(val.data().inboundPET005)

      //paper
      this.inboundpaper = this.inboundpaper
        + parseFloat(val.data().inboundPAP005)
        + parseFloat(val.data().inboundPAP007)
        + parseFloat(val.data().inboundPAP003)
        + parseFloat(val.data().inboundPAP001);

      //aluminium
      this.inboundAlum = this.inboundAlum + parseFloat(val.data().inboundNFAL01)

      //plastic
      this.inboundplastic = this.inboundplastic + +parseFloat(val.data().inboundHD001)
        + parseFloat(val.data().inboundHD001)
        + parseFloat(val.data().inboundLD001)
        + parseFloat(val.data().inboundLD003)
        + parseFloat(val.data().inboundPET003)
        + parseFloat(val.data().inboundPET001)
    })
    this.createBarChart();
  })

  //outbound

  this.outboundglass = 0;
  this.outboundpaper = 0;
  this.outboundAlum = 0;
  this.outboundplastic = 0;

  this.outboundweight = 0;

  firebase.firestore().collection('outbound').get().then(res => {
    res.forEach(val => {
      // console.log(val.data().GH001+val.data().GH001)
      this.outboundweight = this.outboundweight
        + parseFloat(val.data().GH001)
        + parseFloat(val.data().NFAL01)

        + parseFloat(val.data().PAP005)
        + parseFloat(val.data().PAP007)
        + parseFloat(val.data().PAP001)
        + parseFloat(val.data().PAP003)

        + parseFloat(val.data().HD001)
        + parseFloat(val.data().LD001)
        + parseFloat(val.data().LD003)
        + parseFloat(val.data().PET00);
      +parseFloat(val.data().PET003)
        + parseFloat(val.data().PET005);

      // console.log(new Date(val.data().date.seconds*1000))
      this.updatedoutbound = (new Date(val.data().date.seconds * 1000)).toDateString();
      // console.log('ountglass',  this.outboundglass)
      this.outboundgh001 = this.outboundgh001 + parseFloat(val.data().GH001)
      this.outboundnfal01 = this.outboundnfal01 + parseFloat(val.data().NFAL01)

      this.outboundpap005 = this.outboundpap005 + parseFloat(val.data().PAP005)
      this.outboundpap007 = this.outboundpap007 + parseFloat(val.data().PAP007)
      this.outboundpap003 = this.outboundpap003 + parseFloat(val.data().PAP003)
      this.outboundpap001 = this.outboundpap001 + parseFloat(val.data().PAP001)

      this.outboundhd001 = this.outboundhd001 + parseFloat(val.data().HD001)
      this.outboundld001 = this.outboundld001 + parseFloat(val.data().LD001)
      this.outboundld003 = this.outboundld003 + parseFloat(val.data().LD003)
      this.outboundpet003 = this.outboundpet003 + parseFloat(val.data().PET003)
      this.outboundpet001 = this.outboundpet001 + parseFloat(val.data().PET001)
      this.outboundpet005 = this.outboundpet005 + parseFloat(val.data().PET005)

      //paper
      // console.log('outboundpaper',this.outboundpaper)
      this.outboundpaper = this.outboundpaper
        + parseFloat(val.data().PAP005)
        + parseFloat(val.data().PAP007)
        + parseFloat(val.data().PAP003)
        + parseFloat(val.data().PAP001);

      //aluminium
      // console.log('outboundAluminium', this.outboundAlum)
      this.outboundAlum = this.outboundAlum + parseFloat(val.data().NFAL01)

      //plastic
      // console.log('outplastic',this.outboundplastic)
      this.outboundplastic = this.outboundplastic + +parseFloat(val.data().HD001)
        + parseFloat(val.data().HD001)
        + parseFloat(val.data().LD001)
        + parseFloat(val.data().LD003)
        + parseFloat(val.data().PET003)
        + parseFloat(val.data().PET001)
    })
    this.createBarChart1();
  })

  //reclaimer
  this.reclaimerglass = 0;
  this.reclaimerpaper = 0;
  this.reclaimerAlum = 0;
  this.reclaimerplastic = 0;
  this.Reclaimerweight = 0;
  firebase.firestore().collection('reclaimers').get().then(res => {
    res.forEach(val => {
      // console.log(val.data().GH001Mass+val.data().HD001Mass)
      this.Reclaimerweight = this.Reclaimerweight
        + parseFloat(val.data().GH001Mass)
        + parseFloat(val.data().HD001Mass)
        + parseFloat(val.data().LD001Mass)
        + parseFloat(val.data().LD003Mass)
        + parseFloat(val.data().NFAL01Mass)
        + parseFloat(val.data().PAP001Mass)
        + parseFloat(val.data().PAP003Mass)
        + parseFloat(val.data().PAP005Mass)
        + parseFloat(val.data().PAP007Mass)
        + parseFloat(val.data().PEP005Mass)
        + parseFloat(val.data().PET001Mass)
        + parseFloat(val.data().PET003Mass);

      // console.log(new Date(val.data().date.seconds*1000))
      this.updateReclaimer = (new Date(val.data().date.seconds * 1000)).toDateString();
      this.reclaimerglass = 0;
      this.reclaimerpaper = 0;
      this.reclaimerAlum = 0;
      this.reclaimerplastic = 0;

      //glass
      console.log('glassreclaimer', this.reclaimerglass)
      this.reclaimergh001mass = this.reclaimergh001mass + parseFloat(val.data().GH001Mass)
      this.reclaimernfa01Mass = this.reclaimernfa01Mass + parseFloat(val.data().NFAL01Mass)

      this.reclaimerpap005mass = this.reclaimerpap005mass + parseFloat(val.data().PAP005Mass)
      this.reclaimerpap007Mass = this.reclaimerpap007Mass + parseFloat(val.data().PAP007Mass)
      this.reclaimerpap001mass = this.reclaimerpap001mass + parseFloat(val.data().PAP001Mass)
      this.reclaimerpap003mass = this.reclaimerpap003mass + parseFloat(val.data().PAP003Mass)

      this.reclaimerhd001mass = this.reclaimerhd001mass + parseFloat(val.data().HD001Mass)
      this.reclaimerld001mass = this.reclaimerld001mass + parseFloat(val.data().LD001Mass)
      this.reclaimerld003mass = this.reclaimerld003mass + parseFloat(val.data().LD003Mass)
      this.reclaimerpet001mass = this.reclaimerpet001mass + parseFloat(val.data().PEt001Mass)
      this.reclaimerpet003mass = this.reclaimerpet003mass + parseFloat(val.data().PET003Mass)
      this.reclaimerpet005mass = this.reclaimerpet005mass + parseFloat(val.data().PEP005Mass)

      //paper
      // console.log('paperreclaimer',this.reclaimerpaper)
      this.reclaimerpaper = this.reclaimerpaper
        + parseFloat(val.data().PAP005Mass)
        + parseFloat(val.data().PAP007Mass)
        + parseFloat(val.data().PAP003Mass)
        + parseFloat(val.data().PAP001Mass);

      //aluminium
      // console.log('aluminiumreclaimer',this.reclaimerAlum )
      this.reclaimerAlum = this.reclaimerAlum + parseFloat(val.data().NFAL01)

      //plastic
      // console.log('plasticreclaimer',    this.reclaimerplastic )
      this.reclaimerplastic = this.reclaimerplastic + +parseFloat(val.data().HD001)
        + parseFloat(val.data().HD001Mass)
        + parseFloat(val.data().LD001Mass)
        + parseFloat(val.data().LD003Mass)
        + parseFloat(val.data().PET003Mass)
        + parseFloat(val.data().PET001Mass)
    })
    this.createBarChart2();
  })
}

ngOnInit() {
  // this.getreclamer();

  this.db.collection('price').doc("SinUfRNnbB073KZiDIZE").onSnapshot(data => {
    // console.log("DATA EEE, ", data.data().time);
  })

  this.prices = this.db.collection('price').doc("SinUfRNnbB073KZiDIZE");
  this.prices.get().then((documentSnapshot) => {
    this.price = [];
    // console.log(documentSnapshot.data());
    this.price.push(documentSnapshot.data());
    // console.log('my pricess', documentSnapshot.data().time);

    this.pricess.time = documentSnapshot.data().time
    this.pricess.gl001 = documentSnapshot.data().gl001;
    this.pricess.hd001 = documentSnapshot.data().hd001;
    this.pricess.ld001 = documentSnapshot.data().ld001;
    this.pricess.ld003 = documentSnapshot.data().ld003;
    this.pricess.nfalo1 = documentSnapshot.data().nfalo1;
    this.pricess.pap001 = documentSnapshot.data().pap001;
    this.pricess.pap003 = documentSnapshot.data().pap003;
    this.pricess.pap005 = documentSnapshot.data().pap005;
    this.pricess.pap007 = documentSnapshot.data().pap007;
    this.pricess.pet001 = documentSnapshot.data().pet001;
    this.pricess.pet003 = documentSnapshot.data().pet003;
    this.pricess.pet005 = documentSnapshot.data().pet005;
  });
  // console.log(this.pricess.gl001);
  // console.log(this.pricess.hd001);
  // console.log(this.pricess.ld001);
  // console.log(this.pricess.ld003);
  // console.log(this.pricess.nfalo1);
  // console.log(this.pricess.pap001);
  // console.log(this.pricess.pap003);
  // console.log(this.pricess.pap005);
  // console.log(this.pricess.pap007);
  // console.log(this.pricess.pet001);
  // console.log(this.pricess.pet003);
  // console.log(this.pricess.pet005);

  this.menuCtrl.enable(true); // or true

  // this. inbounddata();
  // console.log('iboundssssssssssssssssssss',this.inbounddata())
  // this.getMasses();
  // console.log(this.getMasses());
}

getReclaimers() {
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
      // console.log('newreclaimer', this.newreclaimer);
    });
  });
}
// 

ionViewWillEnter() {
  this.prices = this.db.collection('price').doc("SinUfRNnbB073KZiDIZE");
  this.prices.get().then((documentSnapshot) => {
    this.price = [];
    // console.log(documentSnapshot.data());
    this.price.push(documentSnapshot.data());
    // console.log('prices', this.price);
  });
}

checkinputfields() {

  // GH001price;
  if (this.GH001price === null) {
    this.GH001price = this.pricess.gl001;
  } else if (this.GH001price === undefined) {
    this.GH001price = this.pricess.gl001;
  }
  // console.log(this.GH001price);

  // NFAL01price;
  if (this.NFAL01price === null) {
    this.NFAL01price = this.pricess.nfalo1;
  } else if (this.NFAL01price === undefined) {
    this.NFAL01price = this.pricess.nfalo1;
  }
  // console.log(this.NFAL01price);

  // PAP005price;
  if (this.PAP005price === null) {
    this.PAP005price = this.pricess.pap005;
  } else if (this.PAP005price === undefined) {
    this.PAP005price = this.pricess.pap005;
  }
  // console.log(this.PAP005price);

  // PAP007price;
  if (this.PAP007price === null) {
    this.PAP007price = this.pricess.pap007;
  } else if (this.PAP007price === undefined) {
    this.PAP007price = this.pricess.pap007;
  }
  // console.log(this.PAP007price);

  // PAP001price;
  if (this.PAP001price === null) {
    this.PAP001price = this.pricess.pap001;
  } else if (this.PAP001price === undefined) {
    this.PAP001price = this.pricess.pap001;
  }
  // console.log(this.PAP001price);

  // PAP003price;
  if (this.PAP003price === null) {
    this.PAP003price = this.pricess.pap003;
  } else if (this.PAP003price === undefined) {
    this.PAP003price = this.pricess.pap003;
  }
  // console.log(this.PAP003price);

  // HD001price;
  if (this.HD001price === null) {
    this.HD001price = this.pricess.hd001;
  } else if (this.HD001price === undefined) {
    this.HD001price = this.pricess.hd001;
  }
  // console.log(this.HD001price);

  // LD001price;
  if (this.LD001price === null) {
    this.LD001price = this.pricess.ld001;
  } else if (this.LD001price === undefined) {
    this.LD001price = this.pricess.ld001;
  }
  // console.log(this.LD001price);

  // LD003price;
  if (this.LD003price === null) {
    this.LD003price = this.pricess.ld003;
  } else if (this.LD003price === undefined) {
    this.LD003price = this.pricess.ld003;
  }
  // console.log(this.LD003price);

  // PET001price;
  if (this.PET001price === null) {
    this.PET001price = this.pricess.pet001;
  } else if (this.PET001price === undefined) {
    this.PET001price = this.pricess.pet001;
  }
  // console.log(this.PET001price);

  // PET003price;
  if (this.PET003price === null) {
    this.PET003price = this.pricess.pet003;
  } else if (this.PET003price === undefined) {
    this.PET003price = this.pricess.pet003;
  }
  // console.log(this.PET003price);

  // PET005price;
  if (this.PET005price === null) {
    this.PET005price = this.pricess.pet005;
  } else if (this.PET005price === undefined) {
    this.PET005price = this.pricess.pet005;
  }
  // console.log(this.PET005price);

  this.presentAlertupdate();

}

async presentAlertupdate() {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to update Prices?</strong>!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          // console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          // this.update();
          this.clearInputs();
          this.route.navigateByUrl('/home');
          // console.log('Confirm Okay');
        }
      }
    ]
  });
  await alert.present();
}



clearInputs() {
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
}

CheckInputsEmptyStringPaper() {
  if (
    this.PAP005price === undefined &&
    this.PAP007price === undefined &&
    this.PAP001price === undefined &&
    this.PET003price === undefined

  ) {
    // this.presentAlertcheckInputs();
  } else {
    this.presentAlertUpdatePaper();

  }
}

CheckInputsEmptyStringPlastics() {
  if (
    this.HD001price === undefined &&
    this.LD001price === undefined &&
    this.LD003price === undefined &&
    this.PET005price === undefined &&
    this.PET001price === undefined

  ) {
    // this.presentAlertcheckInputs();
  } else {
    this.presentAlertUpdatePlastic();
  }
}

// CheckInputsEmptyStringGlasss() {
//   if (
//     this.GH001price === undefined
//     ) {
//       this.presentAlertcheckInputs();
//     } else {
//       this.presentAlertUpdateGlass();
//     }
// }

CheckInputsEmptyStringAlum() {
  if (
    this.NFAL01price === undefined
  ) {
    // this.presentAlertcheckInputs();
  } else {
    this.presentAlertUpdateAlum();
  }
}

async presentAlertUpdatePaper() {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to change prices?</strong>!!!',
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
          this.checkPaperInputs();
          this.route.navigateByUrl('/home');
          console.log('Confirm Okay');
        }
      }
    ]
  });
  await alert.present();
}

async presentAlertUpdateGlass() {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to change prices?</strong>',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.checkAlumInputs();
          this.route.navigateByUrl('/home');
          console.log('Confirm Okay');
        }
      }
    ]
  });
  await alert.present();
}

UpdateGlass() {
  // To update price :
  this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
    gl001: this.GH001price,

  }).then((data) => {
    // console.log("Paper successfully updated!");
  });
  this.checkGlassInputs();
}

checkGlassInputs() {
  // GH001price;
  if (this.GH001price === null) {
    this.GH001price = this.pricess.gl001;
  } else if (this.GH001price === undefined) {
    this.GH001price = this.pricess.gl001;
  }
  // console.log(this.GH001price);


  this.UpdateGlass()
}

CheckInputsEmptyStringGlasss() {
  if (
    this.GH001price === undefined
  ) {
    // this.presentAlertcheckInputs();
  } else {
    this.presentAlertUpdateGlass();
  }
}
async presentAlertUpdateglass() {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to change prices?</strong>!!!',
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
          this.checkPaperInputs();
          this.route.navigateByUrl('/home');
          console.log('Confirm Okay');
        }
      }
    ]
  });
  await alert.present();
}

async presentAlertUpdatePlastic() {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to change prices?</strong>!!!',
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
          this.checkPlasticInputs();
          this.route.navigateByUrl('/home');
          console.log('Confirm Okay');
        }
      }
    ]
  });
  await alert.present();
}


async presentAlertUpdateAlum() {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: '<strong>Are you sure you want to change prices?</strong>!!!',
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
          this.checkAlumInputs();
          this.route.navigateByUrl('/home');
          console.log('Confirm Okay');
        }
      }
    ]
  });
  await alert.present();
}

checkPaperInputs() {
  // PAP005price;
  if (this.PAP005price === null) {
    this.PAP005price = this.pricess.pap005;
  } else if (this.PAP005price === undefined) {
    this.PAP005price = this.pricess.pap005;
  }
  // console.log(this.PAP005price);

  // PAP007price;
  if (this.PAP007price === null) {
    this.PAP007price = this.pricess.pap007;
  } else if (this.PAP007price === undefined) {
    this.PAP007price = this.pricess.pap007;
  }
  // console.log(this.PAP007price);

  // PAP001price;
  if (this.PAP001price === null) {
    this.PAP001price = this.pricess.pap001;
  } else if (this.PAP001price === undefined) {
    this.PAP001price = this.pricess.pap001;
  }
  // console.log(this.PAP001price);

  // PAP003price;
  if (this.PAP003price === null) {
    this.PAP003price = this.pricess.pap003;
  } else if (this.PAP003price === undefined) {
    this.PAP003price = this.pricess.pap003;
  }
  // console.log(this.PAP003price);

  this.UpdatePaper()

}

checkPlasticInputs() {
  // HD001price;
  if (this.HD001price === null) {
    this.HD001price = this.pricess.hd001;
  } else if (this.HD001price === undefined) {
    this.HD001price = this.pricess.hd001;
  }
  // console.log(this.HD001price);

  // LD001price;
  if (this.LD001price === null) {
    this.LD001price = this.pricess.ld001;
  } else if (this.LD001price === undefined) {
    this.LD001price = this.pricess.ld001;
  }
  // console.log(this.LD001price);

  // LD003price;
  if (this.LD003price === null) {
    this.LD003price = this.pricess.ld003;
  } else if (this.LD003price === undefined) {
    this.LD003price = this.pricess.ld003;
  }
  // console.log(this.LD003price);

  // PET001price;
  if (this.PET001price === null) {
    this.PET001price = this.pricess.pet001;
  } else if (this.PET001price === undefined) {
    this.PET001price = this.pricess.pet001;
  }
  // console.log(this.PET001price);

  // PET003price;
  if (this.PET003price === null) {
    this.PET003price = this.pricess.pet003;
  } else if (this.PET003price === undefined) {
    this.PET003price = this.pricess.pet003;
  }
  // console.log(this.PET003price);

  // PET005price;
  if (this.PET005price === null) {
    this.PET005price = this.pricess.pet005;
  } else if (this.PET005price === undefined) {
    this.PET005price = this.pricess.pet005;
  }
  // console.log(this.PET005price);

  this.UpdatePlastic()

}

checkAlumInputs() {
  // nFAL01;
  if (this.NFAL01price === null) {
    this.NFAL01price = this.pricess.nfalo1;
  } else if (this.NFAL01price === undefined) {
    this.nFAL01 = this.pricess.nfalo1;
  }
  // console.log(this.nFAL01);


  this.UpdateAlum()

}
// checkGlassInputs(){
//    // GH001price;
//    if (this.GH001price === null) {
//     this.GH001price = this.pricess.gl001;
//   } else if (this.GH001price === undefined) {
//     this.GH001price = this.pricess.gl001;
//   }
//   // console.log(this.GH001price);


//   this.UpdateGlass()
// }

UpdatePaper() {
  // To update price :
  this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
    pap005: this.PAP005price,
    pap007: this.PAP007price,
    pap001: this.PAP001price,
    pap003: this.PAP003price,
  }).then((data) => {
    // console.log("Paper successfully updated!");
  });
  this.clearInputsPaper();
}
UpdatePlastic() {
  // To update price :
  this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
    hd001: this.HD001price,
    ld001: this.LD001price,
    ld003: this.LD003price,
    pet001: this.PET001price,
    pet003: this.PET003price,
    pet005: this.PET005price,
  }).then((data) => {
    // console.log("Paper successfully updated!");
  });
  this.clearInputsPlastic();
}

// UpdateGlass() {
//   // To update price :
//   this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
//     gl001: this.GH001price,

//   }).then((data) => {
//     // console.log("Paper successfully updated!");
//   });
//   this.checkGlassInputs();
// }


UpdateAlum() {
  // To update price :
  this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
    nfalo1: this.NFAL01price,

  }).then((data) => {
    // console.log("Paper successfully updated!");
  });
  this.clearInputsAlum();
}
// gl001: this.GH001price,
//     nfalo1: this.NFAL01price,
//     pap005: this.PAP005price,
//     pap007: this.PAP007price,
//     pap001: this.PAP001price,
//     pap003: this.PAP003price,
//     hd001: this.HD001price,
//     ld001: this.LD001price,
//     ld003: this.LD003price,
//     pet001: this.PET001price,
//     pet003: this.PET003price,
//     pet005: this.PET005price,

clearInputsPaper() {
  this.PAP005price = '';
  this.PAP007price = '';
  this.PAP001price = '';
  this.PAP003price = '';
}
clearInputsAlum() {
  this.NFAL01price = '';

}

clearInputsGlass() {
  this.GH001price = '';

}


clearInputsPlastic() {
  this.HD001price = '';
  this.LD001price = '';
  this.LD003price = '';
  this.PET001price = '';
  this.PET003price = '';
  this.PET005price = '';
}

getOutbound() {
  // pulling from outbound
  this.db.collection('outbound').onSnapshot(snapshot => {
    this.outbound = [];
    snapshot.forEach(element => {
      let id = {};
      let outdate = {};
      let outDriverName = {};
      let outRegistarionNumberPlates = {};
      let outovarallMass = {};
      let date = {};

      id = this.id = element.id;
      outdate = this.outdate = element.data().date;
      outDriverName = this.outDriverName = element.data().DriverName;
      outRegistarionNumberPlates = this.outRegistarionNumberPlates = element.data().RegistarionNumberPlates;
      outovarallMass = this.outovarallMass = element.data().ovarallMass;

      // this.outbound = [];
      this.outbound.push({
        id: id,
        outDate: outdate,
        outdriverName: outDriverName,
        outRegistarionNo: outRegistarionNumberPlates,
        outovarallmass: outovarallMass,
      });
      // this.outbound.push(element.data());
      console.log('outbound', this.outbound);
    });
  });

}

getInbound() {
  // pulling from inbounds
  this.db.collection('inbounds').onSnapshot(snapshot => {
    this.outbound = [];
    snapshot.forEach(element => {
      // this.outbound = [];
      this.outbound.push({
        // data
      });
      // this.outbound.push(element.data());
      // console.log('inbound', this.outbound);
    });
  });
}

  pullWeeklyInbound() {
    // code added by nathi
    let currentTime = new Date();
    let month = currentTime.getMonth();
    let year = currentTime.getFullYear();
    let date = currentTime.getTime();
    let TodaysDate;

    // console.log(month, year, date);
    // console.log(currentTime);

    // console.log(day7);
    this.db.collection('outbound').onSnapshot(element => {
      // console.log(element);
      element.forEach(snap => {
        // console.log(snap);
        // console.log(snap.data());

        let timess = {};
        let GH001 = {};
        let NFAL01 = {};
        let HD001 = {};
        let PAP005 = {};
        let PAP007 = {};
        let PAP001 = {};
        let PAP003 = {};
        let LD003 = {};
        let LD001 = {};
        let PET005 = {};
        let PET003 = {};
        let PET00 = {};
        let Mass = {};

        this.datesss = snap.data().date;
        // this.datez = this.datesss.toDate();
        GH001 = snap.data().GH001;
        NFAL01 = snap.data().NFAL01;
        HD001 = snap.data().HD001;
        PAP005 = snap.data().PAP005;
        PAP007 = snap.data().PAP007;
        PAP001 = snap.data().PAP001;
        PAP003 = snap.data().PAP003;
        LD003 = snap.data().LD003;
        LD001 = snap.data().LD001;
        PET005 = snap.data().PET005;
        PET003 = snap.data().PET003;
        PET00 = snap.data().PET00;
        Mass = snap.data().ovarallMass;

        this.outBoundGraph.push({
          time: this.datez,
          GH001: GH001,
          NFAL01: NFAL01,
          HD001: HD001,
          PAP005: PAP005,
          PAP007: PAP007,
          PAP001: PAP001,
          PAP003: PAP003,
          LD003: LD003,
          LD001: LD001,
          PET005: PET005,
          PET003: PET003,
          PET001: PET00,
          Mass: Mass
        })

        this.outGH001.push({GH001: GH001})
      });
      // console.log(this.outGH001);

      // console.log(this.outBoundGraph);

    // let dat = this.datez

    // let time = dat.setTime(dat.getTime() - (1 * 24 * 60 * 60 * 1000))

    // let newdate = new Date(time)
    let today = new Date()
    let todayMonth = Number(moment(today).format('MM'))
    let todayDay = Number(moment(today).format('DD'))
    let todayYear = Number(moment(today).format('YYYY'))
    this.datez = moment().format('LLLL');
    // this.dateq = moment(String(this.datesss)).format('LLLL');
    this.dateq = this.datesss.toDate();
    this.dateqq = new Date(this.dateq).getMonth()

    this.outboundDay = Number(moment(this.dateq).format('DD'))
    this.outboundWeek = new Date(this.dateq).getHours()
    this.outboundMonth = Number(moment(this.dateq).format('MM'))
    this.outboundYear = Number(moment(this.dateq).format('YYYY'))
    if ((todayYear - this.outboundYear) < 2) {
      console.log('yeha yeah');
      if ((todayYear - this.outboundYear) === 1) {
        console.log('last year to check is 2019');

        if ((todayMonth - this.outboundMonth) === 0) {
          console.log('zero');
          console.log((todayMonth - this.outboundMonth));

        } else if ((todayMonth - this.outboundMonth) < 0) {
          console.log('lower than zero');
          console.log((todayMonth - this.outboundMonth));

        } else {
          console.log('greater than zero');
          console.log((todayMonth - this.outboundMonth));

        }
      } else if ((todayYear - this.outboundYear) === 0) {
        console.log('last year to check is 2020');

      }
    }
    if ((todayDay - this.outboundDay) < 7) {
      console.log('sdfdsfds');
      console.log((todayDay - this.outboundDay));
      let monthDiff = todayMonth - 1
      console.log(monthDiff);
      if (monthDiff < 0) {

      }
    } else {
      console.log((todayDay - this.outboundDay));
    }
    console.log(this.datez);
    console.log(this.outboundDay);
    console.log(this.outboundWeek);
    console.log(this.outboundMonth);
    console.log(todayMonth);
    console.log(this.outboundYear)
  });
}

PullDayData() {
  for (let key in this.outBoundGraph) {
    let date = moment(new Date()).format('MMMM DD YYYY');
    let newdate = moment(date).subtract(0, 'days').format('MMMM DD YYYY')

    let yearDiff = Number(moment(date).format('YYYY')) - Number(moment(this.outBoundGraph[key].time).format('YYYY'));
    let monthDiff = Number(moment(date).format('MM')) - Number(moment(this.outBoundGraph[key].time).format('MM'))
    let dateDiff = Number(moment(date).format('DD')) - Number(moment(this.outBoundGraph[key].time).format('DD'))
    //if(this.outBoundGraph[key].)    Number(moment(today).format('MM'))

    console.log(date);
    console.log(newdate);

    this.db.collection('outbound').where("date", ">=", newdate).onSnapshot(Snapshot => {
      // this.outBoundGraphDisplayDay.push(Snapshot);
      console.log(Snapshot);
      Snapshot.forEach(element => {
        let time = {};
        let gl001 = {};
        let nfalo1 = {};
        let pap005 = {};
        let pap007 = {};
        let pap001 = {};
        let pap003 = {};
        let hd001 = {};
        let ld003 = {};
        let ld001 = {};
        let pet005 = {};
        let pet003 = {};
        let pet001 = {};

        time = element.data().date;
        gl001 = element.data().GH001;
        nfalo1 = element.data().NFAL01;
        pap005 = element.data().PAP005;
        pap007 = element.data().PAP007;
        pap001 = element.data().PAP001;
        pap003 = element.data().PAP003;
        hd001 = element.data().HD001;
        ld003 = element.data().LD003;
        ld001 = element.data().LD001;
        pet005 = element.data().PET005;
        pet003 = element.data().PET003;
        pet001 = element.data().PET001;


        this.outBoundGraphDisplayDay.push({
          time: time,
          gl001: gl001,
          nfalo1: nfalo1,
          pap005: pap005,
          pap007: pap007,
          pap001: pap001,
          pap003: pap003,
          hd001: hd001,
          ld003: ld003,
          ld001: ld001,
          pet005: pet005,
          pet003: pet003,
          pet001: pet001
        })
        console.log(element.data());

      })
    })

    // this.outBoundGraphDisplayDay.push(date)
    console.log(this.outBoundGraphDisplayDay);

  }
}

// PullWeekData() {

// }

// PullMonthData() {
//   console.log(this.outBoundGraph);
//   // let date = moment(new Date()).format('LLLL');
//   // let newdate = moment(date).subtract(30, 'days').format('LLLL')
//   // let currentYear = moment(date).format('YYYY');
//   // let currentMonth = moment(date).format('MM');
//   // let currentDate = moment(date).format('DD');

//   // console.log(date);
//   // console.log(newdate);

//   // if () {

//   // }

//   // code for 1 week query
//   for (let key in this.outBoundGraph) {
//     let date = moment(new Date(this.outBoundGraph[key].time)).format('LLLL');
//     let newdate = moment(date).subtract(7, 'days').format('LLLL')

//     let yearDiff = Number(moment(date).format('YYYY')) - Number(moment(this.outBoundGraph[key].time).format('YYYY'));
//     let monthDiff = Number(moment(date).format('MM')) - Number(moment(this.outBoundGraph[key].time).format('MM'))
//     let dateDiff = Number(moment(date).format('DD')) - Number(moment(this.outBoundGraph[key].time).format('DD'))
//     //if(this.outBoundGraph[key].)    Number(moment(today).format('MM'))

//     console.log(date);
//     console.log(newdate);

//     if ((yearDiff === 0) && (monthDiff === 0) && (dateDiff === 2)) {
//       console.log(this.outBoundGraph[key]);
//       this.outBoundGraphDisplayWeek.push(this.outBoundGraph[key])
//     }

//     let gl001outweek = {};
//     let nfalo1outweek = {};
//     let pap005outweek = {};
//     let pap007outweek = {};
//     let pap001outweek = {};
//     let pap003outweek = {};
//     let hd001outweek = {};
//     let ld003outweek = {};
//     let ld001outweek = {};
//     let pet005outweek = {};
//     let pet003outweek = {};
//     let pet001outweek = {};

//     gl001outweek = this.outBoundGraph[key].GH001;
//     nfalo1outweek = this.outBoundGraph[key].NFALO01;
//     pap005outweek = this.outBoundGraph[key].PAP005;
//     pap007outweek = this.outBoundGraph[key].PAP005;
//     pap001outweek = this.outBoundGraph[key].PAP005;
//     pap003outweek = this.outBoundGraph[key].PAP005;
//     hd001outweek = this.outBoundGraph[key].HD001;
//     ld003outweek = this.outBoundGraph[key].LD003;
//     ld001outweek = this.outBoundGraph[key].LD001;
//     pet005outweek = this.outBoundGraph[key].PET005;
//     pet003outweek = this.outBoundGraph[key].PET003;
//     pet001outweek = this.outBoundGraph[key].PET001;

//   }
//   console.log(this.outBoundGraphDisplayWeek);

//   // gl001
//   // nfalo1
//   // pap005
//   // pap007
//   // pap001
//   // pap003
//   // hd001
//   // ld003
//   // ld001
//   // pet005
//   // pet003
//   // pet001

// }

  PullWeekData() {
    // Inbound Graph
    for(let key in this.outBoundGraph) {
      var i = 0; i < 7; i++;
      let date = moment(new Date()).format('MMMM DD YYYY');
      let newdate = moment(date).subtract(i, 'days').format('MMMM DD YYYY');

      // console.log(date);
      // console.log(newdate);

      this.db.collection('inbounds').where("date", ">=", newdate).onSnapshot(Snapshot => {
        Snapshot.forEach(element => {
          let time = {};
          let gl001 = {};
          let nfalo1 = {};
          let pap005 = {};
          let pap007 = {};
          let pap001 = {};
          let pap003 = {};
          let hd001 = {};
          let ld003 = {};
          let ld001 = {};
          let pet005 = {};
          let pet003 = {};
          let pet001 = {};

          time = element.data().time;
          gl001 = element.data().inboundGH001;
          nfalo1 = element.data().inboundNFAL01;
          pap005 = element.data().inboundPAP005;
          pap007 = element.data().inboundPAP007;
          pap001 = element.data().inboundPAP001;
          pap003 = element.data().inboundPAP003;
          hd001 = element.data().inboundHD001;
          ld003 = element.data().inboundLD003;
          ld001 = element.data().inboundLD001;
          pet005 = element.data().inboundPET005;
          pet003 = element.data().inboundPET003;
          pet001 = element.data().inboundPET00;

          this.inboundGraphDisplay.push({
            time: time,
            gl001: gl001,
            nfalo1: nfalo1,
            pap005: pap005,
            pap007: pap007,
            pap001: pap001,
            pap003: pap003,
            hd001: hd001,
            ld003: ld003,
            ld001: ld001,
            pet005: pet005,
            pet003: pet003,
            pet001: pet001
          })
          // console.log(element.data());

          this.totalInBoundWeekGL001 = +this.totalInBoundWeekGL001 + +gl001;
          this.totalInBoundWeekNFAL01 = +this.totalInBoundWeekNFAL01 + +nfalo1;
          this.totalInBoundWeekPAP005 = +this.totalInBoundWeekPAP005 + +pap005;
          this.totalInBoundWeekPAP007 = +this.totalInBoundWeekPAP007 + +pap007;
          this.totalInBoundWeekPAP003 = +this.totalInBoundWeekPAP003 + +pap001;
          this.totalInBoundWeekPAP001 = +this.totalInBoundWeekPAP001 + +pap003;
          this.totalInBoundWeekHD001 = +this.totalInBoundWeekHD001 + +hd001;
          this.totalInBoundWeekLD001 = +this.totalInBoundWeekLD001 + +ld003;
          this.totalInBoundWeekLD003 = +this.totalInBoundWeekLD003 + +ld001;
          this.totalInBoundWeekPET001 = +this.totalInBoundWeekPET001 + +pet001;
          this.totalInBoundWeekPET003 = +this.totalInBoundWeekPET003 + +pet003;
          this.totalInBoundWeekPET005 = +this.totalInBoundWeekPET005 + +pet005;

          this.inboundgh001 = this.totalInBoundWeekGL001;
          this.inboundnfalo1 = this.totalInBoundWeekNFAL01;
          this.inboundpap005 = this.totalInBoundWeekPAP005;
          this.inboundpap007 = this.totalInBoundWeekPAP007;
          this.inboundpap003 = this.totalInBoundWeekPAP003;
          this.inboundpap001 = this.totalInBoundWeekPAP001;
          this.inboundhd001 = this.totalInBoundWeekHD001;
          this.inboundld001 = this.totalInBoundWeekLD001;
          this.inboundld003 = this.totalInBoundWeekLD003;
          this.inboundpet001 = this.totalInBoundWeekPET001;
          this.inboundpet003 = this.totalInBoundWeekPET003;
          this.inboundpet005 = this.totalInBoundWeekPET005;

          // console.log(this.inboundgh001);
          // console.log(this.inboundnfalo1);
          // console.log(this.inboundpap005);
          // console.log(this.inboundpap007);
          // console.log(this.inboundpap003);
          // console.log(this.inboundpap001);
          // console.log(this.inboundhd001);
          // console.log(this.inboundld001);
          // console.log(this.inboundld003);
          // console.log(this.inboundpet001);
          // console.log(this.inboundpet003);
          // console.log(this.inboundpet005);
          
        })
        this.createBarChart();
      })
      // this.outBoundGraphDisplayDay.push(date)
      // console.log(this.inboundGraphDisplay);
    }

    // code for outbound
    for(let key in this.outBoundGraph) {
      var i = 0; i < 7; i++;
      let date = moment(new Date()).format('MMMM DD YYYY');
      let newdate = moment(date).subtract(i, 'days').format('MMMM DD YYYY');

      // console.log(date);
      // console.log(newdate);

      this.db.collection('outbound').where("date", ">=", newdate).onSnapshot(Snapshot => {
        // this.outBoundGraphDisplayDay.push(Snapshot);
        // console.log(Snapshot);
        Snapshot.forEach(element => {
          let time = {};
          let gl001 = {};
          let nfalo1 = {};
          let pap005 = {};
          let pap007 = {};
          let pap001 = {};
          let pap003 = {};
          let hd001 = {};
          let ld003 = {};
          let ld001 = {};
          let pet005 = {};
          let pet003 = {};
          let pet001 = {};

          time = element.data().date;
          gl001 = element.data().GH001;
          nfalo1 = element.data().NFAL01;
          pap005 = element.data().PAP005;
          pap007 = element.data().PAP007;
          pap001 = element.data().PAP001;
          pap003 = element.data().PAP003;
          hd001 = element.data().HD001;
          ld003 = element.data().LD003;
          ld001 = element.data().LD001;
          pet005 = element.data().PET005;
          pet003 = element.data().PET003;
          pet001 = element.data().PET00;

          this.outBoundGraphDisplayDay.push({
            time: time,
            gl001: gl001,
            nfalo1: nfalo1,
            pap005: pap005,
            pap007: pap007,
            pap001: pap001,
            pap003: pap003,
            hd001: hd001,
            ld003: ld003,
            ld001: ld001,
            pet005: pet005,
            pet003: pet003,
            pet001: pet001
          })
          // console.log(element.data());

          this.totaloutBoundWeekGL001 = +this.totaloutBoundWeekGL001 + +gl001;
          this.totaloutBoundWeekNFAL01 = +this.totaloutBoundWeekNFAL01 + +nfalo1;
          this.totaloutBoundWeekPAP005 = +this.totaloutBoundWeekPAP005 + +pap005;
          this.totaloutBoundWeekPAP007 = +this.totaloutBoundWeekPAP007 + +pap007;
          this.totaloutBoundWeekPAP003 = +this.totaloutBoundWeekPAP003 + +pap001;
          this.totaloutBoundWeekPAP001 = +this.totaloutBoundWeekPAP001 + +pap003;
          this.totaloutBoundWeekHD001 = +this.totaloutBoundWeekHD001 + +hd001;
          this.totaloutBoundWeekLD001 = +this.totaloutBoundWeekLD001 + +ld003;
          this.totaloutBoundWeekLD003 = +this.totaloutBoundWeekLD003 + +ld001;
          this.totaloutBoundWeekPET001 = +this.totaloutBoundWeekPET001 + +pet001;
          this.totaloutBoundWeekPET003 = +this.totaloutBoundWeekPET003 + +pet003;
          this.totaloutBoundWeekPET005 = +this.totaloutBoundWeekPET005 + +pet005;

          this.outboundgh001 = this.totaloutBoundWeekGL001;
          this.outboundnfal01 = this.totaloutBoundWeekNFAL01;
          this.outboundpap005 = this.totaloutBoundWeekPAP005;
          this.outboundpap007 = this.totaloutBoundWeekPAP007;
          this.outboundpap003 = this.totaloutBoundWeekPAP003;
          this.outboundpap001 = this.totaloutBoundWeekPAP001;
          this.outboundhd001 = this.totaloutBoundWeekHD001;
          this.outboundld001 = this.totaloutBoundWeekLD001;
          this.outboundld003 = this.totaloutBoundWeekLD003;
          this.outboundpet003 = this.totaloutBoundWeekPET001;
          this.outboundpet001 = this.totaloutBoundWeekPET003;
          this.outboundpet005 = this.totaloutBoundWeekPET005;

          // console.log(this.outboundgh001);
          // console.log(this.outboundnfal01);
          // console.log(this.outboundpap005);
          // console.log(this.outboundpap007);
          // console.log(this.outboundpap003);
          // console.log(this.outboundpap001);
          // console.log(this.outboundhd001);
          // console.log(this.outboundld001);
          // console.log(this.outboundld003);
          // console.log(this.outboundpet003);
          // console.log(this.outboundpet001);
          // console.log(this.outboundpet005);
          
        })
        this.createBarChart1();
      })
      // this.outBoundGraphDisplayDay.push(date)
      // console.log(this.outBoundGraphDisplayDay);
    }

    // reclaimers Graph
    for(let key in this.outBoundGraph) {
      var i = 0; i < 7; i++;
      let date = moment(new Date()).format('MMMM DD YYYY');
      let newdate = moment(date).subtract(i, 'days').format('MMMM DD YYYY');

      // console.log(date);
      // console.log(newdate);

      this.db.collection('reclaimers').where("date", ">=", newdate).onSnapshot(Snapshot => {
        Snapshot.forEach(element => {
          let time = {};
          let gl001 = {};
          let nfalo1 = {};
          let pap005 = {};
          let pap007 = {};
          let pap001 = {};
          let pap003 = {};
          let hd001 = {};
          let ld003 = {};
          let ld001 = {};
          let pet005 = {};
          let pet003 = {};
          let pet001 = {};

          time = element.data().date;
          gl001 = element.data().GH001Mass;
          nfalo1 = element.data().NFAL01Mass;
          pap005 = element.data().PAP005Mass;
          pap007 = element.data().PAP007Mass;
          pap001 = element.data().PAP001Mass;
          pap003 = element.data().PAP003Mass;
          hd001 = element.data().HD001Mass;
          ld003 = element.data().LD003Mass;
          ld001 = element.data().LD001Mass;
          pet005 = element.data().PET005Mass;
          pet003 = element.data().PET003Mass;
          pet001 = element.data().PET001Mass;

          this.inboundGraphDisplay.push({
            time: time,
            gl001: gl001,
            nfalo1: nfalo1,
            pap005: pap005,
            pap007: pap007,
            pap001: pap001,
            pap003: pap003,
            hd001: hd001,
            ld003: ld003,
            ld001: ld001,
            pet005: pet005,
            pet003: pet003,
            pet001: pet001
          })
          // console.log(element.data());

          this.totalReclaimerWeekGL001 = +this.totalReclaimerWeekGL001 + +gl001;
          this.totalReclaimerWeekNFAL01 = +this.totalReclaimerWeekNFAL01 + +nfalo1;
          this.totalReclaimerWeekPAP005 = +this.totalReclaimerWeekPAP005 + +pap005;
          this.totalReclaimerWeekPAP007 = +this.totalReclaimerWeekPAP007 + +pap007;
          this.totalReclaimerWeekPAP003 = +this.totalReclaimerWeekPAP003 + +pap001;
          this.totalReclaimerWeekPAP001 = +this.totalReclaimerWeekPAP001 + +pap003;
          this.totalReclaimerWeekHD001 = +this.totalReclaimerWeekHD001 + +hd001;
          this.totalReclaimerWeekLD001 = +this.totalReclaimerWeekLD001 + +ld003;
          this.totalReclaimerWeekLD003 = +this.totalReclaimerWeekLD003 + +ld001;
          this.totalReclaimerWeekPET001 = +this.totalReclaimerWeekPET001 + +pet001;
          this.totalReclaimerWeekPET003 = +this.totalReclaimerWeekPET003 + +pet003;
          this.totalReclaimerWeekPET005 = +this.totalReclaimerWeekPET005 + +pet005;

          this.reclaimergh001mass = this.totalReclaimerWeekGL001;
          this.reclaimernfa01Mass = this.totalReclaimerWeekNFAL01;
          this.reclaimerpap005mass = this.totalReclaimerWeekPAP005;
          this.reclaimerpap007Mass = this.totalReclaimerWeekPAP007;
          this.reclaimerpap003mass = this.totalReclaimerWeekPAP003;
          this.reclaimerpap001mass = this.totalReclaimerWeekPAP001;
          this.reclaimerhd001mass = this.totalReclaimerWeekHD001;
          this.reclaimerld001mass = this.totalReclaimerWeekLD001;
          this.reclaimerld003mass = this.totalReclaimerWeekLD003;
          this.reclaimerpet001mass = this.totalReclaimerWeekPET001;
          this.reclaimerpet003mass = this.totalReclaimerWeekPET003;
          this.reclaimerpet005mass = this.totalReclaimerWeekPET005;

          // console.log(this.reclaimergh001mass);
          // console.log(this.reclaimernfa01Mass);
          // console.log(this.reclaimerpap005mass);
          // console.log(this.reclaimerpap007Mass);
          // console.log(this.reclaimerpap003mass);
          // console.log(this.reclaimerpap001mass);
          // console.log(this.reclaimerhd001mass);
          // console.log(this.reclaimerld001mass);
          // console.log(this.reclaimerld003mass);
          // console.log(this.reclaimerpet001mass);
          // console.log(this.reclaimerpet003mass);
          // console.log(this.reclaimerpet005mass);
          
        })
        this.createBarChart2();
      })
      // this.outBoundGraphDisplayDay.push(date)
      // console.log(this.inboundGraphDisplay);
    }

  }

  PullMonthData() {
    // Inbound Graph
    for(let key in this.outBoundGraph) {
      var i = 0; i < 30; i++;
      let date = moment(new Date()).format('MMMM DD YYYY');
      let newdate = moment(date).subtract(i, 'days').format('MMMM DD YYYY');

      // console.log(date);
      // console.log(newdate);

      this.db.collection('inbounds').where("date", ">=", newdate).onSnapshot(Snapshot => {
        Snapshot.forEach(element => {
          let time = {};
          let gl001 = {};
          let nfalo1 = {};
          let pap005 = {};
          let pap007 = {};
          let pap001 = {};
          let pap003 = {};
          let hd001 = {};
          let ld003 = {};
          let ld001 = {};
          let pet005 = {};
          let pet003 = {};
          let pet001 = {};

          time = element.data().time;
          gl001 = element.data().inboundGH001;
          nfalo1 = element.data().inboundNFAL01;
          pap005 = element.data().inboundPAP005;
          pap007 = element.data().inboundPAP007;
          pap001 = element.data().inboundPAP001;
          pap003 = element.data().inboundPAP003;
          hd001 = element.data().inboundHD001;
          ld003 = element.data().inboundLD003;
          ld001 = element.data().inboundLD001;
          pet005 = element.data().inboundPET005;
          pet003 = element.data().inboundPET003;
          pet001 = element.data().inboundPET00;

          this.inboundGraphDisplay.push({
            time: time,
            gl001: gl001,
            nfalo1: nfalo1,
            pap005: pap005,
            pap007: pap007,
            pap001: pap001,
            pap003: pap003,
            hd001: hd001,
            ld003: ld003,
            ld001: ld001,
            pet005: pet005,
            pet003: pet003,
            pet001: pet001
          })
          // console.log(element.data());

          this.totalInBoundMonthGL001 = +this.totalInBoundMonthGL001 + +gl001;
          this.totalInBoundMonthNFAL01 = +this.totalInBoundMonthNFAL01 + +nfalo1;
          this.totalInBoundMonthPAP005 = +this.totalInBoundMonthPAP005 + +pap005;
          this.totalInBoundMonthPAP007 = +this.totalInBoundMonthPAP007 + +pap007;
          this.totalInBoundMonthPAP003 = +this.totalInBoundMonthPAP003 + +pap001;
          this.totalInBoundMonthPAP001 = +this.totalInBoundMonthPAP001 + +pap003;
          this.totalInBoundMonthHD001 = +this.totalInBoundMonthHD001 + +hd001;
          this.totalInBoundMonthLD001 = +this.totalInBoundMonthLD001 + +ld003;
          this.totalInBoundMonthLD003 = +this.totalInBoundMonthLD003 + +ld001;
          this.totalInBoundMonthPET001 = +this.totalInBoundMonthPET001 + +pet001;
          this.totalInBoundMonthPET003 = +this.totalInBoundMonthPET003 + +pet003;
          this.totalInBoundMonthPET005 = +this.totalInBoundMonthPET005 + +pet005;

          this.inboundgh001 = this.totalInBoundMonthGL001;
          this.inboundnfalo1 = this.totalInBoundMonthNFAL01;
          this.inboundpap005 = this.totalInBoundMonthPAP005;
          this.inboundpap007 = this.totalInBoundMonthPAP007;
          this.inboundpap003 = this.totalInBoundMonthPAP003;
          this.inboundpap001 = this.totalInBoundMonthPAP001;
          this.inboundhd001 = this.totalInBoundMonthHD001;
          this.inboundld001 = this.totalInBoundMonthLD001;
          this.inboundld003 = this.totalInBoundMonthLD003;
          this.inboundpet001 = this.totalInBoundMonthPET001;
          this.inboundpet003 = this.totalInBoundMonthPET003;
          this.inboundpet005 = this.totalInBoundMonthPET005;

          // console.log(this.inboundgh001);
          // console.log(this.inboundnfalo1);
          // console.log(this.inboundpap005);
          // console.log(this.inboundpap007);
          // console.log(this.inboundpap003);
          // console.log(this.inboundpap001);
          // console.log(this.inboundhd001);
          // console.log(this.inboundld001);
          // console.log(this.inboundld003);
          // console.log(this.inboundpet001);
          // console.log(this.inboundpet003);
          // console.log(this.inboundpet005);
          
        })
        this.createBarChart();
      })
      // this.outBoundGraphDisplayDay.push(date)
      // console.log(this.inboundGraphDisplay);
    }

    // code for outbound
    for(let key in this.outBoundGraph) {
      var i = 0; i < 30; i++;
      let date = moment(new Date()).format('MMMM DD YYYY');
      let newdate = moment(date).subtract(i, 'days').format('MMMM DD YYYY');

      // console.log(date);
      // console.log(newdate);

      this.db.collection('outbound').where("date", ">=", newdate).onSnapshot(Snapshot => {
        // this.outBoundGraphDisplayDay.push(Snapshot);
        // console.log(Snapshot);
        Snapshot.forEach(element => {
          let time = {};
          let gl001 = {};
          let nfalo1 = {};
          let pap005 = {};
          let pap007 = {};
          let pap001 = {};
          let pap003 = {};
          let hd001 = {};
          let ld003 = {};
          let ld001 = {};
          let pet005 = {};
          let pet003 = {};
          let pet001 = {};

          time = element.data().date;
          gl001 = element.data().GH001;
          nfalo1 = element.data().NFAL01;
          pap005 = element.data().PAP005;
          pap007 = element.data().PAP007;
          pap001 = element.data().PAP001;
          pap003 = element.data().PAP003;
          hd001 = element.data().HD001;
          ld003 = element.data().LD003;
          ld001 = element.data().LD001;
          pet005 = element.data().PET005;
          pet003 = element.data().PET003;
          pet001 = element.data().PET00;

          this.outBoundGraphDisplayDay.push({
            time: time,
            gl001: gl001,
            nfalo1: nfalo1,
            pap005: pap005,
            pap007: pap007,
            pap001: pap001,
            pap003: pap003,
            hd001: hd001,
            ld003: ld003,
            ld001: ld001,
            pet005: pet005,
            pet003: pet003,
            pet001: pet001
          })
          // console.log(element.data());

          this.totaloutBoundMonthGL001 = +this.totaloutBoundMonthGL001 + +gl001;
          this.totaloutBoundMonthNFAL01 = +this.totaloutBoundMonthNFAL01 + +nfalo1;
          this.totaloutBoundMonthPAP005 = +this.totaloutBoundWeekPAP005 + +pap005;
          this.totaloutBoundMonthPAP007 = +this.totaloutBoundMonthPAP007 + +pap007;
          this.totaloutBoundMonthPAP003 = +this.totaloutBoundMonthPAP003 + +pap001;
          this.totaloutBoundMonthPAP001 = +this.totaloutBoundMonthPAP001 + +pap003;
          this.totaloutBoundMonthHD001 = +this.totaloutBoundMonthHD001 + +hd001;
          this.totaloutBoundMonthLD001 = +this.totaloutBoundMonthLD001 + +ld003;
          this.totaloutBoundMonthLD003 = +this.totaloutBoundMonthLD003 + +ld001;
          this.totaloutBoundMonthPET001 = +this.totaloutBoundMonthPET001 + +pet001;
          this.totaloutBoundMonthPET003 = +this.totaloutBoundMonthPET003 + +pet003;
          this.totaloutBoundMonthPET005 = +this.totaloutBoundMonthPET005 + +pet005;

          this.outboundgh001 = this.totaloutBoundMonthGL001;
          this.outboundnfal01 = this.totaloutBoundMonthNFAL01;
          this.outboundpap005 = this.totaloutBoundWeekPAP005;
          this.outboundpap007 = this.totaloutBoundMonthPAP007;
          this.outboundpap003 = this.totaloutBoundMonthPAP003;
          this.outboundpap001 = this.totaloutBoundMonthPAP001;
          this.outboundhd001 = this.totaloutBoundMonthHD001;
          this.outboundld001 = this.totaloutBoundMonthLD001;
          this.outboundld003 = this.totaloutBoundMonthLD003;
          this.outboundpet003 = this.totaloutBoundMonthPET001;
          this.outboundpet001 = this.totaloutBoundMonthPET003;
          this.outboundpet005 = this.totaloutBoundMonthPET005;

          // console.log(this.outboundgh001);
          // console.log(this.outboundnfal01);
          // console.log(this.outboundpap005);
          // console.log(this.outboundpap007);
          // console.log(this.outboundpap003);
          // console.log(this.outboundpap001);
          // console.log(this.outboundhd001);
          // console.log(this.outboundld001);
          // console.log(this.outboundld003);
          // console.log(this.outboundpet003);
          // console.log(this.outboundpet001);
          // console.log(this.outboundpet005);
          
        })
        this.createBarChart1();
      })
      // this.outBoundGraphDisplayDay.push(date)
      // console.log(this.outBoundGraphDisplayDay);
    }

    // reclaimers Graph
    for(let key in this.outBoundGraph) {
      var i = 0; i < 30; i++;
      let date = moment(new Date()).format('MMMM DD YYYY');
      let newdate = moment(date).subtract(i, 'days').format('MMMM DD YYYY');

      // console.log(date);
      // console.log(newdate);

      this.db.collection('reclaimers').where("date", ">=", newdate).onSnapshot(Snapshot => {
        Snapshot.forEach(element => {
          let time = {};
          let gl001 = {};
          let nfalo1 = {};
          let pap005 = {};
          let pap007 = {};
          let pap001 = {};
          let pap003 = {};
          let hd001 = {};
          let ld003 = {};
          let ld001 = {};
          let pet005 = {};
          let pet003 = {};
          let pet001 = {};

          time = element.data().date;
          gl001 = element.data().GH001Mass;
          nfalo1 = element.data().NFAL01Mass;
          pap005 = element.data().PAP005Mass;
          pap007 = element.data().PAP007Mass;
          pap001 = element.data().PAP001Mass;
          pap003 = element.data().PAP003Mass;
          hd001 = element.data().HD001Mass;
          ld003 = element.data().LD003Mass;
          ld001 = element.data().LD001Mass;
          pet005 = element.data().PET005Mass;
          pet003 = element.data().PET003Mass;
          pet001 = element.data().PET001Mass;

          this.inboundGraphDisplay.push({
            time: time,
            gl001: gl001,
            nfalo1: nfalo1,
            pap005: pap005,
            pap007: pap007,
            pap001: pap001,
            pap003: pap003,
            hd001: hd001,
            ld003: ld003,
            ld001: ld001,
            pet005: pet005,
            pet003: pet003,
            pet001: pet001
          })
          // console.log(element.data());

          this.totalReclaimerMonthGL001 = +this.totalReclaimerMonthGL001 + +gl001;
          this.totalReclaimerMonthNFAL01 = +this.totalReclaimerMonthNFAL01 + +nfalo1;
          this.totalReclaimerMonthPAP005 = +this.totalReclaimerMonthPAP005 + +pap005;
          this.totalReclaimerMonthPAP007 = +this.totalReclaimerMonthPAP007 + +pap007;
          this.totalReclaimerMonthPAP003 = +this.totalReclaimerMonthPAP003 + +pap001;
          this.totalReclaimerMonthPAP001 = +this.totalReclaimerMonthPAP001 + +pap003;
          this.totalReclaimerMonthHD001 = +this.totalReclaimerMonthHD001 + +hd001;
          this.totalReclaimerMonthLD001 = +this.totalReclaimerMonthLD001 + +ld003;
          this.totalReclaimerMonthLD003 = +this.totalReclaimerMonthLD003 + +ld001;
          this.totalReclaimerMonthPET001 = +this.totalReclaimerMonthPET001 + +pet001;
          this.totalReclaimerMonthPET003 = +this.totalReclaimerMonthPET003 + +pet003;
          this.totalReclaimerMonthPET005 = +this.totalReclaimerMonthPET005 + +pet005;

          this.reclaimergh001mass = this.totalReclaimerWeekGL001;
          this.reclaimernfa01Mass = this.totalReclaimerMonthNFAL01;
          this.reclaimerpap005mass = this.totalReclaimerMonthPAP005;
          this.reclaimerpap007Mass = this.totalReclaimerMonthPAP007;
          this.reclaimerpap003mass = this.totalReclaimerMonthPAP003;
          this.reclaimerpap001mass = this.totalReclaimerMonthPAP001;
          this.reclaimerhd001mass = this.totalReclaimerMonthHD001;
          this.reclaimerld001mass = this.totalReclaimerMonthLD001;
          this.reclaimerld003mass = this.totalReclaimerMonthLD003;
          this.reclaimerpet001mass = this.totalReclaimerMonthPET001;
          this.reclaimerpet003mass = this.totalReclaimerMonthPET003;
          this.reclaimerpet005mass = this.totalReclaimerMonthPET005;

          // console.log(this.reclaimergh001mass);
          // console.log(this.reclaimernfa01Mass);
          // console.log(this.reclaimerpap005mass);
          // console.log(this.reclaimerpap007Mass);
          // console.log(this.reclaimerpap003mass);
          // console.log(this.reclaimerpap001mass);
          // console.log(this.reclaimerhd001mass);
          // console.log(this.reclaimerld001mass);
          // console.log(this.reclaimerld003mass);
          // console.log(this.reclaimerpet001mass);
          // console.log(this.reclaimerpet003mass);
          // console.log(this.reclaimerpet005mass);
          
        })
        this.createBarChart2();
      })
      // this.outBoundGraphDisplayDay.push(date)
      // console.log(this.inboundGraphDisplay);
    }

  }



//EDIT PAPER
  HideandShowSave() {
    this.edit = !this.edit;
    // console.log(this.edit,this.editDiv[0]);
    
    if (this.edit) {
      // console.log('block');
      this.render.setStyle(this.editDiv[0],'display','block')
    } else {
      // console.log('none');
      setTimeout(() => {
        this.render.setStyle(this.editDiv[0],'display','none')
      }, 500);
    }
  }

  // if (this.edit) {
  //   // console.log('block');
  //   this.render.setStyle(this.editDiv[0], 'display', 'block')
  // } else {
  //   // console.log('none');
  //   setTimeout(() => {
  //     this.render.setStyle(this.editDiv[0], 'display', 'none')
  //   }, 500);
  // }


burgerMan() {
  this.burger = !this.burger;
}
//edit plastic div
HideandShowCreate() {
  this.create = !this.create;

  if (this.create) {
    // console.log('block');
    this.render.setStyle(this.createDiv[0], 'display', 'block')
  } else {
    // console.log('none');
    setTimeout(() => {
      this.render.setStyle(this.createDiv[0], 'display', 'none')
    }, 500);
  }
}

//edit glass div
glassShow() {
  this.glass = !this.glass;

  if (this.glass) {
    // console.log('block');
    this.render.setStyle(this.glassDiv[0], 'display', 'block')
  } else {
    // console.log('none');
    setTimeout(() => {
      this.render.setStyle(this.glassDiv[0], 'display', 'none')
    }, 500);
  }
}

//edit aluminium
HideandShowDelete() {
  this.delete = !this.delete;
  if (this.delete) {
    // console.log('block');
    this.render.setStyle(this.deleteDiv[0], 'display', 'block')
  } else {
    // console.log('none');
    setTimeout(() => {
      this.render.setStyle(this.deleteDiv[0], 'display', 'none')
    }, 500);
  }
}

//HISTORY FOR PAPER
HideandShowHISTORYPAPER() {
  this.paper = !this.paper;
  if (this.paper) {
    // console.log('block');
    this.render.setStyle(this.paperDiv[0], 'display', 'block')
  } else {
    // console.log('none');
    setTimeout(() => {
      this.render.setStyle(this.paperDiv[0], 'display', 'none')
    }, 500);
  }
}

//HISTORY FOR PLASTIC
HideandShowHISTORYPPLASTIC() {
  this.plastic = !this.plastic;
  if (this.plastic) {
    // console.log('block');
    this.render.setStyle(this.plasticDiv[0], 'display', 'block')
  } else {
    // console.log('none');
    setTimeout(() => {
      this.render.setStyle(this.plasticDiv[0], 'display', 'none')
    }, 500);
  }
}

//HISTORY FOR ALUMINUM
HideandShowHISTORYALUMINIUM() {

  this.alu = !this.alu;
  if (this.alu) {
    // console.log('block');
    this.render.setStyle(this.aluDiv[0], 'display', 'block')
  } else {
    // console.log('none');
    setTimeout(() => {
      this.render.setStyle(this.aluDiv[0], 'display', 'none')
    }, 500);
  }
}

//HISTORY FOR GLASS
HideandShowHISTORYGLASS() {
  this.glassh = !this.glassh;
  if (this.glassh) {
    // console.log('block');
    this.render.setStyle(this.glasshDiv[0], 'display', 'block')
  } else {
    // console.log('none');
    setTimeout(() => {
      this.render.setStyle(this.glasshDiv[0], 'display', 'none')
    }, 500);
  }
}


Logout() {
  firebase.auth().signOut().then((res) => {
    // console.log(res);
    this.route.navigateByUrl('/login');
  });
}
editprofile() {
  this.route.navigate(['profile']);
}

moreState = 0;
optsSlider = document.getElementsByClassName("burgercontent") as HTMLCollectionOf<HTMLElement>
showMoreBtn() {
  if (this.moreState == 0) {
    this.moreState = 1
    this.optsSlider[0].style.width = "125px"
    // console.log("this is open")
  }
  else {
    this.moreState = 0
    this.optsSlider[0].style.width = "30px"
    // console.log("this is closed")
  }
}

//testing
//burgercontent 2
moreState2 = 0;
optsSlider2 = document.getElementsByClassName("burgercontent2") as HTMLCollectionOf<HTMLElement>
showMoreBtn2() {
  if (this.moreState2 == 0) {
    this.moreState2 = 1
    this.optsSlider2[0].style.width = "125px"
    // console.log("this is open")
  }
  else {
    this.moreState2 = 0
    this.optsSlider2[0].style.width = "30px"
    // console.log("this is closed")
  }
}

//burgercontent 3
moreState3 = 0;
optsSlider3 = document.getElementsByClassName("burgercontent3") as HTMLCollectionOf<HTMLElement>
showMoreBtn3() {
  if (this.moreState3 == 0) {
    this.moreState3 = 1
    this.optsSlider3[0].style.width = "125px"
    // console.log("this is open")
  }
  else {
    this.moreState3 = 0
    this.optsSlider3[0].style.width = "30px"
    // console.log("this is closed")
  }
}

//burgercontent 3
moreState4 = 0;
optsSlider4 = document.getElementsByClassName("burgercontent4") as HTMLCollectionOf<HTMLElement>
showMoreBtn4() {
  if (this.moreState4 == 0) {
    this.moreState4 = 1
    this.optsSlider4[0].style.width = "125px"
    //  console.log("this is open")
  }
  else {
    this.moreState4 = 0
    this.optsSlider4[0].style.width = "30px"
    //  console.log("this is closed")
  }
}
getinbound() {
  this.db.collection('inbounds').onSnapshot(snapshot => {

    this.newInbound = []

    snapshot.forEach(Element => {

      this.inboundss.push(Element.data());
    });
    this.inboundss.forEach(item => {

      if (item.Userid === firebase.auth().currentUser.uid) {
        this.newInbound.push(item);
      }
    })
    // console.log('Newinbounds', this.newInbound);
  });
}

CheckInputsEmptyStringPlastic() {
  if (
    this.HD001price === undefined &&
    this.LD001price === undefined &&
    this.LD003price === undefined &&
    this.PET001price === undefined &&
    this.PET003price === undefined &&
    this.PET005price === undefined
  ) {
    this.presentAlertcheckInputs();
  } else {
    this.checkinputfields();
  }
}

CheckInputsEmptyStringGlass() {
  if (
    this.GH001price === undefined
  ) {
    this.presentAlertcheckInputs();
  } else {
    this.checkinputfields();
  }
}

CheckInputsEmptyStringAlu() {
  if (
    this.NFAL01price === undefined


  ) {
    this.presentAlertcheckInputs();
  } else {
    this.checkinputfields();
  }
}

async presentAlertcheckInputs() {
  const alert = await this.alertController.create({
    header: 'Warning!',
    message: '<strong>Field cannot be empty.</strong>!!!',
    buttons: [
      {
        text: 'Okay',
        handler: () => {
          this.route.navigateByUrl('/home');
        }
      }
    ]
  });
  await alert.present();
}
//highlighting the navigation of the daily weekly
toggleDaily() {
  // Changes the header tab
  document.getElementById("daily").style.display = "flex";
  document.getElementById("weekly").style.display = "flex";
  document.getElementById("monthly").style.display = "flex";


  // Changes the color of the daily tab
  // document.getElementById("daily").style.background = "white";
  // document.getElementById("daily").style.color = "black";

  // Changes the color of the weekly tab
  document.getElementById("weekly").style.background = "white";
  document.getElementById("weekly").style.color = "black";

  // Changes the color of the monthly tab
  document.getElementById("monthly").style.background = "white";
  document.getElementById("monthly").style.color = "black";

  // Changes the color of the Plastic tab
  document.getElementById("daily").style.background = "#568C0B";
  document.getElementById("daily").style.color = "white";
}

toggleWeekly() {
  // Changes the header tab
  document.getElementById("weekly").style.display = "flex";
  document.getElementById("monthly").style.display = "flex";
  document.getElementById("daily").style.display = "flex";


  // Changes the color of the Paper tab
  document.getElementById("weekly").style.background = "#568C0B";
  document.getElementById("weekly").style.color = "white";

  // Changes the color of the Cans tab
  document.getElementById("monthly").style.background = "white";
  document.getElementById("monthly").style.color = "black";

  // Changes the color of the Glass tab
  document.getElementById("daily").style.background = "white";
  document.getElementById("daily").style.color = "black";

}

toggleMonthly() {
  // Changes the header tab
  document.getElementById("monthly").style.display = "flex";
  document.getElementById("weekly").style.display = "flex";
  document.getElementById("daily").style.display = "flex";


  // Changes the color of the Paper tab
  document.getElementById("monthly").style.background = "#568C0B";
  document.getElementById("monthly").style.color = "white";

  // Changes the color of the Cans tab
  document.getElementById("weekly").style.background = "white";
  document.getElementById("weekly").style.color = "black";

  // Changes the color of the Glass tab
  document.getElementById("daily").style.background = "white";
  document.getElementById("daily").style.color = "black";

}

}
