import { Component } from '@angular/core';
import firebase from "firebase";
import initializeApp = firebase.initializeApp;







@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appLivres';
  constructor() {
    // Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

    const firebaseConfig = {

      apiKey: "AIzaSyCB8_B9NQnYG1b7jVYl4JWkmXCwhrUC74o",

      authDomain: "applivres-30ca6.firebaseapp.com",

      projectId: "applivres-30ca6",

      storageBucket: "applivres-30ca6.appspot.com",

      messagingSenderId: "989890138276",

      appId: "1:989890138276:web:fffa47c09340353a085631",

      measurementId: "G-21E2GVG7QP"

    };


// Initialize Firebase

    const firebaseApp = initializeApp(firebaseConfig);


  }
}
