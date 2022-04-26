import { Injectable } from '@angular/core';
import {Book} from "../models/book.model";
import {Subject} from "rxjs";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book>();

  constructor() { }

  emitBooks(){ // mise à jour des données
    // @ts-ignore
    this.booksSubject.next(this.books);
  }

  saveBooks(){
    firebase.database().ref('/books').set(this.books); //si ya déja quelque chose il sera rempplacé par les nouvelles donnée

  }
  getBooks(){
    firebase.database().ref('/books')
      .on('value', (data)=>{
        this.books = data.val();
        this.emitBooks();
      })
  }

  getSingleBook(id: number){
    return new Promise((resolve,reject)=>{
      firebase.database().ref('/books/'+id).once('value').then(
        (data)=>{
          resolve(data.val());
        },
        (error)=>{
          reject(error);
        }
      )

    });
  }

  createNewBook(newBook: Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();

  }

   removeBook(book: Book){
    const bookIndexToRemove = this.books.findIndex(
      // @ts-ignore
      (bookEl)=>{
        if(bookEl === book){
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1); // une fois l'index trouver on va copier l'élément
     this.saveBooks();
     this.emitBooks();
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject)=>{
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/'+ almostUniqueFileName+ file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
          console.log(' chargement...');
          },
          (error)=>{console.log('erreur ...'+ error);
          reject();},
          ()=>{
          resolve(upload.snapshot.downloadURL);
          }
          );
      }
    );
  }

}
