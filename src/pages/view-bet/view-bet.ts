import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchesProvider } from '../../providers/launches/launches';
/**
 * Generated class for the ViewBetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-bet',
  templateUrl: 'view-bet.html',
})
export class ViewBetPage {

  bet: any;
  user: any;
  earnedPoints: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public launches: LaunchesProvider) {
    this.bet = this.navParams.get("bet");
    this.user = this.navParams.get("user");
    console.log("Bet is: ");
    console.log(this.bet);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewBetPage');

    this.launches.placeBetValue(this.bet.title, this.user).then(data => {
      // this.nextLaunches = data;
      // this.list = Object.keys(data);
      // this.nextLaunches = this.list;
      // this.launches = data;
      // // this.nextLaunches = this.nextLaunches.launches;
      // console.log(data);
      // console.log(this.list);
      // this.list.forEach(element => {
      //   console.log(this.launches[element].launchid);
      // });
      console.log("Result of bet:");
      console.log(data);
      this.earnedPoints = data;
      this.earnedPoints = this.earnedPoints.points;

    });
  }



}
