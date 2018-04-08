import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {
  currentUser: any;

  constructor(public storage: Storage){
  }
 
  public login(user) {
    return Observable.create(observer => {
      observer.next(user);
      observer.complete();
    });
  }
 
  public register(user) {
    return Observable.create(observer => {
      this.storage.set('user', JSON.stringify(user));
      observer.next(true);
      observer.complete();
    });
  }

  public checkLoggedIn(){
    var loggedIn = false;
    return new Promise(resolve => {
      this.storage.get('user').then(result => {
        if (result) {
            let storedUserString = result;
            // this.currentUser = new User(JSON.parse(storedUserString));
            this.currentUser = JSON.parse(storedUserString);
            console.log(this.currentUser);
            loggedIn = true;
            resolve(true);
        } else {
            loggedIn = false;
            resolve(false);
        }
      });
    });
  }
  public getUserInfo(){
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.storage.remove('user');
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}