import { Module } from '@nestjs/common';
import {
  CountriesAdminController,
  CountriesPublicController,
} from './countries/countries.controller';
import {
  LanguagesAdminController,
  LanguagesPublicController,
} from './languages/languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './countries/countries.entity';
import { Language } from './languages/languages.entity';
import { ConfigModule } from '@nestjs/config';
import {
  GetAllCountriesPublicHandler,
} from './countries/public/queries/get-all-countries-public/get-all-countries.public.handler';
import {
  GetOneCountriesPublicHandler,
} from './countries/public/queries/get-one-countries-public/get-one-countries.public.handler';
import {
  CreateCountriesAdminHandler,
} from './countries/admin/commands/create-countries-admin/create-countries.admin.handler';
import {
  UpdateCountriesAdminHandler,
} from './countries/admin/commands/update-countries-admin/update-countries.admin.handler';
import {
  DeleteCountriesAdminHandler,
} from './countries/admin/commands/delete-countries-admin/delete-countries.admin.handler';
import {
  GetAllLanguagesPublicHandler,
} from './languages/public/queries/get-all-languages/get-all-languages.public.handler';
import {
  GetOneLanguagesPublicHandler,
} from './languages/public/queries/get-one-languages/get-one-languages.public.handler';
import {
  CreateLanguagesAdminHandler,
} from './languages/admin/commands/create-languages/create-languages.admin.handler';
import {
  UpdateLanguagesAdminHandler,
} from './languages/admin/commands/update-languages/update-languages.admin.handler';
import {
  DeleteLanguagesAdminHandler,
} from './languages/admin/commands/delete-languages/delete-languages.admin.handler';
import {
  GetAllCountriesAdminHandler,
} from '@/features/common/countries/admin/queries/get-all-countries-admin/get-all-countries.admin.handler';
import {
  GetOneCountriesAdminHandler,
} from '@/features/common/countries/admin/queries/get-one-countries-admin/get-one-countries.admin.handler';
import {
  GetAllLanguagesAdminHandler,
} from '@/features/common/languages/admin/queries/get-all-languages/get-all-languages.admin.handler';
import {
  GetOneLanguagesAdminHandler,
} from '@/features/common/languages/admin/queries/get-one-languages/get-one-languages.admin.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Language]),
    ConfigModule],

  controllers: [CountriesAdminController, CountriesPublicController,
    LanguagesAdminController, LanguagesPublicController,
  ],

  providers: [GetAllCountriesAdminHandler, GetOneCountriesAdminHandler,
    CreateCountriesAdminHandler, UpdateCountriesAdminHandler, DeleteCountriesAdminHandler,
    GetAllLanguagesAdminHandler, GetOneLanguagesAdminHandler, CreateLanguagesAdminHandler,
    UpdateLanguagesAdminHandler, DeleteLanguagesAdminHandler,
    GetAllCountriesPublicHandler, GetOneCountriesPublicHandler,
    GetAllLanguagesPublicHandler, GetOneLanguagesPublicHandler,
  ],
})

export class CommonModule {
}