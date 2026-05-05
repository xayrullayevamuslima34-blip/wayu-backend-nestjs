import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteCountriesAdminRequest } from './delete-countries.admin.request';
import { Country } from '../../../countries.entity';

@CommandHandler(DeleteCountriesAdminRequest)
export class DeleteCountriesAdminHandler implements ICommandHandler<DeleteCountriesAdminRequest> {
  constructor(@InjectRepository(Country) private readonly repo: Repository<Country>) {}

  async execute(cmd: DeleteCountriesAdminRequest): Promise<void> {

    const newCountry = await this.repo.findOneBy({id: cmd.id})
    if (!newCountry) throw new NotFoundException("Country with given id not found");

    await this.repo.remove(newCountry);
  }

}