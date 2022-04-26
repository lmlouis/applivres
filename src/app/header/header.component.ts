import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import firebase from "firebase";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ts-ignore
  isAuth: boolean;



  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged( // observable qui detecte si l'utilisateur est connecté
      (user)=>{
        if(user){
          this.isAuth = true;
        }else{
          this.isAuth = false;
        }
      }
    );

  }

  onSignOut(){ // se deconnecté
    this.authService.signOutUser();
  }


}
