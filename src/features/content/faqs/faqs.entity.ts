import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Tags } from '../../news/tags/tags.entity';
import { BaseModel } from '../../../core/base.model';
import type {Relation} from 'typeorm';


@Entity('faqs')
export class Faqs extends BaseModel {
    @Column({ length: 256 })
    question!: string;

    @Column({ length: 512 })
    answer!: string;

    @Column()
    tagsId!: number;

    @JoinTable({ name: 'faqsTags', joinColumn: { name: 'faqsId' }, inverseJoinColumn: { name: 'tagId' } })
    @ManyToMany(() => Tags, (tags) => tags.faqs)
    tags?: Relation<Tags[]>;
}