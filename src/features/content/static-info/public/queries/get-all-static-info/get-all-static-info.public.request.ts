import { Query } from '@nestjs/cqrs';
import {
  GetAllStaticInfoPublicResponse,
} from '@/features/content/static-info/public/queries/get-all-static-info/get-all-static-info.public.response';
import {
  GetAllStaticInfoPublicFilters,
} from '@/features/content/static-info/public/queries/get-all-static-info/get-all-static-info.public.filters';

export class GetAllStaticInfoPublicRequest extends Query<GetAllStaticInfoPublicResponse[]> {
  constructor(public readonly filters: GetAllStaticInfoPublicFilters) {
    super();
  }
}