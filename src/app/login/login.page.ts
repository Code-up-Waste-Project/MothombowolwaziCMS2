import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { LoadingController, AlertController, MenuController, ModalController} from '@ionic/angular';
import { AuthService } from '../../app/user/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Directive, HostListener, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { ResetPasswordPage } from '../reset-password/reset-password.page';
import {ProfilePage} from '../profile/profile.page'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
// @Directive({
//   selector: '[br-data-dependency]' // Attribute selector
// })
export class LoginPage implements OnInit {

  db = firebase.firestore();

  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;
  email: string;
  password: string;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private FormsModule: FormsModule,
    private menuCtrl: MenuController,
    public modalController: ModalController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  //modal for reset password page
  async presentModal() {
    const modal = await this.modalController.create({
      component: ResetPasswordPage,
      cssClass: 'resetModal'
    });
    return await modal.present();
  }
 //modal for profile page
 async presentProfileModal() {
  const modal = await this.modalController.create({
    component: ProfilePage,
    cssClass: 'profileModal'
  });
  return await modal.present();
}

  ngOnInit() {
    this.loginForm.reset()


    this.menuCtrl.enable(false); // or true
  }
  // ionViewWillEnter() {
  //   this.menuCtrl.enable(false);
  //  }

  //  ionViewDidLeave() {
  //   // enable the root left menu when leaving the tutorial page
  //   this.menuCtrl.enable(true);
  // }

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
      let loading = await this.loadingCtrl.create();
      await loading.present();
      setTimeout(() => {
        loading.dismiss();
      },
    4000);

      const email = loginForm.value.email;
      const password = loginForm.value.password;
      this.authService.loginUser(email, password).then(
        (user) => {
          firebase.auth().onAuthStateChanged(user => {
            if (user.uid) {
              this.db.collection('admin').where('userid', '==', user.uid).get().then(res => {
                if (res.empty) {
                  // this.loading.dismiss();
                  this.router.navigate(['profile']);
                } else {
                  // this.loading.dismiss()
                  this.router.navigate(['home']);
                }
              });
            }
          });
        },
        async (error) => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          await alert.present();
        }
      );
 
    }
    this.loginForm.reset()
  }

  // forgetpassword() {
  //   this.router.navigate(['reset-password']);
  // }

  goToRegister() {
    this.router.navigate(['registers']);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

   ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }
 
}
