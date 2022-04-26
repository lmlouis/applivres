import { Injectable } from '@angular/core';
import firebase from "firebase";








@Injectable()
export class AuthService {

  constructor() { }


  createNewUser(email: string, password: string){
    return new Promise(
      (resolve, reject)=>{


        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            // @ts-ignore
            resolve();

          },
          // @ts-ignore
          (error) =>{
            reject(error);
          }
        )
      }
    )
  }


  signInUser(email: string, password: string){
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => { // @ts-ignore

            resolve();
          },
          // @ts-ignore
          (error) =>{
            reject(error);
          }
        );
      }
    )
  }

  signOutUser(){ // se déconnecter
    firebase.auth().signOut();
  }
}
