import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/authors.entity';
import { BookCategory } from './book-categories/book-categories.entity';
import { Book } from './books/books.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthorsAdminController, AuthorsPublicController } from './authors/authors.controller';
import {
  BookCategoriesAdminController,
  BookCategoriesPublicController,
} from './book-categories/book-categories.controller';
import { BooksAdminController, BooksPublicController } from './books/books.controller';
import { GetAllAuthorsAdminHandler } from './authors/admin/queries/get-all-authors/get-all-authors.admin.handler';
import { GetOneAuthorsAdminHandler } from './authors/admin/queries/get-one-authors/get-one-authors.admin.handler';
import { CreateAuthorsAdminHandler } from './authors/admin/commands/create-authors/create-authors.admin.handler';
import { DeleteAuthorsAdminHandler } from './authors/admin/commands/delete-authors/delete-authors.admin.handler';
import { UpdateAuthorsAdminHandler } from './authors/admin/commands/update-authors/update-authors.admin.handler';
import {
  GetAllBookCategoriesAdminHandler,
} from './book-categories/admin/queries/get-all-book-categories/get-all-book-categories.admin.handler';
import {
  GetOneBookCategoriesAdminHandler,
} from './book-categories/admin/queries/get-one-book-categories/get-one-book-categories.admin.handler';
import {
  CreateBookCategoriesAdminHandler,
} from './book-categories/admin/commands/create-book-categories/create-book-categories.admin.handler';
import {
  UpdateBookCategoriesAdminHandler,
} from './book-categories/admin/commands/update-book-categories/update-book-categories.admin.handler';
import {
  DeleteBookCategoriesAdminHandler,
} from './book-categories/admin/commands/delete-book-categories/delete-book-categories.admin.handler';
import { GetAllBooksAdminHandler } from './books/admin/queries/get-all-books/get-all-books.admin.handler';
import { GetOneBooksAdminHandler } from './books/admin/queries/get-one-books/get-one-books.admin.handler';
import { UpdateBooksAdminHandler } from './books/admin/commands/update-books/update-books.admin.handler';
import { DeleteBooksAdminHandler } from './books/admin/commands/delete-books/delete-books.admin.handler';
import { CreateBooksAdminHandler } from './books/admin/commands/create-books/create-books.admin.handler';
import {
  GetAllAuthorsPublicHandler,
} from '@/features/library/authors/public/queries/get-all-authors/get-all-authors.public.handler';
import {
  GetAllBookCategoriesPublicHandler,
} from '@/features/library/book-categories/public/queries/get-all-book-categories/get-all-book-categories.public.handler';
import {
  GetOneBookCategoriesPublicHandler,
} from '@/features/library/book-categories/public/queries/get-one-book-categories/get-one-book-categories.public.handler';
import {
  GetAllBooksPublicHandler,
} from '@/features/library/books/public/queries/get-all-books/get-all-books.public.handler';
import {
  GetOneBooksPublicHandler,
} from '@/features/library/books/public/queries/get-one-books/get-one-books.public.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Author, BookCategory, Book]),
    ConfigModule],

  controllers: [
    AuthorsAdminController, AuthorsPublicController,
    BookCategoriesAdminController, BookCategoriesPublicController,
    BooksAdminController, BooksPublicController,
  ],

  providers: [
    GetAllAuthorsAdminHandler,
    GetOneAuthorsAdminHandler,
    CreateAuthorsAdminHandler,
    UpdateAuthorsAdminHandler,
    DeleteAuthorsAdminHandler,
    GetAllAuthorsPublicHandler,
    GetAllAuthorsPublicHandler,

    GetAllBookCategoriesAdminHandler,
    GetOneBookCategoriesAdminHandler,
    CreateBookCategoriesAdminHandler,
    UpdateBookCategoriesAdminHandler,
    DeleteBookCategoriesAdminHandler,
    GetAllBookCategoriesPublicHandler,
    GetOneBookCategoriesPublicHandler,

    GetAllBooksAdminHandler,
    GetOneBooksAdminHandler,
    CreateBooksAdminHandler,
    UpdateBooksAdminHandler,
    DeleteBooksAdminHandler,
    GetAllBooksPublicHandler,
    GetOneBooksPublicHandler,
  ],
})

export class LibraryModule {
}