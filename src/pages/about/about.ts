import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
     
  user: any;
  bets: any;
  list: string[] = [];
  betsToDisplay: any = false;

  constructor(public navCtrl: NavController, public data: DataProvider, public auth: AuthProvider, public loadingCtrl: LoadingController) {
      this.user = this.auth.getUserInfo();
      this.getUserData(this.user.username);
  }

  ionViewDidLoad(){
    console.log("Loaded Bets");
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
      this.bets = data;
      if(this.bets.bets){
        this.betsToDisplay = true; 
        this.bets = this.bets.bets;
        
        // this.bets = this.processBetValues(this.bets);
        this.list = Object.keys(this.bets);
        this.list.forEach(element => {
          console.log("Element: " + this.bets[element]);
          this.bets[element] = this.processBetValues(this.bets[element]);
        });
        console.log("Bets: ");
        console.log(this.bets);
        console.log("Bets List: ");
        console.log(this.list);
        
        loading.dismiss();
      }else{
        loading.dismiss();
      }
    });
  }

  processBetValues(bets){
    console.log(bets);
    //launchgo
    var launchgo;
 
    if(bets.launchgo == 0){ //scrub
      launchgo = "Scrubbed";
    }else if(bets.launchgo == 1){ //delay
      launchgo = "Delayed";
    }else if(bets.launchgo == 2){ //launch
      launchgo = "Failed";
    }

    bets.launchgo = launchgo;

    //landboost
    var landboost;

    if(bets.landboost == 0){ //failed
      landboost = "Failed";
    }else if(bets.landboost == 1){ //success
      landboost = "Landed";
    }

    bets.landboost = landboost;

    //deploypay: did the 
    var deploypay;

    if(bets.deploypay == 0){ //fail
      deploypay = "Failed";  
    }else if(bets.deploypay == 1){ //deploy
      deploypay = "Deployed";
    }

    bets.deploypay = deploypay;

    return bets;
  }

  viewBet(bet){
    this.navCtrl.push('ViewBetPage', {bet: bet, user:this.user.username})
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.user = this.auth.getUserInfo();
    this.getUserData(this.user.username);
   
    refresher.complete();
   
  }

}
