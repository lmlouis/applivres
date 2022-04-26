import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Observable} from "rxjs";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router:Router) { }

  // @ts-ignore
  canActivate () : Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        (user)=>{
          if (user){// si authentifier laisser passer
            resolve(true);
          }else{// redireger vers auth/signin sinon
            this.router.navigate(['/auth', 'signin']);
            resolve(false);
          }
        }
      );
    })
  }
}
