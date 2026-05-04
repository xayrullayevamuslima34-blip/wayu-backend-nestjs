import { Query } from '@nestjs/cqrs';
import { GetOneAuthorsResponse } from './get-one-authors.response';

export class GetOneAuthorsRequest extends Query<GetOneAuthorsResponse>{
  id!: number;
}