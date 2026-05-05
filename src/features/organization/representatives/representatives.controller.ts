import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import fs from 'fs';
import {
  GetAllRepresentativesAdminResponse,
} from './admin/queries/get-all-representatives/get-all-representatives.admin.response';
import {
  GetAllRepresentativesAdminFilters,
} from './admin/queries/get-all-representatives/get-all-representatives.admin.filters';
import {
  GetAllRepresentativesAdminRequest,
} from './admin/queries/get-all-representatives/get-all-representatives.admin.request';
import {
  GetOneRepresentativesAdminResponse,
} from './admin/queries/get-one-representatives/get-one-representatives.admin.response';
import {
  GetOneRepresentativesAdminRequest,
} from './admin/queries/get-one-representatives/get-one-representatives.admin.request';
import {
  CreateRepresentativesAdminResponse,
} from './admin/commands/create-representatives/create-representatives.admin.response';
import {
  CreateRepresentativesAdminRequest,
} from './admin/commands/create-representatives/create-representatives.admin.request';
import {
  CreateRepresentativesAdminCommand,
} from './admin/commands/create-representatives/create-representatives.admin.command';
import {
  UpdateRepresentativesAdminResponse,
} from './admin/commands/update-representatives/update-representatives.admin.response';
import {
  UpdateRepresentativesAdminRequest,
} from './admin/commands/update-representatives/update-representatives.admin.request';
import {
  DeleteRepresentativesAdminRequest,
} from './admin/commands/delete-representatives/delete-representatives.admin.request';
import {
  GetAllRepresentativesPublicResponse,
} from '@/features/organization/representatives/public/queries/get-all-representatives/get-all-representatives.public.response';
import {
  GetAllRepresentativesPublicFilters,
} from '@/features/organization/representatives/public/queries/get-all-representatives/get-all-representatives.public.filters';
import {
  GetAllRepresentativesPublicRequest,
} from '@/features/organization/representatives/public/queries/get-all-representatives/get-all-representatives.public.request';
import {
  GetOneRepresentativesPublicResponse,
} from '@/features/organization/representatives/public/queries/get-one-representatives/get-one-representatives.public.response';
import {
  GetOneRepresentativesPublicRequest,
} from '@/features/organization/representatives/public/queries/get-one-representatives/get-one-representatives.public.request';

@Controller('admin/representatives')
export class RepresentativesAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllRepresentativesAdminResponse] })
  async getAll(@Query() filters: GetAllRepresentativesAdminFilters) {
    return await this.queryBus.execute(new GetAllRepresentativesAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneRepresentativesAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneRepresentativesAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateRepresentativesAdminResponse })
  async create(
    @Body() payload: CreateRepresentativesAdminRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateRepresentativesAdminCommand(
      payload.fullName,
      image,
      payload.email,
      payload.phoneNumber,
      payload.resume,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiOkResponse({ type: UpdateRepresentativesAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRepresentativesAdminRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateRepresentativesAdminRequest();
    cmd.id = id;
    cmd.fullName = payload.fullName;
    cmd.email = payload.email;
    cmd.phoneNumber = payload.phoneNumber;
    cmd.resume = payload.resume;
    cmd.image = image;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteRepresentativesAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/representatives')
export class RepresentativesPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllRepresentativesPublicResponse] })
  async getAll(@Query() filters: GetAllRepresentativesPublicFilters) {
    return await this.queryBus.execute(new GetAllRepresentativesPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneRepresentativesPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneRepresentativesPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}