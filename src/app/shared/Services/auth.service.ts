import { Injectable } from '@angular/core';
// import {AmazonCognitoIdentity,AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: "ap-south-1_texUvYkU2",
  ClientId: "fc5b2qu7pjr9bv293gv2ngi73"
};

//const userPool = new CognitoUserPool(poolData);
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


@Injectable({
  providedIn: 'root'
})

export class AuthService {
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
    //const cognitoUser = new CognitoUser(userData);
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return Observable.create(observer => {
      console.log(cognitoUser)
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.log("token....", result.getIdToken().getJwtToken());
          sessionStorage.setItem("token", result.getIdToken().getJwtToken())
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

  // sessionStorageSetItem=(token)=>{
  //   sessionStorage.setItem("token",token)
  // }

  isLoggedIn() {
    console.log('isLoggedIn...',userPool.getCurrentUser());
    
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage

    return userPool.getCurrentUser();
  }
  logout = () => {
    this.getAuthenticatedUser().signout();
    this.cognitoUser = null;
  }
}