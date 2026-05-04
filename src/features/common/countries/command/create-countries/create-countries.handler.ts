import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCountriesCommand } from './create-countries.command';
import { CreateCountriesResponse } from './create-countries.response';
import { Country } from '../../countries.entity';
import { plainToInstance } from 'class-transformer';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateCountriesCommand)
export class CreateCountriesHandler implements ICommandHandler<CreateCountriesCommand>{
  async execute(cmd: CreateCountriesCommand): Promise<CreateCountriesResponse> {

    const countryExists = await Country.existsBy({ title: cmd.title });
    if (countryExists) {
      throw new ConflictException(`Country with given title  already exists`);
    }

    const newCountry = Country.create({
      title: cmd.title,
      flag: cmd.flag.path,
    } as Country);

    await Country.save(newCountry)

    return plainToInstance(CreateCountriesResponse, newCountry, { excludeExtraneousValues: true });
  }
}