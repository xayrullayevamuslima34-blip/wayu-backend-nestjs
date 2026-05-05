import {Column, Entity, ManyToOne, JoinColumn} from 'typeorm';
import {BaseModel} from "@/core/base.model";
import {Author} from "../authors/authors.entity";
import {BookCategory} from "../book-categories/book-categories.entity";
import type {Relation} from 'typeorm';

@Entity('books')
export class Book extends BaseModel {
    @Column()
    authorId!: number;

    @Column()
    categoryId!: number;

    @ManyToOne(() => Author, (author) => author.book)
    @JoinColumn({name: 'authorId'})
    author!: Relation<Author>;

    @ManyToOne(() => BookCategory, (bookCategory) => bookCategory.book)
    @JoinColumn({name: 'categoryId'})
    category!: Relation<BookCategory>;

    @Column({length: 256})
    title!: string;

    @Column({length: 128})
    image!: string;

    @Column({type: 'text', nullable: true})
    description?: string;

    @Column({length: 256})
    file!: string;

    @Column()
    pages!: number;

    @Column()
    year!: number;
}
