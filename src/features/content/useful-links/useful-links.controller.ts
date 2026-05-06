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
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import fs from 'fs';
import {
  GetAllUsefulLinksPublicResponse,
} from '@/features/content/useful-links/public/queries/get-all-useful-links/get-all-useful-links.public.response';
import {
  GetAllUsefulLinksPublicFilters,
} from '@/features/content/useful-links/public/queries/get-all-useful-links/get-all-useful-links.public.filters';
import {
  GetAllUsefulLinksPublicRequest,
} from '@/features/content/useful-links/public/queries/get-all-useful-links/get-all-useful-links.public.request';
import {
  GetOneUsefulLinksPublicResponse,
} from './public/queries/get-one-useful-links/get-one-useful-links.public.response';
import {
  GetOneUsefulLinksPublicRequest,
} from '@/features/content/useful-links/public/queries/get-one-useful-links/get-one-useful-links.public.request';
import {
  GetAllUsefulLinksAdminResponse,
} from '@/features/content/useful-links/admin/queries/get-all-useful-links/get-all-useful-links.admin.response';
import {
  GetAllUsefulLinksAdminFilters,
} from '@/features/content/useful-links/admin/queries/get-all-useful-links/get-all-useful-links.admin.filters';
import {
  GetAllUsefulLinksAdminRequest,
} from '@/features/content/useful-links/admin/queries/get-all-useful-links/get-all-useful-links.admin.request';
import {
  GetOneUsefulLinksAdminResponse,
} from '@/features/content/useful-links/admin/queries/get-one-useful-links/get-one-useful-links.admin.response';
import {
  CreateUsefulLinksAdminResponse,
} from '@/features/content/useful-links/admin/commands/create-useful-links/create-useful-links.admin.response';
import {
  CreateUsefulLinksAdminRequest,
} from '@/features/content/useful-links/admin/commands/create-useful-links/create-useful-links.admin.request';
import {
  CreateUsefulLinksAdminCommand,
} from '@/features/content/useful-links/admin/commands/create-useful-links/create-useful-links.admin.command';
import {
  UpdateUsefulLinksAdminResponse,
} from '@/features/content/useful-links/admin/commands/update-useful-links/update-useful-links.admin.response';
import {
  UpdateUsefulLinksAdminRequest,
} from '@/features/content/useful-links/admin/commands/update-useful-links/update-useful-links.admin.request';
import {
  DeleteUsefulLinksAdminRequest,
} from '@/features/content/useful-links/admin/commands/delete-useful-links/delete-useful-links.admin.request';
import {
  GetOneUsefulLinksAdminRequest
} from '@/features/content/useful-links/admin/queries/get-one-useful-links/get-one-useful-links.admin.request';
import { Roles } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';

@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('admin/useful-links')
export class UsefulLinksAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllUsefulLinksAdminResponse] })
  async getAll(@Query() filters: GetAllUsefulLinksAdminFilters) {
    return await this.queryBus.execute(new GetAllUsefulLinksAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneUsefulLinksAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneUsefulLinksAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateUsefulLinksAdminResponse })
  async create(
    @Body() payload: CreateUsefulLinksAdminRequest,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    const cmd = new CreateUsefulLinksAdminCommand(
      payload.title,
      icon,
      payload.link,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (icon && fs.existsSync(icon.path)) fs.rmSync(icon.path);
      throw exc;
    }
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiOkResponse({ type: UpdateUsefulLinksAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUsefulLinksAdminRequest,
    @UploadedFile() icon?: Express.Multer.File,
  ) {
    const cmd = new UpdateUsefulLinksAdminRequest();
    cmd.id = id;
    cmd.title = payload.title;
    cmd.link = payload.link;
    cmd.icon = icon;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (icon && fs.existsSync(icon.path)) fs.rmSync(icon.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteUsefulLinksAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/useful-links')
export class UsefulLinksPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllUsefulLinksPublicResponse] })
  async getAll(@Query() filters: GetAllUsefulLinksPublicFilters) {
    return await this.queryBus.execute(new GetAllUsefulLinksPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneUsefulLinksPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneUsefulLinksPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

}
