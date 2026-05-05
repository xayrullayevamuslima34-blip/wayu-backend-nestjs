import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import type {Relation} from "typeorm";
import { Tags } from '../tags/tags.entity';
import { BaseModel } from '@/core/base.model';
import { NewsCategories } from '../news-category/news-categories.entity';
import { Country } from '../../common/countries/countries.entity';

@Entity('news')
export class News extends BaseModel {

  @Column()
  categoryId!: number;

  @Column({ nullable: true })
  countryId?: number;

  @Column({ length: 256 })
  title!: string;

  @Column({ length: 128 })
  image!: string;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'text' })
  content!: string;

  @ManyToOne(() => NewsCategories, newsCategory => newsCategory.news, {onDelete: "RESTRICT"})
  category?: Relation<NewsCategories>;

  @JoinColumn({ name: 'countryId' })
  @ManyToOne(() => Country, (country) => country.news)
  country?: Relation<Country>;

  @JoinTable({ name: 'newsTags', joinColumn: { name: 'newsId' }, inverseJoinColumn: { name: 'tagId' } })
  @ManyToMany(() => Tags, (tags) => tags.news)
  tags?: Relation<Tags[]>;
}