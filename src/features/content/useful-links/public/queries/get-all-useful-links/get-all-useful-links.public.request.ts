import { Query } from '@nestjs/cqrs';
import {
  GetAllUsefulLinksPublicResponse
} from '@/features/content/useful-links/public/queries/get-all-useful-links/get-all-useful-links.public.response';
import {
  GetAllUsefulLinksPublicFilters
} from '@/features/content/useful-links/public/queries/get-all-useful-links/get-all-useful-links.public.filters';

export class GetAllUsefulLinksPublicRequest extends Query<GetAllUsefulLinksPublicResponse[]>{
  constructor(public readonly filters: GetAllUsefulLinksPublicFilters) {
    super();
  }
}