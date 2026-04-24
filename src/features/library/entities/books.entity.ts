import {Column, Entity, ManyToOne, JoinColumn} from 'typeorm';
import {BaseModel} from "../../../core/base.model";
import {Author} from "../../common/entities/authors.entity";
import {BookCategory} from "./book-categories.entity";

@Entity('books')
export class Book extends BaseModel {
    @ManyToOne(() => Author)
    @JoinColumn({name: 'authorId'})
    author!: Author;

    @ManyToOne(() => BookCategory)
    @JoinColumn({name: 'categoryId'})
    category!: BookCategory;

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
