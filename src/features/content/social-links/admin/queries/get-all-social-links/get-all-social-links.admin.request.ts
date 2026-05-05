import { Query } from '@nestjs/cqrs';
import {
  GetAllSocialLinksAdminResponse
} from '@/features/content/social-links/admin/queries/get-all-social-links/get-all-social-links.admin.response';
import {
  GetAllSocialLlinksAdminFilters
} from '@/features/content/social-links/admin/queries/get-all-social-links/get-all-social-links.admin.filters';

export class GetAllSocialLinksAdminRequest extends Query<GetAllSocialLinksAdminResponse[]>{
  constructor(public readonly filters: GetAllSocialLlinksAdminFilters) {
    super();
  }
}