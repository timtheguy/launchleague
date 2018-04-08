import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginForm : FormGroup;

  constructor( private formBuilder: FormBuilder, public navCtrl: NavController, public auth: AuthProvider ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['',  Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(){
    console.log(this.loginForm.value);
    var user = this.loginForm.value;

    this.auth.register(user).subscribe(success => {
      if (success) {
        console.log("Success:", "Account created.");
        this.auth.login(user).then(
          this.navCtrl.setRoot("TabsPage")
        );

      } else {
        console.log("Error:", "Problem creating account.");
      }
    },
      error => {
        console.log("Error", error);
      });

  }


}
