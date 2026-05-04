import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { UpdateCountriesRequest } from './update-countries.request';
import { UpdateCountriesResponse } from './update-countries.response';
import { Country } from '../../countries.entity';

@CommandHandler(UpdateCountriesRequest)
export class UpdateCountriesHandler implements ICommandHandler<UpdateCountriesRequest> {
  async execute(cmd: UpdateCountriesRequest): Promise<UpdateCountriesResponse> {
    const country = await Country.findOne({ where: { id: cmd.id } });
    if (!country) throw new NotFoundException('Country not found');

    if (cmd.title) country.title = cmd.title;

    if (cmd.flag) {
      if (country.flag && fs.existsSync(country.flag)) {
        fs.rmSync(country.flag);
      }
      country.flag = cmd.flag.path;
    }

    await Country.save(country);
    return plainToInstance(UpdateCountriesResponse, country, { excludeExtraneousValues: true });
  }
}