import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';
// import { ModalpopupPage } from '../modalpopup/modalpopup.page';
import * as moment from 'moment'
import { element } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('barChart', {static: false}) barChart;
  @ViewChild('barChart1', {static: false}) barChart1;
  @ViewChild('barChart2', {static: false}) barChart2;

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

 inboundpaper = 0;
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

reclaimerglass =0;
reclaimerpaper =0;
reclaimerAlum =0;
reclaimerplastic =0;
 
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
   gl001: null ,
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
   time:null
 };

 price = [];
  prices;

  bars: any;
  colorArray: any;

  inboundss=[];
  newInbound=[];

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
  outGH001 = [];
  ReclaimerGraph = [];
  date;

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
    // this.pullWeeklyInbound();

    }

    //increase the size of clicked graph
    transformGraph() {
      Chart.defaults.global.defaultFontSize = 13;
      this.render.setStyle(this.imgGraph[0],'transform', 'translate(10%, 10%)');
      this.render.setStyle(this.imgGraph[0],'z-index', '1000');
      this.render.setStyle(this.imgGraph[0],'position', 'absolute');
      this.render.setStyle(this.imgGraph[0],'left', '0%');
      this.render.setStyle(this.imgGraph[0],'top', '0%');
      this.render.setStyle(this.imgGraph[0],'width', '80%');
      this.render.setStyle(this.imgGraph[0],'height', '80%');
      this.render.setStyle(this.imgGraph[0], 'font-size', '10% !important');
    }

    transformGraph2() {
      Chart.defaults.global.defaultFontSize = 13;
      this.render.setStyle(this.imgGraph[0],'transform', 'translate(10%, 10%)');
      this.render.setStyle(this.imgGraph[0],'z-index', '1000');
      this.render.setStyle(this.imgGraph[0],'position', 'absolute');
      this.render.setStyle(this.imgGraph[0],'left', '0%');
      this.render.setStyle(this.imgGraph[0],'top', '0%');
      this.render.setStyle(this.imgGraph[0],'width', '80%');
      this.render.setStyle(this.imgGraph[0],'height', '80%');
      this.render.setStyle(this.imgGraph[0], 'font-size', '10% !important');
    }

    transformGraph3() {
      Chart.defaults.global.defaultFontSize = 13;
      this.render.setStyle(this.imgGraph[0],'transform', 'translate(10%, 10%)');
      this.render.setStyle(this.imgGraph[0],'z-index', '1000');
      this.render.setStyle(this.imgGraph[0],'position', 'absolute');
      this.render.setStyle(this.imgGraph[0],'left', '0%');
      this.render.setStyle(this.imgGraph[0],'top', '0%');
      this.render.setStyle(this.imgGraph[0],'width', '80%');
      this.render.setStyle(this.imgGraph[0],'height', '80%');
      this.render.setStyle(this.imgGraph[0], 'font-size', '10% !important');
    }

     //chart
     updated

     updatedoutbound
     updateReclaimer

    ionViewDidEnter() {

//pulling data
//inbound
this.inboundgh001=0;
this.inboundpap005=0;
this.inboundAlum =0;
this.inboundweight =0;
this.inboundplastic =0;
firebase.firestore().collection('inbounds').get().then(res=>{
  res.forEach(val=>{
  
    // console.log('inboundcalculate',val.data().inboundGH001+val.data().inboundHD001+val.data().inboundLD003+val.data().inboundNFAL01+val.data().inboundPAP001+val.data().inboundPAP003+val.data().inboundPAP005 +val.data().inboundPAP007+val.data().inboundPET001+val.data().inboundPET003+val.data().inboundPET005)
    this.inboundweight =this.inboundweight 
    +parseFloat(val.data().inboundGH001) +
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
    +parseFloat(val.data().inboundPET005) ;
    
    // console.log(new Date(val.data().time.seconds*1000))
    this.updated =(new Date(val.data().time.seconds*1000)).toDateString();

  this.inboundgh001 =this.inboundgh001 +parseFloat(val.data().inboundGH001)
  this.inboundnfalo1 =this.inboundnfalo1 +parseFloat(val.data().inboundNFAL01)

  this.inboundpap005 =this.inboundpap005 +parseFloat(val.data().inboundPAP005)
  this.inboundpap007 =this.inboundpap007  +parseFloat(val.data().inboundPAP007)
  this.inboundpap001 =this.inboundpap001 +parseFloat(val.data().inboundPAP001)
  this.inboundpap003 =this.inboundpap003 +parseFloat(val.data().inboundPAP003)

  this.inboundhd001 =this.inboundhd001 +parseFloat(val.data().inboundHD001)
  this.inboundld001 =this.inboundld001 +parseFloat(val.data().inboundLD001)
  this.inboundld003 =this.inboundld003 +parseFloat(val.data().inboundLD003)
  this.inboundpet001 =this.inboundpet001 +parseFloat(val.data().inboundPET001)
  this.inboundpet003 =this.inboundpet003 +parseFloat(val.data().inboundPET003)
  this.inboundpet005 =this.inboundpet005 +parseFloat(val.data().inboundPET005)

//paper
this.inboundpaper = this.inboundpaper 
+parseFloat(val.data().inboundPAP005) 
+parseFloat(val.data().inboundPAP007) 
+parseFloat(val.data().inboundPAP003) 
+parseFloat(val.data().inboundPAP001);

//aluminium
this.inboundAlum = this.inboundAlum  +parseFloat(val.data().inboundNFAL01) 

//plastic
this.inboundplastic =this.inboundplastic + +parseFloat(val.data().inboundHD001) 
+parseFloat(val.data().inboundHD001)
+parseFloat(val.data().inboundLD001)
+parseFloat(val.data().inboundLD003)
+parseFloat(val.data().inboundPET003)
+parseFloat(val.data().inboundPET001) 
  })
  this.createBarChart();
})

//outbound

this.outboundglass =0;
 this.outboundpaper =0;
 this.outboundAlum =0;
 this.outboundplastic =0;

this.outboundweight =0;

firebase.firestore().collection('outbound').get().then(res=>{
  res.forEach(val=>{
    // console.log(val.data().GH001+val.data().GH001)
    this.outboundweight =this.outboundweight 
    +parseFloat(val.data().GH001)
    +parseFloat(val.data().NFAL01)

    +parseFloat(val.data().PAP005)
    +parseFloat(val.data().PAP007)
    +parseFloat(val.data().PAP001)
    +parseFloat(val.data().PAP003)

    +parseFloat(val.data().HD001)
    +parseFloat(val.data().LD001)
    +parseFloat(val.data().LD003)
    +parseFloat(val.data().PET00);
    +parseFloat(val.data().PET003)
    +parseFloat(val.data().PET005);
    
  // console.log(new Date(val.data().date.seconds*1000))
  this.updatedoutbound =(new Date(val.data().date.seconds*1000)).toDateString();
    // console.log('ountglass',  this.outboundglass)
    this.outboundgh001 =this.outboundgh001 +parseFloat(val.data().GH001)
    this.outboundnfal01 =this.outboundnfal01 +parseFloat(val.data().NFAL01)

    this.outboundpap005 =this.outboundpap005 +parseFloat(val.data().PAP005)
    this.outboundpap007=this.outboundpap007 +parseFloat(val.data().PAP007)
    this.outboundpap003 =this.outboundpap003 +parseFloat(val.data().PAP003)
    this.outboundpap001 =this.outboundpap001 +parseFloat(val.data().PAP001)

    this.outboundhd001 =this.outboundhd001 +parseFloat(val.data().HD001)
    this.outboundld001 =this.outboundld001 +parseFloat(val.data().LD001)
    this.outboundld003 =this.outboundld003 +parseFloat(val.data().LD003)
    this.outboundpet003 =this.outboundpet003 +parseFloat(val.data().PET003)
    this.outboundpet001 =this.outboundpet001 +parseFloat(val.data().PET001)
    this.outboundpet005 =this.outboundpet005 +parseFloat(val.data().PET005)
  
    //paper
    // console.log('outboundpaper',this.outboundpaper)
    this.outboundpaper = this.outboundpaper 
    +parseFloat(val.data().PAP005) 
    +parseFloat(val.data().PAP007) 
    +parseFloat(val.data().PAP003) 
    +parseFloat(val.data().PAP001);
    
    //aluminium
    // console.log('outboundAluminium', this.outboundAlum)
    this.outboundAlum = this.outboundAlum  +parseFloat(val.data().NFAL01) 
    
    //plastic
    // console.log('outplastic',this.outboundplastic)
    this.outboundplastic =this.outboundplastic + +parseFloat(val.data().HD001) 
    +parseFloat(val.data().HD001)
    +parseFloat(val.data().LD001)
    +parseFloat(val.data().LD003)
    +parseFloat(val.data().PET003)
    +parseFloat(val.data().PET001) 
  })
  this.createBarChart1();
})

//reclaimer
this.reclaimerglass =0;
this.reclaimerpaper =0;
this.reclaimerAlum =0;
this.reclaimerplastic =0;
this.Reclaimerweight =0;
firebase.firestore().collection('reclaimers').get().then(res=>{
  res.forEach(val=>{
    // console.log(val.data().GH001Mass+val.data().HD001Mass)
    this.Reclaimerweight =this.Reclaimerweight 
    +parseFloat(val.data().GH001Mass)
    +parseFloat(val.data().HD001Mass)
    +parseFloat(val.data().LD001Mass)
    +parseFloat(val.data().LD003Mass)
    +parseFloat(val.data().NFAL01Mass)
    +parseFloat(val.data().PAP001Mass)
    +parseFloat(val.data().PAP003Mass)
    +parseFloat(val.data().PAP005Mass)
    +parseFloat(val.data().PAP007Mass)
    +parseFloat(val.data().PEP005Mass)
    +parseFloat(val.data().PET001Mass)
    +parseFloat(val.data().PET003Mass);

    // console.log(new Date(val.data().date.seconds*1000))
    this.updateReclaimer =(new Date(val.data().date.seconds*1000)).toDateString();
    this.reclaimerglass =0;
    this.reclaimerpaper =0;
    this.reclaimerAlum =0;
    this.reclaimerplastic =0;

    //glass
    console.log('glassreclaimer',this.reclaimerglass)
    this.reclaimergh001mass  = this.reclaimergh001mass  +parseFloat(val.data().GH001Mass)
    this.reclaimernfa01Mass  = this.reclaimernfa01Mass  +parseFloat(val.data().NFAL01Mass)

    this.reclaimerpap005mass  = this.reclaimerpap005mass  +parseFloat(val.data().PAP005Mass)
    this.reclaimerpap007Mass  = this.reclaimerpap007Mass  +parseFloat(val.data().PAP007Mass)
    this.reclaimerpap001mass  = this.reclaimerpap001mass  +parseFloat(val.data().PAP001Mass)
    this.reclaimerpap003mass  = this.reclaimerpap003mass  +parseFloat(val.data().PAP003Mass)
    
    this.reclaimerhd001mass  = this.reclaimerhd001mass  +parseFloat(val.data().HD001Mass)
    this.reclaimerld001mass  = this.reclaimerld001mass  +parseFloat(val.data().LD001Mass)
    this.reclaimerld003mass  = this.reclaimerld003mass  +parseFloat(val.data().LD003Mass)
    this.reclaimerpet001mass  = this.reclaimerpet001mass  +parseFloat(val.data().PEt001Mass)
    this.reclaimerpet003mass  = this.reclaimerpet003mass  +parseFloat(val.data().PET003Mass)
    this.reclaimerpet005mass  = this.reclaimerpet005mass  +parseFloat(val.data().PEP005Mass)

    //paper
    // console.log('paperreclaimer',this.reclaimerpaper)
    this.reclaimerpaper =   this.reclaimerpaper
    +parseFloat(val.data().PAP005Mass) 
    + parseFloat(val.data().PAP007Mass) 
    +parseFloat(val.data().PAP003Mass) 
    +parseFloat(val.data().PAP001Mass);
    
    //aluminium
    // console.log('aluminiumreclaimer',this.reclaimerAlum )
    this.reclaimerAlum  = this.reclaimerAlum   +parseFloat(val.data().NFAL01) 
    
    //plastic
    // console.log('plasticreclaimer',    this.reclaimerplastic )
    this.reclaimerplastic =this.reclaimerplastic + +parseFloat(val.data().HD001) 
    +parseFloat(val.data().HD001Mass)
    +parseFloat(val.data().LD001Mass)
    +parseFloat(val.data().LD003Mass)
    +parseFloat(val.data().PET003Mass)
    +parseFloat(val.data().PET001Mass) 
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
    if (this.GH001price === null ) {
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
        this.presentAlertcheckInputs();
      } else {
        this.presentAlertUpdatePaper();
        
      }
  }

  CheckInputsEmptyStringPlastics() {
    if (
         this.HD001price  === undefined &&
         this.LD001price === undefined &&
        this.LD003price  === undefined &&
        this.PET005price === undefined &&
        this.PET001price === undefined
        
      ) {
        this.presentAlertcheckInputs();
      } else {
        this.presentAlertUpdatePlastic();
      }
  }

  CheckInputsEmptyStringGlasss() {
    if (
      this.GH001price === undefined
      ) {
        this.presentAlertcheckInputs();
      } else {
        this.presentAlertUpdateGlass();
      }
  }

  CheckInputsEmptyStringAlum() {
    if (
      this.NFAL01price === undefined
      ) {
        this.presentAlertcheckInputs();
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

async presentAlertUpdateGlass() {
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
            this.checkGlassInputs();
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
  checkGlassInputs(){
     // GH001price;
     if (this.GH001price === null) {
      this.GH001price = this.pricess.gl001;
    } else if (this.GH001price === undefined) {
      this.GH001price = this.pricess.gl001;
    }
    // console.log(this.GH001price);


    this.UpdateGlass()
  }

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

  UpdateGlass() {
    // To update price :
    this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
      gl001: this.GH001price,
     
    }).then((data) => {
      // console.log("Paper successfully updated!");
    });
    this.checkGlassInputs();
  }

  
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
    this.NFAL01price ='';
  
  }

  clearInputsGlass() {
    this.GH001price ='';
  
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

  // pullWeeklyInbound() {
  //   // code added by nathi
  //   let currentTime = new Date();
  //   let month = currentTime.getMonth();
  //   let year = currentTime.getFullYear();
  //   let date = currentTime.getTime();
  //   let TodaysDate;

  //   console.log(month, year, date);
  //   console.log(currentTime);

  //   let dates = new Date()
  //   let day1 = dates.setTime(dates.getTime() - (1 * 24 * 60 * 60 * 1000))
  //   let day2 = dates.setTime(dates.getTime() - (2 * 24 * 60 * 60 * 1000))
  //   let day3 = dates.setTime(dates.getTime() - (3 * 24 * 60 * 60 * 1000))
  //   let day4 = dates.setTime(dates.getTime() - (4 * 24 * 60 * 60 * 1000))
  //   let day5 = dates.setTime(dates.getTime() - (5 * 24 * 60 * 60 * 1000))
  //   let day6 = dates.setTime(dates.getTime() - (6 * 24 * 60 * 60 * 1000))
  //   let day7 = dates.setTime(dates.getTime() - (7 * 24 * 60 * 60 * 1000))
  //   console.log(day7);
  //   this.db.collection('outbound').onSnapshot(element => {
  //     // console.log(element);
  //     element.forEach(snap => {
  //       // console.log(snap);
  //       console.log(snap.data());

  //       let timess = {};
  //       let GH001 = {};
  //       let NFAL01 = {};
  //       let HD001 = {};
  //       let PAP005 = {};
  //       let PAP007 = {};
  //       let PAP001 = {};
  //       let PAP003 = {};
  //       let LD003 = {};
  //       let LD001 = {};
  //       let PET005 = {};
  //       let PET003 = {};
  //       let PET00 = {};

  //       // GH001
  //       // NFAL01
  //       // HD001
  //       // PAP005
  //       // PAP007
  //       // PAP001
  //       // PAP003
  //       // LD003
  //       // LD001
  //       // PET005
  //       // PET003
  //       // PET00

  //       timess = snap.data().date;
  //       GH001 = snap.data().GH001;
  //       NFAL01 = snap.data().NFAL01;
  //       HD001 = snap.data().HD001;
  //       PAP005 = snap.data().PAP005;
  //       PAP007 = snap.data().PAP007;
  //       PAP001 = snap.data().PAP001;
  //       PAP003 = snap.data().PAP003;
  //       LD003 = snap.data().LD003;
  //       LD001 = snap.data().LD001;
  //       PET005 = snap.data().PET005;
  //       PET003 = snap.data().PET003;
  //       PET00 = snap.data().PET00;

  //       this.outBoundGraph.push({
  //         time: timess,
  //         GH001: GH001,
  //         NFAL01: NFAL01,
  //         HD001: HD001,
  //         PAP005: PAP005,
  //         PAP007: PAP007,
  //         PAP001: PAP001,
  //         PAP003: PAP003,
  //         LD003: LD003,
  //         LD001: LD001,
  //         PET005: PET005,
  //         PET003: PET003,
  //         PET001: PET00,
  //       })

  //       this.outGH001.push({GH001: GH001})
  //     });
  //     console.log(this.outGH001);
  //   });

  //   console.log(this.outBoundGraph);

  //   for (let key in this.outGH001) {
  //     let x,
  //     for (x = 0, x < this.outGH001[key], x++) {

  //     }
  //   }

  //   for (let key in this.outBoundGraph) {
  //     console.log(key)
  //     console.log(this.outBoundGraph[key])
  //   }

  //   // inboundgh001
  //   // inboundpap005
  //   // inboundnfalo1
  //   // inboundhd001
  //   // inboundpet001
  //   // inboundpet0001
  //   // inboundpap007
  //   // inboundpap003
  //   // inboundpap001
  //   // inboundld001
  //   // inboundld003
  //   // inboundpet003

  //   // TodaysDate = date.setTime(date.getTime() - (7 * 24 * 60 * 60 * 1000))

  //   // console.log(currentTime);
  //   // console.log(currentTime);
  //   // firebase.firestore()
  //   //               .collection('outbound')
  //   //               .where('date', '<=', currentTime)
  //   //                   .where("startTime", ">", "1506816000").where("startTime", "<", "1507593600")
  //   //               .orderBy('week').startAt(1514184967000).endAt(1514271367000)
  //   //               .limit(25).onSnapshot(snapshot => {
  //   //                 console.log(snapshot);
  //   //                 snapshot.forEach(key => {
  //   //                   console.log(key.data());
  //   //                   // this.outBoundGraph.push(key.data())
  //   //                 })
  //   //               });
  //   // code added by nathi
  //   // this.db.collection('inbounds').where('createdAt', '>', this.beginningDateObject).get().then(querySnapshot => {
  //   //   querySnapshot.forEach(key => {
  //   //     console.log(key);
  //   //   })
  //   // })
  // }

//EDIT PAPER
  HideandShowSave() {
    this.edit = !this.edit;
    // console.log(this.edit,this.editDiv[0]);
    
    if (this.create) {
      // console.log('block');
      this.render.setStyle(this.editDiv[0],'display','block')
    } else {
      // console.log('none');
      setTimeout(() => {
        this.render.setStyle(this.editDiv[0],'display','none')
      }, 500);
    }
  }

  burgerMan() {
    this.burger = !this.burger;
  }
//edit plastic div
  HideandShowCreate () {
    this.create = !this.create;
        
    if (this.create) {
      // console.log('block');
      this.render.setStyle(this.createDiv[0],'display','block')
    } else {
      // console.log('none');
      setTimeout(() => {
        this.render.setStyle(this.createDiv[0],'display','none')
      }, 500);
    }
  }

  //edit glass div
  glassShow () {
    this.glass = !this.glass;
        
    if (this.glass) {
      // console.log('block');
      this.render.setStyle(this.glassDiv[0],'display','block')
    } else {
      // console.log('none');
      setTimeout(() => {
        this.render.setStyle(this.glassDiv[0],'display','none')
      }, 500);
    }
  }

  //edit aluminium
  HideandShowDelete() {
    this.delete = !this.delete;
    if (this.delete) {
      // console.log('block');
      this.render.setStyle(this.deleteDiv[0],'display','block')
    } else {
      // console.log('none');
      setTimeout(() => {
        this.render.setStyle(this.deleteDiv[0],'display','none')
      }, 500);
    }
  }

 //HISTORY FOR PAPER
 HideandShowHISTORYPAPER() {
  this.paper = !this.paper;
  if (this.paper) {
    // console.log('block');
    this.render.setStyle(this.paperDiv[0],'display','block')
  } else {
    // console.log('none');
    setTimeout(() => {
      this.render.setStyle(this.paperDiv[0],'display','none')
    }, 500);
  }
}

 //HISTORY FOR PLASTIC
 HideandShowHISTORYPPLASTIC() {
  this.plastic = !this.plastic;
  if (this.plastic) {
    // console.log('block');
    this.render.setStyle(this.plasticDiv[0],'display','block')
  } else {
    // console.log('none');
    setTimeout(() => {
      this.render.setStyle(this.plasticDiv[0],'display','none')
    }, 500);
  }
}

//HISTORY FOR ALUMINUM
HideandShowHISTORYALUMINIUM() {

  this.alu = !this.alu;
  if (this.alu) {
    // console.log('block');
    this.render.setStyle(this.aluDiv[0],'display','block')
  } else {
    // console.log('none');
    setTimeout(() => {
      this.render.setStyle(this.aluDiv[0],'display','none')
    }, 500);
  }
}

//HISTORY FOR GLASS
HideandShowHISTORYGLASS() {
  this.glassh = !this.glassh;
  if (this.glassh) {
    // console.log('block');
    this.render.setStyle(this.glasshDiv[0],'display','block')
  } else {
    // console.log('none');
    setTimeout(() => {
      this.render.setStyle(this.glasshDiv[0],'display','none')
    }, 500);
  }
}

  createBarChart() {
    Chart.defaults.global.defaultFontSize = 4;
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
          defaultFontSize: 5
        }
      }
    });
  }
  
  /* bar chart */
  createBarChart1() {
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
          defaultFontSize: 5
        }
      }
    });
  }

    /* bar chart */
   
    createBarChart2() {
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
            defaultFontSize: 5
          }
        }
      });
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
    optsSlider = document.getElementsByClassName("burgercontent") as HTMLCollectionOf <HTMLElement>
    showMoreBtn(){
      if(this.moreState == 0){
        this.moreState = 1
        this.optsSlider[0].style.width = "105px"
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
    optsSlider2 = document.getElementsByClassName("burgercontent2") as HTMLCollectionOf <HTMLElement>
    showMoreBtn2(){
      if(this.moreState2 == 0){
        this.moreState2 = 1
        this.optsSlider2[0].style.width = "105px"
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
      optsSlider3 = document.getElementsByClassName("burgercontent3") as HTMLCollectionOf <HTMLElement>
      showMoreBtn3(){
        if(this.moreState3 == 0){
          this.moreState3 = 1
          this.optsSlider3[0].style.width = "105px"
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
       optsSlider4 = document.getElementsByClassName("burgercontent4") as HTMLCollectionOf <HTMLElement>
       showMoreBtn4(){
         if(this.moreState4 == 0){
           this.moreState4 = 1
           this.optsSlider4[0].style.width = "105px"
          //  console.log("this is open")
         }
         else {
           this.moreState4 = 0
           this.optsSlider4[0].style.width = "30px"
          //  console.log("this is closed")
         }
       }
       getinbound(){
        this.db.collection('inbounds').onSnapshot(snapshot => {
       
          this.newInbound=[]
         
          snapshot.forEach(Element => {
           
                this.inboundss.push(Element.data());
          });
          this.inboundss.forEach(item => {
          
            if(item.Userid === firebase.auth().currentUser.uid){
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

      
}
