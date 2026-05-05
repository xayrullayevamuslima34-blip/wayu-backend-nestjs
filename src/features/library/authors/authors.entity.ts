import { Column, Entity, OneToMany } from 'typeorm';
import {BaseModel} from "@/core/base.model";
import type {Relation} from 'typeorm';
import { Book } from '../books/books.entity';

@Entity('authors')
export class Author extends BaseModel {
    @Column({ length: 64 })
    fullName!: string;

    @OneToMany(() => Book, (book) => book.author)
    book?: Relation<Book[]>;
}
