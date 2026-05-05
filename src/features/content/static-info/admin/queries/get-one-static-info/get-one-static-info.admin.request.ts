import { Query } from '@nestjs/cqrs';
import {
  GetOneStaticInfoAdminResponse
} from '@/features/content/static-info/admin/queries/get-one-static-info/get-one-static-info.admin.response';

export class GetOneStaticInfoAdminRequest extends Query<GetOneStaticInfoAdminResponse> {
  id!: number;
}