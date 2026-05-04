import { Module } from '@nestjs/common';
import { EventsController } from './events/events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/events.entity';
import { EventCategories } from './event-categories/event-categories.entity';
import { EventCategoriesController } from './event-categories/event-categories.controller';
import { GetAllEventsHandler } from './events/queries/get-all-events/get-all-events.handler';
import { GetOneEventHandler } from './events/queries/get-one-events/get-one-events.handler';
import {
  GetAllEventCategoriesHandler,
} from './event-categories/queries/get-all-event-categories/get-all-event-categories.handler';
import { CreateEventHandler } from './events/commands/create-events/create-events.handler';
import { UpdateEventHandler } from './events/commands/update-events/update-events.handler';
import {
  GetOneEventCategoriesHandler,
} from './event-categories/queries/get-one-event-categories/get-one-event-categories.handler';
import { DeleteEventHandler } from './events/commands/delete-events/delete-events.handler';
import {
  CreateEventCategoriesHandler,
} from './event-categories/commands/create-event-categories/create-event-categories.handler';
import {
  UpdateEventCategoriesHandler,
} from './event-categories/commands/update-event-categories/update-event-categories.handler';
import {
  DeleteEventCategoriesHandler,
} from './event-categories/commands/delete-event-categories/delete-event-categories.handler';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [TypeOrmModule.forFeature([Event, EventCategories]),
  ConfigModule],

  controllers: [EventsController, EventCategoriesController],

  providers: [
    GetAllEventsHandler,
    GetOneEventHandler,
    CreateEventHandler,
    UpdateEventHandler,
    DeleteEventHandler,
    GetAllEventCategoriesHandler,
    GetOneEventCategoriesHandler,
    CreateEventCategoriesHandler,
    UpdateEventCategoriesHandler,
    DeleteEventCategoriesHandler,
  ],
})

export class EventsModule {
}