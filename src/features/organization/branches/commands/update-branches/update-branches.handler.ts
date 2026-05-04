import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateBranchesRequest } from './update-branches.request';
import { UpdateBranchesResponse } from './update-branches.response';
import { Branch } from '../../branches.entity';

@CommandHandler(UpdateBranchesRequest)
export class UpdateBranchesHandler implements ICommandHandler<UpdateBranchesRequest> {
  async execute(cmd: UpdateBranchesRequest): Promise<UpdateBranchesResponse> {
    const branch = await Branch.findOne({ where: { id: cmd.id } });
    if (!branch) throw new NotFoundException('Branch not found');

    if (cmd.countryId !== undefined) branch.countryId = cmd.countryId;
    if (cmd.representativeId !== undefined) branch.representativeId = cmd.representativeId;
    if (cmd.city) branch.city = cmd.city;
    if (cmd.latitude !== undefined) branch.latitude = cmd.latitude;
    if (cmd.longitude !== undefined) branch.longitude = cmd.longitude;
    if (cmd.phoneNumber) branch.phoneNumber = cmd.phoneNumber;

    await Branch.save(branch);
    return plainToInstance(UpdateBranchesResponse, branch, { excludeExtraneousValues: true });
  }
}