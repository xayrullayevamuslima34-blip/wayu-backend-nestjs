import { Query } from '@nestjs/cqrs';
import {
  GetOneUsefulLinksPublicResponse
} from '@/features/content/useful-links/public/queries/get-one-useful-links/get-one-useful-links.public.response';

export class GetOneUsefulLinksPublicRequest extends Query<GetOneUsefulLinksPublicResponse> {
  id!: number;
}