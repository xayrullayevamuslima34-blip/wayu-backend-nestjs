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
  GetAllInstagramPostsAdminResponse,
} from '@/features/content/instagram-posts/admin/queries/get-all-instagram-posts/get-all-instagram-posts.admin.response';
import {
  GetAllInstagramPostsAdminFilters,
} from '@/features/content/instagram-posts/admin/queries/get-all-instagram-posts/get-all-instagram-posts.admin.filters';
import {
  GetAllInstagramPostsAdminRequest,
} from '@/features/content/instagram-posts/admin/queries/get-all-instagram-posts/get-all-instagram-posts.admin.request';
import {
  GetOneInstagramPostsAdminResponse,
} from './admin/queries/get-one-instagram-posts/get-one-instagram-posts.admin.response';
import {
  GetOneInstagramPostsAdminRequest,
} from '@/features/content/instagram-posts/admin/queries/get-one-instagram-posts/get-one-instagram-posts.admin.request';
import {
  CreateInstagramPostsAdminResponse,
} from '@/features/content/instagram-posts/admin/commands/create-instagram-posts/create-instagram-posts.admin.response';
import {
  CreateInstagramPostsAdminRequest,
} from '@/features/content/instagram-posts/admin/commands/create-instagram-posts/create-instagram-posts.admin.request';
import {
  CreateInstagramPostsAdminCommand,
} from '@/features/content/instagram-posts/admin/commands/create-instagram-posts/create-instagram-posts.admin.command';
import {
  UpdateInstagramPostsAdminRequest,
} from '@/features/content/instagram-posts/admin/commands/update-instagram-posts/update-instagram-posts.admin.request';
import {
  UpdateInstagramPostsAdminResponse,
} from '@/features/content/instagram-posts/admin/commands/update-instagram-posts/update-instagram-posts.admin.response';
import {
  DeleteInstagramPostsAdminRequest,
} from '@/features/content/instagram-posts/admin/commands/delete-instagram-posts/delete-instagram-posts.admin.request';
import {
  GetAllInstagramPostsPublicResponse,
} from '@/features/content/instagram-posts/public/queries/get-all-instagram-posts/get-all-instagram-posts.public.response';
import {
  GetAllInstagramPostsPublicFilters,
} from '@/features/content/instagram-posts/public/queries/get-all-instagram-posts/get-all-instagram-posts.public.filters';
import {
  GetAllInstagramPostsPublicRequest,
} from '@/features/content/instagram-posts/public/queries/get-all-instagram-posts/get-all-instagram-posts.public.request';
import {
  GetOneInstagramPostsPublicResponse,
} from '@/features/content/instagram-posts/public/queries/get-one-instagram-posts/get-one-instagram-posts.public.response';
import {
  GetOneInstagramPostsPublicRequest,
} from '@/features/content/instagram-posts/public/queries/get-one-instagram-posts/get-one-instagram-posts.public.request';

@Controller('admin/instagram-posts')
export class InstagramPostsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllInstagramPostsAdminResponse] })
  async getAll(@Query() filters: GetAllInstagramPostsAdminFilters) {
    return await this.queryBus.execute(new GetAllInstagramPostsAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneInstagramPostsAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneInstagramPostsAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateInstagramPostsAdminResponse })
  async create(
    @Body() payload: CreateInstagramPostsAdminRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateInstagramPostsAdminCommand(
      image,
      payload.link,
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
  @ApiOkResponse({ type: UpdateInstagramPostsAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInstagramPostsAdminRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateInstagramPostsAdminRequest();
    cmd.id = id;
    cmd.link = payload.link;
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
    const cmd = new DeleteInstagramPostsAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/instagram-posts')
export class InstagramPostsPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllInstagramPostsPublicResponse] })
  async getAll(@Query() filters: GetAllInstagramPostsPublicFilters) {
    return await this.queryBus.execute(new GetAllInstagramPostsPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneInstagramPostsPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneInstagramPostsPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

}