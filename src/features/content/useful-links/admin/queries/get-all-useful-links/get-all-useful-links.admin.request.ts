import { Query } from '@nestjs/cqrs';
import {
  GetAllUsefulLinksAdminResponse
} from '@/features/content/useful-links/admin/queries/get-all-useful-links/get-all-useful-links.admin.response';
import {
  GetAllUsefulLinksAdminFilters
} from '@/features/content/useful-links/admin/queries/get-all-useful-links/get-all-useful-links.admin.filters';

export class GetAllUsefulLinksAdminRequest extends Query<GetAllUsefulLinksAdminResponse[]>{
  constructor(public readonly filters: GetAllUsefulLinksAdminFilters) {
    super();
  }
}