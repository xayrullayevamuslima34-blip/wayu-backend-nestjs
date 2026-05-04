import { Query } from '@nestjs/cqrs';
import { GetAllStaticInfoResponse } from './get-all-static-info.response';
import { GetAllStaticInfoFilters } from './get-all-static-info.filters';

export class GetAllStaticInfoRequest extends Query<GetAllStaticInfoResponse[]>{
  constructor(public readonly filters: GetAllStaticInfoFilters) {
    super();
  }
}