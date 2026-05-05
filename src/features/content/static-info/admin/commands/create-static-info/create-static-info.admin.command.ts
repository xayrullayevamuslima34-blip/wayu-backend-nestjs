import { Command } from '@nestjs/cqrs';
import {
  CreateStaticInfoAdminResponse
} from '@/features/content/static-info/admin/commands/create-static-info/create-static-info.admin.response';

export class CreateStaticInfoAdminCommand extends Command<CreateStaticInfoAdminResponse>{
  constructor(
    public aboutUs: string,
    public appStoreLink?: string,
    public playMarketLink?: string,
  ) {
    super();
  }
}