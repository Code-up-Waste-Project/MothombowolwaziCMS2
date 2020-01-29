import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import * as firebase from 'firebase';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RegistersPipe } from './registers.pipe';
// import { AutoCompleteModule } from 'ionic4-auto-complete';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBwoBzADNtm1Nn6EyGY3UtmCk7GDsyhBFI",
  authDomain: "mothombowolwazicms.firebaseapp.com",
  databaseURL: "https://mothombowolwazicms.firebaseio.com",
  projectId: "mothombowolwazicms",
  storageBucket: "mothombowolwazicms.appspot.com",
  messagingSenderId: "341336075428",
  appId: "1:341336075428:web:5ca270a91c3b7560840a31",
  measurementId: "G-17SX6EWXGR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// // Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyBwoBzADNtm1Nn6EyGY3UtmCk7GDsyhBFI",
//   authDomain: "mothombowolwazicms.firebaseapp.com",
//   databaseURL: "https://mothombowolwazicms.firebaseio.com",
//   projectId: "mothombowolwazicms",
//   storageBucket: "mothombowolwazicms.appspot.com",
//   messagingSenderId: "341336075428",
//   appId: "1:341336075428:web:5ca270a91c3b7560840a31",
//   measurementId: "G-17SX6EWXGR"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

@NgModule({
  declarations: [AppComponent, RegistersPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    // AutoCompleteModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FileOpener,
    File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
