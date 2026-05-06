import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCountriesAdminCommand } from './create-countries.admin.command';
import { CreateCountriesAdminResponse } from './create-countries.admin.response';
import { Country } from '../../../countries.entity';
import { plainToInstance } from 'class-transformer';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateCountriesAdminCommand)
export class CreateCountriesAdminHandler implements ICommandHandler<CreateCountriesAdminCommand>{
  async execute(cmd: CreateCountriesAdminCommand): Promise<CreateCountriesAdminResponse> {

    const countryExists = await Country.existsBy({ title: cmd.title });
    if (countryExists) {
      throw new ConflictException(`Country with given title  already exists`);
    }

    const newCountry = Country.create({
      title: cmd.title,
      flag: cmd.flag.path,
    } as Country);

    await Country.save(newCountry)

    return plainToInstance(CreateCountriesAdminResponse, newCountry, { excludeExtraneousValues: true });
  }
}
