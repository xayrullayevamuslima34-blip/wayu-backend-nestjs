import { Query } from '@nestjs/cqrs';
import { GetOneLanguagesPublicResponse } from './get-one-languages.public.response';

export class GetOneLanguagesPublicRequest extends Query<GetOneLanguagesPublicResponse>{
  id!: number;
}