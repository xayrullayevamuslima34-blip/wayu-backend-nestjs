import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './branches/branches.entity';
import { Representative } from './representatives/representatives.entity';
import {
  RepresentativesAdminController,
  RepresentativesPublicController,
} from './representatives/representatives.controller';
import { BranchesAdminController } from './branches/branches.controller';
import { GetAllBranchesAdminHandler } from './branches/admin/queries/get-all-branches/get-all-branches.admin.handler';
import { GetOneBranchesAdminHandler } from './branches/admin/queries/get-one-branches/get-one-branches.admin.handler';
import { CreateBranchesAdminHandler } from './branches/admin/commands/create-branches/create-branches.admin.handler';
import { UpdateBranchesAdminHandler } from './branches/admin/commands/update-branches/update-branches.admin.handler';
import { DeleteBranchesAdminHandler } from './branches/admin/commands/delete-branches/delete-branches.admin.handler';
import {
  GetAllRepresentativesAdminHandler,
} from './representatives/admin/queries/get-all-representatives/get-all-representatives.admin.handler';
import {
  GetOneRepresentativesAdminHandler,
} from './representatives/admin/queries/get-one-representatives/get-one-representatives.admin.handler';
import {
  CreateRepresentativesAdminHandler,
} from './representatives/admin/commands/create-representatives/create-representatives.admin.handler';
import {
  UpdateRepresentativesAdminHandler,
} from './representatives/admin/commands/update-representatives/update-representatives.admin.handler';
import {
  DeleteRepresentativesAdminHandler,
} from './representatives/admin/commands/delete-representatives/delete-representatives.admin.handler';
import { ConfigModule } from '@nestjs/config';
import { BooksPublicController } from '@/features/library/books/books.controller';
import {
  GetAllBooksPublicHandler,
} from '@/features/library/books/public/queries/get-all-books/get-all-books.public.handler';
import {
  GetAllBranchesPublicHandler,
} from '@/features/organization/branches/public/queries/get-all-branches/get-all-branches.public.handler';
import {
  GetAllRepresentativesPublicHandler,
} from '@/features/organization/representatives/public/queries/get-all-representatives/get-all-representatives.public.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Representative]),
    ConfigModule],

  controllers: [
    BranchesAdminController, BooksPublicController,
    RepresentativesAdminController, RepresentativesPublicController,
  ],

  providers: [
    GetAllBranchesAdminHandler,
    GetOneBranchesAdminHandler,
    CreateBranchesAdminHandler,
    UpdateBranchesAdminHandler,
    DeleteBranchesAdminHandler,
    GetAllBranchesPublicHandler,
    GetAllBranchesPublicHandler,

    GetAllRepresentativesAdminHandler,
    GetOneRepresentativesAdminHandler,
    CreateRepresentativesAdminHandler,
    UpdateRepresentativesAdminHandler,
    DeleteRepresentativesAdminHandler,
    GetAllRepresentativesPublicHandler,
    GetAllRepresentativesPublicHandler,
  ],

})

export class OrganizationModule {
}