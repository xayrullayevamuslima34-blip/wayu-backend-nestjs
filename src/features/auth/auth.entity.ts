import { Column, Entity } from 'typeorm';
import { BaseModel } from '@/core/base.model';
import { Role } from '@/core/enums/role.enum';
import { LoginType } from '@/core/enums/loginType.enum';

@Entity('users')
export class Auth extends BaseModel {

  @Column({ type:"enum",enum:Role,default: Role.User })
  role!: Role;

  @Column({ length: 64 })
  fullName!: string;

  @Column({ length: 64, unique: true })
  login!: string;

  @Column({type:"enum",enum:LoginType})
  loginType!: LoginType;

  @Column({ length: 128, nullable: true })
  password?: string;

  @Column({ nullable: true, type: 'date' })
  birthDate?: string;

  @Column({ default: false })
  isActive!: boolean;

}