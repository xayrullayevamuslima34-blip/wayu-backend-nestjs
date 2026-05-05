import { Query } from '@nestjs/cqrs';
import {
  GetAllStaticInfoAdminResponse
} from '@/features/content/static-info/admin/queries/get-all-static-info/get-all-static-info.admin.response';
import {
  GetAllStaticInfoAdminFilters
} from '@/features/content/static-info/admin/queries/get-all-static-info/get-all-static-info.admin.filters';

export class GetAllStaticInfoAdminRequest extends Query<GetAllStaticInfoAdminResponse[]>{
  constructor(public readonly filters: GetAllStaticInfoAdminFilters) {
    super();
  }
}