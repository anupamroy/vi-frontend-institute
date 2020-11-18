import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: "ap-south-1_QgWv9nxiZ",
  ClientId: "66i2agrikkf0n2tf22cb0vb0k4"
};

//const userPool = new CognitoUserPool(poolData);
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


@Injectable({
  providedIn: 'root'
})
export class LoginSellerService {
  cognitoUser: any;

  constructor() { }
  signIn(phone_number, password) {

    const authenticationData = {
      Username: phone_number,
      Password: password,
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    const userData = {
      Username: phone_number,
      Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return Observable.create(observer => {
      console.log(cognitoUser)
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {          
          console.log("token....", result.getIdToken().getJwtToken());
          sessionStorage.setItem("token", result.getIdToken().getJwtToken())
          
          let user_name : string = result.idToken.payload.name;
          let user_id : string = result.idToken.payload.sub;
          let org_id : string = result.idToken.payload.locale;

          sessionStorage.setItem('username',user_name);
          sessionStorage.setItem('user_id',user_id);
          sessionStorage.setItem('org_id',org_id);

          //this.storeUser(user_name,user_id);
          //this.sessionStorageSetItem(result.getIdToken().getJwtToken());
          console.log(result);
          observer.next(result);
          observer.complete();
        },
        onFailure: function (err) {
          console.log(err);
          observer.error(err);
        },
      });
    });
  }

  storeUser = (name:string,user_id:string) =>{
    console.log('method session called',name,user_id);
    
    sessionStorage.setItem('username',name);
    sessionStorage.setItem('user_id',user_id);
  }

  isLoggedIn() {
    console.log('isLoggedIn...', userPool.getCurrentUser());
    if (this.cognitoUser)
      return true;
    else
      return false;
    // return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage

    return userPool.getCurrentUser();
  }
  logout = () => {
    //  this.getAuthenticatedUser().signout();
    this.cognitoUser = null;
  }
}
