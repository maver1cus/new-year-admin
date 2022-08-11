import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './decorators/user.decorator';
import { AuthGuard } from './guards/auth.guard';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  async createUser(@Body() userDto: UserDto) {
    const user = await this.userService.createUser(userDto);

    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    const user = await this.userService.login(userDto);

    return this.userService.buildUserResponse(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getCurrentUser(@User() user) {
    return this.userService.buildUserResponse(user);
  }
}
