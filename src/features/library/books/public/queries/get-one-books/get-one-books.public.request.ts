import { Query } from '@nestjs/cqrs';
import { GetOneBooksPublicResponse } from './get-one-books.public.response';

export class GetOneBooksPublicRequest extends Query<GetOneBooksPublicResponse>{
  id!: number;
}