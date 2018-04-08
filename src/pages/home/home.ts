import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { LaunchesProvider } from '../../providers/launches/launches';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nextLaunches: any;

  fakeUsers: Array<any> = new Array(5);


  constructor(public navCtrl: NavController, public data: DataProvider, public launches: LaunchesProvider) {
    // this.nextLaunches = this.nextLaunches.launches;
  }

  ionViewDidLoad(){
    this.launches.getPublicLaunches().then(data => {
      this.nextLaunches = data;
      // this.nextLaunches = this.nextLaunches.launches;
      console.log(data);
      return data;
    });
  }

}