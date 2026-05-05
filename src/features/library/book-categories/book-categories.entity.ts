import { Column, Entity, OneToMany } from 'typeorm';
import {BaseModel} from "@/core/base.model";
import type {Relation} from 'typeorm';
import { Book } from '../books/books.entity';

@Entity('bookCategories')
export class BookCategory extends BaseModel {
    @Column({ unique: true, length: 64 })
    title!: string;

    @OneToMany(() => Book, (book) => book.category)
    book?: Relation<Book[]>
}