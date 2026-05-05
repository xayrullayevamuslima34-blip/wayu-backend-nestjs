import { Query } from '@nestjs/cqrs';
import { GetOneLanguagesAdminResponse } from './get-one-languages.admin.response';

export class GetOneLanguagesAdminRequest extends Query<GetOneLanguagesAdminResponse>{
  id!: number;
}