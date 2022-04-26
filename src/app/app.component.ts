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

      apiKey: "AIzaSyDsj-IjGBwGF4Im0eawQS_OcOBztZW---A",

      authDomain: "livres-3220e.firebaseapp.com",

      projectId: "livres-3220e",

      storageBucket: "livres-3220e.appspot.com",

      messagingSenderId: "950819788444",

      appId: "1:950819788444:web:b88f46c9284ab5c264ff59"

    };


// Initialize Firebase

    const app = initializeApp(firebaseConfig);
  }
}
