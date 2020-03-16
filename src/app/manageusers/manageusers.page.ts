import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, Platform, ToastController  } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../../app/user/auth.service';
import { MenuController } from '@ionic/angular';
import { AbstractExtendedWebDriver } from 'protractor/built/browser';
import { element } from 'protractor';
import { Location } from "@angular/common";
@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.page.html',
  styleUrls: ['./manageusers.page.scss'],
})
export class ManageusersPage implements OnInit {
  
  buttonDisabled: boolean;
registerForm = false;
yourBoolean = true; /*viewable by default*/
ishidden = false;
ActiveAcounts: boolean = false;
isAdmin: string = 'true';
 //admin
 name;
 position;
 image;
 ActiveAcount;
 number;
 id;
 addres;
  Userids;
  Username;
  Usersurname;
  Useremail;
  UseractiveAccount;
  Userposition;
  UserImage;
  public signupForm: FormGroup;
  viewuser;
  storage = firebase.storage().ref();
  admin = [];
  Newadmin = [];
  userprofile;
  // storage;
  newuserprofile;
  db = firebase.firestore();
  profiles;
  newuserprofilezzzzz = [];
  Snapprofile = [];
  isLabelActive;
  oneprofile:any ={};
  public loading: any;
  email;
  password;
  positions;
  address
  selectedUser ={}
  idnumber;
  constructor(
    public platform: Platform,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public router: Router,
    private toastController: ToastController,
    private location: Location
  ) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
           .firestore()
           .doc(`/userprofiles/${user.uid}`)
            .get()
            .then(userProfileSnapshot => {
              this.isAdmin = userProfileSnapshot.data().isAdmin;
            });
       }
       this.yourBoolean = false;
      //  this.buttonDisabled = false;
     })
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      name: ['', [Validators.required, ]],
      // positions: ['', [Validators.required, ]],
      // idnumber: ['', Validators.compose([Validators.minLength(13), Validators.required])],
     

    });
    this.db.collection('userprofiles').onSnapshot(snapshot => {
      this.Newadmin = [];
      snapshot.forEach(Element => {
        this.admin.push(Element.data());
      });
      this.admin.forEach(item => {
        
        if (item.userid === firebase.auth().currentUser.uid) {
          this.Newadmin = [];
          this.Newadmin.push(item);     }
      });
      // console.log('Newadmins', this.Newadmin);
    });
   }
firsttem(obj:any ={})
{
 console.log(obj)
 this.name =obj.name
 this.number=obj.number
 this.position=obj.position
 this.image=obj.image
 this.ActiveAcount=obj.ActiveAcount
}
  ngOnInit() {

    // this.presentAlertDelete

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
           .firestore()
           .doc(`/userprofiles/${user.uid}`)
            .get()
            .then(userProfileSnapshot => {
              this.isAdmin = userProfileSnapshot.data().isAdmin;
            });
       }
       this.buttonDisabled = false;
     });
   //auth gurd
  //  firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     this.router.navigateByUrl('/home');
  //   }else {
  //     this.router.navigateByUrl('/login');
  //   }
  //   });
    this.getUsers();
    this.db.collection('userprofiles').where("isAdmin" ,"==","true" ).onSnapshot(snapshot => {
      // this.profile.name = snapshot.docs.name
      // this.profile.email = snapshot.data().email;
      // email: firebase.auth().currentUser.email,
      // this.profile.name = snapshot.data().name;
      // this.profile.position = snapshot.data().position;
      // // this.profile.image = snapshot.data().image;
      // console.log('users', this.userprofile);
     
      this.newuserprofile = [];
      // console.log("removed tt removed ", removed);
      // removed = newuserprofile.splice(firebase.auth().currentUser.email, "remove current user");
      // elements = newuserprofile.splice( );
      // console.log('splice' ,elements)
      snapshot.forEach(item => {
      
        this.newuserprofile.push({...{id:item.id},...item.data()});
       this.firsttem(item.data())
         console.log("user profile ", this.oneprofile = item.data());
      
      });
    });
    this.firsttem()
  }
    showRegisterForm(){
      this.registerForm = !this.registerForm;
    }
      
      seeprofile(profile){
        this.selectedUser = profile
        console.log(this.selectedUser)
      }
      
  getUsers() {
    this.db.collection('userprofiles').onSnapshot(snapshot => {
      // this.profile.name = snapshot.docs.name
      // this.profile.email = snapshot.data().email;
      // email: firebase.auth().currentUser.email,
      // this.profile.name = snapshot.data().name;
      // this.profile.position = snapshot.data().position;
      // // this.profile.image = snapshot.data().image;
      // console.log('users', this.userprofile);
      // this.newuserprofile = [];
      snapshot.forEach(item => {
        this.newuserprofile = [];
        this.newuserprofile.push({...{id: item.id},...item.data()});
        // console.log("user profile ", this.newuserprofile);
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
  // changeSegmentTrue(id) {
  //   this.db.collection('admin').doc(id).update({ActiveAcount: true});
  //     this.getUsers();
  // }
  // changeSegmentFalse(id) {
  //   this.db.collection('admin').doc(id).update({ActiveAcount: false});
  //     this.getUsers();
  // }
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
            // this.changeSegmentTrue(id);
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
            // this.changeSegmentFalse(id);
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
    this.viewuser = this.db.collection('userprofiles').doc(id);
    this.viewuser.get().then((documentSnapshot) => {
        this.newuserprofilezzzzz = [];
        // console.log(documentSnapshot.data());
        this.newuserprofilezzzzz.push(documentSnapshot.data());
        console.log(this.newuserprofilezzzzz);
      });
  }
      delete(userid) {
        console.log(userid);
       
        this.db.collection("userprofiles").doc(userid.id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    
      }
      deleteuser(id) {

        this.db.collection('userprofiles').doc(id).delete().then(function(){
          console.log("Document successfully deleted")
        }).catch(function(error){
          console.error("Error removing document: ", error); 
        });
        console.log('user  deleted');
      }
      async presentAlertDelete(id) {
        
        const alert = await this.alertCtrl.create({
          header: 'Confirm!',
          message: '<strong>Are you sure you want to Delete this record, Data will not be saved.</strong>!!!',
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
                this.deleteuser(id);
                this.router.navigateByUrl('/manageusers');
              }
            }
          ]
        });
        await alert.present();
      }

    Logout() {
      firebase.auth().signOut().then((res) => {
        console.log(res);
        this.router.navigateByUrl('/login');
       });
      }
      async  saveNewUseer() {
        const alert = await this.alertCtrl.create({
          header: 'New CMS User',
          message: 'This user will have access to your CMS',
          backdropDismiss: false,
        })
        this.db.collection('userprofiles').where('email', '==',this.email).get().then(async (data) => {
         
           if(data.size == 0) {
            this.db.collection('admin').add({
              email: this.email,
              password: this.password,
              profile:'no',
              // positions:this.positions,
              idnumber:this.idnumber,
              // addres:this.addres
            }).then(async res =>{
              this.email=null
              // this.positions=null
              this.password=null
              this.idnumber=null
              // this.addres=null
              let alert = await this.alertCtrl.create({
              message:'You Have just created a new user ',
                
              buttons: [
                {
                  text: 'OK'
                }
              ]
              });
          alert.present();
          console.log('user addded to cloud ')
            })
            console.log('user saved to cloud');
           }else {
            let alert = await this.alertCtrl.create({
              message: 'the email is already  been used',
              
              buttons: [
                {
                  text: 'OK'
                }
              ]
            });
            alert.present();
            
            console.log('This email has already been used already');
           }
           if (this.email == "" || this.email == undefined) {
            const toast = await this.toastController.create({
              message: 'Enter the email.',
              duration: 2000
            });
            toast.present();
          } else if (this.password == "" || this.password == undefined) {
            const toast = await this.toastController.create({
              message: 'Enter the password',
              duration: 2000
            });
            toast.present();
          }
        //  else if (this.positions == "" || this.positions == undefined) {
        //   const toast = await this.toastController.create({
        //     message: 'Enter the position',
        //     duration: 2000
        //   });
        //   // toast.present();
        // }
  
  //  else if (this.idnumber == "" || this.idnumber == undefined) {
  //           const toast = await this.toastController.create({
  //             message: 'Enter the idnumber',
  //             duration: 2000
  //           });
  //           toast.present();
  //         }
  
          // else if (this.addres == "" || this.addres == undefined) {
          //   const toast = await this.toastController.create({
          //     message: 'Enter the address',
          //     duration: 2000
          //   });
          //   toast.present();
          // }
        })
       
//userprofiles
// this.db.collection('userprofiles').where('email', '==',this.email).get().then(async (data) => {
//   if(data.size == 0) {
//    this.db.collection('adminprofiles').add({
//      email: this.email,
//      password: this.password,
//      profile:'no',
//      positions:this.positions,
//      idnumber:this.idnumber,
//      addres:this.addres
//    }).then(async res =>{
//      this.email=null
//      this.positions=null
//      this.password=null
//      this.idnumber=null
//      this.addres=null
    //  let alert = await this.alertCtrl.create({
    //  message:'You Have just created a new user ',
    //  buttons: [
    //    {
    //      text: 'OK'
    //    }
    //  ]
    //  });
//  alert.present();
//  console.log('user addded to cloud ')
//    })
//    console.log('user saved to cloud');
//   }else {
//    let alert = await this.alertCtrl.create({
//      message: 'the email is already  been used',
     
//      buttons: [
//        {
//          text: 'OK'
//        }
//      ]
//    });
//   //  alert.present();
//    console.log('This email has already been used already');
//   }
// })
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
            // this.profile.image = dwnURL;
          });
        });
      }
      // editprofile() {
      //   this.router.navigate(['profile2']);
      // }
      adminprofile(){
        this.db.collection('userprofiles').onSnapshot(snapshot => {
          // this.profile.name = snapshot.docs.name
          // this.profile.email = snapshot.data().email;
          // email: firebase.auth().currentUser.email,
          // this.profile.name = snapshot.data().name;
          // this.profile.position = snapshot.data().position;
          // // this.profile.image = snapshot.data().image;
          // console.log('users', this.userprofile);
          
          this.newuserprofile = [];
          snapshot.forEach(item => {
            this.newuserprofile.push({...{id:item.id},...item.data()});
            console.log("admin profile ", this.newuserprofile);
          });
        });
      }
      AddUserToForm(id) {
        this.db.collection('userprofiles').doc(id).onSnapshot(element => {
          // element.forEach(element => { ActiveAcount
            let id = {};
            let name = {};
            let number = {};
            let addres = {};
            let image = {};
            let ActiveAcount = {};
            let idnumber = {}
            id = this.id = element.id;
            name = this.name = element.data().name;
            number = this.number = element.data().number;
            this.position = this.position = element.data().position;
            this.image =this.image= element.data().image;
            this.addres =this.addres= element.data().addres;
            ActiveAcount = this.ActiveAcount = element.data().ActiveAcount;
            idnumber = this.idnumber =element.data().idnumber;
            // })
            console.log(this.id);
            console.log(this.name);
            console.log(this.number);
            console.log(this.position);
            console.log(this.image);
            console.log(this.ActiveAcount);
            console.log(this.idnumber);
            // adding data to textboxes
            this.id = this.id;
            this.name = this.name;
            this.number = this.number;
            this.position = this.position;
            this.image = this.image;
            this.ActiveAcount = this.ActiveAcount;
            this.idnumber =this.idnumber
            this.addres =this.addres
          // })
      })
    }
    AddUser(id) {
      this.db.collection('userprofiles').doc(id).onSnapshot(element => {
      let id = {};
      let name = {};
      let email = {};
      let activeAccount = {};
      let position = {};
      let image = {};
      let idnumber = {}
      let addres={}
      id = this.Userids = element.data().userid;
      name = this.name = element.data().name;
      this.number = this.number = element.data().number;
      this.position = this.position = element.data().position;
      this.image =this.image= element.data().image;
      idnumber = this.idnumber =element.data().idnumber;
      addres=this.addres =element.data().addres;
        this.Snapprofile.push({
          id: this.Userids,
          name: this.name,
          number: this.number,
          position: this.position,
          image: this.image,
          activeAccount: this.ActiveAcount,
          idnumber:this.idnumber,
          addres:this.addres
        })
        console.log(this.Snapprofile);
      });
    }
back(){
  console.log('tbladddd' )
  this.router.navigateByUrl('/home');
}
 
//   in_your_method() {
   
// }
}