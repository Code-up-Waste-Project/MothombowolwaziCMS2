import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';
// import { ModalpopupPage } from '../modalpopup/modalpopup.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('barChart', {static: false}) barChart;
  @ViewChild('barChart1', {static: false}) barChart1;
  @ViewChild('barChart2', {static: false}) barChart2;
  
  inboundweight=0;
 outboundweight=0;
 Reclaimerweight=0;

 //graghdatainbound
 inboundglass =0;
 inboundpaper =0;
 inboundAlum=0;
 inboundplastic=0;

//outboundgraphs
outboundglass =0;
 outboundpaper =0;
 outboundAlum =0;
 outboundplastic =0;

 //outboundgraphs
reclaimerglass =0;
reclaimerpaper =0;
reclaimerAlum =0;
reclaimerplastic =0;

 
  
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

 pricess = {
   gl001: null ,
   hd001: null,
   pap005: null,
   pap007: null,
   pap001: null,
   pap003: null,
   ld003: null,
   ld001: null,
   nfalo1: null,
   pet005: null,
   pet003: null,
   pet001: null,
 };


 price = [];
  prices;





  bars: any;
  colorArray: any;

  inboundss=[];
  newInbound=[];

  burgercontent: any = document.getElementsByClassName('burgercontent');

  
  burger: boolean = false;
  


/* Div */
  editDiv: any = document.getElementsByClassName('editDiv');
  edit: boolean = false;
  deleteDiv: any = document.getElementsByClassName('deleteDiv');
  delete: boolean = false;
  createDiv: any = document.getElementsByClassName('createDiv');
  create: boolean = false;

  // Reclaimer
  reclaimerID;
  reclaimername;
  reclaimersurname;
  reclaimerDate;

  // inBound
  InID;
  indate;
  inDriverName;
  inRegistarionNumberPlates;
  inovarallMass;

   // OutBound
   id;
   outdate;
   outDriverName;
   outRegistarionNumberPlates;
   outovarallMass;

   newreclaimer = [];
   outbound = [];
   inbound = [];

  // @ViewChild('barChart', {static: false}) barChart;
  // bars: any;
  // colorArray: any;

  // user infor
  admin = [];
  Newadmin = [];

  db = firebase.firestore();
  profiles;
  profile = {
  image: null,
  name: null,
  addres: null,
  surname: null,
  position: null,
  isAdmin: true,
  // ActiveAcount : Boolean,
  // userid:firebase.auth().currentUser.uid,
  // email:firebase.auth().currentUser.email
    };
  isAdmin: any;
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

  GH001: string;
  nFAL01: string;

  Totalpaperinbound: number = 0;
  Totalpapersinbound: string;
Totalplasticinbound: number = 0;

  Totalpaper: number = 0;
  Totalplastic: number = 0;

  Totalplasticz: string;
  ActiveAcount: Boolean;
  glass: boolean = false;
  glassDiv: any = document.getElementsByClassName('glassDiv');

  constructor(
    private modalcontroller: ModalController,
    private menuCtrl: MenuController,
    public route: Router,
    private render: Renderer2,
    public alertController: AlertController,
    ) {

     

     /*  */
      // pulling for admin
    this.db.collection('admin').onSnapshot(snapshot => {
      this.Newadmin = [];
      snapshot.forEach(Element => {
        this.admin.push(Element.data());
      });
      this.admin.forEach(item => {
        if (item.userid === firebase.auth().currentUser.uid) {
          this.Newadmin.push(item);
        }
      });
      // console.log('Newadmins', this.Newadmin);
    });

 //calling get functions
//  this.getReclaimers();
//  this.getOutbound();
//  this.getInbound();


    }

     //chart
     updated

     updatedoutbound
     updateReclaimer

    ionViewDidEnter() {

      
   
      // this.Reclaimerdata();
      // this.outbounddata();
      // this.inbounddata();

     
   

//pulling data
//inbound
this.inboundglass =0;
this. inboundpaper =0;
this.inboundAlum =0;
this.inboundweight =0;
this.inboundplastic =0;
firebase.firestore().collection('inbounds').get().then(res=>{
  res.forEach(val => {
    console.log('inboundcalculate',val.data().inboundGH001+val.data().inboundHD001+val.data().inboundLD003+val.data().inboundNFAL01+val.data().inboundPAP001+val.data().inboundPAP003+val.data().inboundPAP005 +val.data().inboundPAP007+val.data().inboundPET001+val.data().inboundPET003+val.data().inboundPET005)
    this.inboundweight =this.inboundweight 
    +parseFloat(val.data().inboundGH001)+
    +parseFloat(val.data().inboundHD001) +
    +parseFloat(val.data().inboundLD001) +
    +parseFloat(val.data().inboundLD003) +
    +parseFloat(val.data().inboundNFAL01) +
    +parseFloat(val.data().inboundPAP001) +
    +parseFloat(val.data().inboundPAP003) +
    +parseFloat(val.data().inboundPAP005) +
    +parseFloat(val.data().inboundPAP007) +
    +parseFloat(val.data().inboundPET001) +
    +parseFloat(val.data().inboundPET003) +
    +parseFloat(val.data().inboundPET005) ;
    
    console.log(new Date(val.data().time.seconds*1000))
    this.updated =(new Date(val.data().time.seconds*1000)).toDateString();

    //glass
  this.inboundglass =this.inboundglass +parseFloat(val.data().inboundGH001)
//paper
this.inboundpaper = this.inboundpaper 
+parseFloat(val.data().inboundPAP005) 
+ parseFloat(val.data().inboundPAP007) 
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
    console.log(val.data().GH001+val.data().GH001)
    this.outboundweight =this.outboundweight 
    +parseFloat(val.data().GH001)
    +parseFloat(val.data().HD001)
    +parseFloat(val.data().LD001)
    +parseFloat(val.data().HD001)
    +parseFloat(val.data().LD003)
    +parseFloat(val.data().NFAL01)
    +parseFloat(val.data().PAP001)
    +parseFloat(val.data().PAP003)
    +parseFloat(val.data().PAP007)
    +parseFloat(val.data().PAP005)
    +parseFloat(val.data().PET003)
    +parseFloat(val.data().PET005)

  console.log(new Date(val.data().date.seconds*1000))
  this.updatedoutbound =(new Date(val.data().date.seconds*1000)).toDateString()


    //glass
    console.log('ountglass',  this.outboundglass)
    this.outboundglass =this.outboundglass +parseFloat(val.data().GH001)
    console.log(val.data().GH001)
    console.log(this.outboundglass)

    //paper
    console.log('outboundpaper',this.outboundpaper)
    this.outboundpaper = this.outboundpaper 
    +parseFloat(val.data().PAP005) 
    +parseFloat(val.data().PAP007) 
    +parseFloat(val.data().PAP003) 
    +parseFloat(val.data().PAP001);

    // console.log(val.data().PAP005);
    // console.log(val.data().PAP007);
    // console.log(val.data().PAP003);
    // console.log(val.data().PAP001);

    console.log(this.outboundpaper );
    
    //aluminium
    console.log('outboundAluminium', this.outboundAlum)
    this.outboundAlum = this.outboundAlum  +parseFloat(val.data().NFAL01)
    console.log(val.data().NFAL01)
    console.log(this.outboundAlum) 
    
    //plastic
    console.log('outplastic', this.outboundplastic)
    this.outboundplastic = this.outboundplastic + 
    +parseFloat(val.data().HD001) +
//     +parseFloat(val.data().HD001) +
    +parseFloat(val.data().LD001) +
    +parseFloat(val.data().LD003) +
    +parseFloat(val.data().PET003) +
    +parseFloat(val.data().PET00) +
    +parseFloat(val.data().PET005)

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
  res.forEach(val => {
    console.log(val.data().GH001Mass+val.data().HD001Mass)
    this.Reclaimerweight =this.Reclaimerweight 
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

    console.log(new Date(val.data().date.seconds*1000))
    this.updateReclaimer =(new Date(val.data().date.seconds*1000)).toDateString();


//     this.reclaimerglass =0;
//     this.reclaimerpaper =0;
//     this.reclaimerAlum =0;
//     this.reclaimerplastic =0;

    //glass
    console.log('glassreclaimer',this.reclaimerglass)
    this.reclaimerglass  = this.reclaimerglass  +parseFloat(val.data().GH001)
    //paper
    console.log('paperreclaimer',this.reclaimerpaper)
    this.reclaimerpaper =   this.reclaimerpaper
    +parseFloat(val.data().PAP005Mass) 
    + parseFloat(val.data().PAP007Mass) 
    +parseFloat(val.data().PAP003Mass) 
    +parseFloat(val.data().PAP001Mass);
    
    //aluminium
    console.log('aluminiumreclaimer',this.reclaimerAlum )
    this.reclaimerAlum  = this.reclaimerAlum   +parseFloat(val.data().NFAL01) 
    
    //plastic
    console.log('plasticreclaimer',    this.reclaimerplastic )
    this.reclaimerplastic =this.reclaimerplastic + +parseFloat(val.data().HD001) 
    +parseFloat(val.data().HD001Mass)
    +parseFloat(val.data().LD001Mass)
    +parseFloat(val.data().LD003Mass)
    +parseFloat(val.data().PET003Mass)
    +parseFloat(val.data().PET001Mass) 
  })
this.createBarChart2();
})
    }

  ngOnInit() {
    // this.getreclamer();

    this.prices = this.db.collection('price').doc("SinUfRNnbB073KZiDIZE");
    this.prices.get().then((documentSnapshot) => {
      this.price = [];
      console.log(documentSnapshot.data());
      this.price.push(documentSnapshot.data());
      console.log(this.price);
      this.pricess.gl001 = documentSnapshot.data().gl001;
      this.pricess.hd001 = documentSnapshot.data().hd001;
      this.pricess.ld001 = documentSnapshot.data().ld001;
      this.pricess.ld003 = documentSnapshot.data().ld003;
      this.pricess.nfalo1 = documentSnapshot.data().nfalo1;
      this.pricess.pap001 = documentSnapshot.data().pap001;
      this.pricess.pap003 = documentSnapshot.data().pap003;
      this.pricess.pap005 = documentSnapshot.data().pap005;
      this.pricess.pap007 = documentSnapshot.data().pap007;
      this.pricess.pet001 = documentSnapshot.data().pet001;
      this.pricess.pet003 = documentSnapshot.data().pet003;
      this.pricess.pet005 = documentSnapshot.data().pet005;
    });
    // console.log(this.pricess.gl001);
    // console.log(this.pricess.hd001);
    // console.log(this.pricess.ld001);
    // console.log(this.pricess.ld003);
    // console.log(this.pricess.nfalo1);
    // console.log(this.pricess.pap001);
    // console.log(this.pricess.pap003);
    // console.log(this.pricess.pap005);
    // console.log(this.pricess.pap007);
    // console.log(this.pricess.pet001);
    // console.log(this.pricess.pet003);
    // console.log(this.pricess.pet005);

    this.menuCtrl.enable(true); // or true
  
    // this. inbounddata();
    // console.log('iboundssssssssssssssssssss',this.inbounddata())
    // this.getMasses();
    // console.log(this.getMasses());
  }

  getReclaimers() {
    // pulling from reclaimers
    this.db.collection('reclaimers').onSnapshot(snapshot => {
      this.newreclaimer = [];
      snapshot.forEach(element => {
        let id = {};
        let reclaimername = {};
        let reclaimersurname = {};
        let reclaimerDate = {};

        id = this.id = element.id;
        reclaimername = this.reclaimername = element.data().name;
        reclaimersurname = this.reclaimersurname = element.data().surname;
        reclaimerDate = this.reclaimerDate = element.data().date;

        // this.newreclaimer = [];
        this.newreclaimer.push({
          id: id,
          reName: reclaimername,
          reSurname: reclaimersurname,
          reDate: reclaimerDate,
        });
        console.log('newreclaimer', this.newreclaimer);
      });
    });
  }
  update() {
    // To update price :
    this.db.collection("price").doc("SinUfRNnbB073KZiDIZE").update({
      gl001: this.GH001price,
      nfalo1: this.NFAL01price,
      pap005: this.PAP005price,
      pap007: this.PAP007price,
      pap001: this.PAP001price,
      pap003: this.PAP003price,
      hd001: this.HD001price,
      ld001: this.LD001price,
      ld003: this.LD003price,
      pet001: this.PET001price,
      pet003: this.PET003price,
      pet005: this.PET005price,
    })
    .then((data) => {
      console.log("Document successfully updated!");
    });
    }
  ionViewWillEnter() {
    this.prices = this.db.collection('price').doc("SinUfRNnbB073KZiDIZE");
    this.prices.get().then((documentSnapshot) => {
      this.price = [];
      console.log(documentSnapshot.data());
      this.price.push(documentSnapshot.data());
      console.log('prices', this.price);
    });
   }
   checkinputfields() {
    // GH001price;
    if (this.GH001price === null) {
      this.GH001price = this.pricess.gl001;
    } else if (this.GH001price === undefined) {
      this.GH001price = this.pricess.gl001;
    }
    console.log(this.GH001price);

    // NFAL01price;
    if (this.NFAL01price === null) {
      this.NFAL01price = this.pricess.nfalo1;
    } else if (this.NFAL01price === undefined) {
      this.NFAL01price = this.pricess.nfalo1;
    }
    console.log(this.NFAL01price);

    // PAP005price;
    if (this.PAP005price === null) {
      this.PAP005price = this.pricess.pap005;
    } else if (this.PAP005price === undefined) {
      this.PAP005price = this.pricess.pap005;
    }
    console.log(this.PAP005price);

    // PAP007price;
    if (this.PAP007price === null) {
      this.PAP007price = this.pricess.pap007;
    } else if (this.PAP007price === undefined) {
      this.PAP007price = this.pricess.pap007;
    }
    console.log(this.PAP007price);

    // PAP001price;
    if (this.PAP001price === null) {
      this.PAP001price = this.pricess.pap001;
    } else if (this.PAP001price === undefined) {
      this.PAP001price = this.pricess.pap001;
    }
    console.log(this.PAP001price);

    // PAP003price;
    if (this.PAP003price === null) {
      this.PAP003price = this.pricess.pap003;
    } else if (this.PAP003price === undefined) {
      this.PAP003price = this.pricess.pap003;
    }
    console.log(this.PAP003price);

    // HD001price;
    if (this.HD001price === null) {
      this.HD001price = this.pricess.hd001;
    } else if (this.HD001price === undefined) {
      this.HD001price = this.pricess.hd001;
    }
    console.log(this.HD001price);

    // LD001price;
    if (this.LD001price === null) {
      this.LD001price = this.pricess.ld001;
    } else if (this.LD001price === undefined) {
      this.LD001price = this.pricess.ld001;
    }
    console.log(this.LD001price);

    // LD003price;
    if (this.LD003price === null) {
      this.LD003price = this.pricess.ld003;
    } else if (this.LD003price === undefined) {
      this.LD003price = this.pricess.ld003;
    }
    console.log(this.LD003price);

    // PET001price;
    if (this.PET001price === null) {
      this.PET001price = this.pricess.pet001;
    } else if (this.PET001price === undefined) {
      this.PET001price = this.pricess.pet001;
    }
    console.log(this.PET001price);

    // PET003price;
    if (this.PET003price === null) {
      this.PET003price = this.pricess.pet003;
    } else if (this.PET003price === undefined) {
      this.PET003price = this.pricess.pet003;
    }
    console.log(this.PET003price);

    // PET005price;
    if (this.PET005price === null) {
      this.PET005price = this.pricess.pet005;
    } else if (this.PET005price === undefined) {
      this.PET005price = this.pricess.pet005;
    }
    console.log(this.PET005price);

    this.presentAlertupdate();

  }

  async presentAlertupdate() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to update Prices?.</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.update();
            this.clearInputs();
            this.route.navigateByUrl('/editprice');
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  clearInputs() {
    this.GH001price = '';
    this.NFAL01price = '';
    this.PAP005price = '';
    this.PAP007price = '';
    this.PAP001price = '';
    this.PAP003price = '';
    this.HD001price = '';
    this.LD001price = '';
    this.LD003price = '';
    this.PET001price = '';
    this.PET003price = '';
    this.PET005price = '';
    
  }

  async presentAlertupdatedelete() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to Cancel, Data will not be saved.</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.clearInputs();
            this.route.navigateByUrl('/editprice');
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
  getOutbound() {
    // pulling from outbound
    this.db.collection('outbound').onSnapshot(snapshot => {
      this.outbound = [];
      snapshot.forEach(element => {
        let id = {};
        let outdate = {};
        let outDriverName = {};
        let outRegistarionNumberPlates = {};
        let outovarallMass = {};

        id = this.id = element.id;
        outdate = this.outdate = element.data().date;
        outDriverName = this.outDriverName = element.data().DriverName;
        outRegistarionNumberPlates = this.outRegistarionNumberPlates = element.data().RegistarionNumberPlates;
        outovarallMass = this.outovarallMass = element.data().ovarallMass;

        // this.outbound = [];
        this.outbound.push({
          id: id,
          outDate: outdate,
          outdriverName: outDriverName,
          outRegistarionNo: outRegistarionNumberPlates,
          outovarallmass: outovarallMass,
        });
        // this.outbound.push(element.data());
        console.log('outbound', this.outbound);
      });
    });
  }

  getInbound() {
    // pulling from inbounds
    this.db.collection('inbounds').onSnapshot(snapshot => {
      this.outbound = [];
      snapshot.forEach(element => {
        // this.outbound = [];
        this.outbound.push({
          // data
        });
        // this.outbound.push(element.data());
        console.log('inbound', this.outbound);
      });
    });
  }

  HideandShowSave() {
    this.edit = !this.edit;
    console.log(this.edit,this.editDiv[0]);
    
    if (this.edit) {
      console.log('block');
      this.render.setStyle(this.editDiv[0],'display','block')
    } else {
      console.log('none');
      setTimeout(() => {
        this.render.setStyle(this.editDiv[0],'display','none')
      }, 500);
    }
  }

  burgerMan() {
    this.burger = !this.burger;
  }

  HideandShowCreate () {
    this.create = !this.create;
        
    if (this.create) {
      console.log('block');
      this.render.setStyle(this.createDiv[0],'display','block')
    } else {
      console.log('none');
      setTimeout(() => {
        this.render.setStyle(this.createDiv[0],'display','none')
      }, 500);
    }
  }
  glassShow () {
    this.glass = !this.glass;
        
    if (this.glass) {
      console.log('block');
      this.render.setStyle(this.glassDiv[0],'display','block')
    } else {
      console.log('none');
      setTimeout(() => {
        this.render.setStyle(this.glassDiv[0],'display','none')
      }, 500);
    }
  }
  HideandShowDelete() {
    this.delete = !this.delete;
    if (this.delete) {
      console.log('block');
      this.render.setStyle(this.deleteDiv[0],'display','block')
    } else {
      console.log('none');
      setTimeout(() => {
        this.render.setStyle(this.deleteDiv[0],'display','none')
      }, 500);
    }
  }


  /* bar chart */


  createBarChart() {

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Paper', 'Glass', 'Plastic', 'Aluminium',],
        // labels: ['Aluminium', 'Glass', 'Paper(PAP005)', 'Paper(PAP007)', 'Paper(PAP003)', 'Paper(PAP003)'],
        datasets: [{
          label: 'inbound',
          data: [ this.inboundpaper, this.inboundglass ,  this.inboundplastic, this.inboundAlum, 
        ],
          // data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP007storagemass, this.PAP003storagemass],
          backgroundColor: 'green', // array should have same number of elements as number of dataset
          borderColor: 'red',  // array should have same number of elements as number of dataset
          borderWidth: 0.1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  
  /* bar chart */
 
  // this.outboundglass =0;
  // this.outboundpaper =0;
  // this.outboundAlum =0;
  // this.outboundplastic =0;
  createBarChart1() {
    this.bars = new Chart(this.barChart1.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Paper', 'Plastic', 'Glass', 'Aliminum',],
        // labels: ['Aluminium', 'Glass', 'Paper(PAP005)', 'Paper(PAP007)', 'Paper(PAP003)', 'Paper(PAP003)'],
        datasets: [{
          label: 'outbound',
          data: [this.outboundpaper, this.outboundplastic , this.outboundglass,  this.outboundAlum],
      
          // data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP007storagemass, this.PAP003storagemass],
          backgroundColor: 'green', // array should have same number of elements as number of dataset
          borderColor: 'red',  // array should have same number of elements as number of dataset
          borderWidth: 0.1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

    /* bar chart */
   



    createBarChart2() {
      this.bars = new Chart(this.barChart2.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Paper', 'Plastic', 'Glass', 'Aliminium',],
          // labels: ['Aluminium', 'Glass', 'Paper(PAP005)', 'Paper(PAP007)', 'Paper(PAP003)', 'Paper(PAP003)'],
          datasets: [{
            label: 'Reclaimers',
            data: [ this.reclaimerglass, this.reclaimerpaper, this.reclaimerAlum,   this.reclaimerplastic,],
            // data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP007storagemass, this.PAP003storagemass],
            backgroundColor: 'green', // array should have same number of elements as number of dataset
            borderColor: 'red',  // array should have same number of elements as number of dataset
            borderWidth: 0.1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }


  Logout() {
    firebase.auth().signOut().then((res) => {
      console.log(res);
      this.route.navigateByUrl('/login');
     });
    }
    editprofile() {
      this.route.navigate(['profile']);
    }

    // getreclamer() {
    //   let totalPaperz = 0;
    //   let GH001z;
    //   let NFAL01z;

    //   this.db.collection('storage').onSnapshot(snapshot => {
    //     snapshot.forEach(element => {
    //       this.GH001storagemass = element.data().GL001;
    //       this.NFAL01storagemass = element.data().NFAL01;
    //       this.PAP005storagemass = element.data().PAP005;
    //       this.PAP007storagemass = element.data().PAP007;
    //       this.PAP001storagemass = element.data().PAP001;
    //       this.PAP003storagemass = element.data().PAP003;
    //       this.HD001storagemass = element.data().HD001;
    //       this.LD001storagemass = element.data().LD001;
    //       this.LD003storagemass = element.data().LD003;
    //       this.PET001storagemass = element.data().PET001;
    //       this.PET003storagemass = element.data().PET003;
    //       this.PET005storagemass = element.data().PEP005;
    //       // console.log(element);
    //     });
    //     // console.log(this.GH001storagemass);
    //     // console.log(this.NFAL01storagemass);
    //     // console.log(this.PAP005storagemass);
    //     // console.log(this.PAP007storagemass);
    //     // console.log(this.PAP001storagemass);
    //     // console.log(this.PAP003storagemass);
    //     // console.log(this.HD001storagemass);
    //     // console.log(this.LD001storagemass);
    //     // console.log(this.LD003storagemass);
    //     // console.log(this.PET001storagemass);
    //     // console.log(this.PET003storagemass);
    //     // console.log(this.PET005storagemass);

    //     totalPaperz = +this.PAP005storagemass + +this.PAP007storagemass + +this.PAP001storagemass + +this.PAP003storagemass;
    //     this.Totalpaper = Number(String(totalPaperz).substring(0, 6));

    //     this.Totalplastic = +this.HD001storagemass + +this.LD001storagemass + +this.LD003storagemass + +this.PET001storagemass +
    //     +this.PET003storagemass + +this.PET005storagemass;
    //     this.Totalplasticz = (String(this.Totalplastic).substring(0, 6));
    //     String(this.Totalplastic).substring(0, 6);

    //     GH001z = this.GH001storagemass;
    //     this.GH001 = (String(GH001z).substring(0, 6));
    //     NFAL01z = this.NFAL01storagemass;
    //     this.NFAL01 = (String(NFAL01z).substring(0, 6));
    //   });
    // }

    // query for week and months
    // ref.where("timestamp", ">=", "2017-11").where("timestamp", "<", "2017-12")

    // onether way
    // Query query = mFirestore.collection("rootcollection").whereEqualTo("month", 3);
    //
    // Query query = mFirestore.collection("rootcollection")
    // .orderBy("timestamp", Query.Direction.DESCENDING)
    // .whereEqualTo("month", 3);

    moreState = 0;
    optsSlider = document.getElementsByClassName("burgercontent") as HTMLCollectionOf <HTMLElement>
    showMoreBtn(){
      if(this.moreState == 0){
        this.moreState = 1
        this.optsSlider[0].style.width = "165px"
        console.log("this is open")
      }
      else {
        this.moreState = 0
        this.optsSlider[0].style.width = "40px"
        console.log("this is closed")
      }
    }

    //testing
    //burgercontent 2
    moreState2 = 0;
    optsSlider2 = document.getElementsByClassName("burgercontent2") as HTMLCollectionOf <HTMLElement>
    showMoreBtn2(){
      if(this.moreState2 == 0){
        this.moreState2 = 1
        this.optsSlider2[0].style.width = "165px"
        console.log("this is open")
      }
      else {
        this.moreState2 = 0
        this.optsSlider2[0].style.width = "40px"
        console.log("this is closed")
      }
    }

      //burgercontent 3
      moreState3 = 0;
      optsSlider3 = document.getElementsByClassName("burgercontent3") as HTMLCollectionOf <HTMLElement>
      showMoreBtn3(){
        if(this.moreState3 == 0){
          this.moreState3 = 1
          this.optsSlider3[0].style.width = "165px"
          console.log("this is open")
        }
        else {
          this.moreState3 = 0
          this.optsSlider3[0].style.width = "40px"
          console.log("this is closed")
        }
      }

       //burgercontent 3
       moreState4 = 0;
       optsSlider4 = document.getElementsByClassName("burgercontent4") as HTMLCollectionOf <HTMLElement>
       showMoreBtn4(){
         if(this.moreState4 == 0){
           this.moreState4 = 1
           this.optsSlider4[0].style.width = "165px"
           console.log("this is open")
         }
         else {
           this.moreState4 = 0
           this.optsSlider4[0].style.width = "40px"
           console.log("this is closed")
         }
       }
       getinbound(){
        this.db.collection('inbounds').onSnapshot(snapshot => {
       
          this.newInbound=[]
         
          snapshot.forEach(Element => {
           
                this.inboundss.push(Element.data());
          });
          this.inboundss.forEach(item => {
          
            if(item.Userid === firebase.auth().currentUser.uid){
                     this.newInbound.push(item);
                 
                     
                  }
          })
          
          console.log('Newinbounds', this.newInbound);
        
        }); 
      }
}