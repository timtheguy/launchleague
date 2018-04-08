import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthProvider } from '../providers/auth/auth'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, public auth: AuthProvider, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkPreviousAuthorization();

    });
  }

  checkPreviousAuthorization(): void {
    this.auth.checkLoggedIn().then(success => {
      if (success) {
        this.rootPage = 'TabsPage';
      } else {
        this.rootPage = 'LoginPage';
      }
    },
    error => {
      console.log("No one is logged in...");
    });
  }
}
