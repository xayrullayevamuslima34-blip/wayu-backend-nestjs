import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBranchesCommand } from './create-branches.command';
import { CreateBranchesResponse } from './create-branches.response';
import { Branch } from '../../branches.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateBranchesCommand)
export class CreateBranchesHandler implements ICommandHandler<CreateBranchesCommand> {
  async execute(cmd: CreateBranchesCommand): Promise<CreateBranchesResponse> {
    const newBranches = Branch.create({
      countryId: cmd.countryId,
      representativeId: cmd.representativeId,
      city: cmd.city,
      latitude: cmd.latitude,
      longitude: cmd.longitude,
      phoneNumber: cmd.phoneNumber,
    });
    await Branch.save(newBranches);
    return plainToInstance(CreateBranchesResponse, newBranches, { excludeExtraneousValues: true });
  }

}