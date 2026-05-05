import { Query } from '@nestjs/cqrs';
import {
  GetAllSocialLinksPublicResponse
} from '@/features/content/social-links/public/queries/get-all-social-links/get-all-social-links.public.response';
import {
  GetAllSocialLinksPublicFilters
} from '@/features/content/social-links/public/queries/get-all-social-links/get-all-social-links.public.filters';

export class GetAllSocialLinksPublicRequest extends Query<GetAllSocialLinksPublicResponse[]>{
  constructor(public readonly filters: GetAllSocialLinksPublicFilters) {
    super();
  }
}