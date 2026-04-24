import {Column, Entity} from 'typeorm';
import {BaseModel} from "../../../core/base.model";
import {PaymentProvider} from "../../../core/enums/paymentProvider.enum";

@Entity('donations')
export class Donation extends BaseModel {
    @Column('decimal', {precision: 12, scale: 2})
    amount!: number;

    @Column({length: 64})
    fullName!: string;

    @Column({type: 'timestamp'})
    date!: Date;

    @Column({type: 'enum', enum: PaymentProvider})
    paidBy!: PaymentProvider;
}
