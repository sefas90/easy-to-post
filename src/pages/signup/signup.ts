import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import * as firebase from 'firebase';

import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  private signupErrorString: string;
  userData = null;

  constructor(public navCtrl: NavController,
              public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });
  }

  loginWithFB(){
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then((result) => {
        alert(JSON.stringify(result));
      }).catch(function (error) {
        alert(JSON.stringify(error))
        });
    });

    this.navCtrl.push(MainPage, this.userData);
  }
}
