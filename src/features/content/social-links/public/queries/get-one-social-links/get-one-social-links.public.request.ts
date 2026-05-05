import { Query } from '@nestjs/cqrs';
import {
  GetOneSocialLinksPublicResponse
} from '@/features/content/social-links/public/queries/get-one-social-links/get-one-social-links.public.response';

export class GetOneSocialLinksPublicRequest extends Query<GetOneSocialLinksPublicResponse>{
  id!: number;
}