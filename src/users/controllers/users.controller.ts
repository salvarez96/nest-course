import { Controller, Get } from '@nestjs/common';

@Controller('api/users')
export class UsersController {
  @Get()
  getUsers() {
    return 'This returns all users';
  }
}
