import { Module } from '@nestjs/common';
import { CountriesController } from './countries/countries.controller';
import { LanguagesController } from './languages/languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './countries/countries.entity';
import { Language } from './languages/languages.entity';
import { ConfigModule } from '@nestjs/config';
import { GetAllCountriesHandler } from './countries/queries/get-all-countries/get-all-countries.handler';
import { GetOneCountriesHandler } from './countries/queries/get-one-countries/get-one-countries.handler';
import { CreateCountriesHandler } from './countries/command/create-countries/create-countries.handler';
import { UpdateCountriesHandler } from './countries/command/update-countries/update-countries.handler';
import { DeleteCountriesHandler } from './countries/command/delete-countries/delete-countries.handler';
import { GetAllLanguagesHandler } from './languages/queries/get-all-languages/get-all-languages.handler';
import { GetOneLanguagesHandler } from './languages/queries/get-one-languages/get-one-languages.handler';
import { CreateLanguagesHandler } from './languages/commands/create-languages/create-languages.handler';
import { UpdateLanguagesHandler } from './languages/commands/update-languages/update-languages.handler';
import { DeleteLanguagesHandler } from './languages/commands/delete-languages/delete-languages.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Language]),
    ConfigModule],

  controllers: [CountriesController, LanguagesController],

  providers: [GetAllCountriesHandler, GetOneCountriesHandler,
    CreateCountriesHandler, UpdateCountriesHandler, DeleteCountriesHandler,
    GetAllLanguagesHandler, GetOneLanguagesHandler, CreateLanguagesHandler,
    UpdateLanguagesHandler, DeleteLanguagesHandler],
})

export class CommonModule {
}