import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteCountriesRequest } from './delete-countries.request';
import { Country } from '../../countries.entity';

@CommandHandler(DeleteCountriesRequest)
export class DeleteCountriesHandler implements ICommandHandler<DeleteCountriesRequest> {
  constructor(@InjectRepository(Country) private readonly repo: Repository<Country>) {}

  async execute(cmd: DeleteCountriesRequest): Promise<void> {

    const newCountry = await this.repo.findOneBy({id: cmd.id})
    if (!newCountry) throw new NotFoundException("Country with given id not found");

    await this.repo.remove(newCountry);
  }

}