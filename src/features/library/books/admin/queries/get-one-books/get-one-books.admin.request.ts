import { Query } from '@nestjs/cqrs';
import { GetOneBooksAdminResponse } from './get-one-books.admin.response';

export class GetOneBooksAdminRequest extends Query<GetOneBooksAdminResponse>{
  id!: number;
}