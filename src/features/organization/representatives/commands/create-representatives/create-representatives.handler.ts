import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRepresentativesCommand } from './create-representatives.command';
import { CreateRepresentativesResponse } from './create-representatives.response';
import { Representative } from '../../representatives.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateRepresentativesCommand)
export class CreateRepresentativesHandler implements ICommandHandler<CreateRepresentativesCommand> {
  async execute(cmd: CreateRepresentativesCommand): Promise<CreateRepresentativesResponse> {
    const newRepresentative = Representative.create({
      fullName: cmd.fullName,
      image: cmd.image.path,
      email: cmd.email,
      phoneNumber: cmd.phoneNumber,
      resume: cmd.resume,
    });
    await Representative.save(newRepresentative);
    return plainToInstance(CreateRepresentativesResponse, newRepresentative, { excludeExtraneousValues: true });
  }

}