import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';
// import { ModalpopupPage } from '../modalpopup/modalpopup.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('barChart', {static: false}) barChart;
  @ViewChild('barChart1', {static: false}) barChart1;
  @ViewChild('barChart2', {static: false}) barChart2;
  
  inboundweight=0;
 outboundweight=0;
 Reclaimerweight=0;
  
  bars: any;
  colorArray: any;
  
  burgercontent: any = document.getElementsByClassName('burgercontent');

  
  burger: boolean = false;
  


/* Div */
  editDiv: any = document.getElementsByClassName('editDiv');
  edit: boolean = false;
  deleteDiv: any = document.getElementsByClassName('deleteDiv');
  delete: boolean = false;
  createDiv: any = document.getElementsByClassName('createDiv');
  create: boolean = false;

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
  NFAL01: string;
  Totalpaper: number = 0;
  Totalplastic: number = 0;
  Totalplasticz: string;
  ActiveAcount: Boolean;

  constructor(
    private modalcontroller: ModalController,
    private menuCtrl: MenuController,
    public route: Router,
    private render: Renderer2

    ) {

     

     /*  */
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

    // calling get functions
    this.getReclaimers();
    this.getOutbound();
    this.getInbound();

    }

     //chart
    ionViewDidEnter() {
      this.createBarChart();
     this.createBarChart1();
     this.createBarChart2();


//pulling data
//inbound
this.inboundweight =0;
firebase.firestore().collection('inbounds').get().then(res=>{
  res.forEach(val=>{
    console.log('inboundcalculate',val.data().inboundGH001+val.data().inboundHD001+val.data().inboundLD003+val.data().inboundNFAL01+val.data().inboundPAP001+val.data().inboundPAP003+val.data().inboundPAP005 +val.data().inboundPAP007+val.data().inboundPET001+val.data().inboundPET003+val.data().inboundPET005)
    this.inboundweight =this.inboundweight 
    +parseFloat(val.data().inboundGH001)+
    +parseFloat(val.data().inboundHD001) +
    +parseFloat(val.data().inboundLD001) +
    +parseFloat(val.data().inboundLD003) +
    +parseFloat(val.data().inboundNFAL01) +
    +parseFloat(val.data().inboundPAP001) +
    +parseFloat(val.data().inboundPAP003) +
    +parseFloat(val.data().inboundPAP005) +
    +parseFloat(val.data().inboundPAP007) +
    +parseFloat(val.data().inboundPET001) +
    +parseFloat(val.data().inboundPET003) +
    +parseFloat(val.data().inboundPET005) ;
  })
})

//outbound
this.outboundweight =0;
firebase.firestore().collection('outbound').get().then(res=>{
  res.forEach(val=>{
    console.log(val.data().GH001+val.data().GH001)
    this.outboundweight =this.outboundweight 
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
    +parseFloat(val.data().PET005);
  })
})

//reclaimer
this.Reclaimerweight =0;
firebase.firestore().collection('reclaimers').get().then(res=>{
  res.forEach(val=>{
    console.log(val.data().GH001Mass+val.data().HD001Mass)
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
  })
})

    }


  ngOnInit() {
    this.menuCtrl.enable(true); // or true
  

this. inbounddata();
console.log('iboundssssssssssssssssssss',this.inbounddata())
    this.getMasses();
    console.log(this.getMasses());
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
        console.log('newreclaimer', this.newreclaimer);
      });
    });
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
        console.log('inbound', this.outbound);
      });
    });
  }

  HideandShowSave() {
    this.edit = !this.edit;
    console.log(this.edit,this.editDiv[0]);
    
    if (this.edit) {
      console.log('block');
      this.render.setStyle(this.editDiv[0],'display','block')
    } else {
      console.log('none');
      setTimeout(() => {
        this.render.setStyle(this.editDiv[0],'display','none')
      }, 500);
    }
  }

  burgerMan() {
    this.burger = !this.burger;
  }

  HideandShowCreate () {
    this.create = !this.create;
        
    if (this.create) {
      console.log('block');
      this.render.setStyle(this.createDiv[0],'display','block')
    } else {
      console.log('none');
      setTimeout(() => {
        this.render.setStyle(this.createDiv[0],'display','none')
      }, 500);
    }
  }
  HideandShowDelete() {
    this.delete = !this.delete;
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
        console.log(element);
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

  inbounddata() {
    let totalPaperz = 0;
    let GH001z;
    let NFAL01z;

  





    
    this.db.collection('inbound').onSnapshot(snapshot => {
      snapshot.forEach(element => {
        this.inboundGH001 = element.data().inboundGH001;
        this.inboundHD001 = element.data().inboundHD001;
        this.inboundLD001 = element.data().inboundLD001;
        this.inboundLD003 = element.data().inboundLD003;
        this.inboundNFAL01 = element.data().inboundNFAL01;
        this. inboundPAP001 = element.data().inboundPAP001;
        this.inboundPAP003 = element.data().inboundPAP003;
        this. inboundPAP003 = element.data().inboundPAP003;
        this.inboundPAP007 = element.data().inboundPAP007;
        this. inboundPET001 = element.data().inboundPET001;
        this.inboundPET003 = element.data().inboundPET003;
        this.inboundPET005 = element.data().inboundPET005;
        console.log(element);
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



  /* bar chart */
  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Aluminium', 'Glass', 'Paper(PAP005)', 'Plastic(PET001)',],
        // labels: ['Aluminium', 'Glass', 'Paper(PAP005)', 'Paper(PAP007)', 'Paper(PAP003)', 'Paper(PAP003)'],
        datasets: [{
          label: 'Overall material ',
          data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP003storagemass,
          this.HD001storagemass, this.LD001storagemass, this.LD003storagemass, this.PET001storagemass, this.PET003storagemass, this.PET005storagemass],
          // data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP007storagemass, this.PAP003storagemass],
          backgroundColor: 'green', // array should have same number of elements as number of dataset
          borderColor: 'red',  // array should have same number of elements as number of dataset
          borderWidth: 0.1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  
  /* bar chart */
  createBarChart1() {
    this.bars = new Chart(this.barChart1.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Aluminium', 'Glass', 'Paper(PAP005)', 'Plastic(PET001)',],
        // labels: ['Aluminium', 'Glass', 'Paper(PAP005)', 'Paper(PAP007)', 'Paper(PAP003)', 'Paper(PAP003)'],
        datasets: [{
          label: 'Overall material ',
          data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP003storagemass,
          this.HD001storagemass, this.LD001storagemass, this.LD003storagemass, this.PET001storagemass, this.PET003storagemass, this.PET005storagemass],
          // data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP007storagemass, this.PAP003storagemass],
          backgroundColor: 'green', // array should have same number of elements as number of dataset
          borderColor: 'red',  // array should have same number of elements as number of dataset
          borderWidth: 0.1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

    /* bar chart */
    createBarChart2() {
      this.bars = new Chart(this.barChart2.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Aluminium', 'Glass', 'Paper(PAP005)', 'Plastic(PET001)',],
          // labels: ['Aluminium', 'Glass', 'Paper(PAP005)', 'Paper(PAP007)', 'Paper(PAP003)', 'Paper(PAP003)'],
          datasets: [{
            label: 'Overall material ',
            data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP003storagemass,
            this.HD001storagemass, this.LD001storagemass, this.LD003storagemass, this.PET001storagemass, this.PET003storagemass, this.PET005storagemass],
            // data: [this.NFAL01storagemass, this.GH001storagemass, this.PAP005storagemass, this.PAP007storagemass, this.PAP007storagemass, this.PAP003storagemass],
            backgroundColor: 'green', // array should have same number of elements as number of dataset
            borderColor: 'red',  // array should have same number of elements as number of dataset
            borderWidth: 0.1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
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

    getreclamer() {
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

    // query for week and months
    // ref.where("timestamp", ">=", "2017-11").where("timestamp", "<", "2017-12")

    // onether way
    // Query query = mFirestore.collection("rootcollection").whereEqualTo("month", 3);
    //
    // Query query = mFirestore.collection("rootcollection")
    // .orderBy("timestamp", Query.Direction.DESCENDING)
    // .whereEqualTo("month", 3);

    moreState = 0;
    optsSlider = document.getElementsByClassName("burgercontent") as HTMLCollectionOf <HTMLElement>
    showMoreBtn(){
      if(this.moreState == 0){
        this.moreState = 1
        this.optsSlider[0].style.width = "165px"
        console.log("this is open")
      }
      else {
        this.moreState = 0
        this.optsSlider[0].style.width = "40px"
        console.log("this is closed")
      }
    }

    //testing
    //burgercontent 2
    moreState2 = 0;
    optsSlider2 = document.getElementsByClassName("burgercontent2") as HTMLCollectionOf <HTMLElement>
    showMoreBtn2(){
      if(this.moreState2 == 0){
        this.moreState2 = 1
        this.optsSlider2[0].style.width = "165px"
        console.log("this is open")
      }
      else {
        this.moreState2 = 0
        this.optsSlider2[0].style.width = "40px"
        console.log("this is closed")
      }
    }

      //burgercontent 3
      moreState3 = 0;
      optsSlider3 = document.getElementsByClassName("burgercontent3") as HTMLCollectionOf <HTMLElement>
      showMoreBtn3(){
        if(this.moreState3 == 0){
          this.moreState3 = 1
          this.optsSlider3[0].style.width = "165px"
          console.log("this is open")
        }
        else {
          this.moreState3 = 0
          this.optsSlider3[0].style.width = "40px"
          console.log("this is closed")
        }
      }

       //burgercontent 3
       moreState4 = 0;
       optsSlider4 = document.getElementsByClassName("burgercontent4") as HTMLCollectionOf <HTMLElement>
       showMoreBtn4(){
         if(this.moreState4 == 0){
           this.moreState4 = 1
           this.optsSlider4[0].style.width = "165px"
           console.log("this is open")
         }
         else {
           this.moreState4 = 0
           this.optsSlider4[0].style.width = "40px"
           console.log("this is closed")
         }
       }
}
