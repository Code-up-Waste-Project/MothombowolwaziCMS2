import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, Platform, ToastController  } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../../app/user/auth.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.page.html',
  styleUrls: ['./manageusers.page.scss'],
})
export class ManageusersPage implements OnInit {

  public signupForm: FormGroup;
  viewuser;
  storage = firebase.storage().ref();
  admin = [];
  Newadmin = [];
  userprofile;
  // storage;
  newuserprofile = [];
  db = firebase.firestore();
  profiles;
  newuserprofilezzzzz = [];
  isLabelActive;

  public loading: any;

  profile = {
    image: 'https://firebasestorage.googleapis.com/v0/b/https://gs://mthombowolwazi-a7902.appspot.com/mthombologo (1).png',
      name: null,
      addres: null,
      surname: null,
      position: null,
      // isAdmin: null,
      // userid: firebase.auth().currentUser.uid,
      email: null,
      password: null,
    };

  constructor(
    public platform: Platform,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public router: Router,
    private toastController: ToastController
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      name: ['', [Validators.required, ]],
      // surname: ['', [Validators.required, ]],
      position: ['', [Validators.required, ]],
    });

    this.db.collection('admin').onSnapshot(snapshot => {
      this.Newadmin = [];
      snapshot.forEach(Element => {
        this.admin.push(Element.data());
      });
      this.admin.forEach(item => {
        if (item.userid === firebase.auth().currentUser.uid) {
          this.Newadmin.push(item);     }
      });
      console.log('Newadmins', this.Newadmin);
    });
   }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.db.collection('profiles').onSnapshot(snapshot => {
      // this.profile.name = snapshot.docs.name
      // this.profile.email = snapshot.data().email;
      // email: firebase.auth().currentUser.email,
      // this.profile.name = snapshot.data().name;
      // this.profile.surname = snapshot.data().surname;
      // this.profile.position = snapshot.data().position;
      // // this.profile.image = snapshot.data().image;
      // console.log('users', this.userprofile);

      this.newuserprofile = [];
      snapshot.forEach(item => {
        this.newuserprofile.push({...{id: item.id},...item.data()});
        console.log("user profile ", this.newuserprofile);
      });
    });
  }

  segmentChanged(ev: any, id) {
    if (ev.detail.value === 'true') {
      this.presentAlertChangeStatusAccountTrue(id);
      console.log("true selected");
    }
    if (ev.detail.value === 'false') {
      this.presentAlertChangeStatusAccountFalse(id);
      console.log("false selected");
    }
    console.log('Segment changed', ev);
    console.log(id);
  }

  changeSegmentTrue(id) {
    this.db.collection('profiles').doc(id).update({ActiveAcount: 'true'});
      this.getUsers();
  }

  changeSegmentFalse(id) {
    this.db.collection('profiles').doc(id).update({ActiveAcount: 'false'});
      this.getUsers();
  }

  async presentAlertChangeStatusAccountTrue(id) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to Activate Account?.</strong>!!!',
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
            this.changeSegmentTrue(id);
            this.router.navigateByUrl('/manageusers');
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertChangeStatusAccountFalse(id) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to de-Activate Account?.</strong>!!!',
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
            this.changeSegmentFalse(id);
            this.router.navigateByUrl('/manageusers');
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  viewprofile(id) {
    this.newuserprofilezzzzz = [];
    this.viewuser = this.db.collection('profiles').doc(id);
    this.viewuser.get().then((documentSnapshot) => {
        this.newuserprofilezzzzz = [];
        // console.log(documentSnapshot.data());
        this.newuserprofilezzzzz.push(documentSnapshot.data());
        console.log(this.newuserprofilezzzzz);
      });
  }

      delete(userUid) {
        console.log(userUid);
        // let email = x.email;
        // this.Booking = [];
        this.db.collection("userprofile").doc(userUid.id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
      //   this.newuserprofile = [];
      //   this.db.collection("userprofile2").get().then(res => {
      //   res.forEach(res => {
      //     this.newuserprofile.push({...{userUid: res.id}, ...res.data()});
      //   });
      // });
      }


    Logout() {
      firebase.auth().signOut().then((res) => {
        console.log(res);
        this.router.navigateByUrl('/login');
       });
      }

}
