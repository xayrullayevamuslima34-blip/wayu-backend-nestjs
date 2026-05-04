import { Query } from '@nestjs/cqrs';
import { GetAllRepresentativesResponse } from './get-all-representatives.response';
import { GetAllRepresentativesFilters } from './get-all-representatives.filters';

export class GetAllRepresentativesRequest extends Query<GetAllRepresentativesResponse[]>{
  constructor(public readonly filters: GetAllRepresentativesFilters) {
    super();
  }
}