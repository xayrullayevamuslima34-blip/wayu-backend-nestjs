import { Query } from '@nestjs/cqrs';
import {
  GetAllAdminFilters,
} from '@/features/auth/super-admin/queries/get-all-super-admin/get-all-super.admin.filters';
import {
  GetAllAdminResponse,
} from '@/features/auth/super-admin/queries/get-all-super-admin/get-all-super.admin.response';

export class GetAllAdminRequest extends Query<GetAllAdminResponse[]> {
  constructor(public readonly filters: GetAllAdminFilters) {
    super();
  }
}