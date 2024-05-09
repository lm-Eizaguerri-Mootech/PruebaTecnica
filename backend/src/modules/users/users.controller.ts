import { Body, ConflictException, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';

@Controller('api/v1/users')
export class UsersController {

  constructor(private usersService: UsersService){}

  @Post()
  createUser(@Body() user: UserDto){  //mirar esto
    return this.usersService.createUser(user);
  }

  @Delete('/:name')
  deleteUser(@Param('name') name: string){
    return this.usersService.deleteUser(name);
  }

  @Put('/id')
  updateUserByID(@Body() user:{userId:object, userData:{name, password, email, online}}){

    if(!user.userData.name){
      throw new ConflictException("Los datos estan incompletos")
    }
    return this.usersService.updateById(user.userId, user.userData);
  }

  @Get()
  getUsers(){
    return this.usersService.getUsers();
  }

  @Get('/loggin')
  setLoggin(@Query('name') name: string, @Query('password') password: string ){
    return this.usersService.setLoggin(name, password);
  }
  @Get('/:id')
  getById(@Param('id') id: string ){
    return this.usersService.getID(id);
  }

  



}
