import { HttpStatus,Controller, Get, Post, Body, Patch, Param, Delete,Res, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, LoginDto } from './dto';
import { Role } from '@prisma/client';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      'application/json': {
        value: {
          email: 'john.doe@example.com',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async register(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    // Si role no se proporciona, establece USER como valor por defecto
    if (!createUserDto.role) {
      createUserDto.role = Role.USER;
    }
    const result = await this.userService.create(createUserDto);
    response.status(HttpStatus.CREATED).json({ ok: true, result, msg: 'Created' });
  }

  @Post('auth/login')
  @ApiOperation({ summary: 'Logs in an existing user' })
  @ApiBody({ type: LoginDto, description: 'User credentials for login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully', type: User })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  login(@Body() loginUserDto: LoginDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('loggedUser')
  @UseGuards(AuthGuard('jwt'))
  findLoggedUser(@Req() req: any) {
    const userId = req.user.id; 
    return this.userService.findOne(userId);
  }


  //@Get(':id')
  //findOne(@Param('id') id: string) {
  //  return this.userService.findOne(+id);
  //}


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
