import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import fs from 'fs';
import { GetAllRepresentativesResponse } from './queries/get-all-representatives/get-all-representatives.response';
import { GetAllRepresentativesFilters } from './queries/get-all-representatives/get-all-representatives.filters';
import { GetAllRepresentativesRequest } from './queries/get-all-representatives/get-all-representatives.request';
import { GetOneRepresentativesResponse } from './queries/get-one-representatives/get-one-representatives.response';
import { GetOneRepresentativesRequest } from './queries/get-one-representatives/get-one-representatives.request';
import { CreateRepresentativesResponse } from './commands/create-representatives/create-representatives.response';
import { CreateRepresentativesRequest } from './commands/create-representatives/create-representatives.request';
import { CreateRepresentativesCommand } from './commands/create-representatives/create-representatives.command';
import { UpdateRepresentativesResponse } from './commands/update-representatives/update-representatives.response';
import { UpdateRepresentativesRequest } from './commands/update-representatives/update-representatives.request';
import { DeleteRepresentativesRequest } from './commands/delete-representatives/delete-representatives.request';

@Controller('representatives')
export class RepresentativesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllRepresentativesResponse] })
  async getAll(@Query() filters: GetAllRepresentativesFilters) {
    return await this.queryBus.execute(new GetAllRepresentativesRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneRepresentativesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneRepresentativesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateRepresentativesResponse })
  async create(
    @Body() payload: CreateRepresentativesRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateRepresentativesCommand(
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
  @ApiOkResponse({ type: UpdateRepresentativesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRepresentativesRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateRepresentativesRequest();
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
    const cmd = new DeleteRepresentativesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}