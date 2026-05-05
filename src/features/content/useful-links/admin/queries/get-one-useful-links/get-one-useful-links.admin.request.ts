import { Query } from '@nestjs/cqrs';
import {
  GetOneUsefulLinksAdminResponse
} from '@/features/content/useful-links/admin/queries/get-one-useful-links/get-one-useful-links.admin.response';

export class GetOneUsefulLinksAdminRequest extends Query<GetOneUsefulLinksAdminResponse> {
  id!: number;
}