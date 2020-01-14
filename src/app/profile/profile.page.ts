import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  storage = firebase.storage().ref();
  userprofile=[];
  newuserprofile=[]
    db =firebase.firestore();
    profiles
    profile={
  image:null,
  name:null,
  addres:null,
  surname:null, 
  position:null,
  isAdmin: false,
ActiveAcount:false,
userid: firebase.auth().currentUser.uid,
email: firebase.auth().currentUser.email
    };


  
  constructor(
    private router: Router,
    private toastController: ToastController
    ) {
      this.db.collection('admin').doc(firebase.auth().currentUser.uid).onSnapshot(snapshot => {
        this.profile.email = snapshot.data().email;
        email: firebase.auth().currentUser.email,
        this.profile.name = snapshot.data().name;
        this.profile.surname = snapshot.data().surname;
        this.profile.image = snapshot.data().image;
        this.profile.position= snapshot.data().position;
        console.log('admin', this.userprofile);
      });
  }

  ngOnInit() {
  }

  async users() {
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
    } else {
    this.db.collection('admin').doc(firebase.auth().currentUser.uid).set({
      name: this.profile.name,
     surname: this.profile.surname,
      email: this.profile.email,
      position: this.profile.position,
       userid: this.profile.userid,
       image: this.profile.image,
      isAdmin: this.profile.isAdmin,
      ActiveAcount:this.profile.ActiveAcount,

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
  }


  