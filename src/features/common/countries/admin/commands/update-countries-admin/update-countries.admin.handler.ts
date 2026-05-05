import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { UpdateCountriesAdminRequest } from './update-countries.admin.request';
import { UpdateCountriesAdminResponse } from './update-countries.admin.response';
import { Country } from '../../../countries.entity';

@CommandHandler(UpdateCountriesAdminRequest)
export class UpdateCountriesAdminHandler implements ICommandHandler<UpdateCountriesAdminRequest> {
  async execute(cmd: UpdateCountriesAdminRequest): Promise<UpdateCountriesAdminResponse> {
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
    return plainToInstance(UpdateCountriesAdminResponse, country, { excludeExtraneousValues: true });
  }
}