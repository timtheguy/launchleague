import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({  
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
   
  user: any;
  level: any = {"value":"","title":""};

  constructor(   
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public data: DataProvider,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController) {
  
      this.user = this.auth.getUserInfo();

      if(this.user != null){
        this.user.points = "69";
      }else{
        this.user = {
          "ponts":0,
          "username": "Loading..."
        }
      }

      this.getUserData(this.user.username);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getUserData(username){
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
  
    loading.present();
    this.data.getUser(username) 

    .then(data => {
      // this.history = data;
      // loading.dismiss();
      this.user = data;
      
      if(this.user.points < 500){
        this.level.value = "1";
        this.level.title = "Amateur";
      }else if(this.user.points >= 500 && this.user.points < 1000){
        this.level.value = "2";
        this.level.title = "Rookie";
      }else if(this.user.points >= 1000 && this.user.points < 1500){
        this.level.value = "3";
        this.level.title = "Pioneer";
      }else if(this.user.points >= 1500 && this.user.points < 2000){
        this.level.value = "4"; 
        this.level.title = "Astronaut";
      }else if(this.user.points >= 2000 && this.user.points < 2500){
        this.level.value = "5";
        this.level.title = "Elon Musk";
      }

      console.log(data);
      loading.dismiss();
    });
  }
  
  newBet(){
    console.log("Username to push: " + this.user.username);
    this.navCtrl.push("AddBetPage", {username: this.user.username});
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.user = this.auth.getUserInfo();
    this.getUserData(this.user.username);

    refresher.complete();
  }

}
