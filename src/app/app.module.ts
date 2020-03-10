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
import { ResetPasswordPageModule } from './reset-password/reset-password.module';
import { ProfilePageModule} from './profile/profile.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
 
// import { ResetPasswordPage } from './reset-password/reset-password.page';
// import { AutoCompleteModule } from 'ionic4-auto-complete';
// // Your web app's Firebase configuration       OLD Database 
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
// // Your web app's Firebase configuration         New Database 5 Feb 2020
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
// Your web app's Firebase configuration         New Database 5 Feb 2020
var firebaseConfig = {
  apiKey: "AIzaSyDM4VPXQFIZnLwAvu6Tbmn4utTNeAP2ZNg",
  authDomain: "mthombowolwazicms2.firebaseapp.com",
  databaseURL: "https://mthombowolwazicms2.firebaseio.com",
  projectId: "mthombowolwazicms2",
  storageBucket: "mthombowolwazicms2.appspot.com",
  messagingSenderId: "860270237434",
  appId: "1:860270237434:web:419f1774e1269efb38db43",
  measurementId: "G-32KKEKZX5S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
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
    ResetPasswordPageModule,
    
  
    // AutoCompleteModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FileOpener,
    File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}