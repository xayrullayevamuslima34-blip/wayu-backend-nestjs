import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { UpdateRepresentativesRequest } from './update-representatives.request';
import { UpdateRepresentativesResponse } from './update-representatives.response';
import { Representative } from '../../representatives.entity';

@CommandHandler(UpdateRepresentativesRequest)
export class UpdateRepresentativesHandler implements ICommandHandler<UpdateRepresentativesRequest> {
  async execute(cmd: UpdateRepresentativesRequest): Promise<UpdateRepresentativesResponse> {
    const representative = await Representative.findOne({ where: { id: cmd.id } });
    if (!representative) throw new NotFoundException('Representative not found');

    if (cmd.fullName) representative.fullName = cmd.fullName;
    if (cmd.email) representative.email = cmd.email;
    if (cmd.phoneNumber) representative.phoneNumber = cmd.phoneNumber;
    if (cmd.resume) representative.resume = cmd.resume;

    if (cmd.image) {
      if (representative.image && fs.existsSync(representative.image)) {
        fs.rmSync(representative.image);
      }
      representative.image = (cmd.image as any).path;
    }

    await Representative.save(representative);
    return plainToInstance(UpdateRepresentativesResponse, representative, { excludeExtraneousValues: true });
  }
}