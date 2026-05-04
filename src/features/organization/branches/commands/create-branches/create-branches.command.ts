import { Command } from '@nestjs/cqrs';
import { CreateBranchesResponse } from './create-branches.response';

export class CreateBranchesCommand extends Command<CreateBranchesResponse>{
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