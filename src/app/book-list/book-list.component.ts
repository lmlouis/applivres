import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../models/book.model";
import {Subscription} from "rxjs";
import {BooksService} from "../services/books.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
// @ts-ignore
export class BookListComponent implements OnInit, OnDestroy {



  // @ts-ignore
  books: Book[];
  // @ts-ignore
  bookSubscription: Subscription;


  constructor(private bookService: BooksService,
              private router: Router) { }

  ngOnInit(): void {

    this.bookSubscription = this.bookService.booksSubject.subscribe(
      // @ts-ignore
      (books: Book[])=>{
        this.books = books;
      }
    );
    this.bookService.getBooks();
    this.bookService.emitBooks();

  }

  onNewBook(){ // books/new
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book){
    this.bookService.removeBook(book);
  }

  onViewBook(id: number){
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDelete(): void {//fermer la subsciption
    this.bookSubscription.unsubscribe();
  }

}
