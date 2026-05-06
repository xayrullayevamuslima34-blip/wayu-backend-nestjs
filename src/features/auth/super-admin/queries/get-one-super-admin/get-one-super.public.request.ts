import { Query } from '@nestjs/cqrs';
import {
  GetOneAdminResponse
} from '@/features/auth/super-admin/queries/get-one-super-admin/get-one-super.public.response';

export class GetOneAdminRequest extends Query<GetOneAdminResponse>{
  id!: number;
}