import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRepresentativesAdminCommand } from './create-representatives.admin.command';
import { CreateRepresentativesAdminResponse } from './create-representatives.admin.response';
import { Representative } from '../../../representatives.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateRepresentativesAdminCommand)
export class CreateRepresentativesAdminHandler implements ICommandHandler<CreateRepresentativesAdminCommand> {
  async execute(cmd: CreateRepresentativesAdminCommand): Promise<CreateRepresentativesAdminResponse> {
    const newRepresentative = Representative.create({
      fullName: cmd.fullName,
      image: cmd.image.path,
      email: cmd.email,
      phoneNumber: cmd.phoneNumber,
      resume: cmd.resume,
    });
    await Representative.save(newRepresentative);
    return plainToInstance(CreateRepresentativesAdminResponse, newRepresentative, { excludeExtraneousValues: true });
  }

}