import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, MenuController} from '@ionic/angular';
import * as firebase from 'firebase';
import { Location } from "@angular/common";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.page.html',
  styleUrls: ['./profile2.page.scss'],
})
export class Profile2Page implements OnInit {

  storage = firebase.storage().ref();
  userprofile = [];
  newuserprofile = [];
  db = firebase.firestore();
  profiles;

  ActiveAcount: boolean = false;
  isAdmin: string = 'true';
  profile = {
  image: '',
  name: null,
  addres: null,
  surname: null,
  position: null,
  number:null,
  // isAdmin: true,
  // ActiveAcount: false,
  userid: firebase.auth().currentUser.uid,
  email: firebase.auth().currentUser.email
    };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private menuCtrl: MenuController,
    public alertController: AlertController,
    private location: Location
  ) {
    this.menuCtrl.enable(false);
      this.db.collection('admin').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
        this.profile.email = snapshot.data().email;
        email: firebase.auth().currentUser.email,
        this.profile.name = snapshot.data().name;
        this.profile.surname = snapshot.data().surname;
        this.profile.image = snapshot.data().image;
        this.profile.position= snapshot.data().position;
        this.profile.number = snapshot.data().number;
        this.profile.addres = snapshot.data().address;
        console.log('admin', this.userprofile);
      });
   }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  async users() {
    console.log('profile',this.profile )
  
      if (this.profile.name == "" || this.profile.name == undefined) {
        const toast = await this.toastController.create({
          message: 'Enter the name.',
          duration: 2000
        });
        toast.present();
      } else if (this.profile.surname == "" || this.profile.surname == undefined) {
        const toast = await this.toastController.create({
          message: 'Enter the surname',
          duration: 2000
        });
        toast.present();
      } else if(this.profile.number == "" || this.profile.number == undefined || this.profile.number.length <10){
  const toast = await this.toastController.create({
    message:'Enter a cellphone number with 10 digits',
    duration: 2000
  });
  toast.present();
      }
       else {
      this.db.collection('admin').doc(firebase.auth().currentUser.uid).set({
        name: this.profile.name,
        surname: this.profile.surname,
        email: this.profile.email,
        number:this.profile.number,
        position: this.profile.position,
        image: this.profile.image,
        isAdmin: this.isAdmin,
        userid: this.profile.userid,
        address: this.profile.addres
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
      this.router.navigateByUrl('/home');
    }
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
  
    getPhoneInput(ev: any) {
      this.profile.number = ev.target.value;
  
      // calling firebase
      // this.contact[0] == '0'
      if (this.profile.number[0] !== '0') {
        this.presentAlertPhoneValidation();
      } else {
        // this.showInputs()
        console.log('im working');
        this.profile.number = this.profile.number;
      }
        // console.log(this.phoneVal);
        console.log(this.profile.number);
    }
  
    async presentAlertPhoneValidation() {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Phone Numbers must start with a number: 0.</strong>!!!',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.erasedToContact();
              console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
      await alert.present();
    }
  
    async presentAlertPhoneMaxLenght() {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Phone Numbers must have 10 numbers.</strong>!!!',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.erasedToContact();
              // console.log('im working');
            }
          }
        ]
      });
      await alert.present();
    }
  
    async presentAlertPhoneMinLenght() {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: '<strong>Phone Numbers has less than 10 numbers.</strong>!!!',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.erasedToContact();
              console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
      await alert.present();
    }
  
    erasedToContact() {
      this.profile.number = '';
    }
  
    
  
    // ionViewWillEnter() {
    //   this.menuCtrl.enable(false);
    //  }
  
    //  ionViewDidLeave() {
    //   // enable the root left menu when leaving the tutorial page
    //   this.menuCtrl.enable(true);
    // }

    myBackButton(){
      this.location.back();
      // this.menuCtrl.enable(true);
    }

    Logout() {
      firebase.auth().signOut().then((res) => {
        console.log(res);
        this.router.navigateByUrl('/login');
       });
      }
  

}
