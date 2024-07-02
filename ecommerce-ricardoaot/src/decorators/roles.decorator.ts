import { SetMetadata } from "@nestjs/common";
import { RolesEnum } from "src/module/users/enum/roles.enum";

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles)