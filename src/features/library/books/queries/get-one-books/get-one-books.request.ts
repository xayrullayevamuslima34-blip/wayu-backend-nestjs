import { Query } from '@nestjs/cqrs';
import { GetOneBooksResponse } from './get-one-books.response';

export class GetOneBooksRequest extends Query<GetOneBooksResponse>{
  id!: number;
}