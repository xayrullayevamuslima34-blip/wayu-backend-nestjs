import { Query } from '@nestjs/cqrs';
import {
  GetOneSocialLinksAdminResponse
} from '@/features/content/social-links/admin/queries/get-one-social-links/get-one-social-links.admin.response';

export class GetOneSocialLinksAdminRequest extends Query<GetOneSocialLinksAdminResponse>{
  id!: number;
}