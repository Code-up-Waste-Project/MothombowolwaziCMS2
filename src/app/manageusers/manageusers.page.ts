import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, Platform, ToastController  } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../../app/user/auth.service';
import { MenuController } from '@ionic/angular';

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
    this.db.collection('admin').onSnapshot(snapshot => {
      // this.profile.name = snapshot.docs.name
      // this.profile.email = snapshot.data().email;
      // email: firebase.auth().currentUser.email,
      // this.profile.name = snapshot.data().name;
      // this.profile.surname = snapshot.data().surname;
      // this.profile.position = snapshot.data().position;
      // // this.profile.image = snapshot.data().image;
      // console.log('users', this.userprofile);

      snapshot.forEach(item => {
        this.newuserprofile = [];
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
    this.db.collection('admin').doc(id).update({ActiveAcount: true});
      this.getUsers();
  }

  changeSegmentFalse(id) {
    this.db.collection('admin').doc(id).update({ActiveAcount: false});
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
    this.viewuser = this.db.collection('admin').doc(id);
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
        this.db.collection("admin").doc(userUid.id).delete().then(function() {
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
      async createUser() {
        const alert = await this.alertCtrl.create({
          header: 'New CMS User',
          message: 'This user will have access to your CMS',
          backdropDismiss: false,
          inputs: [{
            name: 'email',
            type: 'email',
            placeholder: 'Email'
          }, {
            name: 'password',
            type: 'password',
            placeholder: 'Password'
          }],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Create User',
              handler: (data) => {
                console.log('credentials', data);
              
                this.db.collection('CMS_users').add({data,profile: 'no'}).then(async res => {
                  let goodRes = await this.alertCtrl.create({
                    header: 'Created new User.',
                    message:'They must use the credentials for this account to login to the CMS',
                    buttons: [{
                      text: 'Done',
                      role: 'cancel'
                    }]
                  })
                  goodRes.present()
                });
              }
            }
          ]
        });
    ​
        await alert.present();
      }
      changeListener(admin): void {
        const i = admin.target.files[0];
        console.log(i);
        const upload = this.storage.child(i.name).put(i);
        upload.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('upload is: ', progress , '% done.');
        }, err => {
        }, () => {
          upload.snapshot.ref.getDownloadURL().then(dwnURL => {
            console.log('File avail at: ', dwnURL);
            this.profile.image = dwnURL;
          });
        });
      }   
}
