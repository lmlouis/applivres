import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/book.model";

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  // @ts-ignore
  book: Book;


  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private  router: Router) {}

  ngOnInit(): void { // charger le livre
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      // @ts-ignore
      (book: Book)=>{
        this.book =book;
      }
    );
  }

  onBack(){ // methode pour le retour au view list livre
    this.router.navigate(['/book']).then(r => r);
  }

}
