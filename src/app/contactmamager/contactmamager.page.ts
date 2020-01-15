import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-contactmamager',
  templateUrl: './contactmamager.page.html',
  styleUrls: ['./contactmamager.page.scss'],
})
export class ContactmamagerPage implements OnInit {

  constructor(
    public menuCtrl: MenuController,
    public route: Router
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

   ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }
  Logout() {
    firebase.auth().signOut().then((res) => {
      console.log(res);
      this.route.navigateByUrl('/login');
     });
    }
}
