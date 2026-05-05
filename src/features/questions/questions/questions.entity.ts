import { Column, Entity } from 'typeorm';
import {BaseModel} from "@/core/base.model";
import { QuestionStatus } from "@/core/enums/questionStatus.enum";

@Entity('questions')
export class Question extends BaseModel {
    @Column({ length: 64 })
    fullName!: string;

    @Column({ length: 16 })
    phoneNumber!: string;

    @Column({ type: 'text' })
    question!: string;

    @Column({ type: 'enum', enum: QuestionStatus })
    status!: QuestionStatus;
}