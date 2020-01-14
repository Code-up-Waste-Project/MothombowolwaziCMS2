import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { LoadingController, AlertController, MenuController} from '@ionic/angular';
import { AuthService } from '../../app/user/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Directive, HostListener, Output, EventEmitter, ElementRef, Input } from '@angular/core';

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

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private FormsModule: FormsModule,
    private menuCtrl: MenuController,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false); // or true
  }

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
              this.db.collection('profiles').where('userid', '==', user.uid).get().then(res => {
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
   
  }

  forgetpassword() {
    this.router.navigate(['reset-password']);
  }

  goToRegister() {
    this.router.navigate(['registers']);
  }

}
