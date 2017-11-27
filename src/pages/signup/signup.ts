import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  userData = null;

  constructor(
    public facebook: Facebook,
    public translateService: TranslateService) {

  }

  loginWithFB(){
    this.facebook.login(['email', 'public_profile'])
      .then((response: FacebookLoginResponse) => {
        this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', [])
          .then(profile => {
            this.userData = {
              email:profile['email'],
              first_name:profile['first_name'],
              picture: profile['picture_large']['data']['url'],
              username: profile['username']};
          }
        );
      }
    );

  }
}
