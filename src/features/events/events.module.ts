import { Module } from '@nestjs/common';
import { EventsAdminController, EventsPublicController } from './events/events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/events.entity';
import { EventCategories } from './event-categories/event-categories.entity';
import { GetAllEventsAdminHandler } from './events/admin/queries/get-all-events/get-all-events.admin.handler';
import { GetOneEventsAdminHandler } from './events/admin/queries/get-one-events/get-one-events.admin.handler';
import {
  GetAllEventCategoriesAdminHandler,
} from './event-categories/admin/queries/get-all-event-categories/get-all-event-categories.admin.handler';
import {
  GetOneEventCategoriesAdminHandler,
} from './event-categories/admin/queries/get-one-event-categories/get-one-event-categories.admin.handler';
import {
  CreateEventCategoriesAdminHandler,
} from './event-categories/admin/commands/create-event-categories/create-event-categories.admin.handler';
import {
  UpdateEventCategoriesAdminHandler,
} from './event-categories/admin/commands/update-event-categories/update-event-categories.admin.handler';
import {
  DeleteEventCategoriesAdminHandler,
} from './event-categories/admin/commands/delete-event-categories/delete-event-categories.admin.handler';
import { ConfigModule } from '@nestjs/config';
import {
  EventCategoriesAdminController,
  EventCategoriesPublicController,
} from '@/features/events/event-categories/event-categories.controller';
import {
  GetAllEventCategoriesPublicHandler,
} from '@/features/events/event-categories/public/queries/get-all-event-categories/get-all-event-categories.public.handler';
import {
  GetOneEventCategoriesPublicHandler,
} from '@/features/events/event-categories/public/queries/get-one-event-categories/get-one-event-categories.public.handler';
import {
  UpdateEventsAdminHandler,
} from '@/features/events/events/admin/commands/update-events/update-events.admin.handler';
import {
  CreateEventsAdminHandler,
} from '@/features/events/events/admin/commands/create-events/create-events.admin.handler';
import {
  DeleteEventsAdminHandler,
} from '@/features/events/events/admin/commands/delete-events/delete-events.admin.handler';
import {
  GetAllEventsPublicHandler,
} from '@/features/events/events/public/queries/get-all-events/get-all-events.public.handler';
import {
  GetOneEventsPublicHandler,
} from '@/features/events/events/public/queries/get-one-events/get-one-events.public.handler';


@Module({
  imports: [TypeOrmModule.forFeature([Event, EventCategories]),
    ConfigModule],

  controllers: [EventsAdminController, EventsPublicController,
    EventCategoriesAdminController, EventCategoriesPublicController,
  ],

  providers: [
    GetAllEventsAdminHandler,
    GetOneEventsAdminHandler,
    CreateEventsAdminHandler,
    UpdateEventsAdminHandler,
    DeleteEventsAdminHandler,
    GetAllEventsPublicHandler,
    GetOneEventsPublicHandler,

    GetAllEventCategoriesAdminHandler,
    GetOneEventCategoriesAdminHandler,
    CreateEventCategoriesAdminHandler,
    UpdateEventCategoriesAdminHandler,
    DeleteEventCategoriesAdminHandler,
    GetAllEventCategoriesPublicHandler,
    GetOneEventCategoriesPublicHandler,
  ],
})

export class EventsModule {
}