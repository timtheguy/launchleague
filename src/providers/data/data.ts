import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  dataURL:string = "https://hack-stetty.herokuapp.com/";

  serverData: any;
  currentBets: any;

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  /**
   * GET all users from server 
   * /get-data?tag=users
   */

  /**
  * GET inidividual user from server
  * /get-data?tag=users&name=Jovl
  * 
  * THIS IS RUN ON APP LAUNCH
  */
  public getUser(username){
    username = username.toLowerCase();

    return new Promise(resolve => {
      this.http.get(this.dataURL+"get-data?tag=users&name="+username).subscribe(data => {
        this.serverData = data;

        if(this.serverData.bets){
          this.currentBets = this.serverData.bets;
        }

        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  /**
   * POST add a user
   * /add-user
   */

  /**
   * POST create a bet
   * /createbet
   */
  addBet(username, betValue){
    return new Promise((resolve, reject) => {
      this.http.post(this.dataURL+"createbet", {"username":username, "launchname":betValue.title, "bet":betValue})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

   /**
    * /getallbets?username=Jovl
    */
   

}
