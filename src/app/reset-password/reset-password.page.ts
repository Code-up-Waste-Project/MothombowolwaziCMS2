import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/user/auth.service';
import { AlertController, MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginPage} from '../login/login.page';
import { from } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss']
})
export class ResetPasswordPage implements OnInit {
  public resetPasswordForm: FormGroup;
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController
  ) {
  

    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }
  public onSubmit(): void {
    // ...
    // ...
  }
  

  ngOnInit() {
    this.menuCtrl.enable(false); // or true
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  //  ionViewDidLeave() {
  //   // enable the root left menu when leaving the tutorial page
  //   this.menuCtrl.enable(true);
  // }

  goToLogin(){
    this.router.navigate(['login'])
  }

  goToReg() {
    this.router.navigate(['register'])
  }
  resetPassword(resetPasswordForm: FormGroup): void {
    if (!resetPasswordForm.valid) {
      console.log(
        'Form is not valid yet, current value:',
        resetPasswordForm.value
      );
    } else {
      const email: string = resetPasswordForm.value.email;
      this.authService.resetPassword(email).then(
        async () => {
          const alert = await this.alertCtrl.create({
            message: 'Check your email for a password reset link',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.router.navigateByUrl('login');
                }
              }
            ]
          });
          await alert.present();
        },
        async error => {
          const errorAlert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          await errorAlert.present();
        }
      );
    }
  }
}
