import { Command } from '@nestjs/cqrs';
import { CreateRepresentativesAdminResponse } from './create-representatives.admin.response';

export class CreateRepresentativesAdminCommand extends Command<CreateRepresentativesAdminResponse>{
  constructor(
    public fullName: string,
    public image: Express.Multer.File,
    public email: string,
    public phoneNumber: string,
    public resume: string,
  ) {
    super();
  }
}