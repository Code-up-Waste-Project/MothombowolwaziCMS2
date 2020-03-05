import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from '../app/user/auth.service';

import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { element } from 'protractor';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

 
const MINUTES_UNITL_AUTO_LOGOUT = 5 // in mins
const CHECK_INTERVAL = 3000 // in ms
const STORE_KEY =  'lastAction';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public appPages = [];
  admin;
 pos;
  adminss = [];
  
  ActiveAcount: boolean;
  active = 0

  db = firebase.firestore();
   
  myadmis=[]
  Newadmin = [];

  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
 public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private content: ElementRef,
    private render: Renderer2,
    public router: Router,
    
  ) {


console.log("good morning")









      this.getAuth();
      this.initializeApp();
     
    // this.db.collection('admin').onSnapshot(snapshot => {
    //   // this.Newadmin = [];
    //   snapshot.forEach(Element => {
    //     this.adminss.push(Element.data());
    //   });
    //   this.adminss.forEach(item => {
       
    //     if (item.userid === firebase.auth().currentUser.uid) {
    //       // this.Newadmin = [];
    //       this.Newadmin.push(item); 
        
    //         }
    //   });
    //   // console.log('Newadmins', this.Newadmin);
    // });

       // pulling for admin
    

    // code for idle
    this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY,Date.now().toString());
  }

  ngOnInit() {
    // this.db.collection('admin').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
    //   this.Newadmin = [];
    //   // snapshot.forEach(Element => {
    //     this.adminss.push(element);
    //   // });
    // });
    // console.log(this.adminss);

    this.appPages = [];
    
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user.email)
      // firebase.firestore().collection('userprofiles').where('email','==',user.email).get().then(res=>{
      // res.forEach(val=>{
      //   // this.pos =val.data().positions
      //   console.log("Look here ",val.data().positions)
      // })
      // })
      firebase.firestore().collection('admin').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
        // this.profile.email = snapshot.data().email;

        // console.log('users', snapshot.data().isAdmin);
        this.admin = snapshot.data().isAdmin;
        this.appPages = [];
        if (this.admin == "true") {
    this.appPages.push({
     
      title: 'Home',
      url: '/home2',
      icon: 'homeW',
      admin:"hot",
      
    },
    {
      title: 'Profile',
      url: 'profile2',
      icon: 'person',
      admin: 'cool'
    },
    {
      title: 'Inbounds',
      url: '/inbound',
      icon: 'inboundW',
      admin:"cool"
    },
    {
      title: 'Reclaimer',
      url: '/reclaimer',
      icon: 'reclaimerW',
      admin:"cool"
    });
    } else {
      this.appPages.push(
      {
        title: 'Home',
        url: '/home',
        icon: 'homeW',
        admin:"cool"
      },
      
    {
      title: 'Profile',
      url: 'profile2',
      icon: 'person',
      admin: 'cool'
    },
     {
        title: 'Inbound',
        url: '/inbound',
        icon: 'inboundW',
        admin:"cool"
      }, {
        title: 'Outbound',
        url: '/outbound',
        icon: 'outboundW',
        admin:"cool"
      }, {
        title: 'Reclaimer',
        url: '/reclaimer',
        icon: 'reclaimerW',
        admin:"cool"
      }, {
        title: 'Manage Users',
        url: '/manageusers',
        icon: 'manageUserz',
        admin:"cool"
      },
      {
        title: 'Logout',
        icon: 'logout',
        admin: "cool"
      }
      );
    }
            // console.log(this.appPages);
          });
        });
      }
    
      initializeApp() {
        this.platform.ready().then(() => {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        });
      }

      activate(i) {
        this.active = i
      }

    getAuth() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            
            this.router.navigateByUrl('/home');


            
 
            this.db.collection('admin').get().then(snapshot => {
              this.Newadmin =[]
                snapshot.forEach(Element => {
          
                  this.myadmis.push(Element.data());
                  // this.Newadmin =[]
                  // console.log(Element.data());
                });
                this.myadmis.forEach(item => {
                  if (item.userid === firebase.auth().currentUser.uid) {
               
                    console.log('Newadmins', this.Newadmin);
                    this.Newadmin.push(item);
                    this.Newadmin.splice(1,1);
                   
                  }
                });
              });














          }else {
            this.router.navigateByUrl('/login');
          }
          });
        }

        initListener() {
          document.body.addEventListener('click', () => this.reset());
          document.body.addEventListener('mouseover',()=> this.reset());
          document.body.addEventListener('mouseout',() => this.reset());
          document.body.addEventListener('keydown',() => this.reset());
          document.body.addEventListener('keyup',() => this.reset());
          document.body.addEventListener('keypress',() => this.reset());
        }
      
        reset() {
          this.setLastAction(Date.now());
        }
      
        initInterval() {
          setInterval(() => {
            this.check();
          }, CHECK_INTERVAL);
        }
      
        check() {
          const now = Date.now();
          const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
          const diff = timeleft - now;
          const isTimeout = diff < 0;
      
          if (isTimeout)  {
            localStorage.clear();
            this.router.navigate(['./login']);
          }
        }
        Logout() {
          firebase.auth().signOut().then((res) => {
            console.log(res);
            this.router.navigateByUrl('/login');
           });
          
          }
}
