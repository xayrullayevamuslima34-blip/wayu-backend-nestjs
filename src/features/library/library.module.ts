import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/authors.entity';
import { BookCategory } from './book-categories/book-categories.entity';
import { Book } from './books/books.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthorsController } from './authors/authors.controller';
import { BookCategoriesController } from './book-categories/book-categories.controller';
import { BooksController } from './books/books.controller';
import { GetAllAuthorsHandler } from './authors/queries/get-all-authors/get-all-authors.handler';
import { GetOneAuthorsHandler } from './authors/queries/get-one-authors/get-one-authors.handler';
import { CreateAuthorsHandler } from './authors/commands/create-authors/create-authors.handler';
import { DeleteAuthorsHandler } from './authors/commands/delete-authors/delete-authors.handler';
import { UpdateAuthorsHandler } from './authors/commands/update-authors/update-authors.handler';
import {
  GetAllBookCategoriesHandler,
} from './book-categories/queries/get-all-book-categories/get-all-book-categories.handler';
import {
  GetOneBookCategoriesHandler,
} from './book-categories/queries/get-one-book-categories/get-one-book-categories.handler';
import {
  CreateBookCategoriesHandler,
} from './book-categories/commands/create-book-categories/create-book-categories.handler';
import {
  UpdateBookCategoriesHandler,
} from './book-categories/commands/update-book-categories/update-book-categories.handler';
import {
  DeleteBookCategoriesHandler,
} from './book-categories/commands/delete-book-categories/delete-book-categories.handler';
import { GetAllBooksHandler } from './books/queries/get-all-books/get-all-books.handler';
import { GetOneBooksHandler } from './books/queries/get-one-books/get-one-books.handler';
import { UpdateBooksHandler } from './books/commands/update-books/update-books.handler';
import { DeleteBooksHandler } from './books/commands/delete-books/delete-books.handler';
import { CreateBooksHandler } from './books/commands/create-books/create-books.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Author, BookCategory, Book]),
    ConfigModule],

  controllers: [
    AuthorsController,
    BookCategoriesController,
    BooksController,
  ],

  providers: [
    GetAllAuthorsHandler,
    GetOneAuthorsHandler,
    CreateAuthorsHandler,
    UpdateAuthorsHandler,
    DeleteAuthorsHandler,
    GetAllBookCategoriesHandler,
    GetOneBookCategoriesHandler,
    CreateBookCategoriesHandler,
    UpdateBookCategoriesHandler,
    DeleteBookCategoriesHandler,
    GetAllBooksHandler,
    GetOneBooksHandler,
    CreateBooksHandler,
    UpdateBooksHandler,
    DeleteBooksHandler,
  ],
})

export class LibraryModule {
}