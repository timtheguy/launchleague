import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { LaunchesProvider } from '../../providers/launches/launches';

/**
 * Generated class for the AddBetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-bet',
  templateUrl: 'add-bet.html',   
})
export class AddBetPage {
  private betForm : FormGroup;
  username: any;
  nextLaunches: any = ["Loading..."];
  launches: any;

  list: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public launches1: LaunchesProvider, private formBuilder: FormBuilder, public data: DataProvider, public alertCtrl: AlertController) {
    this.username = this.navParams.get("username");
    console.log(this.username);


    this.launches1.getLaunches().then(data => {
      // this.nextLaunches = data;
      this.list = Object.keys(data);
      this.nextLaunches = this.list;
      this.launches = data;
      // this.nextLaunches = this.nextLaunches.launches;
      console.log(data);
      console.log(this.list);
      this.list.forEach(element => {
        console.log(this.launches[element].launchid);
      });

    });

    

    this.betForm = this.formBuilder.group({
      title: ['', Validators.required],
      deploypay: [''],
      launchgo: [''],
      landboost: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBetPage');

    
  }

  submitForm(){
    // console.log(this.betForm.value);
    this.data.addBet(this.username, this.betForm.value).then((result) => {
      console.log(result);
      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'Successfully placed your bet!',
        buttons: ['Dismiss']
      });
      alert.present();
      this.navCtrl.pop();
    }, (err) => {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Something went wrong: ' + err,
        buttons: ['Dismiss']
      });
      alert.present();
      this.navCtrl.pop();
    });
  }

}
