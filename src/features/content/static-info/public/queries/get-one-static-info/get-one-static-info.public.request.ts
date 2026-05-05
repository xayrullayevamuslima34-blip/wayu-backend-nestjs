import { Query } from '@nestjs/cqrs';
import {
  GetOneStaticInfoPublicResponse,
} from '@/features/content/static-info/public/queries/get-one-static-info/get-one-static-info.public.response';

export class GetOneStaticInfoPublicRequest extends Query<GetOneStaticInfoPublicResponse> {
  id!: number;
}