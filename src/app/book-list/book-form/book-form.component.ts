import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {Book} from "../../models/book.model";
// @ts-ignore
import * as url from "url";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  // @ts-ignore
  bookForm : FormGroup;
  fileIsUploading = false;
  // @ts-ignore
  fileURL: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {//creer le fomrulair
    this.initForm();
  }


  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['Titre de Livre', Validators.required],
      author: ['@Auteur', Validators.required],
    });
  }

  onSaveBook(){// recupper les infos du formulaire
    // @ts-ignore
    const title = this.bookForm.get('title').value;
    // @ts-ignore
    const author  = this.bookForm.get('author').value;
    // creer un nouveau livre
    const newBook = new Book(title, author);

    this.booksService.createNewBook(newBook);

    // redirecte vers livres
    this.router.navigate(['/books']).then(r => r);
    if(this.fileURL){
      // @ts-ignore
      newBook.photo = this.fileURL;
    }
  }

  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      // @ts-ignore
      (url: string)=>{
        this.fileURL = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    )
  }

  // @ts-ignore
  detectFiles($event: Event){
    // @ts-ignore
    this.onUploadFile(event.target.files[0]);
  }

}
