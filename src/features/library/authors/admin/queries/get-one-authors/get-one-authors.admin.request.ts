import { Query } from '@nestjs/cqrs';
import { GetOneAuthorsAdminResponse } from './get-one-authors.admin.response';

export class GetOneAuthorsAdminRequest extends Query<GetOneAuthorsAdminResponse>{
  id!: number;
}