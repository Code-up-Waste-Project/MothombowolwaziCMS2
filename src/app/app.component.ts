import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public appPages = [];
  admin;
  ActiveAcount: boolean;
  active = 0
 


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private content: ElementRef,
    private render: Renderer2,
    public router: Router,
  ) {
      this.getAuth();
      this.initializeApp();
  }

  ngOnInit() {
    this.appPages = [];
    
    firebase.auth().onAuthStateChanged(user => {
      firebase.firestore().collection('admin').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
        // this.profile.email = snapshot.data().email;

        // console.log('users', snapshot.data().isAdmin);
        this.admin = snapshot.data().isAdmin;
        this.appPages = [];
        if (this.admin == "true") {
    this.appPages.push({
     
      title: 'Home',
      url: '/home',
      icon: 'homeW',
      admin:"hot",
      
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
          }else {
            this.router.navigateByUrl('/login');
          }
          });
        }

      //   afAuth.authState.subscribe( user => {
      //     if (user) {
      //       this.rootPage = 'HomePage';
      //     } else {
      //       this.rootPage = 'SignupPage';
      //     }
      //   });
    
      //   platform.ready().then(() => {...});
      // }

}
