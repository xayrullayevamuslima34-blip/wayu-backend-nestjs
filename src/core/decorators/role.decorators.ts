import {Role} from "../enums/role.enum";
import {SetMetadata} from "@nestjs/common";

export const RolesDecorator = "roles"
export const Roles = (...roles: Role[]) => SetMetadata(RolesDecorator, roles)
