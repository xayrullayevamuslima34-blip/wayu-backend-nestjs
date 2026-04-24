import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import {BaseModel} from "../../../core/base.model";
import {Faqs} from "./faqs.entity";
import {Tags} from "../../content/entities/tags.entity";

@Entity('faqsTags')
export class FaqsTag extends BaseModel {
    @ManyToOne(() => Faqs)
    @JoinColumn({ name: 'faqsId' })
    faq!: Faqs;

    @ManyToOne(() => Tags)
    @JoinColumn({ name: 'tagId' })
    tag!: Tags;
}
