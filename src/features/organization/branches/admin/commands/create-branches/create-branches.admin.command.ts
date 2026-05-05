import { Command } from '@nestjs/cqrs';
import { CreateBranchesAdminResponse } from './create-branches.admin.response';

export class CreateBranchesAdminCommand extends Command<CreateBranchesAdminResponse>{
  constructor(
    public countryId: number,
    public representativeId: number,
    public city: string,
    public latitude: number,
    public longitude: number,
    public phoneNumber: string,
  ) {
    super();
  }
}