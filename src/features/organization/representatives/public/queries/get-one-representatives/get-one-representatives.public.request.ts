import { Query } from '@nestjs/cqrs';
import { GetOneRepresentativesPublicResponse } from './get-one-representatives.public.response';

export class GetOneRepresentativesPublicRequest extends Query<GetOneRepresentativesPublicResponse>{
  id!: number;
}