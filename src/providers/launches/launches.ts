import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LaunchesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LaunchesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LaunchesProvider Provider');
  }

  public getPublicLaunches(){
    return new Promise(resolve => {
      this.http.get("https://launchlibrary.net/1.4/launch/next/5").subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public getLaunches(){
    return new Promise(resolve => {
      this.http.get("https://hack-stetty.herokuapp.com/get-data?tag=simlaunches").subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public placeBetValue(launchname, username){
    return new Promise((resolve, reject) => {
      this.http.post("http://hack-stetty.herokuapp.com/getpoints", {"launchname":launchname, "username":username, "points":200})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



}
