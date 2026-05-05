import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBranchesAdminCommand } from './create-branches.admin.command';
import { CreateBranchesAdminResponse } from './create-branches.admin.response';
import { Branch } from '../../../branches.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateBranchesAdminCommand)
export class CreateBranchesAdminHandler implements ICommandHandler<CreateBranchesAdminCommand> {
  async execute(cmd: CreateBranchesAdminCommand): Promise<CreateBranchesAdminResponse> {
    const newBranches = Branch.create({
      countryId: cmd.countryId,
      representativeId: cmd.representativeId,
      city: cmd.city,
      latitude: cmd.latitude,
      longitude: cmd.longitude,
      phoneNumber: cmd.phoneNumber,
    });
    await Branch.save(newBranches);
    return plainToInstance(CreateBranchesAdminResponse, newBranches, { excludeExtraneousValues: true });
  }

}