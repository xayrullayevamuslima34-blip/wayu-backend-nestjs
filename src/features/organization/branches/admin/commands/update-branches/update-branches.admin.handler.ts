import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateBranchesAdminRequest } from './update-branches.admin.request';
import { UpdateBranchesAdminResponse } from './update-branches.admin.response';
import { Branch } from '../../../branches.entity';

@CommandHandler(UpdateBranchesAdminRequest)
export class UpdateBranchesAdminHandler implements ICommandHandler<UpdateBranchesAdminRequest> {
  async execute(cmd: UpdateBranchesAdminRequest): Promise<UpdateBranchesAdminResponse> {
    const branch = await Branch.findOne({ where: { id: cmd.id } });
    if (!branch) throw new NotFoundException('Branch not found');

    if (cmd.countryId !== undefined) branch.countryId = cmd.countryId;
    if (cmd.representativeId !== undefined) branch.representativeId = cmd.representativeId;
    if (cmd.city) branch.city = cmd.city;
    if (cmd.latitude !== undefined) branch.latitude = cmd.latitude;
    if (cmd.longitude !== undefined) branch.longitude = cmd.longitude;
    if (cmd.phoneNumber) branch.phoneNumber = cmd.phoneNumber;

    await Branch.save(branch);
    return plainToInstance(UpdateBranchesAdminResponse, branch, { excludeExtraneousValues: true });
  }
}