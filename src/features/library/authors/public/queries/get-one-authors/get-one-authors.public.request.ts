import { Query } from '@nestjs/cqrs';
import { GetOneAuthorsPublicResponse } from './get-one-authors.public.response';

export class GetOneAuthorsPublicRequest extends Query<GetOneAuthorsPublicResponse>{
  id!: number;
}