import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './branches/branches.entity';
import { Representative } from './representatives/representatives.entity';
import { RepresentativesController } from './representatives/representatives.controller';
import { BranchesController } from './branches/branches.controller';
import { GetAllBranchesHandler } from './branches/queries/get-all-branches/get-all-branches.handler';
import { GetOneBranchesHandler } from './branches/queries/get-one-branches/get-one-branches.handler';
import { CreateBranchesHandler } from './branches/commands/create-branches/create-branches.handler';
import { UpdateBranchesHandler } from './branches/commands/update-branches/update-branches.handler';
import { DeleteBranchesHandler } from './branches/commands/delete-branches/delete-branches.handler';
import {
  GetAllRepresentativesHandler,
} from './representatives/queries/get-all-representatives/get-all-representatives.handler';
import {
  GetOneRepresentativesHandler,
} from './representatives/queries/get-one-representatives/get-one-representatives.handler';
import {
  CreateRepresentativesHandler,
} from './representatives/commands/create-representatives/create-representatives.handler';
import {
  UpdateRepresentativesHandler,
} from './representatives/commands/update-representatives/update-representatives.handler';
import {
  DeleteRepresentativesHandler,
} from './representatives/commands/delete-representatives/delete-representatives.handler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Representative]),
  ConfigModule],

  controllers: [
    BranchesController,
    RepresentativesController,
  ],

  providers: [
    GetAllBranchesHandler,
    GetOneBranchesHandler,
    CreateBranchesHandler,
    UpdateBranchesHandler,
    DeleteBranchesHandler,
    GetAllRepresentativesHandler,
    GetOneRepresentativesHandler,
    CreateRepresentativesHandler,
    UpdateRepresentativesHandler,
    DeleteRepresentativesHandler,
  ],

})

export class OrganizationModule {
}