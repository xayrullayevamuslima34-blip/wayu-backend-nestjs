import { Query } from '@nestjs/cqrs';
import { GetAllRepresentativesPublicResponse } from './get-all-representatives.public.response';
import { GetAllRepresentativesPublicFilters } from './get-all-representatives.public.filters';

export class GetAllRepresentativesPublicRequest extends Query<GetAllRepresentativesPublicResponse[]>{
  constructor(public readonly filters: GetAllRepresentativesPublicFilters) {
    super();
  }
}