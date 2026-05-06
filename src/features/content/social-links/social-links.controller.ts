import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import fs from 'fs';
import {
  GetAllSocialLinksPublicResponse
} from '@/features/content/social-links/public/queries/get-all-social-links/get-all-social-links.public.response';
import {
  GetAllSocialLinksPublicRequest
} from '@/features/content/social-links/public/queries/get-all-social-links/get-all-social-links.public.request';
import {
  GetAllSocialLinksPublicFilters
} from '@/features/content/social-links/public/queries/get-all-social-links/get-all-social-links.public.filters';
import {
  GetOneSocialLinksPublicResponse
} from '@/features/content/social-links/public/queries/get-one-social-links/get-one-social-links.public.response';
import {
  GetOneSocialLinksPublicRequest
} from '@/features/content/social-links/public/queries/get-one-social-links/get-one-social-links.public.request';
import {
  DeleteSocialLinksAdminRequest
} from '@/features/content/social-links/admin/commands/delete-social-links/delete-social-links.admin.request';
import {
  UpdateSocialLinksAdminRequest
} from '@/features/content/social-links/admin/commands/update-social-links/update-social-links.admin.request';
import {
  UpdateSocialLinksAdminResponse
} from '@/features/content/social-links/admin/commands/update-social-links/update-social-links.admin.response';
import {
  CreateSocialLinksAdminCommand
} from '@/features/content/social-links/admin/commands/create-social-links/create-social-links.admin.command';
import {
  CreateSocialLinksAdminRequest
} from '@/features/content/social-links/admin/commands/create-social-links/create-social-links.admin.request';
import {
  CreateSocialLinksAdminResponse
} from '@/features/content/social-links/admin/commands/create-social-links/create-social-links.admin.response';
import {
  GetAllSocialLinksAdminRequest
} from '@/features/content/social-links/admin/queries/get-all-social-links/get-all-social-links.admin.request';
import {
  GetAllSocialLinksAdminResponse
} from '@/features/content/social-links/admin/queries/get-all-social-links/get-all-social-links.admin.response';
import {
  GetOneSocialLinksAdminResponse
} from '@/features/content/social-links/admin/queries/get-one-social-links/get-one-social-links.admin.response';
import {
  GetOneSocialLinksAdminRequest
} from '@/features/content/social-links/admin/queries/get-one-social-links/get-one-social-links.admin.request';
import { Roles } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';
class GetAllSocialLinksFilters {
}

@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('admin/social-links')
export class SocialLinksAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllSocialLinksAdminResponse] })
  async getAll(@Query() filters: GetAllSocialLinksFilters) {
    return await this.queryBus.execute(new GetAllSocialLinksAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneSocialLinksAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneSocialLinksAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateSocialLinksAdminResponse })
  async create(
    @Body() payload: CreateSocialLinksAdminRequest,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    const cmd = new CreateSocialLinksAdminCommand(
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
  @ApiOkResponse({ type: UpdateSocialLinksAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSocialLinksAdminRequest,
    @UploadedFile() icon?: Express.Multer.File,
  ) {
    const cmd = new UpdateSocialLinksAdminRequest();
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
    const cmd = new DeleteSocialLinksAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/social-links')
export class SocialLinksPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllSocialLinksPublicResponse] })
  async getAll(@Query() filters: GetAllSocialLinksPublicFilters) {
    return await this.queryBus.execute(new GetAllSocialLinksPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneSocialLinksPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneSocialLinksPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

}